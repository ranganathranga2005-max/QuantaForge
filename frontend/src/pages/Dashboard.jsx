import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import QuantumBackground from '../components/layout/QuantumBackground';
import MasteryBadge from '../components/learning/MasteryBadge';
import { fetchProgress, fetchMastery, fetchRecommendations, fetchCurriculum } from '../services/learningApi';

export default function Dashboard() {
  const navigate = useNavigate();
  const [progress, setProgress] = useState(null);
  const [mastery, setMastery] = useState(null);
  const [recommendations, setRecommendations] = useState(null);
  const [modules, setModules] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadDashboardData() {
      setIsLoading(true);
      try {
        const [progData, mastData, recData, currData] = await Promise.all([
          fetchProgress(),
          fetchMastery(),
          fetchRecommendations(),
          fetchCurriculum()
        ]);
        if (progData) setProgress(progData);
        if (mastData) setMastery(mastData);
        if (recData) setRecommendations(recData);
        if (currData?.modules) setModules(currData.modules);
      } catch (err) {
        console.warn('Dashboard failed to load live learning data:', err);
      } finally {
        setIsLoading(false);
      }
    }
    loadDashboardData();
  }, []);

  const nextLesson = recommendations?.recommended_lessons?.[0];
  const conceptList = Object.entries(mastery?.concepts || {});
  const completedCount = progress?.completed_lessons?.length || 0;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100%', position: 'relative', backgroundColor: 'var(--bg-primary)' }}>
      <QuantumBackground />

      {/* Hero Command Center Header */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justify: 'space-between',
        padding: '60px 40px',
        borderBottom: '1px solid var(--border-subtle)',
        backgroundColor: 'rgba(5, 5, 10, 0.4)',
        flexWrap: 'wrap',
        gap: '40px'
      }}>
        {/* Left Hero */}
        <div style={{ maxWidth: '640px', zIndex: 2 }}>
          <div style={{ color: 'var(--accent-secondary)', fontWeight: 600, letterSpacing: '0.15em', marginBottom: '12px', fontSize: '0.85rem', textTransform: 'uppercase' }}>
            WELCOME BACK • STUDENT COMMAND CENTER
          </div>
          <h1 style={{ fontSize: '3.2rem', lineHeight: 1.1, marginBottom: '16px', letterSpacing: '-0.02em', color: 'var(--text-primary)' }}>
            Quantum Learning Dashboard
          </h1>
          <p style={{ fontSize: '1.1rem', color: 'var(--text-muted)', marginBottom: '28px', lineHeight: 1.5 }}>
            Continue your quantum learning journey. Build circuits, run statevector simulations, complete challenges, and track your topic mastery.
          </p>

          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
            <button className="btn btn-primary" style={{ padding: '14px 32px', fontSize: '0.95rem', letterSpacing: '0.05em' }} onClick={() => navigate('/learn')}>
              {completedCount > 0 ? 'CONTINUE LEARNING →' : 'START CURRICULUM →'}
            </button>
            <button className="btn" style={{ padding: '14px 32px', fontSize: '0.95rem', letterSpacing: '0.05em', backgroundColor: 'transparent', borderColor: 'var(--border-active)' }} onClick={() => navigate('/lab')}>
              OPEN QUANTUM LAB
            </button>
          </div>
        </div>

        {/* Right Hero: Recommended Next Step */}
        <div style={{ minWidth: '320px', maxWidth: '400px', zIndex: 2, flex: 1 }}>
          <div style={{
            border: '1px solid var(--border-active)',
            backgroundColor: 'var(--glass-bg)',
            backdropFilter: 'var(--glass-blur)',
            padding: '28px',
            borderRadius: '12px',
            boxShadow: 'var(--glow-cyan)'
          }}>
            <div style={{ fontSize: '0.75rem', color: 'var(--accent-secondary)', marginBottom: '10px', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 700 }}>
              RECOMMENDED NEXT STEP
            </div>
            {nextLesson ? (
              <div>
                <h3 style={{ fontSize: '1.3rem', color: 'var(--text-primary)', margin: '0 0 8px 0' }}>
                  {nextLesson.title || nextLesson.id}
                </h3>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '20px', lineHeight: 1.5 }}>
                  {nextLesson.reason}
                </p>
                <button
                  className="btn btn-primary"
                  style={{ width: '100%', padding: '12px', fontSize: '0.9rem' }}
                  onClick={() => navigate('/learn')}
                >
                  GO TO RECOMMENDED LESSON →
                </button>
              </div>
            ) : (
              <div>
                <h3 style={{ fontSize: '1.25rem', color: 'var(--text-primary)', margin: '0 0 8px 0' }}>
                  Module 01: Quantum Foundations
                </h3>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '20px' }}>
                  Explore qubits, statevector representation, and superposition.
                </p>
                <button
                  className="btn btn-primary"
                  style={{ width: '100%', padding: '12px', fontSize: '0.9rem' }}
                  onClick={() => navigate('/learn')}
                >
                  START LESSON 1 →
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Dashboard Content */}
      <div style={{ padding: '50px 40px', display: 'flex', flexDirection: 'column', gap: '40px', maxWidth: '1200px', width: '100%', margin: '0 auto' }}>
        
        {/* Learning Progress Overview */}
        <div>
          <h3 style={{ fontSize: '1.1rem', color: 'var(--text-muted)', margin: '0 0 20px 0', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
            Curriculum Progress
          </h3>

          {isLoading ? (
            <div style={{ padding: '32px', textAlign: 'center', color: 'var(--text-muted)' }}>Loading progress...</div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
              {modules.map((mod) => {
                const isModCompleted = progress?.completed_modules?.includes(mod.id);
                const completedInMod = (mod.lessons || []).filter(l => progress?.completed_lessons?.includes(l.id)).length;
                const totalInMod = mod.lessons?.length || 0;

                return (
                  <div
                    key={mod.id}
                    className="card"
                    style={{ cursor: 'pointer', backgroundColor: 'var(--glass-bg)', backdropFilter: 'var(--glass-blur)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}
                    onClick={() => navigate('/learn')}
                  >
                    <div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                        <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--accent-primary)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                          MODULE {mod.order || mod.id}
                        </span>
                        {isModCompleted ? (
                          <span style={{ fontSize: '0.8rem', color: 'var(--gate-y)', fontWeight: 600 }}>✓ Completed</span>
                        ) : (
                          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{completedInMod} / {totalInMod} Lessons</span>
                        )}
                      </div>
                      <h4 style={{ fontSize: '1.3rem', color: 'var(--text-primary)', margin: '0 0 8px 0' }}>{mod.title}</h4>
                      <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', margin: 0, lineHeight: 1.5 }}>{mod.description}</p>
                    </div>

                    <div style={{ marginTop: '20px', paddingTop: '14px', borderTop: '1px solid var(--border-subtle)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontSize: '0.85rem', color: 'var(--accent-secondary)', fontWeight: 600 }}>EXPLORE MODULE →</span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Concept Mastery Table */}
        <div>
          <h3 style={{ fontSize: '1.1rem', color: 'var(--text-muted)', margin: '0 0 20px 0', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
            Concept Mastery & Evidence Record
          </h3>

          <div style={{ backgroundColor: 'var(--bg-panel)', border: '1px solid var(--border-subtle)', borderRadius: '8px', overflow: 'hidden' }}>
            {conceptList.length === 0 ? (
              <div style={{ padding: '32px', textAlign: 'center', color: 'var(--text-muted)', fontStyle: 'italic' }}>
                Your learning activity will appear here after you begin a course.
              </div>
            ) : (
              <div style={{ width: '100%', overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                  <thead>
                    <tr style={{ backgroundColor: 'var(--bg-primary)', borderBottom: '1px solid var(--border-subtle)', color: 'var(--text-muted)', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                      <th style={{ padding: '16px 24px' }}>Concept</th>
                      <th style={{ padding: '16px 24px' }}>Mastery Status</th>
                      <th style={{ padding: '16px 24px' }}>Assessment Score</th>
                      <th style={{ padding: '16px 24px' }}>Exercise Attempts</th>
                    </tr>
                  </thead>
                  <tbody>
                    {conceptList.map(([conceptId, data]) => (
                      <tr key={conceptId} style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                        <td style={{ padding: '16px 24px', fontWeight: 600, color: 'var(--text-primary)', textTransform: 'capitalize' }}>
                          {conceptId.replace('_', ' ')}
                        </td>
                        <td style={{ padding: '16px 24px' }}>
                          <MasteryBadge status={data.mastery_status} />
                        </td>
                        <td style={{ padding: '16px 24px', color: 'var(--text-muted)', fontFamily: 'monospace' }}>
                          {data.assessment_score !== undefined ? `${data.assessment_score}%` : 'N/A'}
                        </td>
                        <td style={{ padding: '16px 24px', color: 'var(--text-muted)', fontFamily: 'monospace' }}>
                          {data.exercise_attempts_count || 0}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>

        {/* Quick Actions */}
        <div>
          <h3 style={{ fontSize: '1.1rem', color: 'var(--text-muted)', margin: '0 0 20px 0', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
            Quick Actions
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px' }}>
            <div className="card" style={{ cursor: 'pointer' }} onClick={() => navigate('/learn')}>
              <h4 style={{ fontSize: '1.2rem', color: 'var(--accent-secondary)', margin: '0 0 6px 0' }}>START LEARNING</h4>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', margin: 0 }}>Access structured lessons and step-by-step topics.</p>
            </div>
            <div className="card" style={{ cursor: 'pointer' }} onClick={() => navigate('/lab')}>
              <h4 style={{ fontSize: '1.2rem', color: 'var(--accent-primary)', margin: '0 0 6px 0' }}>OPEN QUANTUM LAB</h4>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', margin: 0 }}>Design custom circuits and run multi-backend simulations.</p>
            </div>
            <div className="card" style={{ cursor: 'pointer' }} onClick={() => navigate('/assessment')}>
              <h4 style={{ fontSize: '1.2rem', color: 'var(--gate-y)', margin: '0 0 6px 0' }}>TAKE ASSESSMENT</h4>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', margin: 0 }}>Evaluate your concept knowledge and solve circuit challenges.</p>
            </div>
            <div className="card" style={{ cursor: 'pointer' }} onClick={() => navigate('/profile')}>
              <h4 style={{ fontSize: '1.2rem', color: 'var(--text-primary)', margin: '0 0 6px 0' }}>STUDENT PROFILE</h4>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', margin: 0 }}>View account identity, settings, and full mastery record.</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
