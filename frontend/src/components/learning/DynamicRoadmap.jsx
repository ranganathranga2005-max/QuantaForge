import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAdaptive, GOAL_DEFINITIONS, LEVEL_SPECTRUM } from '../../context/AdaptiveContext';

/**
 * DynamicRoadmap — Interactive Visual Learning Graph & Skill Roadmap
 * Renders an animated quantum graph map with 6 distinct node states:
 *   ✓ MASTERED, ◉ CURRENT, ⚠ SKILL GAP / PRACTICE, ○ UPCOMING, 🔒 LOCKED, ◆ GOAL DESTINATION
 * Allows goal search/selection, baseline diagnostic evaluation, dynamic route updates,
 * and seamless navigation to adaptive lessons & interactive puzzles.
 */
export default function DynamicRoadmap({ onSelectNode = null }) {
  const navigate = useNavigate();
  const {
    userLevel,
    setLevel,
    userGoal,
    setGoal,
    userRole,
    setUserRole,
    currentGoalData,
    currentLevelData,
    currentSkillGap,
    setCurrentSkillGap,
    activeMission,
    setActiveMission
  } = useAdaptive();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedNode, setSelectedNode] = useState(null);
  const [showDiagnosticModal, setShowDiagnosticModal] = useState(false);
  const [diagnosticAnswers, setDiagnosticAnswers] = useState({});
  const [diagnosticResult, setDiagnosticResult] = useState(null);

  // Default Learning Route Graph Nodes for current goal
  const [roadmapNodes, setRoadmapNodes] = useState([
    {
      id: 'foundations',
      title: 'Quantum Foundations',
      key: 'Foundations',
      status: 'mastered',
      levelRequired: 1,
      concept: 'Superposition & Probability',
      description: 'Understand classical vs quantum information, qubits, and probability amplitudes.',
      estimatedTime: '15 min'
    },
    {
      id: 'qubits',
      title: 'Qubit State Mechanics',
      key: 'Qubits',
      status: 'mastered',
      levelRequired: 1,
      concept: 'State Representation',
      description: 'Master bra-ket notation |0⟩ and |1⟩, Bloch sphere state vectors, and measurement.',
      estimatedTime: '20 min'
    },
    {
      id: 'interference',
      title: 'Quantum Interference',
      key: 'Interference',
      status: 'gap',
      levelRequired: 2,
      concept: 'Amplitude Waves',
      description: 'Explore how Hadamard gates cause constructive and destructive amplitude wave interference.',
      estimatedTime: '25 min'
    },
    {
      id: 'gates',
      title: 'Single & Multi-Qubit Gates',
      key: 'Gates',
      status: 'current',
      levelRequired: 2,
      concept: 'Gate Transformations',
      description: 'Apply Pauli X, Y, Z, Hadamard, and CNOT gates to manipulate quantum statevectors.',
      estimatedTime: '30 min'
    },
    {
      id: 'circuits',
      title: 'Circuit Builder & Entanglement',
      key: 'Circuits',
      status: 'upcoming',
      levelRequired: 3,
      concept: 'Bell States',
      description: 'Construct multi-qubit circuits, generate Bell state entanglement, and step through traces.',
      estimatedTime: '35 min'
    },
    {
      id: 'algorithms',
      title: 'Quantum Algorithms (Deutsch-Jozsa & VQE)',
      key: 'Algorithms',
      status: 'upcoming',
      levelRequired: 4,
      concept: 'Algorithm Speedup',
      description: 'Implement quantum algorithms offering exponential or polynomial computational speedup.',
      estimatedTime: '45 min'
    },
    {
      id: 'destination',
      title: currentGoalData.title,
      key: 'Destination',
      status: 'destination',
      levelRequired: currentGoalData.suggestedLevel,
      concept: currentGoalData.primaryTarget,
      description: currentGoalData.tagline,
      estimatedTime: 'Goal Complete'
    }
  ]);

  // Update roadmap nodes if goal or level changes
  useEffect(() => {
    setRoadmapNodes(prev => prev.map(node => {
      if (node.id === 'destination') {
        return {
          ...node,
          title: currentGoalData.title,
          levelRequired: currentGoalData.suggestedLevel,
          concept: currentGoalData.primaryTarget,
          description: currentGoalData.tagline
        };
      }
      if (node.title.includes(currentSkillGap)) {
        return { ...node, status: 'gap' };
      }
      return node;
    }));
  }, [userGoal, currentGoalData, currentSkillGap]);

  // Handle Baseline Diagnostic Submission
  const handleDiagnosticSubmit = (e) => {
    e.preventDefault();
    let score = 0;
    if (diagnosticAnswers.q1 === 'superposition') score += 1;
    if (diagnosticAnswers.q2 === 'hadamard') score += 1;
    if (diagnosticAnswers.q3 === 'cnot') score += 1;

    let suggestedLvl = 1;
    let gap = 'Quantum Foundations';
    if (score === 3) {
      suggestedLvl = 4;
      gap = 'Quantum Algorithms';
    } else if (score === 2) {
      suggestedLvl = 3;
      gap = 'Single & Multi-Qubit Gates';
    } else if (score === 1) {
      suggestedLvl = 2;
      gap = 'Quantum Interference';
    } else {
      suggestedLvl = 1;
      gap = 'Quantum Foundations';
    }

    setLevel(suggestedLvl);
    setCurrentSkillGap(gap);
    setDiagnosticResult({ score, suggestedLvl, gap });

    // Update node statuses dynamically
    setRoadmapNodes(prev => prev.map(node => {
      if (score === 3 && node.id !== 'destination') return { ...node, status: 'mastered' };
      if (score === 2 && ['foundations', 'qubits', 'interference'].includes(node.id)) return { ...node, status: 'mastered' };
      if (score === 1 && ['foundations', 'qubits'].includes(node.id)) return { ...node, status: 'mastered' };
      if (node.title.includes(gap)) return { ...node, status: 'gap' };
      return node;
    }));
  };

  const getNodeStatusBadge = (status) => {
    switch (status) {
      case 'mastered':
        return <span style={{ padding: '3px 10px', borderRadius: '9999px', backgroundColor: '#ECFDF5', color: '#059669', border: '1px solid #A7F3D0', fontWeight: 800, fontSize: '0.725rem' }}>✓ MASTERED</span>;
      case 'gap':
        return <span style={{ padding: '3px 10px', borderRadius: '9999px', backgroundColor: '#FFFBEB', color: '#D97706', border: '1px solid #FDE68A', fontWeight: 800, fontSize: '0.725rem', animation: 'pulse 2s infinite' }}>⚠ SKILL GAP</span>;
      case 'current':
        return <span style={{ padding: '3px 10px', borderRadius: '9999px', backgroundColor: '#EFF6FF', color: '#2563EB', border: '1px solid #BFDBFE', fontWeight: 800, fontSize: '0.725rem' }}>◉ CURRENT</span>;
      case 'destination':
        return <span style={{ padding: '3px 10px', borderRadius: '9999px', backgroundColor: '#F0FDFA', color: '#0D9488', border: '1px solid #99F6E4', fontWeight: 800, fontSize: '0.725rem' }}>◆ GOAL</span>;
      case 'locked':
        return <span style={{ padding: '3px 10px', borderRadius: '9999px', backgroundColor: '#F1F5F9', color: '#64748B', border: '1px solid #CBD5E1', fontWeight: 800, fontSize: '0.725rem' }}>🔒 LOCKED</span>;
      default:
        return <span style={{ padding: '3px 10px', borderRadius: '9999px', backgroundColor: '#F8FAFC', color: '#64748B', border: '1px solid #E2E8F0', fontWeight: 800, fontSize: '0.725rem' }}>○ UPCOMING</span>;
    }
  };

  return (
    <div className="dynamic-roadmap-container" style={{ width: '100%', color: 'var(--text-primary)' }}>
      
      {/* ── 1. GOAL DISCOVERY & SEARCH BAR ── */}
      <div style={{
        marginBottom: '28px',
        backgroundColor: '#FFFFFF',
        borderRadius: '20px',
        padding: '24px 28px',
        border: '1px solid #E2E8F0',
        boxShadow: 'var(--shadow-sm)'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px', marginBottom: '20px' }}>
          <div>
            <div style={{ fontSize: '0.75rem', fontWeight: 800, color: '#2563EB', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '4px' }}>
              ADAPTIVE LEARNING ROADMAP
            </div>
            <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#0F172A', margin: 0, letterSpacing: '-0.02em' }}>
              Target: {currentGoalData.title}
            </h2>
          </div>

          <div style={{ display: 'flex', gap: '10px' }}>
            <button
              onClick={() => setShowDiagnosticModal(true)}
              style={{
                padding: '9px 16px',
                borderRadius: '10px',
                backgroundColor: '#EFF6FF',
                border: '1px solid #BFDBFE',
                color: '#1E40AF',
                fontWeight: 700,
                fontSize: '0.85rem',
                cursor: 'pointer',
                transition: 'all 0.15s'
              }}
            >
              🧠 Take Diagnostic Check
            </button>
          </div>
        </div>

        {/* Goal Selection Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '12px' }}>
          {Object.values(GOAL_DEFINITIONS).map((g) => {
            const isSelected = userGoal === g.key;
            return (
              <div
                key={g.key}
                onClick={() => setGoal(g.key)}
                style={{
                  padding: '14px 16px',
                  borderRadius: '12px',
                  backgroundColor: isSelected ? '#EFF6FF' : '#F8FAFC',
                  border: isSelected ? '2px solid #2563EB' : '1px solid #E2E8F0',
                  cursor: 'pointer',
                  transition: 'all 0.15s'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                  <span style={{ fontSize: '1.2rem' }}>{g.icon}</span>
                  <span style={{ fontSize: '0.85rem', fontWeight: 800, color: isSelected ? '#1E40AF' : '#0F172A' }}>
                    {g.title}
                  </span>
                </div>
                <div style={{ fontSize: '0.75rem', color: '#64748B', lineHeight: '1.4' }}>
                  {g.tagline}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── 2. INTERACTIVE VISUAL QUANTUM GRAPH ROADMAP ── */}
      <div style={{
        backgroundColor: '#0F172A',
        borderRadius: '24px',
        padding: '36px 32px',
        color: '#FFFFFF',
        boxShadow: 'var(--shadow-md)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Background Quantum Grid Pattern */}
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
          backgroundImage: 'radial-gradient(circle at 20% 20%, rgba(37, 99, 235, 0.15) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(124, 58, 237, 0.15) 0%, transparent 50%)',
          pointerEvents: 'none'
        }} />

        <div style={{ textAlign: 'center', marginBottom: '32px', position: 'relative', zIndex: 2 }}>
          <span style={{ fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#60A5FA' }}>
            YOUR TAILORED QUANTUM PATHWAY
          </span>
          <h3 style={{ fontSize: '1.8rem', fontWeight: 800, color: '#FFFFFF', margin: '6px 0 0 0', letterSpacing: '-0.02em' }}>
            Adaptive Concept Graph
          </h3>
        </div>

        {/* Node Pipeline Graph */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', position: 'relative', zIndex: 2, maxWidth: '800px', margin: '0 auto' }}>
          {roadmapNodes.map((node, index) => {
            const isMastered = node.status === 'mastered';
            const isGap = node.status === 'gap';
            const isCurrent = node.status === 'current';
            const isDestination = node.status === 'destination';

            return (
              <div key={node.id} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                {/* Node Card */}
                <div
                  onClick={() => {
                    setSelectedNode(node);
                    if (onSelectNode) onSelectNode(node);
                  }}
                  style={{
                    width: '100%',
                    padding: '20px 24px',
                    borderRadius: '16px',
                    backgroundColor: isGap ? 'rgba(217, 119, 6, 0.12)' : isCurrent ? 'rgba(37, 99, 235, 0.2)' : isMastered ? 'rgba(16, 185, 129, 0.12)' : 'rgba(255, 255, 255, 0.05)',
                    border: isGap ? '2px solid #FBBF24' : isCurrent ? '2px solid #60A5FA' : isMastered ? '1px solid #34D399' : '1px solid rgba(255, 255, 255, 0.15)',
                    boxShadow: isGap ? '0 0 25px rgba(245, 158, 11, 0.25)' : isCurrent ? '0 0 25px rgba(59, 130, 246, 0.3)' : 'none',
                    display: 'flex',
                    alignItems: 'center',
                    justify: 'space-between',
                    gap: '16px',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    backdropFilter: 'blur(10px)'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <div style={{
                      width: '44px',
                      height: '44px',
                      borderRadius: '50%',
                      backgroundColor: isMastered ? '#10B981' : isGap ? '#D97706' : isCurrent ? '#2563EB' : '#334155',
                      display: 'flex',
                      alignItems: 'center',
                      justify: 'center',
                      fontWeight: 800,
                      fontSize: '1.1rem',
                      color: '#FFFFFF',
                      boxShadow: isMastered ? '0 0 15px rgba(16, 185, 129, 0.5)' : 'none'
                    }}>
                      {isMastered ? '✓' : isGap ? '!' : index + 1}
                    </div>

                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '4px' }}>
                        <h4 style={{ margin: 0, fontSize: '1.05rem', fontWeight: 800, color: '#FFFFFF' }}>
                          {node.title}
                        </h4>
                        {getNodeStatusBadge(node.status)}
                      </div>
                      <p style={{ margin: 0, fontSize: '0.85rem', color: '#94A3B8', lineHeight: '1.4' }}>
                        {node.description}
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setCurrentSkillGap(node.key);
                      navigate('/learn');
                    }}
                    style={{
                      padding: '8px 16px',
                      borderRadius: '8px',
                      backgroundColor: isGap ? '#D97706' : '#2563EB',
                      color: '#FFFFFF',
                      border: 'none',
                      fontWeight: 700,
                      fontSize: '0.8rem',
                      cursor: 'pointer',
                      whiteSpace: 'nowrap',
                      boxShadow: '0 2px 8px rgba(0,0,0,0.2)'
                    }}
                  >
                    {isGap ? 'Practice Gap →' : 'Explore Node →'}
                  </button>
                </div>

                {/* Connecting Node Line */}
                {index < roadmapNodes.length - 1 && (
                  <div style={{
                    width: '3px',
                    height: '24px',
                    backgroundColor: isMastered ? '#10B981' : 'rgba(255, 255, 255, 0.2)',
                    margin: '4px 0'
                  }} />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* ── 3. BASELINE DIAGNOSTIC MODAL ── */}
      {showDiagnosticModal && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: 'rgba(15, 23, 42, 0.8)', backdropFilter: 'blur(8px)',
          zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px'
        }}>
          <div style={{
            backgroundColor: '#FFFFFF', borderRadius: '24px', maxWidth: '560px', width: '100%',
            padding: '32px', boxShadow: '0 25px 50px rgba(0,0,0,0.25)', color: '#0F172A'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h3 style={{ margin: 0, fontSize: '1.35rem', fontWeight: 800 }}>
                🧠 Baseline Diagnostic Check
              </h3>
              <button
                onClick={() => setShowDiagnosticModal(false)}
                style={{ background: 'none', border: 'none', fontSize: '1.2rem', color: '#64748B', cursor: 'pointer' }}
              >
                ✕
              </button>
            </div>

            {!diagnosticResult ? (
              <form onSubmit={handleDiagnosticSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div>
                  <p style={{ fontWeight: 700, fontSize: '0.9rem', marginBottom: '8px' }}>
                    1. What phenomenon allows a qubit to exist in a combination of |0⟩ and |1⟩ simultaneously?
                  </p>
                  <select
                    onChange={(e) => setDiagnosticAnswers(prev => ({ ...prev, q1: e.target.value }))}
                    style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #CBD5E1' }}
                  >
                    <option value="">Select answer...</option>
                    <option value="superposition">Superposition</option>
                    <option value="entanglement">Entanglement</option>
                    <option value="decoherence">Decoherence</option>
                  </select>
                </div>

                <div>
                  <p style={{ fontWeight: 700, fontSize: '0.9rem', marginBottom: '8px' }}>
                    2. Which quantum gate creates an equal superposition state from |0⟩?
                  </p>
                  <select
                    onChange={(e) => setDiagnosticAnswers(prev => ({ ...prev, q2: e.target.value }))}
                    style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #CBD5E1' }}
                  >
                    <option value="">Select answer...</option>
                    <option value="hadamard">Hadamard (H) Gate</option>
                    <option value="pauli_x">Pauli-X Gate</option>
                    <option value="phase_z">Phase (Z) Gate</option>
                  </select>
                </div>

                <div>
                  <p style={{ fontWeight: 700, fontSize: '0.9rem', marginBottom: '8px' }}>
                    3. Which 2-qubit gate flips the target qubit if the control qubit is in |1⟩?
                  </p>
                  <select
                    onChange={(e) => setDiagnosticAnswers(prev => ({ ...prev, q3: e.target.value }))}
                    style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #CBD5E1' }}
                  >
                    <option value="">Select answer...</option>
                    <option value="cnot">CNOT Gate</option>
                    <option value="swap">SWAP Gate</option>
                    <option value="toffoli">Toffoli Gate</option>
                  </select>
                </div>

                <button
                  type="submit"
                  style={{
                    padding: '14px', borderRadius: '10px', backgroundColor: '#2563EB',
                    color: '#FFFFFF', border: 'none', fontWeight: 800, fontSize: '0.95rem', cursor: 'pointer'
                  }}
                >
                  Evaluate Diagnostic & Update Route
                </button>
              </form>
            ) : (
              <div style={{ textAlign: 'center', padding: '20px 0' }}>
                <div style={{ fontSize: '3rem', marginBottom: '12px' }}>🎉</div>
                <h4 style={{ fontSize: '1.4rem', fontWeight: 800, margin: '0 0 10px 0' }}>
                  Diagnostic Complete! (Score: {diagnosticResult.score}/3)
                </h4>
                <p style={{ color: '#475569', fontSize: '0.95rem', marginBottom: '20px' }}>
                  Your route has been updated to <strong>Level {diagnosticResult.suggestedLvl}</strong> with target gap <strong>"{diagnosticResult.gap}"</strong>.
                </p>
                <button
                  onClick={() => { setShowDiagnosticModal(false); setDiagnosticResult(null); }}
                  style={{
                    padding: '12px 24px', borderRadius: '10px', backgroundColor: '#2563EB',
                    color: '#FFFFFF', border: 'none', fontWeight: 800, fontSize: '0.9rem', cursor: 'pointer'
                  }}
                >
                  View Updated Roadmap
                </button>
              </div>
            )}
          </div>
        </div>
      )}

    </div>
  );
}
