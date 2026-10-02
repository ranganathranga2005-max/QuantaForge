import React, { useState, useEffect } from 'react';

/**
 * 30-Second High-Tier Quantum Career Cards (Phase 2)
 */
const CAREERS = [
  {
    id: 'quantum_biology',
    title: '🧬 Quantum Biology Researcher at CERN',
    salary: '$185,000 / yr',
    icon: '🧬',
    desc: 'Decrypt cellular mutations, simulate protein folding, and engineer cancer-curing molecular drugs.',
    nodes: [
      { id: 'n4', name: 'Dream Career: Quantum Molecular Biologist', desc: 'Simulate full enzyme reactions on 100-qubit QPUs', icon: '🏆', type: 'destination' },
      { id: 'n3', name: 'Gap 2: Quantum Tunneling in Cell Mutations', desc: 'Analyze proton transfer inside DNA strands', icon: '⚛️', type: 'bridge' },
      { id: 'n2', name: 'Gap 1: Superposition & Molecular Energy States', desc: 'Flip qubits to model VQE molecular ansatzes', icon: '🧪', type: 'bridge' },
      { id: 'n1', name: 'Starting Point: Basic Chemistry & Interactive Play', desc: 'No math needed! Play with coin flips & atomic orbits', icon: '🚀', type: 'start' }
    ]
  },
  {
    id: 'space_cryptography',
    title: '🛰️ Quantum Cryptographer for Space Systems',
    salary: '$210,000 / yr',
    icon: '🛰️',
    desc: 'Build unhackable quantum satellite encryption networks protecting deep space communication.',
    nodes: [
      { id: 'n4', name: 'Dream Career: Space Quantum Cryptographer', desc: 'Deploy satellite QKD entanglement networks in orbit', icon: '🏆', type: 'destination' },
      { id: 'n3', name: 'Gap 2: QKD E91 & BB84 Entanglement Keys', desc: 'Generate uncrackable photon polarization keys', icon: '🔑', type: 'bridge' },
      { id: 'n2', name: 'Gap 1: Bell States & Spooky Entanglement', desc: 'Connect 2 qubits to send instant private signals', icon: '🔮', type: 'bridge' },
      { id: 'n1', name: 'Starting Point: Light Polarization & Laser Play', desc: 'Explore photon beams and quantum privacy', icon: '🚀', type: 'start' }
    ]
  },
  {
    id: 'qpu_engineer',
    title: '⚡ Superconducting QPU Hardware Engineer',
    salary: '$225,000 / yr',
    icon: '⚡',
    desc: 'Design sub-zero quantum microchips cooled to 15mK that outperform classic supercomputers.',
    nodes: [
      { id: 'n4', name: 'Dream Career: Superconducting QPU Architect', desc: 'Design 1,000+ qubit transmon planar chips', icon: '🏆', type: 'destination' },
      { id: 'n3', name: 'Gap 2: Cryostat Cooling & Microwave Pulse', desc: 'Control transmon qubits with 5GHz RF signals', icon: '❄️', type: 'bridge' },
      { id: 'n2', name: 'Gap 1: Quantum Logic Gates & Matrix Controls', desc: 'Master Hadamard, CNOT & Phase shift gates', icon: '🛠️', type: 'bridge' },
      { id: 'n1', name: 'Starting Point: Visual Drag-and-Drop Circuit Studio', desc: 'Snap gates onto wire lines like building blocks', icon: '🚀', type: 'start' }
    ]
  },
  {
    id: 'quantum_ai',
    title: '🤖 Quantum AI & Generative Neural Architect',
    salary: '$240,000 / yr',
    icon: '🤖',
    desc: 'Train hybrid quantum neural networks to solve climate change and design clean energy grids.',
    nodes: [
      { id: 'n4', name: 'Dream Career: Quantum AI Systems Architect', desc: 'Build Quantum Neural Networks outperforming GPT-5', icon: '🏆', type: 'destination' },
      { id: 'n3', name: 'Gap 2: Parameterized Circuits & QAOAs', desc: 'Train rotation angles RX(θ) to solve climate grids', icon: '🌐', type: 'bridge' },
      { id: 'n2', name: 'Gap 1: Superposition & Statevector Probabilities', desc: 'Map datasets into high-dimensional Hilbert vectors', icon: '📊', type: 'bridge' },
      { id: 'n1', name: 'Starting Point: AI Companion Guidance with Einstein', desc: 'Let Professor Einstein guide you step-by-step', icon: '🚀', type: 'start' }
    ]
  }
];

