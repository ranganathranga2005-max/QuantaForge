"""
Learning System Persistence & Rule-Based Mastery Store.

Manages learner progress, exercise attempts, assessment scores, concept mastery,
hints, and deterministic adaptive recommendations for QuantumLearning.
"""
import time
import json
import os
from typing import Dict, Any, List, Optional
from app.learning.models import LearnerProgress, ConceptMastery, HintRequest, HintResponse, Recommendation

DATA_FILE = os.path.join(os.path.dirname(__file__), "store_data.json")

class LearningStore:
    def __init__(self):
        self._data: Dict[str, Any] = self._load()

    def _load(self) -> Dict[str, Any]:
        if os.path.exists(DATA_FILE):
            try:
                with open(DATA_FILE, "r") as f:
                    data = json.load(f)
                    data.setdefault("completed_lessons", [])
                    data.setdefault("exercise_attempts", [])
                    data.setdefault("assessment_attempts", [])
                    data.setdefault("concept_mastery", {})
                    data.setdefault("last_active_lesson", None)
                    data.setdefault("hints_requested_count", 0)
                    data.setdefault("mistakes_count", 0)
                    return data
            except Exception:
                pass
        return {
            "completed_lessons": [],
            "exercise_attempts": [],
            "assessment_attempts": [],
            "concept_mastery": {},
            "last_active_lesson": None,
            "hints_requested_count": 0,
            "mistakes_count": 0
        }

    def _save(self):
        try:
            with open(DATA_FILE, "w") as f:
                json.dump(self._data, f, indent=2)
        except Exception:
            pass

    def record_lesson_completion(self, lesson_id: str):
        if lesson_id not in self._data["completed_lessons"]:
            self._data["completed_lessons"].append(lesson_id)
        self._data["last_active_lesson"] = lesson_id
        self._save()

    def update_progress(self, lesson_id: str, status: str) -> Dict[str, Any]:
        valid_statuses = {"NOT_STARTED", "IN_PROGRESS", "COMPLETED", "MASTERED"}
        st = status.upper()
        if st not in valid_statuses:
            st = "IN_PROGRESS"

        if st in ("COMPLETED", "MASTERED") and lesson_id not in self._data["completed_lessons"]:
            self._data["completed_lessons"].append(lesson_id)

        self._data["last_active_lesson"] = lesson_id
        self._save()

        return {
            "lesson_id": lesson_id,
            "status": st,
            "completed_lessons_count": len(self._data["completed_lessons"])
        }

    def record_exercise_attempt(self, exercise_id: str, concept_id: str, passed: bool, score: float):
        now = time.time()
        if not passed:
            self._data["mistakes_count"] += 1

        self._data["exercise_attempts"].append({
            "exercise_id": exercise_id,
            "concept_id": concept_id,
            "passed": passed,
            "score": score,
            "timestamp": now
        })
        self._update_concept_mastery(concept_id)
        self._save()

    def record_assessment_attempt(self, assessment_id: str, score: float, total: int, correct: int):
        now = time.time()
        if correct < total:
            self._data["mistakes_count"] += (total - correct)

        self._data["assessment_attempts"].append({
            "assessment_id": assessment_id,
            "score": score,
            "total": total,
            "correct": correct,
            "timestamp": now
        })
        self._save()

    def _update_concept_mastery(self, concept_id: str):
        attempts = [a for a in self._data["exercise_attempts"] if a.get("concept_id") == concept_id]
        if not attempts:
            return

        total_attempts = len(attempts)
        passed_attempts = sum(1 for a in attempts if a.get("passed"))
        accuracy = passed_attempts / total_attempts if total_attempts > 0 else 0.0

        # Weighted calculation combining evidence count and accuracy
        weighted_score = min(1.0, (accuracy * 0.7) + (min(passed_attempts, 5) / 5.0 * 0.3))

        if passed_attempts >= 3 and weighted_score >= 0.8:
            status = "MASTERED"
        elif passed_attempts >= 1:
            status = "COMPLETED"
        else:
            status = "IN_PROGRESS"

        self._data["concept_mastery"][concept_id] = {
            "concept_id": concept_id,
            "concept_name": concept_id.replace("-", " ").title(),
            "status": status,
            "mastery_score": round(weighted_score, 2),
            "evidence_count": passed_attempts,
            "attempts_count": total_attempts,
            "last_evaluated_at": time.time()
        }

    def get_progress(self) -> Dict[str, Any]:
        return self.get_learner_progress()

    def get_learner_progress(self) -> Dict[str, Any]:
        return {
            "learner_id": "default_learner",
            "completed_lessons": self._data["completed_lessons"],
            "exercise_attempts_count": len(self._data["exercise_attempts"]),
            "assessment_attempts_count": len(self._data["assessment_attempts"]),
            "concept_mastery": self._data["concept_mastery"],
            "last_active_lesson": self._data["last_active_lesson"],
            "hints_requested_count": self._data["hints_requested_count"],
            "mistakes_count": self._data["mistakes_count"]
        }

    def generate_hint(self, request: HintRequest, curriculum: List[Dict[str, Any]]) -> HintResponse:
        self._data["hints_requested_count"] += 1
        self._save()

        level = max(1, min(4, request.hint_level))
        lesson_id = request.lesson_id

        # Find target lesson title or concept
        title = "Quantum Concept Hint"
        for mod in curriculum:
            for les in mod.get("lessons", []):
                if les["id"] == lesson_id:
                    title = les["title"]
                    break

        if level == 1:
            content = f"Conceptual Guidance: Think about how quantum state vectors evolve under unitary transformations in {title}."
        elif level == 2:
            content = f"Gate/Operation Focus: Inspect gate matrix definitions and probability amplitudes for {title}."
        elif level == 3:
            content = f"Direct Execution Guidance: Check target qubit indices and statevector normalization (|α|² + |β|² = 1)."
        else: # level 4 (Final Explanation)
            content = f"Final Solution Explanation: Apply standard quantum circuit construction, measure qubits, and analyze pre-measurement probability distributions."

        return HintResponse(
            lesson_id=lesson_id,
            challenge_id=request.challenge_id,
            hint_level=level,
            title=f"Hint Level {level} — {title}",
            content=content,
            next_level_available=(level < 4)
        )

    def get_recommendations(self, curriculum: List[Dict[str, Any]]) -> List[Dict[str, Any]]:
        """
        Deterministic, explainable adaptive recommendation engine.
        Recommends next steps based on actual progress, recent scores, and mastery.
        """
        completed = set(self._data["completed_lessons"])
        mastery = self._data["concept_mastery"]
        recent_assessments = self._data["assessment_attempts"]

        recs: List[Dict[str, Any]] = []

        # Rule 1: Check for weak concepts / low assessment scores -> RETRY_LESSON or REVIEW_TOPIC
        if recent_assessments and recent_assessments[-1].get("score", 1.0) < 0.7:
            recs.append({
                "recommendation_type": "RETRY_LESSON",
                "target_id": self._data.get("last_active_lesson") or "les-1-1",
                "title": "Review Recent Concept",
                "reason": "Recommended because your recent assessment score was below 70%. Reviewing previous material will strengthen understanding.",
                "difficulty": "Beginner"
            })

        # Rule 2: Check for low mastery concepts -> REVIEW_TOPIC
        for cid, mrecord in mastery.items():
            if mrecord.get("mastery_score", 1.0) < 0.6:
                recs.append({
                    "recommendation_type": "REVIEW_TOPIC",
                    "target_id": cid,
                    "title": f"Review {mrecord.get('concept_name', cid)}",
                    "reason": f"Recommended because concept mastery for '{cid}' is currently below threshold ({mrecord.get('mastery_score')}).",
                    "difficulty": "Intermediate"
                })
                break

        # Rule 3: Recommend next uncompleted lesson whose prerequisites are met -> ADVANCE_TOPIC
        all_lessons = []
        for mod in curriculum:
            for les in mod.get("lessons", []):
                all_lessons.append(les)

        for les in all_lessons:
            prereqs = set(les.get("prerequisites", []))
            if les["id"] not in completed and prereqs.issubset(completed):
                recs.append({
                    "recommendation_type": "ADVANCE_TOPIC",
                    "target_id": les["id"],
                    "title": les["title"],
                    "reason": "Recommended because all prerequisites are met. You are ready to learn the next quantum concept.",
                    "difficulty": les.get("difficulty", "Beginner")
                })
                break

        # Rule 4: If all lessons in active module completed -> PRACTICE_CHALLENGE
        if not recs and all_lessons:
            recs.append({
                "recommendation_type": "PRACTICE_CHALLENGE",
                "target_id": "les-1-2",
                "title": "Quantum Lab Practice Challenge",
                "reason": "Recommended to deepen problem-solving skills in the Quantum Lab.",
                "difficulty": "Intermediate"
            })

        return recs

    def get_recommendation(self, curriculum: List[Dict[str, Any]]) -> Dict[str, Any]:
        recs = self.get_recommendations(curriculum)
        if recs:
            rec = recs[0]
            return {
                "recommended_lesson_id": rec["target_id"],
                "recommendation_type": rec["recommendation_type"],
                "title": rec["title"],
                "reason": rec["reason"],
                "difficulty": rec["difficulty"]
            }
        return {
            "recommended_lesson_id": None,
            "recommendation_type": "COMPLETE",
            "title": "Curriculum Complete",
            "reason": "Curriculum completed! Practice in the Quantum Lab.",
            "difficulty": "Advanced"
        }

# Global singleton store
learning_store = LearningStore()
