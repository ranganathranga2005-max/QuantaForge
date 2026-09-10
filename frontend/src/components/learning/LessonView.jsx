import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PracticePanel from './PracticePanel';
import CircuitChallengePanel from './CircuitChallengePanel';
import AssessmentPanel from './AssessmentPanel';
import MasteryBadge from './MasteryBadge';

export default function LessonView({ lesson, mastery, onBack, onRefreshProgress }) {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('lesson'); // 'lesson' | 'practice' | 'assessment' | 'mastery'

  if (!lesson) return null;

  const conceptId = lesson.concept_id;
  const conceptMastery = mastery?.concepts?.[conceptId];

  // Try in Lab handler: pass visual gates preset in router state
  const handleTryInLab = () => {
    let preset = [];
    if (lesson.circuit_preset && lesson.circuit_preset.operations) {
      preset = lesson.circuit_preset.operations.map((op, idx) => ({
        id: Math.random().toString(),
        gate: op.gate,
        qubit: op.qubits ? op.qubits[0] : 0,
        control: op.qubits && op.qubits.length > 1 ? op.qubits[0] : undefined,
        target: op.qubits && op.qubits.length > 1 ? op.qubits[1] : undefined,
        col: idx + 1,
        parameters: op.parameters
      }));
    } else {
      // Default Hadamard preset if none specified
      preset = [{ id: '1', gate: 'H', qubit: 0, col: 1 }];
    }

    navigate('/lab', { state: { preset } });
  };

  // Watch Process handler: pass preset + auto execute
  const handleWatchProcess = () => {
    let preset = [];
    if (lesson.circuit_preset && lesson.circuit_preset.operations) {
      preset = lesson.circuit_preset.operations.map((op, idx) => ({
        id: Math.random().toString(),
        gate: op.gate,
        qubit: op.qubits ? op.qubits[0] : 0,
        control: op.qubits && op.qubits.length > 1 ? op.qubits[0] : undefined,
        target: op.qubits && op.qubits.length > 1 ? op.qubits[1] : undefined,
        col: idx + 1,
        parameters: op.parameters
      }));
    } else {
      preset = [{ id: '1', gate: 'H', qubit: 0, col: 1 }];
    }

    navigate('/lab', { state: { preset, autoExecute: true } });
  };

  return (
    <div style={{ animation: 'fadeIn 0.3s ease' }}>
      {/* Navigation Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
        <button className="btn" onClick={onBack} style={{ fontSize: '0.85rem' }}>
          ← Back to Curriculum
        </button>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Lesson Concept: {conceptId}</span>
          <MasteryBadge status={conceptMastery?.mastery_status || 'NOT_STARTED'} score={conceptMastery?.assessment_score} />
        </div>
      </div>

      {/* Lesson Title Header */}
      <div style={{ marginBottom: '40px' }}>
        <div style={{ display: 'flex', gap: '12px', marginBottom: '16px' }}>
          <span style={{ fontSize: '0.8rem', padding: '4px 10px', backgroundColor: 'rgba(139, 92, 246, 0.12)', color: 'var(--accent-primary)', borderRadius: '4px', border: '1px solid rgba(139, 92, 246, 0.3)', fontWeight: 600 }}>
            {lesson.module_id?.toUpperCase()}
          </span>
          <span style={{ fontSize: '0.8rem', padding: '4px 10px', backgroundColor: 'var(--bg-hover)', color: 'var(--text-muted)', borderRadius: '4px', border: '1px solid var(--border-subtle)' }}>
            {lesson.difficulty || 'FOUNDATIONAL'}
          </span>
          <span style={{ fontSize: '0.8rem', padding: '4px 10px', backgroundColor: 'var(--bg-hover)', color: 'var(--text-muted)', borderRadius: '4px', border: '1px solid var(--border-subtle)' }}>
            {lesson.estimated_minutes || 15} MIN READ
          </span>
        </div>
        <h1 style={{ fontSize: '3.2rem', margin: '0 0 12px 0', letterSpacing: '-0.03em', color: 'var(--text-primary)' }}>
          {lesson.title}
        </h1>
        {lesson.subtitle && (
          <p style={{ fontSize: '1.25rem', color: 'var(--text-muted)', margin: 0, lineHeight: 1.6 }}>
            {lesson.subtitle}
          </p>
        )}
      </div>

      {/* Section Navigation Tabs */}
      <div style={{ display: 'flex', gap: '8px', borderBottom: '1px solid var(--border-subtle)', marginBottom: '40px' }}>
        {[
          { id: 'lesson', label: '1. LESSON CONTENT' },
          { id: 'practice', label: `2. PRACTICE (${(lesson.exercises || []).length})` },
          { id: 'assessment', label: '3. ASSESSMENT' },
          { id: 'mastery', label: '4. MASTERY EVIDENCE' }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            style={{
              padding: '14px 20px',
              backgroundColor: 'transparent',
              border: 'none',
              borderBottom: activeTab === tab.id ? '2px solid var(--accent-secondary)' : '2px solid transparent',
              color: activeTab === tab.id ? 'var(--accent-secondary)' : 'var(--text-muted)',
              fontWeight: 600,
              fontSize: '0.9rem',
              cursor: 'pointer',
              letterSpacing: '0.05em',
              transition: 'all 0.2s ease'
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* TAB 1: LESSON CONTENT */}
      {activeTab === 'lesson' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
          {/* Objectives */}
          {lesson.learning_objectives && lesson.learning_objectives.length > 0 && (
            <div style={{ padding: '32px', backgroundColor: 'var(--bg-panel)', borderRadius: '8px', border: '1px solid var(--border-subtle)' }}>
              <h3 style={{ margin: '0 0 20px 0', color: 'var(--accent-secondary)', fontSize: '0.95rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                Measurable Learning Objectives
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {lesson.learning_objectives.map((obj, idx) => (
                  <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', color: 'var(--text-primary)', fontSize: '1.05rem', lineHeight: 1.6 }}>
                    <span style={{ color: 'var(--accent-secondary)', fontWeight: 'bold' }}>✓</span>
                    <span>{obj}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Concept Explanation */}
          <div>
            <h3 style={{ fontSize: '1.5rem', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '12px', marginBottom: '20px', color: 'var(--text-primary)' }}>
              Concept
            </h3>
            <div style={{ fontSize: '1.15rem', lineHeight: '1.8', color: 'var(--text-muted)', whiteSpace: 'pre-line' }}>
              {lesson.concept_text || lesson.content}
            </div>
          </div>

          {/* Intuition */}
          {lesson.intuition_text && (
            <div style={{ padding: '32px', backgroundColor: 'rgba(139, 92, 246, 0.06)', borderRadius: '8px', borderLeft: '4px solid var(--accent-primary)' }}>
              <h3 style={{ margin: '0 0 16px 0', color: 'var(--accent-primary)', fontSize: '1.1rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                Intuition & Physical Interpretation
              </h3>
              <div style={{ fontSize: '1.1rem', lineHeight: 1.7, color: 'var(--text-primary)' }}>
                {lesson.intuition_text}
              </div>
            </div>
          )}

          {/* Mathematics */}
          {lesson.mathematics_text && (
            <div>
              <h3 style={{ fontSize: '1.5rem', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '12px', marginBottom: '20px', color: 'var(--text-primary)' }}>
                Mathematical Formalism
              </h3>
              <div style={{ padding: '24px', backgroundColor: '#07090E', borderRadius: '8px', border: '1px solid var(--border-subtle)', fontFamily: 'monospace', fontSize: '1.1rem', color: '#e2e8f0', lineHeight: 1.8 }}>
                {lesson.mathematics_text}
              </div>
            </div>
          )}

          {/* Interactive Circuit & Simulation Launcher */}
          <div style={{ padding: '40px', backgroundColor: 'var(--bg-panel)', borderRadius: '12px', border: '1px solid var(--border-active)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '16px' }}>
              <div>
                <span style={{ fontSize: '0.8rem', color: 'var(--accent-secondary)', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 600 }}>
                  Interactive Quantum Simulation
                </span>
                <h3 style={{ fontSize: '1.8rem', margin: '6px 0 0 0', color: 'var(--text-primary)' }}>
                  Execute Lesson Circuit in Quantum Lab
                </h3>
              </div>
              <div style={{ display: 'flex', gap: '16px' }}>
                <button className="btn btn-primary" onClick={handleTryInLab} style={{ padding: '14px 28px', fontSize: '0.95rem' }}>
                  TRY IN LAB →
                </button>
                <button className="btn" onClick={handleWatchProcess} style={{ padding: '14px 28px', fontSize: '0.95rem', borderColor: 'var(--accent-secondary)', color: 'var(--accent-secondary)' }}>
                  WATCH PROCESS →
                </button>
              </div>
            </div>

            <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem', lineHeight: 1.6, marginBottom: '24px' }}>
              This circuit will be executed using the genuine custom backend simulator and statevector process viewer.
            </p>

            {lesson.circuit_preset && (
              <div style={{ padding: '20px', backgroundColor: '#07090E', borderRadius: '6px', border: '1px solid var(--border-subtle)', fontFamily: 'monospace', fontSize: '0.95rem', color: 'var(--accent-secondary)' }}>
                <div style={{ marginBottom: '8px', color: 'var(--text-muted)' }}>Circuit Operations Preset:</div>
                <pre style={{ margin: 0 }}>{JSON.stringify(lesson.circuit_preset, null, 2)}</pre>
              </div>
            )}
          </div>

          {/* Key Takeaway */}
          {lesson.takeaway && (
            <div style={{ padding: '24px', backgroundColor: 'rgba(6, 182, 212, 0.08)', borderRadius: '8px', borderLeft: '4px solid var(--accent-secondary)' }}>
              <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--accent-secondary)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '8px' }}>
                Key Takeaway
              </div>
              <div style={{ fontSize: '1.15rem', fontWeight: 500, color: 'var(--text-primary)', lineHeight: 1.6 }}>
                {lesson.takeaway}
              </div>
            </div>
          )}

          {/* Action to Practice */}
          <div style={{ textAlign: 'center', padding: '40px 0', borderTop: '1px solid var(--border-subtle)' }}>
            <button className="btn btn-primary" onClick={() => setActiveTab('practice')} style={{ padding: '16px 40px', fontSize: '1.1rem' }}>
              CONTINUE TO PRACTICE EXERCISES →
            </button>
          </div>
        </div>
      )}

      {/* TAB 2: PRACTICE */}
      {activeTab === 'practice' && (
        <div>
          <h3 style={{ fontSize: '1.8rem', marginBottom: '24px', color: 'var(--text-primary)' }}>
            Concept Practice & Interactive Verification
          </h3>

          {/* Standard Exercises */}
          <PracticePanel
            exercises={lesson.exercises}
            onAttemptCompleted={() => onRefreshProgress && onRefreshProgress()}
          />

          {/* Circuit Challenge if available */}
          {lesson.circuit_challenge && (
            <div style={{ marginTop: '40px' }}>
              <h3 style={{ fontSize: '1.8rem', marginBottom: '24px', color: 'var(--text-primary)' }}>
                Circuit Construction Challenge
              </h3>
              <CircuitChallengePanel
                exercise={lesson.circuit_challenge}
                onCompleted={() => onRefreshProgress && onRefreshProgress()}
              />
            </div>
          )}
        </div>
      )}

      {/* TAB 3: ASSESSMENT */}
      {activeTab === 'assessment' && (
        <AssessmentPanel
          assessment={lesson.assessment}
          onCompleted={() => onRefreshProgress && onRefreshProgress()}
        />
      )}

      {/* TAB 4: MASTERY EVIDENCE */}
      {activeTab === 'mastery' && (
        <div style={{ padding: '40px', backgroundColor: 'var(--bg-panel)', borderRadius: '8px', border: '1px solid var(--border-subtle)' }}>
          <h3 style={{ fontSize: '1.8rem', marginBottom: '16px', color: 'var(--text-primary)' }}>
            Concept Mastery & Evidence Record
          </h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem', lineHeight: 1.6, marginBottom: '32px' }}>
            Mastery is determined by transparent, server-side rule-based scoring derived from exercise attempts and formal assessment scores.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px', marginBottom: '32px' }}>
            <div style={{ padding: '24px', backgroundColor: 'var(--bg-primary)', borderRadius: '8px', border: '1px solid var(--border-subtle)' }}>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Status</div>
              <div style={{ margin: '8px 0 0 0' }}>
                <MasteryBadge status={conceptMastery?.mastery_status || 'NOT_STARTED'} />
              </div>
            </div>

            <div style={{ padding: '24px', backgroundColor: 'var(--bg-primary)', borderRadius: '8px', border: '1px solid var(--border-subtle)' }}>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Assessment Score</div>
              <div style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--accent-secondary)', margin: '4px 0 0 0' }}>
                {conceptMastery?.assessment_score !== undefined ? `${conceptMastery.assessment_score}%` : 'N/A'}
              </div>
            </div>

            <div style={{ padding: '24px', backgroundColor: 'var(--bg-primary)', borderRadius: '8px', border: '1px solid var(--border-subtle)' }}>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Exercise Success</div>
              <div style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--accent-primary)', margin: '4px 0 0 0' }}>
                {conceptMastery?.exercise_attempts_count || 0} Attempts
              </div>
            </div>
          </div>

          {(!conceptMastery || conceptMastery.mastery_status === 'NOT_STARTED') && (
            <div style={{ padding: '20px', backgroundColor: 'rgba(255, 255, 255, 0.03)', borderRadius: '6px', border: '1px solid var(--border-subtle)', color: 'var(--text-muted)', fontStyle: 'italic' }}>
              No learning evidence recorded yet for concept {conceptId}. Complete practice exercises and the lesson assessment to generate evidence.
            </div>
          )}
        </div>
      )}
    </div>
  );
}
