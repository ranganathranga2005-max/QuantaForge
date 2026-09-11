/**
 * Learning API Service
 * Interacts with backend /api/learning REST endpoints.
 */

import { get, post } from './api';

export async function fetchCurriculum() {
  try {
    const data = await get('/api/learning/curriculum');
    if (Array.isArray(data)) {
      return { modules: data, count: data.length };
    }
    return data;
  } catch (err) {
    console.warn('Failed to fetch curriculum from API, falling back to local structure', err);
    return null;
  }
}

export async function fetchLesson(lessonId) {
  try {
    return await get(`/api/learning/lessons/${lessonId}`);
  } catch (err) {
    console.warn(`Failed to fetch lesson ${lessonId}`, err);
    return null;
  }
}

export async function submitExercise(exerciseId, answer) {
  return await post(`/api/learning/exercises/${exerciseId}/submit`, { exercise_id: exerciseId, answer });
}

export async function submitChallenge(exerciseId, qast) {
  return await post(`/api/learning/challenges/${exerciseId}/submit`, {
    challenge_id: exerciseId,
    num_qubits: qast?.num_qubits || 2,
    operations: qast?.operations || [],
    qast
  });
}

export async function submitAssessment(assessmentId, answers) {
  return await post(`/api/learning/assessments/${assessmentId}/submit`, {
    assessment_id: assessmentId,
    answers
  });
}

export async function fetchProgress() {
  try {
    return await get('/api/learning/progress');
  } catch (err) {
    console.warn('Failed to fetch progress', err);
    return null;
  }
}

export async function fetchMastery() {
  try {
    return await get('/api/learning/mastery');
  } catch (err) {
    console.warn('Failed to fetch mastery', err);
    return null;
  }
}

export async function fetchRecommendations() {
  try {
    return await get('/api/learning/recommendations');
  } catch (err) {
    console.warn('Failed to fetch recommendations', err);
    return null;
  }
}