export default function QuantumCosmosOnboarding({ isOpen, onClose, onSelectCareer }) {
  // Phase state: 1 (Guide Intro) | 2 (Career Selection) | 3 (Destiny Wheel Spin) | 4 (Reverse Map)
  const [phase, setPhase] = useState(1);
  const [selectedCareer, setSelectedCareer] = useState(CAREERS[0]);
  const [isWheelSpinning, setIsWheelSpinning] = useState(false);
  const [typewriterText, setTypewriterText] = useState('');
  const [activeNode, setActiveNode] = useState(null);

  const fullText = "Hey there! I flunked a few exams too. Let’s skip the boring textbooks! Where do you want to change the world?";

  // Typewriter effect for Phase 1
  useEffect(() => {
    if (phase !== 1) return;
    let index = 0;
    setTypewriterText('');
    const timer = setInterval(() => {
      if (index < fullText.length) {
        setTypewriterText(fullText.slice(0, index + 1));
        index++;
      } else {
        clearInterval(timer);
      }
    }, 28);

    return () => clearInterval(timer);
  }, [phase]);

  if (!isOpen) return null;

  const handleCareerClick = (career) => {
    setSelectedCareer(career);
    setPhase(3); // Trigger Destiny Wheel
    setIsWheelSpinning(true);

    setTimeout(() => {
      setIsWheelSpinning(false);
      setPhase(4); // Move to Backward Map
    }, 2200);
  };

  const handleFinishOnboarding = () => {
    if (onSelectCareer) onSelectCareer(selectedCareer);
    onClose();
  };

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      zIndex: 99999,
      backgroundColor: '#0D0E15',
      backgroundImage: 'radial-gradient(ellipse at top, #1E1B4B 0%, #0D0E15 70%, #0A1118 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '24px',
      overflowY: 'auto',
      fontFamily: "'Plus Jakarta Sans', sans-serif"
    }}>
      
      {/* Background Star Particle Glow */}
      <div style={{
        position: 'absolute',
        top: '10%',
        left: '20%',
        width: '350px',
        height: '350px',
        background: 'radial-gradient(circle, rgba(0, 242, 254, 0.15) 0%, rgba(0,0,0,0) 70%)',
        filter: 'blur(40px)',
        pointerEvents: 'none'
      }} />
      <div style={{
        position: 'absolute',
        bottom: '10%',
        right: '20%',
        width: '400px',
        height: '400px',
        background: 'radial-gradient(circle, rgba(127, 0, 255, 0.2) 0%, rgba(0,0,0,0) 70%)',
        filter: 'blur(50px)',
        pointerEvents: 'none'
      }} />

      <div style={{
        maxWidth: '860px',
        width: '100%',
        backgroundColor: 'rgba(13, 14, 21, 0.85)',
        backdropFilter: 'blur(20px)',
        border: '1.5px solid rgba(0, 242, 254, 0.3)',
        borderRadius: '28px',
        padding: '40px',
        boxShadow: '0 30px 80px rgba(0, 242, 254, 0.2), inset 0 0 20px rgba(0, 242, 254, 0.05)',
        display: 'flex',
        flexDirection: 'column',
        gap: '28px',
        position: 'relative',
        animation: 'cosmicBreathing 4s infinite ease-in-out'
      }}>

        {/* ── PHASE 1: THE EMPATHETIC LEGEND GUIDE ── */}
        {phase === 1 && (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: '24px' }}>
            
            {/* Legend Guide Avatar with Glowing Halo */}
            <div style={{ position: 'relative' }}>
              <div style={{
                width: '110px',
                height: '110px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #00F2FE 0%, #7F00FF 100%)',
                padding: '3px',
                boxShadow: '0 0 35px rgba(0, 242, 254, 0.5)'
              }}>
                <div style={{
                  width: '100%',
                  height: '100%',
                  borderRadius: '50%',
                  backgroundColor: '#0D0E15',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '3.6rem'
                }}>
                  👴🏻
                </div>
              </div>
              <span style={{
                position: 'absolute',
                bottom: '-6px',
                left: '50%',
                transform: 'translateX(-50%)',
                backgroundColor: '#7F00FF',
                color: '#FFFFFF',
                fontSize: '0.68rem',
                fontWeight: 900,
                padding: '3px 12px',
                borderRadius: '999px',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                boxShadow: '0 0 12px rgba(127, 0, 255, 0.8)'
              }}>
                Prof. Albert
              </span>
            </div>

            {/* Typewriter Dialogue Speech Box */}
            <div style={{
              backgroundColor: 'rgba(20, 24, 38, 0.9)',
              border: '1px solid rgba(0, 242, 254, 0.3)',
              borderRadius: '20px',
              padding: '24px 32px',
              maxWidth: '620px',
              boxShadow: '0 10px 30px rgba(0,0,0,0.4)'
            }}>
              <p style={{
                fontSize: '1.25rem',
                fontWeight: 700,
                color: '#F8FAFC',
                margin: 0,
                lineHeight: 1.6,
                minHeight: '60px',
                fontFamily: "'Space Grotesk', sans-serif"
              }}>
                “{typewriterText}”
              </p>
            </div>

            <button
              onClick={() => setPhase(2)}
              style={{
                padding: '16px 40px',
                borderRadius: '16px',
                border: 'none',
                background: 'linear-gradient(135deg, #00F2FE 0%, #7F00FF 100%)',
                color: '#FFFFFF',
                fontSize: '1.1rem',
                fontWeight: 900,
                cursor: 'pointer',
                boxShadow: '0 0 25px rgba(0, 242, 254, 0.5)',
                transition: 'transform 0.2s ease',
                letterSpacing: '0.04em'
              }}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
            >
              Let’s Choose My Future Career →
            </button>
          </div>
        )}

        {/* ── PHASE 2: 30-SECOND QUANTUM CAREER SELECTION ── */}
        {phase === 2 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div style={{ textAlign: 'center' }}>
              <span style={{ fontSize: '0.74rem', fontWeight: 900, color: '#00F2FE', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                Phase 2 • Identity Ownership
              </span>
              <h2 style={{ fontSize: '1.8rem', fontWeight: 900, color: '#FFFFFF', margin: '4px 0 0 0', fontFamily: "'Space Grotesk', sans-serif" }}>
                Select Your Dream Quantum Career
              </h2>
              <p style={{ fontSize: '0.9rem', color: '#94A3B8', margin: '4px 0 0 0' }}>
                Pick where you want to land. We will reverse-engineer your skill path from here!
              </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' }}>
              {CAREERS.map(c => (
                <div
                  key={c.id}
                  onClick={() => handleCareerClick(c)}
                  style={{
                    backgroundColor: 'rgba(20, 24, 38, 0.8)',
                    border: '1.5px solid rgba(0, 242, 254, 0.2)',
                    borderRadius: '20px',
                    padding: '22px',
                    cursor: 'pointer',
                    transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '10px',
                    boxShadow: '0 8px 24px rgba(0, 0, 0, 0.3)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'scale(1.04)';
                    e.currentTarget.style.borderColor = '#00F2FE';
                    e.currentTarget.style.boxShadow = '0 0 30px rgba(0, 242, 254, 0.4)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'scale(1)';
                    e.currentTarget.style.borderColor = 'rgba(0, 242, 254, 0.2)';
                    e.currentTarget.style.boxShadow = '0 8px 24px rgba(0, 0, 0, 0.3)';
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '1.8rem' }}>{c.icon}</span>
                    <span style={{ fontSize: '0.72rem', fontWeight: 900, color: '#FF007F', backgroundColor: 'rgba(255, 0, 127, 0.15)', padding: '4px 10px', borderRadius: '999px', border: '1px solid rgba(255, 0, 127, 0.4)' }}>
                      {c.salary}
                    </span>
                  </div>
                  <div>
                    <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#FFFFFF', margin: '0 0 4px 0', lineHeight: 1.3 }}>
                      {c.title}
                    </h3>
                    <p style={{ fontSize: '0.82rem', color: '#94A3B8', margin: 0, lineHeight: 1.45 }}>
                      {c.desc}
                    </p>
                  </div>
                  <div style={{ marginTop: 'auto', fontSize: '0.78rem', fontWeight: 800, color: '#00F2FE', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <span>Lock In Career Goal</span> <span>→</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── PHASE 3: KINETIC DESTINY WHEEL SPIN ── */}
        {phase === 3 && (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: '28px', padding: '40px 0' }}>
            <span style={{ fontSize: '0.74rem', fontWeight: 900, color: '#FF007F', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
              Phase 3 • The Dopamine Vector
            </span>
            <h2 style={{ fontSize: '2rem', fontWeight: 900, color: '#FFFFFF', margin: 0, fontFamily: "'Space Grotesk', sans-serif" }}>
              Routing Your Cosmic Career Vector...
            </h2>

            {/* Kinetic 3D Spinning Wheel */}
            <div style={{ position: 'relative', width: '220px', height: '220px' }}>
              <div style={{
                width: '100%',
                height: '100%',
                borderRadius: '50%',
                border: '6px dashed #00F2FE',
                boxShadow: '0 0 40px rgba(0, 242, 254, 0.6), inset 0 0 20px rgba(127, 0, 255, 0.5)',
                animation: isWheelSpinning ? 'spinDestinyWheel 2s cubic-bezier(0.1, 0.9, 0.2, 1) forwards' : 'none',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '4rem'
              }}>
                {selectedCareer.icon}
              </div>
            </div>

            <p style={{ fontSize: '0.95rem', color: '#00F2FE', fontWeight: 700 }}>
              ⚡ Locking target parameters for {selectedCareer.title}...
            </p>
          </div>
        )}

        {/* ── PHASE 4: DYNAMIC BACKWARD MAP GENERATION ── */}
        {phase === 4 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div style={{ textAlign: 'center' }}>
              <span style={{ fontSize: '0.74rem', fontWeight: 900, color: '#7F00FF', textTransform: 'uppercase', letterSpacing: '0.1em', backgroundColor: 'rgba(127, 0, 255, 0.2)', padding: '4px 12px', borderRadius: '999px', border: '1px solid rgba(127, 0, 255, 0.5)' }}>
                Phase 4 • Reverse Skill Roadmap
              </span>
              <h2 style={{ fontSize: '1.8rem', fontWeight: 900, color: '#FFFFFF', margin: '8px 0 0 0', fontFamily: "'Space Grotesk', sans-serif" }}>
                Your Personalized Quantum Path
              </h2>
              <p style={{ fontSize: '0.88rem', color: '#94A3B8', margin: '4px 0 0 0' }}>
                We work backwards from your goal down to your first fun mission!
              </p>
            </div>

            {/* Reverse Node Chain Roadmap */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', position: 'relative' }}>
              {selectedCareer.nodes.map((node, idx) => {
                const isDest = node.type === 'destination';
                const isStart = node.type === 'start';
                return (
                  <div
                    key={node.id}
                    onClick={() => setActiveNode(node)}
                    style={{
                      backgroundColor: isDest ? 'rgba(127, 0, 255, 0.25)' : isStart ? 'rgba(0, 242, 254, 0.15)' : 'rgba(20, 24, 38, 0.7)',
                      border: `1.5px solid ${isDest ? '#7F00FF' : isStart ? '#00F2FE' : 'rgba(0, 242, 254, 0.2)'}`,
                      borderRadius: '18px',
                      padding: '18px 24px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '18px',
                      cursor: 'pointer',
                      boxShadow: isDest ? '0 0 25px rgba(127, 0, 255, 0.3)' : '0 4px 12px rgba(0,0,0,0.2)',
                      transition: 'transform 0.2s ease'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.transform = 'translateX(6px)'}
                    onMouseLeave={(e) => e.currentTarget.style.transform = 'translateX(0)'}
                  >
                    <div style={{
                      width: '46px',
                      height: '46px',
                      borderRadius: '12px',
                      backgroundColor: isDest ? '#7F00FF' : isStart ? '#00F2FE' : 'rgba(255,255,255,0.1)',
                      color: '#FFFFFF',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '1.5rem',
                      flexShrink: 0
                    }}>
                      {node.icon}
                    </div>

                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: '0.72rem', fontWeight: 900, color: isDest ? '#FF007F' : isStart ? '#00F2FE' : '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                        {isDest ? '🏆 Ultimate Destination' : isStart ? '🚀 Starting Quest Today' : `Bridge Step ${4 - idx}`}
                      </div>
                      <div style={{ fontSize: '1rem', fontWeight: 800, color: '#FFFFFF', marginTop: '2px' }}>
                        {node.name}
                      </div>
                      <div style={{ fontSize: '0.82rem', color: '#94A3B8', marginTop: '2px' }}>
                        {node.desc}
                      </div>
                    </div>

                    <div style={{ fontSize: '0.74rem', fontWeight: 800, color: '#00F2FE', backgroundColor: 'rgba(0, 242, 254, 0.1)', padding: '4px 10px', borderRadius: '8px', border: '1px solid rgba(0, 242, 254, 0.3)' }}>
                      Mission Quest
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Launch Workspace Button */}
            <button
              onClick={handleFinishOnboarding}
              style={{
                width: '100%',
                padding: '18px',
                borderRadius: '18px',
                border: 'none',
                background: 'linear-gradient(135deg, #00F2FE 0%, #7F00FF 100%)',
                color: '#FFFFFF',
                fontSize: '1.1rem',
                fontWeight: 900,
                cursor: 'pointer',
                boxShadow: '0 0 35px rgba(0, 242, 254, 0.5)',
                marginTop: '10px',
                letterSpacing: '0.04em'
              }}
            >
              🚀 Launch My Quantum Learning Cosmos →
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
