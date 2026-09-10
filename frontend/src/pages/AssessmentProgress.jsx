import React, { useState, useEffect } from 'react';
import MasteryBadge from '../components/learning/MasteryBadge';
import CircuitChallengePanel from '../components/learning/CircuitChallengePanel';
import { fetchProgress, fetchMastery, fetchCurriculum, submitAssessment } from '../services/learningApi';

export default function AssessmentProgress() {
  const [activeTab, setActiveTab] = useState('overview'); // 'overview' | 'quizzes' | 'challenges' | 'performance' | 'mastery' | 'activity'
  
  const [progress, setProgress] = useState(null);
  const [mastery, setMastery] = useState(null);
  const [modules, setModules] = useState([]);
  const [challenges, setChallenges] = useState([]);
  const [selectedChallenge, setSelectedChallenge] = useState(null);
  const [completedChallenges, setCompletedChallenges] = useState({});

  // Active quiz state
  const [activeQuiz, setActiveQuiz] = useState(null);
  const [quizAnswers, setQuizAnswers] = useState({});
  const [quizResult, setQuizResult] = useState(null);
  const [isSubmittingQuiz, setIsSubmittingQuiz] = useState(false);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      setIsLoading(true);
      try {
        const [progData, mastData, currData] = await Promise.all([
          fetchProgress(),
          fetchMastery(),
          fetchCurriculum()
        ]);
        if (progData) setProgress(progData);
        if (mastData) setMastery(mastData);
        if (currData?.modules) {
          setModules(currData.modules);
          
          // Extract circuit challenges from curriculum
          const extracted = [];
          let foundQuiz = null;

          currData.modules.forEach(mod => {
            (mod.lessons || []).forEach(les => {
              if (les.circuit_challenge) {
                extracted.push({
                  ...les.circuit_challenge,
                  lesson_title: les.title,
                  module_title: mod.title,
                  module_id: mod.id,
                  category: mod.title.includes('Entanglement') ? 'ENTANGLEMENT' : (mod.title.includes('Foundations') ? 'FOUNDATIONS' : 'ALGORITHMS')
                });
              }
              if (!foundQuiz && les.assessment) {
                foundQuiz = les.assessment;
              }
            });
          });
          
          if (extracted.length === 0) {
            extracted.push(
              {
                id: 'challenge_x_state',
                question: 'Construct a 1-qubit circuit that transforms initial state |0⟩ into target state |1⟩.',
                target_description: 'Target: P(|1⟩) ≥ 0.99 using a single Pauli-X gate.',
                difficulty: 'FOUNDATIONAL',
                category: 'FOUNDATIONS',
                concept_id: 'state_preparation',
                lesson_title: 'State Preparation'
              },
              {
                id: 'challenge_bell_state',
                question: 'Construct a 2-qubit Bell state circuit generating maximum entanglement |Φ⁺⟩ = 1/√2(|00⟩ + |11⟩).',
                target_description: 'Target: P(|00⟩) ≥ 0.45 and P(|11⟩) ≥ 0.45 with P(|01⟩) = 0.',
                difficulty: 'INTERMEDIATE',
                category: 'ENTANGLEMENT',
                concept_id: 'bell_state',
                lesson_title: 'Bell States'
              }
            );
          }
          setChallenges(extracted);
          if (foundQuiz) setActiveQuiz(foundQuiz);
        }
      } catch (err) {
        console.warn('Failed to load assessment & progress data:', err);
      } finally {
        setIsLoading(false);
      }
    }
    loadData();
  }, []);

  const conceptList = Object.entries(mastery?.concepts || {});
  const completedLessonsCount = progress?.completed_lessons?.length || 0;
  const totalLessonsCount = modules.reduce((acc, m) => acc + (m.lessons?.length || 0), 0);

  const handleChallengeCompleted = (chId, result) => {
    if (result && result.passed) {
      setCompletedChallenges(prev => ({ ...prev, [chId]: true }));
      fetchProgress().then(p => p && setProgress(p));
      fetchMastery().then(m => m && setMastery(m));
    }
  };

  const handleQuizSubmit = async (e) => {
    if (e) e.preventDefault();
    if (!activeQuiz) return;
    setIsSubmittingQuiz(true);
    try {
      const res = await submitAssessment(activeQuiz.id || 'assessment_foundation', quizAnswers);
      setQuizResult(res);
      fetchProgress().then(p => p && setProgress(p));
      fetchMastery().then(m => m && setMastery(m));
    } catch (err) {
      console.error('Quiz submission error:', err);
    } finally {
      setIsSubmittingQuiz(false);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', overflowY: 'auto', backgroundColor: 'var(--bg-primary)' }}>
      {/* Workspace Header */}
      <div className="workspace-header" style={{ borderBottom: '1px solid var(--border-subtle)', padding: '24px 40px', backgroundColor: 'var(--bg-panel)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <div style={{ fontSize: '0.8rem', color: 'var(--accent-secondary)', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '4px' }}>
              Deliverable 5 • Evaluation Engine
            </div>
            <h1 style={{ margin: 0, fontSize: '2.2rem', color: 'var(--text-primary)', letterSpacing: '-0.02em' }}>
              Assessment & Progress Command Center
            </h1>
          </div>

          {/* Navigation Tabs */}
          <div style={{ display: 'flex', gap: '6px', backgroundColor: 'var(--bg-primary)', padding: '4px', borderRadius: '8px', border: '1px solid var(--border-subtle)' }}>
            {[
              { id: 'overview', label: 'Overview' },
              { id: 'quizzes', label: 'Quizzes' },
              { id: 'challenges', label: 'Challenges' },
              { id: 'performance', label: 'Performance' },
              { id: 'mastery', label: 'Mastery' },
              { id: 'activity', label: 'Activity' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => { setActiveTab(tab.id); setSelectedChallenge(null); }}
                style={{
                  padding: '8px 16px',
                  borderRadius: '6px',
                  border: 'none',
                  fontSize: '0.85rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  backgroundColor: activeTab === tab.id ? 'var(--accent-primary)' : 'transparent',
                  color: activeTab === tab.id ? '#0b1120' : 'var(--text-muted)',
                  transition: 'all 0.2s ease'
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="workspace-content" style={{ maxWidth: '1140px', margin: '0 auto', width: '100%', padding: '40px' }}>
        
        {isLoading ? (
          <div style={{ padding: '60px 0', textAlign: 'center', color: 'var(--text-muted)' }}>
            Loading Learner Assessment & Progress Records...
          </div>
        ) : (
          <>
            {/* OVERVIEW TAB */}
            {activeTab === 'overview' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
                {/* Metric Summary Cards */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px' }}>
                  <div style={{ padding: '24px', backgroundColor: 'var(--bg-panel)', border: '1px solid var(--border-subtle)', borderRadius: '10px' }}>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '8px' }}>
                      Completed Lessons
                    </div>
                    <div style={{ fontSize: '2.4rem', fontWeight: 700, color: 'var(--accent-secondary)', fontFamily: 'monospace' }}>
                      {completedLessonsCount} <span style={{ fontSize: '1rem', color: 'var(--text-muted)' }}>/ {totalLessonsCount}</span>
                    </div>
                  </div>

                  <div style={{ padding: '24px', backgroundColor: 'var(--bg-panel)', border: '1px solid var(--border-subtle)', borderRadius: '10px' }}>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '8px' }}>
                      Challenge Success Rate
                    </div>
                    <div style={{ fontSize: '2.4rem', fontWeight: 700, color: 'var(--gate-y)', fontFamily: 'monospace' }}>
                      {Object.keys(completedChallenges).length} <span style={{ fontSize: '1rem', color: 'var(--text-muted)' }}>solved</span>
                    </div>
                  </div>

                  <div style={{ padding: '24px', backgroundColor: 'var(--bg-panel)', border: '1px solid var(--border-subtle)', borderRadius: '10px' }}>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '8px' }}>
                      Mastered Concepts
                    </div>
                    <div style={{ fontSize: '2.4rem', fontWeight: 700, color: 'var(--accent-primary)', fontFamily: 'monospace' }}>
                      {mastery?.total_mastered || 0}
                    </div>
                  </div>

                  <div style={{ padding: '24px', backgroundColor: 'var(--bg-panel)', border: '1px solid var(--border-subtle)', borderRadius: '10px' }}>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '8px' }}>
                      Average Score
                    </div>
                    <div style={{ fontSize: '2.4rem', fontWeight: 700, color: 'var(--text-primary)', fontFamily: 'monospace' }}>
                      {mastery?.average_score !== undefined ? `${Math.round(mastery.average_score)}%` : 'N/A'}
                    </div>
                  </div>
                </div>

                {/* Quick Action Cards */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px' }}>
                  <div className="card" style={{ cursor: 'pointer' }} onClick={() => setActiveTab('quizzes')}>
                    <div style={{ fontSize: '0.75rem', color: 'var(--accent-secondary)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '8px' }}>
                      CONCEPT EVALUATION
                    </div>
                    <h3 style={{ fontSize: '1.4rem', color: 'var(--text-primary)', margin: '0 0 8px 0' }}>Interactive Quizzes</h3>
                    <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', margin: 0, lineHeight: 1.5 }}>
                      Test your understanding of superposition, gate matrices, and quantum state vector properties with automated grading.
                    </p>
                    <div style={{ marginTop: '16px', fontSize: '0.85rem', color: 'var(--accent-secondary)', fontWeight: 600 }}>
                      TAKE QUIZ →
                    </div>
                  </div>

                  <div className="card" style={{ cursor: 'pointer' }} onClick={() => setActiveTab('challenges')}>
                    <div style={{ fontSize: '0.75rem', color: 'var(--accent-primary)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '8px' }}>
                      PRACTICAL BENCHMARKING
                    </div>
                    <h3 style={{ fontSize: '1.4rem', color: 'var(--text-primary)', margin: '0 0 8px 0' }}>Circuit Challenges</h3>
                    <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', margin: 0, lineHeight: 1.5 }}>
                      Construct quantum circuits that satisfy strict statevector and probability targets evaluated live on the NumPy simulator.
                    </p>
                    <div style={{ marginTop: '16px', fontSize: '0.85rem', color: 'var(--accent-primary)', fontWeight: 600 }}>
                      VIEW CHALLENGES →
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* QUIZZES TAB */}
            {activeTab === 'quizzes' && (
              <div style={{ backgroundColor: 'var(--bg-panel)', border: '1px solid var(--border-subtle)', borderRadius: '12px', padding: '32px' }}>
                <div style={{ marginBottom: '24px', borderBottom: '1px solid var(--border-subtle)', pb: '16px' }}>
                  <div style={{ fontSize: '0.8rem', color: 'var(--accent-secondary)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                    Automated Quiz Engine
                  </div>
                  <h2 style={{ fontSize: '1.8rem', color: 'var(--text-primary)', margin: '4px 0 8px 0' }}>
                    {activeQuiz?.title || 'Foundational Quantum Computing Quiz'}
                  </h2>
                  <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)', margin: 0 }}>
                    Correct answers are evaluated server-side upon submission. No answers are exposed prior to submission.
                  </p>
                </div>

                {quizResult ? (
                  <div style={{ padding: '32px', backgroundColor: 'var(--bg-primary)', border: '1px solid var(--border-active)', borderRadius: '10px', textAlign: 'center' }}>
                    <h3 style={{ fontSize: '1.6rem', color: quizResult.passed ? 'var(--gate-y)' : 'var(--gate-x)', margin: '0 0 12px 0' }}>
                      {quizResult.passed ? '✓ Assessment Passed!' : 'Assessment Attempt Recorded'}
                    </h3>
                    <p style={{ fontSize: '1.1rem', color: 'var(--text-primary)', marginBottom: '20px' }}>
                      Final Score: <strong>{Math.round(quizResult.score * 100)}%</strong> ({quizResult.correct_count} of {quizResult.total_questions} correct)
                    </p>

                    {quizResult.explanation_map && (
                      <div style={{ textAlign: 'left', marginTop: '24px', paddingTop: '20px', borderTop: '1px solid var(--border-subtle)' }}>
                        <h4 style={{ fontSize: '1rem', color: 'var(--accent-secondary)', marginBottom: '12px' }}>Explanations & Feedback:</h4>
                        {Object.entries(quizResult.explanation_map).map(([qid, exp]) => (
                          <div key={qid} style={{ padding: '12px', backgroundColor: 'var(--bg-panel)', borderRadius: '6px', marginBottom: '8px', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                            <strong style={{ color: 'var(--text-primary)' }}>{qid}:</strong> {exp}
                          </div>
                        ))}
                      </div>
                    )}

                    <button
                      className="btn btn-primary"
                      style={{ marginTop: '24px', padding: '12px 28px' }}
                      onClick={() => { setQuizResult(null); setQuizAnswers({}); }}
                    >
                      RETRY QUIZ
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleQuizSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                    {(activeQuiz?.questions || [
                      {
                        id: 'q1',
                        question: 'What is the state vector representation of basis state |0⟩?',
                        options: ['[1, 0]ᵀ', '[0, 1]ᵀ', '[1, 1]ᵀ', '[1/√2, 1/√2]ᵀ']
                      },
                      {
                        id: 'q2',
                        question: 'What effect does applying a Hadamard (H) gate to state |0⟩ produce?',
                        options: ['Equal Superposition 1/√2(|0⟩ + |1⟩)', 'Flips state to |1⟩', 'Resets state to |0⟩', 'Phase shift of π']
                      }
                    ]).map((q, qIdx) => (
                      <div key={q.id || qIdx} style={{ padding: '20px', backgroundColor: 'var(--bg-primary)', border: '1px solid var(--border-subtle)', borderRadius: '8px' }}>
                        <div style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '12px' }}>
                          Q{qIdx + 1}. {q.question}
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                          {q.options.map((opt, oIdx) => (
                            <label
                              key={oIdx}
                              style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '12px',
                                padding: '10px 14px',
                                backgroundColor: quizAnswers[q.id || `q${qIdx+1}`] === oIdx ? 'rgba(6, 182, 212, 0.15)' : 'var(--bg-panel)',
                                border: quizAnswers[q.id || `q${qIdx+1}`] === oIdx ? '1px solid var(--accent-secondary)' : '1px solid var(--border-subtle)',
                                borderRadius: '6px',
                                cursor: 'pointer',
                                fontSize: '0.9rem',
                                color: 'var(--text-primary)'
                              }}
                            >
                              <input
                                type="radio"
                                name={q.id || `q${qIdx+1}`}
                                checked={quizAnswers[q.id || `q${qIdx+1}`] === oIdx}
                                onChange={() => setQuizAnswers(prev => ({ ...prev, [q.id || `q${qIdx+1}`]: oIdx }))}
                              />
                              <span>{opt}</span>
                            </label>
                          ))}
                        </div>
                      </div>
                    ))}

                    <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                      <button
                        type="submit"
                        disabled={isSubmittingQuiz}
                        className="btn btn-primary"
                        style={{ padding: '12px 32px' }}
                      >
                        {isSubmittingQuiz ? 'Evaluating...' : 'SUBMIT QUIZ FOR EVALUATION'}
                      </button>
                    </div>
                  </form>
                )}
              </div>
            )}

            {/* CHALLENGES TAB */}
            {activeTab === 'challenges' && (
              <div>
                {selectedChallenge ? (
                  <div>
                    <button
                      className="btn"
                      onClick={() => setSelectedChallenge(null)}
                      style={{ marginBottom: '20px', fontSize: '0.85rem' }}
                    >
                      ← Back to Challenges List
                    </button>

                    <div style={{ padding: '24px', backgroundColor: 'var(--bg-panel)', border: '1px solid var(--border-active)', borderRadius: '12px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                        <div>
                          <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--accent-secondary)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                            {selectedChallenge.difficulty || 'FOUNDATIONAL'} CHALLENGE
                          </span>
                          <h2 style={{ fontSize: '1.6rem', color: 'var(--text-primary)', margin: '4px 0 0 0' }}>
                            {selectedChallenge.lesson_title || selectedChallenge.id}
                          </h2>
                        </div>
                        {completedChallenges[selectedChallenge.id] && (
                          <span style={{ padding: '6px 12px', backgroundColor: 'rgba(16, 185, 129, 0.15)', color: 'var(--gate-y)', border: '1px solid var(--gate-y)', borderRadius: '6px', fontSize: '0.85rem', fontWeight: 700 }}>
                            SOLVED ✓
                          </span>
                        )}
                      </div>

                      <CircuitChallengePanel
                        exercise={selectedChallenge}
                        onCompleted={(res) => handleChallengeCompleted(selectedChallenge.id, res)}
                      />
                    </div>
                  </div>
                ) : (
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '20px' }}>
                    {challenges.map(ch => {
                      const isPassed = completedChallenges[ch.id];
                      return (
                        <div
                          key={ch.id}
                          className="card"
                          style={{ cursor: 'pointer', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}
                          onClick={() => setSelectedChallenge(ch)}
                        >
                          <div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                              <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--accent-secondary)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                                {ch.difficulty || 'FOUNDATIONAL'}
                              </span>
                              {isPassed ? (
                                <span style={{ color: 'var(--gate-y)', fontSize: '0.85rem', fontWeight: 600 }}>✓ Solved</span>
                              ) : (
                                <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem', fontFamily: 'monospace' }}>
                                  {ch.concept_id}
                                </span>
                              )}
                            </div>
                            <h3 style={{ fontSize: '1.25rem', color: 'var(--text-primary)', margin: '0 0 8px 0' }}>
                              {ch.question || ch.lesson_title}
                            </h3>
                            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', margin: 0, lineHeight: 1.5 }}>
                              {ch.target_description}
                            </p>
                          </div>

                          <div style={{ marginTop: '20px', paddingTop: '12px', borderTop: '1px solid var(--border-subtle)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{ch.module_title || 'Module'}</span>
                            <span style={{ fontSize: '0.85rem', color: 'var(--accent-primary)', fontWeight: 600 }}>
                              START CHALLENGE →
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            )}

            {/* PERFORMANCE TAB */}
            {activeTab === 'performance' && (
              <div style={{ backgroundColor: 'var(--bg-panel)', border: '1px solid var(--border-subtle)', borderRadius: '12px', padding: '32px' }}>
                <h3 style={{ fontSize: '1.2rem', color: 'var(--text-primary)', margin: '0 0 16px 0' }}>
                  Learner Performance & Scoring Breakdown
                </h3>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '24px' }}>
                  Empirical analytics derived from actual quiz submissions, exercise evaluations, and circuit challenge attempts.
                </p>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
                  <div style={{ padding: '20px', backgroundColor: 'var(--bg-primary)', borderRadius: '8px', border: '1px solid var(--border-subtle)' }}>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '6px' }}>Lesson Completion</div>
                    <div style={{ fontSize: '1.8rem', fontWeight: 700, color: 'var(--accent-secondary)' }}>
                      {Math.round((completedLessonsCount / Math.max(1, totalLessonsCount)) * 100)}%
                    </div>
                  </div>

                  <div style={{ padding: '20px', backgroundColor: 'var(--bg-primary)', borderRadius: '8px', border: '1px solid var(--border-subtle)' }}>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '6px' }}>Assessments Solved</div>
                    <div style={{ fontSize: '1.8rem', fontWeight: 700, color: 'var(--gate-y)' }}>
                      {Object.keys(completedChallenges).length} Challenges
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* MASTERY TAB */}
            {activeTab === 'mastery' && (
              <div style={{ backgroundColor: 'var(--bg-panel)', border: '1px solid var(--border-subtle)', borderRadius: '12px', padding: '32px' }}>
                <h3 style={{ fontSize: '1.2rem', color: 'var(--text-primary)', margin: '0 0 20px 0' }}>
                  Topic Mastery & Concept Evidence Record
                </h3>

                {conceptList.length === 0 ? (
                  <div style={{ padding: '32px', textAlign: 'center', color: 'var(--text-muted)', fontStyle: 'italic' }}>
                    No learning activity recorded yet. Complete lessons and assessments to establish mastery evidence.
                  </div>
                ) : (
                  <div style={{ width: '100%', overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                      <thead>
                        <tr style={{ backgroundColor: 'var(--bg-primary)', borderBottom: '1px solid var(--border-subtle)', color: 'var(--text-muted)', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                          <th style={{ padding: '16px 24px' }}>Concept</th>
                          <th style={{ padding: '16px 24px' }}>Status</th>
                          <th style={{ padding: '16px 24px' }}>Score</th>
                          <th style={{ padding: '16px 24px' }}>Attempts</th>
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
            )}

            {/* ACTIVITY TAB */}
            {activeTab === 'activity' && (
              <div style={{ backgroundColor: 'var(--bg-panel)', border: '1px solid var(--border-subtle)', borderRadius: '12px', padding: '32px' }}>
                <h3 style={{ fontSize: '1.2rem', color: 'var(--text-primary)', margin: '0 0 16px 0' }}>
                  Recent Student Learning Activity
                </h3>

                {completedLessonsCount === 0 && Object.keys(completedChallenges).length === 0 ? (
                  <div style={{ padding: '32px', textAlign: 'center', color: 'var(--text-muted)', fontStyle: 'italic' }}>
                    No learning activity recorded yet.
                  </div>
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {(progress?.completed_lessons || []).map((lesId, idx) => (
                      <div key={idx} style={{ padding: '12px 16px', backgroundColor: 'var(--bg-primary)', borderRadius: '6px', border: '1px solid var(--border-subtle)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ color: 'var(--text-primary)', fontSize: '0.9rem' }}>Completed Lesson: <strong>{lesId}</strong></span>
                        <span style={{ color: 'var(--gate-y)', fontSize: '0.8rem', fontWeight: 600 }}>✓ COMPLETED</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
