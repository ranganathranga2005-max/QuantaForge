import React from 'react';
import { useNavigate } from 'react-router-dom';

/**
 * EcosystemHome.jsx
 * Ecosystem Hub Home Screen answering "What can I do here?" in 5 seconds.
 * Provides goal banner, active concept, highlighted TODAY'S RECOMMENDATION [ CONTINUE ],
 * and visually distinct ecosystem entry points for Learn, Play, Build, Challenge,
 * Projects, Research, Problems, Opportunities, Community, and Identity.
 */
export default function EcosystemHome({
  userGoal = 'Quantum Software Engineer',
  activeTopic = 'Entanglement & Bell States',
  onSelectTopic
}) {
  const navigate = useNavigate();

  return (
    <div
      style={{
        width: '100%',
        minHeight: 'calc(100vh - 64px)',
        backgroundColor: '#080C14',
        color: '#F8FAFC',
        padding: '36px 24px 60px 24px',
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }}
    >
      <div style={{ width: '100%', maxWidth: '1120px', display: 'flex', flexDirection: 'column', gap: '32px' }}>
        
        {/* HERO RECOMMENDATION BANNER */}
        <div
          style={{
            width: '100%',
            background: 'linear-gradient(135deg, #141E33 0%, #0F1626 100%)',
            border: '1px solid rgba(0, 242, 254, 0.35)',
            borderRadius: '24px',
            padding: '36px 32px',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
            boxShadow: '0 16px 36px rgba(0, 0, 0, 0.5), 0 0 24px rgba(0, 242, 254, 0.1)',
            position: 'relative'
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#00F2FE', letterSpacing: '2px', textTransform: 'uppercase' }}>
              WELCOME BACK
            </span>
            <div style={{ fontSize: '0.8rem', color: '#94A3B8', fontWeight: 600 }}>
              YOUR GOAL: <strong style={{ color: '#F8FAFC' }}>{userGoal}</strong>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <div style={{ fontSize: '0.85rem', color: '#94A3B8' }}>YOU ARE WORKING ON</div>
            <h1 style={{ fontSize: '2rem', fontWeight: 800, color: '#F8FAFC', margin: 0 }}>
              {activeTopic}
            </h1>
          </div>

          <div style={{ width: '100%', height: '1px', background: 'rgba(255, 255, 255, 0.08)', margin: '4px 0' }} />

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
            <div>
              <div style={{ fontSize: '0.75rem', fontWeight: 800, color: '#FFB800', letterSpacing: '1.5px', textTransform: 'uppercase' }}>
                TODAY'S RECOMMENDATION
              </div>
              <div style={{ fontSize: '1.1rem', fontWeight: 700, color: '#F8FAFC', marginTop: '2px' }}>
                Build a Bell State ($|\Phi^+\rangle$) in the Quantum Lab
              </div>
            </div>

            <button
              onClick={() => navigate('/lab')}
              style={{
                padding: '14px 32px',
                borderRadius: '9999px',
                background: 'linear-gradient(135deg, #00F2FE 0%, #7928CA 100%)',
                border: 'none',
                color: '#FFFFFF',
                fontWeight: 800,
                fontSize: '0.95rem',
                cursor: 'pointer',
                boxShadow: '0 8px 24px rgba(0, 242, 254, 0.35)',
                transition: 'all 0.2s ease'
              }}
            >
              [ CONTINUE → ]
            </button>
          </div>
        </div>

        {/* ECOSYSTEM ENTRY POINTS */}
        <div>
          <div style={{ marginBottom: '16px' }}>
            <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#F8FAFC', margin: 0 }}>
              Explore the Quantum Ecosystem
            </h2>
            <p style={{ margin: '4px 0 0 0', fontSize: '0.9rem', color: '#94A3B8' }}>
              Select any mode to enter practice, simulation, challenges, projects, or career opportunities.
            </p>
          </div>

          {/* Grid of Visually Distinct Entry Points */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px' }}>
            
            {/* 1. LEARN */}
            <div
              onClick={() => navigate('/learn')}
              style={{
                background: '#141E33',
                border: '1px solid rgba(0, 242, 254, 0.25)',
                borderRadius: '20px',
                padding: '24px',
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                gap: '12px',
                transition: 'all 0.2s ease'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <span style={{ fontSize: '1.8rem' }}>📖</span>
                <div>
                  <h3 style={{ margin: 0, fontSize: '1.15rem', color: '#00F2FE', fontWeight: 800 }}>LEARN</h3>
                  <div style={{ fontSize: '0.75rem', color: '#94A3B8' }}>Concepts & Theory</div>
                </div>
              </div>
              <p style={{ margin: 0, fontSize: '0.85rem', color: '#94A3B8', lineHeight: '1.5' }}>
                Explore structured concepts, video lectures, Bloch sphere visualizations, and interactive theory.
              </p>
            </div>

            {/* 2. PLAY */}
            <div
              onClick={() => navigate('/play')}
              style={{
                background: 'linear-gradient(145deg, #1B2742 0%, #141E33 100%)',
                border: '1px solid rgba(121, 40, 202, 0.4)',
                borderRadius: '20px',
                padding: '24px',
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                gap: '12px',
                transition: 'all 0.2s ease'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <span style={{ fontSize: '1.8rem' }}>🎮</span>
                <div>
                  <h3 style={{ margin: 0, fontSize: '1.15rem', color: '#C084FC', fontWeight: 800 }}>PLAY</h3>
                  <div style={{ fontSize: '0.75rem', color: '#94A3B8' }}>Educational Quantum Games</div>
                </div>
              </div>
              <p style={{ margin: 0, fontSize: '0.85rem', color: '#94A3B8', lineHeight: '1.5' }}>
                Master quantum concepts through games: Qubit Catch, Circuit Rescue, Entanglement Link & Quantum Race.
              </p>
            </div>

            {/* 3. BUILD */}
            <div
              onClick={() => navigate('/lab')}
              style={{
                background: '#141E33',
                border: '1px solid rgba(0, 242, 254, 0.25)',
                borderRadius: '20px',
                padding: '24px',
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                gap: '12px',
                transition: 'all 0.2s ease'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <span style={{ fontSize: '1.8rem' }}>🧪</span>
                <div>
                  <h3 style={{ margin: 0, fontSize: '1.15rem', color: '#00F2FE', fontWeight: 800 }}>BUILD</h3>
                  <div style={{ fontSize: '0.75rem', color: '#94A3B8' }}>Quantum Lab & Simulator</div>
                </div>
              </div>
              <p style={{ margin: 0, fontSize: '0.85rem', color: '#94A3B8', lineHeight: '1.5' }}>
                Construct circuits, write Q-AST code, execute on multi-backends, and analyze statevectors.
              </p>
            </div>

            {/* 4. CHALLENGE */}
            <div
              onClick={() => navigate('/challenges')}
              style={{
                background: '#141E33',
                border: '1px solid rgba(255, 184, 0, 0.3)',
                borderRadius: '20px',
                padding: '24px',
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                gap: '12px',
                transition: 'all 0.2s ease'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <span style={{ fontSize: '1.8rem' }}>⚡</span>
                <div>
                  <h3 style={{ margin: 0, fontSize: '1.15rem', color: '#FFB800', fontWeight: 800 }}>CHALLENGE</h3>
                  <div style={{ fontSize: '0.75rem', color: '#94A3B8' }}>Problem-First Diagnostics</div>
                </div>
              </div>
              <p style={{ margin: 0, fontSize: '0.85rem', color: '#94A3B8', lineHeight: '1.5' }}>
                Attempt target quantum problems before theory instruction to diagnose skill gaps.
              </p>
            </div>

            {/* 5. PROJECTS */}
            <div
              onClick={() => navigate('/projects')}
              style={{
                background: '#141E33',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '20px',
                padding: '24px',
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                gap: '12px',
                transition: 'all 0.2s ease'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <span style={{ fontSize: '1.8rem' }}>📂</span>
                <div>
                  <h3 style={{ margin: 0, fontSize: '1.15rem', color: '#F8FAFC', fontWeight: 800 }}>PROJECTS</h3>
                  <div style={{ fontSize: '0.75rem', color: '#94A3B8' }}>Substantial Applications</div>
                </div>
              </div>
              <p style={{ margin: 0, fontSize: '0.85rem', color: '#94A3B8', lineHeight: '1.5' }}>
                Build VQE molecular solvers, QAOA optimizers, and QEC surface codes with verified execution traces.
              </p>
            </div>

            {/* 6. OPPORTUNITIES */}
            <div
              onClick={() => navigate('/opportunities')}
              style={{
                background: 'linear-gradient(145deg, #141E33 0%, #1B2742 100%)',
                border: '1px solid rgba(0, 242, 254, 0.4)',
                borderRadius: '20px',
                padding: '24px',
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                gap: '12px',
                transition: 'all 0.2s ease'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <span style={{ fontSize: '1.8rem' }}>💼</span>
                <div>
                  <h3 style={{ margin: 0, fontSize: '1.15rem', color: '#00F2FE', fontWeight: 800 }}>OPPORTUNITIES</h3>
                  <div style={{ fontSize: '0.75rem', color: '#94A3B8' }}>Lantern Learn-to-Earn</div>
                </div>
              </div>
              <p style={{ margin: 0, fontSize: '0.85rem', color: '#94A3B8', lineHeight: '1.5' }}>
                Bridge verified skill proof to real problems for internships, rewards, and research collaborations.
              </p>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
