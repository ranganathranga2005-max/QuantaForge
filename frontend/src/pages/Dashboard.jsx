import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import QuantumCryostat3D from '../components/visualization/QuantumCryostat3D';
import QubitProcessor3D from '../components/visualization/QubitProcessor3D';
import MasteryBadge from '../components/learning/MasteryBadge';
import MasteryRadarChart from '../components/dashboard/MasteryRadarChart';
import QuantumNoiseStudio from '../components/dashboard/QuantumNoiseStudio';
import AlgorithmWalkthroughSandbox from '../components/dashboard/AlgorithmWalkthroughSandbox';
import SocraticTutorWidget from '../components/dashboard/SocraticTutorWidget';
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
        const mods = Array.isArray(currData) ? currData : (currData?.modules || []);
        if (mods.length > 0) setModules(mods);
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
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100%', backgroundColor: '#F8FAFC' }}>
      
      {/* Top Academic Hero Header */}
      <div style={{
        backgroundColor: '#FFFFFF',
        borderBottom: '1px solid var(--border-subtle)',
        padding: '40px 48px',
        boxShadow: 'var(--shadow-xs)'
      }}>
        <div style={{ maxWidth: '1240px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '32px' }}>
          
          <div style={{ maxWidth: '640px' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '4px 10px', backgroundColor: '#EFF6FF', borderRadius: '4px', border: '1px solid #BFDBFE', marginBottom: '12px' }}>
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#2563EB' }} />
              <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--accent-primary)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                Academic Platform • Quantum Information Science
              </span>
            </div>
            <h1 style={{ fontSize: '2.5rem', fontWeight: 800, lineHeight: 1.15, marginBottom: '12px', color: 'var(--text-primary)', letterSpacing: '-0.03em' }}>
              Quantum Computing & Algorithms Laboratory
            </h1>
            <p style={{ fontSize: '1.05rem', color: 'var(--text-secondary)', marginBottom: '24px', lineHeight: 1.55 }}>
              Master quantum mechanics, circuit synthesis, algorithm design, and simulation. Interact with physical hardware models and run statevector simulations on real backend emulators.
            </p>

            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <button className="btn btn-primary" style={{ padding: '12px 24px', fontSize: '0.9rem', fontWeight: 600 }} onClick={() => navigate('/learn')}>
                {completedCount > 0 ? 'CONTINUE CURRICULUM →' : 'EXPLORE COURSES →'}
              </button>
              <button className="btn" style={{ padding: '12px 24px', fontSize: '0.9rem', fontWeight: 600 }} onClick={() => navigate('/lab')}>
                LAUNCH QUANTUM LAB
              </button>
              <button className="btn" style={{ padding: '12px 24px', fontSize: '0.9rem', fontWeight: 600 }} onClick={() => navigate('/ai-tutor')}>
                CONSULT AI TUTOR
              </button>
            </div>
          </div>

          {/* Quick Metrics Badge */}
          <div style={{ minWidth: '280px', backgroundColor: '#F8FAFC', border: '1px solid var(--border-subtle)', borderRadius: '10px', padding: '20px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
              LEARNING PROGRESS
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <div style={{ backgroundColor: '#FFFFFF', padding: '12px', borderRadius: '6px', border: '1px solid var(--border-subtle)' }}>
                <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontWeight: 600 }}>COMPLETED</div>
                <div style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--accent-primary)', marginTop: '2px' }}>
                  {completedCount} <span style={{ fontSize: '0.8rem', fontWeight: 500, color: 'var(--text-muted)' }}>lessons</span>
                </div>
              </div>
              <div style={{ backgroundColor: '#FFFFFF', padding: '12px', borderRadius: '6px', border: '1px solid var(--border-subtle)' }}>
                <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontWeight: 600 }}>MASTERY</div>
                <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#15803D', marginTop: '2px' }}>
                  {conceptList.length > 0 ? `${Math.round((conceptList.filter(([, c]) => c.mastery_status === 'mastered').length / conceptList.length) * 100)}%` : '0%'}
                </div>
              </div>
            </div>

            {nextLesson && (
              <div style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: '10px' }}>
                <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontWeight: 600 }}>NEXT UP</div>
                <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-primary)', marginTop: '2px' }}>
                  {nextLesson.title || nextLesson.id}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Dashboard Body */}
      <div style={{ padding: '40px 48px', display: 'flex', flexDirection: 'column', gap: '36px', maxWidth: '1240px', width: '100%', margin: '0 auto' }}>
        
        {/* SECTION 1: 3D Hardware Dilution Refrigerator Showcase */}
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <div>
              <h3 style={{ margin: 0, fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                Interactive 3D Quantum Hardware Architecture
              </h3>
              <p style={{ margin: '4px 0 0 0', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                Explore the dilution refrigerator cryostat used to cool superconducting transmon qubits down to 15 millikelvin. Drag to orbit the 3D model.
              </p>
            </div>
            <div style={{ fontSize: '0.75rem', fontWeight: 700, fontFamily: 'var(--font-mono)', padding: '4px 10px', backgroundColor: '#EFF6FF', color: 'var(--accent-primary)', borderRadius: '4px', border: '1px solid #BFDBFE' }}>
              3D WEBGL ENGINE
            </div>
          </div>

          <QuantumCryostat3D height={420} showDetails={true} />
        </div>

        {/* SECTION 2: Mastery Radar & Certificate System */}
        <MasteryRadarChart progress={progress} mastery={mastery} />

        {/* SECTION 3: Quantum Noise, Decoherence & Density Matrix Studio */}
        <QuantumNoiseStudio />

        {/* SECTION 4: Landmark Algorithm Step-by-Step Sandboxes */}
        <AlgorithmWalkthroughSandbox />

        {/* SECTION 5: Socratic AI Tutor Sidecar & Misconception Diagnostics */}
        <SocraticTutorWidget />

        {/* SECTION 6: 3D Superconducting Qubit Chip */}
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <div>
              <h3 style={{ margin: 0, fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                QPU Processor & Qubit Topology
              </h3>
              <p style={{ margin: '4px 0 0 0', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                Superconducting planar transmon cross-capacitors coupled via microwave coplanar waveguide resonators.
              </p>
            </div>
          </div>

          <QubitProcessor3D height={320} />
        </div>

        {/* SECTION 7: Curriculum Gateway & Track Overview */}
        <div style={{
          backgroundColor: '#FFFFFF',
          border: '1px solid var(--border-subtle)',
          borderRadius: '12px',
          padding: '24px 28px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '20px',
          boxShadow: 'var(--shadow-sm)'
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
              <span style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--accent-primary)', textTransform: 'uppercase', letterSpacing: '0.06em', fontFamily: 'var(--font-mono)' }}>
                20-PILLAR MASTER SYLLABUS
              </span>
              <span style={{ fontSize: '0.75rem', padding: '2px 8px', backgroundColor: '#F0FDF4', color: '#166534', borderRadius: '4px', fontWeight: 700, border: '1px solid #BBF7D0' }}>
                Full Track Available
              </span>
            </div>
            <h3 style={{ margin: 0, fontSize: '1.2rem', fontWeight: 800, color: 'var(--text-primary)' }}>
              Theoretical Foundations, Quantum Circuits & Frontier Applications
            </h3>
            <p style={{ margin: '4px 0 0 0', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
              Explore foundational physics, algorithm synthesis, QML, QKD cryptography, and molecular VQE simulation inside the dedicated Learning Hub.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
            <button
              className="btn btn-primary"
              style={{ padding: '10px 20px', fontSize: '0.875rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '8px' }}
              onClick={() => navigate('/learn')}
            >
              <span>{completedCount > 0 ? 'RESUME LEARNING TRACK' : 'EXPLORE ALL MODULES'}</span>
              <span>→</span>
            </button>
          </div>
        </div>

        {/* SECTION 8: Mastery Record Table */}
        <div>
          <h3 style={{ margin: '0 0 16px 0', fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-primary)' }}>
            Concept Mastery & Assessment Record
          </h3>

          <div style={{ backgroundColor: '#FFFFFF', border: '1px solid var(--border-subtle)', borderRadius: '8px', overflow: 'hidden', boxShadow: 'var(--shadow-sm)' }}>
            {conceptList.length === 0 ? (
              <div style={{ padding: '32px', textAlign: 'center', color: 'var(--text-muted)', fontStyle: 'italic', fontSize: '0.9rem' }}>
                Your mastery records will populate as you complete lessons, circuit designs, and assessments.
              </div>
            ) : (
              <div style={{ width: '100%', overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                  <thead>
                    <tr style={{ backgroundColor: '#F8FAFC', borderBottom: '1px solid var(--border-subtle)', color: 'var(--text-muted)', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.06em', fontFamily: 'var(--font-mono)' }}>
                      <th style={{ padding: '14px 20px' }}>Concept Name</th>
                      <th style={{ padding: '14px 20px' }}>Status</th>
                      <th style={{ padding: '14px 20px' }}>Score</th>
                      <th style={{ padding: '14px 20px' }}>Attempts</th>
                    </tr>
                  </thead>
                  <tbody>
                    {conceptList.map(([conceptId, data]) => (
                      <tr key={conceptId} style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                        <td style={{ padding: '14px 20px', fontWeight: 600, color: 'var(--text-primary)', textTransform: 'capitalize' }}>
                          {conceptId.replace('_', ' ')}
                        </td>
                        <td style={{ padding: '14px 20px' }}>
                          <MasteryBadge status={data.mastery_status} />
                        </td>
                        <td style={{ padding: '14px 20px', color: 'var(--text-secondary)', fontFamily: 'var(--font-mono)', fontSize: '0.85rem' }}>
                          {data.assessment_score !== undefined ? `${data.assessment_score}%` : 'N/A'}
                        </td>
                        <td style={{ padding: '14px 20px', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', fontSize: '0.85rem' }}>
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

      </div>
    </div>
  );
}
