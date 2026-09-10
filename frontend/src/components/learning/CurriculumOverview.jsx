import React from 'react';
import MasteryBadge from './MasteryBadge';

export default function CurriculumOverview({ modules, progress, mastery, onSelectLesson }) {
  if (!modules || modules.length === 0) {
    return (
      <div style={{ padding: '60px 40px', textAlign: 'center', color: 'var(--text-muted)' }}>
        Loading curriculum modules...
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div style={{ marginBottom: '50px' }}>
        <div style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--accent-secondary)', textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: '16px' }}>
          Structured Quantum Education Curriculum
        </div>
        <h1 style={{ fontSize: '3.5rem', marginBottom: '20px', letterSpacing: '-0.03em', color: 'var(--text-primary)' }}>
          Quantum Learning Paths
        </h1>
        <p style={{ fontSize: '1.2rem', color: 'var(--text-muted)', maxWidth: '720px', lineHeight: 1.6 }}>
          A rigorous sequence from foundational linear algebra & superposition to multi-qubit entanglement, dynamic measurements, quantum algorithms, parameters, noise mitigation, and fault tolerance.
        </p>
      </div>

      {/* Modules List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
        {modules.map((mod) => {
          const modProgress = progress?.completed_modules?.includes(mod.id);

          return (
            <div
              key={mod.id}
              style={{
                backgroundColor: 'var(--bg-panel)',
                border: '1px solid var(--border-subtle)',
                borderRadius: '12px',
                padding: '32px',
                transition: 'all 0.2s ease'
              }}
            >
              {/* Module Header */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px', flexWrap: 'wrap', gap: '16px' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                    <span style={{ fontSize: '0.8rem', fontWeight: 700, padding: '4px 10px', backgroundColor: 'rgba(139, 92, 246, 0.15)', color: 'var(--accent-primary)', borderRadius: '4px', border: '1px solid var(--accent-primary)' }}>
                      MODULE {mod.order || mod.id}
                    </span>
                    {modProgress && (
                      <span style={{ fontSize: '0.8rem', color: 'var(--gate-y)', fontWeight: 600 }}>✓ Completed</span>
                    )}
                  </div>
                  <h3 style={{ fontSize: '1.8rem', margin: 0, color: 'var(--text-primary)', fontWeight: 600 }}>
                    {mod.title}
                  </h3>
                  <p style={{ margin: '8px 0 0 0', color: 'var(--text-muted)', fontSize: '1rem', maxWidth: '650px' }}>
                    {mod.description}
                  </p>
                </div>
              </div>

              {/* Lessons in Module */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '16px', marginTop: '24px' }}>
                {(mod.lessons || []).map((les) => {
                  const isLessonDone = progress?.completed_lessons?.includes(les.id);
                  const conceptMastery = mastery?.concepts?.[les.concept_id];
                  const status = isLessonDone ? (conceptMastery?.mastery_status || 'COMPLETED') : (progress?.started_lessons?.includes(les.id) ? 'IN_PROGRESS' : 'NOT_STARTED');

                  return (
                    <div
                      key={les.id}
                      onClick={() => onSelectLesson(les.id)}
                      style={{
                        padding: '20px',
                        backgroundColor: 'var(--bg-primary)',
                        border: '1px solid var(--border-subtle)',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        display: 'flex',
                        flexDirection: 'column',
                        justify: 'space-between',
                        gap: '16px',
                        transition: 'all 0.2s ease'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.borderColor = 'var(--accent-secondary)';
                        e.currentTarget.style.transform = 'translateY(-2px)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.borderColor = 'var(--border-subtle)';
                        e.currentTarget.style.transform = 'translateY(0)';
                      }}
                    >
                      <div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{les.estimated_minutes || 15} min</span>
                          <MasteryBadge status={status} />
                        </div>
                        <h4 style={{ fontSize: '1.15rem', margin: '0 0 6px 0', color: 'var(--text-primary)', fontWeight: 500 }}>
                          {les.title}
                        </h4>
                        <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', margin: 0, lineHeight: 1.4, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                          {les.subtitle || les.description}
                        </p>
                      </div>

                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '12px', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
                        <span style={{ fontSize: '0.75rem', padding: '2px 8px', backgroundColor: 'var(--bg-panel)', borderRadius: '4px', color: 'var(--text-muted)', border: '1px solid var(--border-subtle)' }}>
                          {les.difficulty || 'FOUNDATIONAL'}
                        </span>
                        <span style={{ fontSize: '0.85rem', color: 'var(--accent-secondary)', fontWeight: 600 }}>
                          START LESSON →
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
