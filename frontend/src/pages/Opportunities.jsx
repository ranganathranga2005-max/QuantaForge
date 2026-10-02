import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAdaptive } from '../context/AdaptiveContext';

/**
 * Opportunities.jsx
 * World-Class LinkedIn & Naukri Quantum Opportunities & Career Ecosystem.
 * Features:
 * - Ultra-premium dark glassmorphic design system.
 * - Interactive Search, Sorting & Pill Filter Chips with counts.
 * - Profile Talent Card with Skill Mastery Progress & Verified Proof Badges.
 * - Expandable Job Cards with Circuit Presets & "Why You Match" Reasoning.
 * - Instant Application Toast Notifications.
 * - Industry Market Insights (Top Hiring Labs, Salary Benchmarks, Skill Trends).
 */
export default function Opportunities() {
  const navigate = useNavigate();
  const { currentGoalData, currentSkillGap } = useAdaptive();
  
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('match');
  const [savedJobs, setSavedJobs] = useState({});
  const [appliedJobs, setAppliedJobs] = useState({});
  const [expandedJobId, setExpandedJobId] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);

  const opportunitiesList = [
    {
      id: 1,
      title: 'Quantum Algorithm Engineer — QAOA & Optimization',
      company: 'IBM Quantum Network Partner',
      companyLogo: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=100&auto=format&fit=crop&q=60',
      logoEmoji: '🟦',
      location: 'Armonk, NY • Remote / Hybrid',
      type: 'Full-Time',
      level: 'Mid-Senior',
      salary: '$145,000 - $185,000 / yr',
      bounty: '500 Q-Tokens + Fast-Track Interview',
      matchScore: 96,
      category: 'job',
      postedTime: '2 hours ago',
      skills: ['QAOA', 'Combinatorial Optimization', 'Qiskit Aer', 'NumPy Engine'],
      matchReasoning: 'Your verified QAOA circuit execution trace and parameter optimization skills match 96% of this position requirements.',
      circuitPreset: [{ id: '1', gate: 'H', qubit: 0 }, { id: '2', gate: 'H', qubit: 1 }, { id: '3', gate: 'CNOT', control: 0, target: 1 }],
      description: 'Design and tune quantum approximate optimization algorithm (QAOA) parameters for enterprise logistics, supply chain routing, and financial portfolio optimization.',
      responsibilities: [
        'Formulate Ising Hamiltonians for complex graph optimization problems.',
        'Optimize variational parameter vectors (γ, β) on simulated noisy QPUs.',
        'Benchmark Qiskit Aer vs. local NumPy custom matrix statevector engines.'
      ]
    },
    {
      id: 2,
      title: 'Quantum Chemistry Research Fellow (VQE & Molecular Energy)',
      company: 'Xanadu & PennyLane Labs',
      logoEmoji: '🟪',
      location: 'Toronto, ON • Remote Allowed',
      type: 'Fellowship / Research',
      level: 'Research Specialist',
      salary: '$98,000 - $130,000 / yr',
      bounty: 'Research Grant + 50 QPU Hardware Credits',
      matchScore: 91,
      category: 'research',
      postedTime: '1 day ago',
      skills: ['VQE', 'PennyLane', 'Pauli Observables', 'UCCD Ansatz'],
      matchReasoning: 'Your demonstrated interest in molecular statevector mechanics and variational eigensolvers aligns directly with this fellowship.',
      circuitPreset: [{ id: '1', gate: 'H', qubit: 0 }, { id: '2', gate: 'RZ', qubit: 0, parameters: { theta: 0.78 } }],
      description: 'Simulate Lithium Hydride (LiH) ground state energies using unitary coupled-cluster ansatzes on photonic & noisy QPU backends.',
      responsibilities: [
        'Construct qubit Hamiltonians using Jordan-Wigner transformations.',
        'Execute energy expectation estimations under depolarizing noise channels.',
        'Publish benchmark results in peer-reviewed quantum computing journals.'
      ]
    },
    {
      id: 3,
      title: 'Quantum Error Correction (QEC) Surface Code Specialist',
      company: 'Rigetti Computing',
      logoEmoji: '🟩',
      location: 'Berkeley, CA • On-Site',
      type: 'Full-Time',
      level: 'Senior Specialist',
      salary: '$170,000 - $215,000 / yr',
      bounty: 'Stock Options + Hardware Equity',
      matchScore: 88,
      category: 'job',
      postedTime: '3 days ago',
      skills: ['QEC', 'Surface Codes', 'Syndrome Extraction', 'Cirq'],
      matchReasoning: 'Validates your fault-tolerant quantum error correction and stabilizer measurement understanding.',
      circuitPreset: [{ id: '1', gate: 'H', qubit: 0 }, { id: '2', gate: 'CNOT', control: 0, target: 1 }],
      description: 'Implement fault-tolerant surface code syndrome measurements and error mitigation protocols for 80+ qubit superconducting chip architectures.',
      responsibilities: [
        'Design stabilizer generator circuits for distance-3 surface codes.',
        'Analyze minimum-weight perfect matching (MWPM) decoding performance.',
        'Work closely with QPU calibration hardware engineering teams.'
      ]
    },
    {
      id: 4,
      title: 'Global Industry Bounty: Supply Chain Route Optimization',
      company: 'QunaSys & Logistics Global',
      logoEmoji: '🟧',
      location: 'Virtual Hackathon & Bounty',
      type: 'Challenge / Bounty',
      level: 'All Experience Levels',
      salary: '$15,000 Cash Prize Pool',
      reward: 'Direct Industry Contract + Prize Pool',
      matchScore: 94,
      category: 'challenge',
      postedTime: '4 days ago',
      skills: ['QAOA', 'Graph Max-Cut', 'Q-AST Engine', 'Circuit Tuning'],
      matchReasoning: 'Solve the Max-Cut vehicle routing challenge to submit your verifiable statevector execution trace.',
      circuitPreset: [{ id: '1', gate: 'H', qubit: 0 }, { id: '2', gate: 'H', qubit: 1 }],
      description: 'Model a multi-depot vehicle routing graph problem as an Ising spin Hamiltonian and optimize cost using hybrid classical-quantum solvers.',
      responsibilities: [
        'Submit a working circuit with documented execution trace.',
        'Achieve minimum approximation ratio > 0.85 on test graphs.'
      ]
    }
  ];

  // Filtering & Sorting Logic
  const filteredOpportunities = opportunitiesList
    .filter(item => {
      const matchesFilter = activeFilter === 'all' || item.category === activeFilter;
      const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            item.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            item.skills.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesFilter && matchesSearch;
    })
    .sort((a, b) => {
      if (sortBy === 'match') return b.matchScore - a.matchScore;
      return a.id - b.id;
    });

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleApply = (job) => {
    setAppliedJobs(prev => ({ ...prev, [job.id]: true }));
    showToast(`🎉 Applied to ${job.title} at ${job.company} with your verified Quantum Proof!`);
  };

  const handleSave = (job) => {
    const nextSaved = !savedJobs[job.id];
    setSavedJobs(prev => ({ ...prev, [job.id]: nextSaved }));
    showToast(nextSaved ? `⭐ Saved ${job.title} to your bookmarked jobs.` : `Removed from bookmarks.`);
  };

  const toggleExpand = (id) => {
    setExpandedJobId(prev => (prev === id ? null : id));
  };

  return (
    <div
      style={{
        width: '100%',
        minHeight: 'calc(100vh - 64px)',
        backgroundColor: '#080C14',
        color: '#F8FAFC',
        padding: '24px 28px 60px 28px',
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        position: 'relative'
      }}
    >
      {/* Toast Notification */}
      {toastMessage && (
        <div
          style={{
            position: 'fixed',
            bottom: '24px',
            right: '24px',
            zIndex: 9999,
            background: 'linear-gradient(135deg, #141E33, #1B2742)',
            border: '1px solid #00F2FE',
            borderRadius: '12px',
            padding: '14px 20px',
            color: '#F8FAFC',
            fontWeight: 700,
            fontSize: '0.85rem',
            boxShadow: '0 12px 32px rgba(0, 242, 254, 0.3)',
            animation: 'slideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
          }}
        >
          {toastMessage}
        </div>
      )}

      <div style={{ width: '100%', maxWidth: '1240px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
        
        {/* LINKEDIN / NAUKRI HEADER BANNER & SEARCH HUB */}
        <div
          style={{
            background: 'linear-gradient(135deg, #141E33 0%, #0F1626 100%)',
            border: '1px solid rgba(0, 242, 254, 0.3)',
            borderRadius: '24px',
            padding: '28px 32px',
            display: 'flex',
            flexDirection: 'column',
            gap: '20px',
            boxShadow: '0 12px 32px rgba(0,0,0,0.5), 0 0 20px rgba(0, 242, 254, 0.08)'
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#00F2FE', letterSpacing: '2px', textTransform: 'uppercase' }}>
                  QUANTUM TALENT & CAREERS MARKETPLACE
                </span>
                <span style={{ fontSize: '0.65rem', padding: '2px 8px', borderRadius: '4px', background: 'rgba(52, 211, 153, 0.15)', color: '#34D399', fontWeight: 800, border: '1px solid #34D399' }}>
                  PROVEN SKILL MATCHING
                </span>
              </div>
              <h1 style={{ fontSize: '2rem', fontWeight: 800, color: '#F8FAFC', margin: 0, letterSpacing: '-0.02em' }}>
                Quantum Opportunities Hub
              </h1>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#00F2FE' }}>4 Verified Listings</div>
                <div style={{ fontSize: '0.75rem', color: '#94A3B8' }}>Matched to your Q-AST Proof</div>
              </div>
            </div>
          </div>

          {/* Search Bar & Interactive Filter Chips */}
          <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap', alignItems: 'center' }}>
            {/* Search Input */}
            <div style={{ flex: 1, minWidth: '300px', position: 'relative' }}>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="🔍 Search by Job Title, Skill (QAOA, VQE, Qiskit), Company (IBM, Xanadu)..."
                style={{
                  width: '100%',
                  padding: '14px 20px',
                  borderRadius: '14px',
                  background: '#0F1626',
                  border: '1px solid rgba(0, 242, 254, 0.25)',
                  color: '#F8FAFC',
                  fontSize: '0.9rem',
                  outline: 'none',
                  boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.3)'
                }}
              />
            </div>

            {/* Filter Pills */}
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              {[
                { id: 'all', label: 'All Opportunities', count: 4 },
                { id: 'job', label: 'Full-Time Jobs', count: 2 },
                { id: 'challenge', label: 'Industry Bounties', count: 1 },
                { id: 'research', label: 'Research Fellowships', count: 1 }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveFilter(tab.id)}
                  style={{
                    padding: '10px 18px',
                    borderRadius: '9999px',
                    background: activeFilter === tab.id ? 'linear-gradient(135deg, #00F2FE, #7928CA)' : '#141E33',
                    border: activeFilter === tab.id ? 'none' : '1px solid rgba(255, 255, 255, 0.1)',
                    color: activeFilter === tab.id ? '#FFFFFF' : '#94A3B8',
                    fontWeight: 800,
                    fontSize: '0.8rem',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    boxShadow: activeFilter === tab.id ? '0 4px 14px rgba(0, 242, 254, 0.3)' : 'none'
                  }}
                >
                  {tab.label} ({tab.count})
                </button>
              ))}
            </div>

            {/* Sorting Dropdown */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              style={{
                padding: '10px 14px',
                borderRadius: '10px',
                background: '#141E33',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                color: '#00F2FE',
                fontWeight: 700,
                fontSize: '0.8rem',
                outline: 'none',
                cursor: 'pointer'
              }}
            >
              <option value="match">Sort by: Highest Match %</option>
              <option value="newest">Sort by: Latest Posted</option>
            </select>
          </div>
        </div>

        {/* 3-COLUMN LINKEDIN / NAUKRI LAYOUT */}
        <div style={{ display: 'grid', gridTemplateColumns: '290px 1fr 310px', gap: '20px', alignItems: 'start' }}>
          
          {/* LEFT COLUMN: Talent Profile Card & Skill Readiness */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div
              style={{
                background: '#141E33',
                border: '1px solid rgba(0, 242, 254, 0.2)',
                borderRadius: '20px',
                overflow: 'hidden',
                boxShadow: '0 8px 24px rgba(0,0,0,0.3)'
              }}
            >
              {/* Cover Gradient Banner */}
              <div style={{ height: '70px', background: 'linear-gradient(135deg, #00F2FE 0%, #7928CA 100%)', position: 'relative' }} />

              <div style={{ padding: '0 20px 20px 20px', display: 'flex', flexDirection: 'column', gap: '16px', position: 'relative' }}>
                {/* Avatar */}
                <div
                  style={{
                    width: '64px',
                    height: '64px',
                    borderRadius: '50%',
                    background: '#0F1626',
                    border: '3px solid #00F2FE',
                    display: 'flex',
                    alignItems: 'center',
                    justify: 'center',
                    fontSize: '1.8rem',
                    marginTop: '-32px',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.5)'
                  }}
                >
                  🧑‍💻
                </div>

                <div>
                  <div style={{ fontSize: '1.15rem', fontWeight: 800, color: '#F8FAFC' }}>Alex Johnson</div>
                  <div style={{ fontSize: '0.8rem', color: '#00F2FE', fontWeight: 700 }}>Quantum ML Engineer</div>
                  <div style={{ fontSize: '0.75rem', color: '#94A3B8', marginTop: '2px' }}>QAOA & VQE Certified Professional</div>
                </div>

                <div style={{ width: '100%', height: '1px', background: 'rgba(255,255,255,0.08)' }} />

                {/* Profile Strength & Mastery Breakdown */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem' }}>
                    <span style={{ color: '#94A3B8' }}>Talent Rank Score:</span>
                    <strong style={{ color: '#34D399' }}>94% Top 5%</strong>
                  </div>
                  <div style={{ width: '100%', height: '6px', background: '#0F1626', borderRadius: '3px', overflow: 'hidden' }}>
                    <div style={{ width: '94%', height: '100%', background: 'linear-gradient(90deg, #00F2FE, #34D399)' }} />
                  </div>
                </div>

                {/* Mastery Skill Breakdown */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <div style={{ fontSize: '0.7rem', fontWeight: 800, color: '#64748B', letterSpacing: '1px', textTransform: 'uppercase' }}>VERIFIED SKILLS</div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', fontSize: '0.75rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', color: '#CBD5E1' }}>
                      <span>QAOA Optimization</span>
                      <strong style={{ color: '#00F2FE' }}>95%</strong>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', color: '#CBD5E1' }}>
                      <span>VQE Molecular Dynamics</span>
                      <strong style={{ color: '#00F2FE' }}>88%</strong>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', color: '#CBD5E1' }}>
                      <span>Qiskit Aer Transpilation</span>
                      <strong style={{ color: '#00F2FE' }}>98%</strong>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => navigate('/identity')}
                  style={{
                    width: '100%',
                    padding: '12px',
                    borderRadius: '12px',
                    background: '#1B2742',
                    border: '1px solid rgba(0, 242, 254, 0.35)',
                    color: '#00F2FE',
                    fontWeight: 800,
                    fontSize: '0.8rem',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }}
                >
                  View Identity Portfolio →
                </button>
              </div>
            </div>
          </div>

          {/* CENTER COLUMN: Interactive Jobs & Opportunities Feed */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {filteredOpportunities.map(job => {
              const isApplied = appliedJobs[job.id];
              const isSaved = savedJobs[job.id];
              const isExpanded = expandedJobId === job.id;

              return (
                <div
                  key={job.id}
                  style={{
                    background: '#141E33',
                    border: '1px solid rgba(0, 242, 254, 0.25)',
                    borderRadius: '20px',
                    padding: '24px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '16px',
                    boxShadow: '0 8px 24px rgba(0,0,0,0.4)',
                    transition: 'all 0.25s ease'
                  }}
                >
                  {/* Top Header: Logo, Title, Match Score */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '12px' }}>
                    <div style={{ display: 'flex', gap: '14px', alignItems: 'center' }}>
                      <span style={{ fontSize: '2.2rem' }}>{job.logoEmoji}</span>
                      <div>
                        <h3 style={{ margin: 0, fontSize: '1.25rem', color: '#F8FAFC', fontWeight: 800, lineHeight: '1.3' }}>
                          {job.title}
                        </h3>
                        <div style={{ fontSize: '0.85rem', color: '#00F2FE', fontWeight: 700, marginTop: '4px' }}>
                          {job.company} • <span style={{ color: '#94A3B8' }}>{job.location}</span>
                        </div>
                      </div>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '4px', flexShrink: 0 }}>
                      <span style={{ padding: '6px 14px', borderRadius: '9999px', background: 'rgba(52, 211, 153, 0.15)', border: '1px solid #34D399', color: '#34D399', fontWeight: 800, fontSize: '0.8rem' }}>
                        🔥 {job.matchScore}% Match
                      </span>
                      <span style={{ fontSize: '0.7rem', color: '#64748B' }}>{job.postedTime}</span>
                    </div>
                  </div>

                  {/* Pills: Compensation, Type, Level */}
                  <div style={{ display: 'flex', gap: '12px', fontSize: '0.85rem', flexWrap: 'wrap' }}>
                    <div style={{ padding: '4px 10px', borderRadius: '6px', background: '#0F1626', border: '1px solid rgba(255,255,255,0.08)', color: '#F8FAFC', fontWeight: 700 }}>
                      💰 {job.salary}
                    </div>
                    <div style={{ padding: '4px 10px', borderRadius: '6px', background: '#0F1626', border: '1px solid rgba(255,255,255,0.08)', color: '#CBD5E1', fontWeight: 600 }}>
                      💼 {job.type} ({job.level})
                    </div>
                    <div style={{ padding: '4px 10px', borderRadius: '6px', background: 'rgba(255, 184, 0, 0.15)', border: '1px solid rgba(255, 184, 0, 0.3)', color: '#FFB800', fontWeight: 700 }}>
                      🎁 {job.bounty}
                    </div>
                  </div>

                  <p style={{ margin: 0, fontSize: '0.88rem', color: '#CBD5E1', lineHeight: '1.5' }}>
                    {job.description}
                  </p>

                  {/* Why You Match Banner */}
                  <div style={{ padding: '12px 16px', background: '#1B2742', borderRadius: '12px', borderLeft: '4px solid #00F2FE', fontSize: '0.82rem', color: '#E2E8F0', lineHeight: '1.4' }}>
                    <strong style={{ color: '#00F2FE' }}>WHY THIS MATCHES YOU:</strong> {job.matchReasoning}
                  </div>

                  {/* Required Skill Tags */}
                  <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', alignItems: 'center' }}>
                    <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#64748B' }}>Required Skills:</span>
                    {job.skills.map(sk => (
                      <span key={sk} style={{ padding: '4px 10px', borderRadius: '6px', background: '#0F1626', color: '#00F2FE', fontSize: '0.75rem', fontWeight: 700, border: '1px solid rgba(0, 242, 254, 0.15)' }}>
                        {sk}
                      </span>
                    ))}
                  </div>

                  {/* EXPANDED DETAILS DRAWER */}
                  {isExpanded && (
                    <div style={{ background: '#0F1626', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '14px', padding: '18px', display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '4px', animation: 'fadeIn 0.2s ease' }}>
                      <div style={{ fontSize: '0.8rem', fontWeight: 800, color: '#00F2FE', letterSpacing: '1px' }}>
                        KEY RESPONSIBILITIES & CIRCUIT SPECIFICATION:
                      </div>
                      <ul style={{ margin: 0, paddingLeft: '20px', fontSize: '0.83rem', color: '#CBD5E1', lineHeight: '1.6' }}>
                        {job.responsibilities.map((resp, i) => (
                          <li key={i}>{resp}</li>
                        ))}
                      </ul>

                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#141E33', padding: '10px 14px', borderRadius: '8px', fontSize: '0.78rem', color: '#94A3B8' }}>
                        <span>Target QPU Circuit Preset: <strong>{job.circuitPreset.length} gates pre-configured</strong></span>
                        <span style={{ color: '#00F2FE', fontWeight: 700 }}>Verified NumPy Engine Benchmark Included</span>
                      </div>
                    </div>
                  )}

                  {/* Actions Bar */}
                  <div style={{ display: 'flex', gap: '12px', marginTop: '4px', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                      <button
                        onClick={() => handleApply(job)}
                        disabled={isApplied}
                        style={{
                          padding: '12px 24px',
                          borderRadius: '9999px',
                          background: isApplied ? '#1E293B' : 'linear-gradient(135deg, #00F2FE 0%, #7928CA 100%)',
                          border: 'none',
                          color: isApplied ? '#94A3B8' : '#FFFFFF',
                          fontWeight: 800,
                          fontSize: '0.85rem',
                          cursor: isApplied ? 'default' : 'pointer',
                          boxShadow: isApplied ? 'none' : '0 4px 14px rgba(0, 242, 254, 0.3)'
                        }}
                      >
                        {isApplied ? '✓ Applied with Quantum Proof' : 'Apply with Quantum Proof ⚡'}
                      </button>

                      <button
                        onClick={() => navigate('/lab', { state: { preset: job.circuitPreset, autoExecute: true } })}
                        style={{
                          padding: '12px 20px',
                          borderRadius: '9999px',
                          background: '#1B2742',
                          border: '1px solid rgba(0, 242, 254, 0.35)',
                          color: '#00F2FE',
                          fontWeight: 800,
                          fontSize: '0.85rem',
                          cursor: 'pointer'
                        }}
                      >
                        🧪 Solve Problem in Lab
                      </button>
                    </div>

                    <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                      <button
                        onClick={() => toggleExpand(job.id)}
                        style={{
                          background: 'none',
                          border: 'none',
                          color: '#94A3B8',
                          fontSize: '0.8rem',
                          fontWeight: 700,
                          cursor: 'pointer'
                        }}
                      >
                        {isExpanded ? '▲ Hide Details' : '▼ View Details'}
                      </button>

                      <button
                        onClick={() => handleSave(job)}
                        style={{
                          padding: '8px 14px',
                          borderRadius: '9999px',
                          background: 'transparent',
                          border: '1px solid rgba(255, 255, 255, 0.15)',
                          color: isSaved ? '#FFB800' : '#94A3B8',
                          fontWeight: 700,
                          fontSize: '0.8rem',
                          cursor: 'pointer'
                        }}
                      >
                        {isSaved ? '★ Saved' : '☆ Save'}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* RIGHT COLUMN: Market Intelligence & Fast-Track Actions */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            
            {/* Top Hiring Quantum Labs */}
            <div style={{ background: '#141E33', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '20px', padding: '20px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <h4 style={{ margin: 0, fontSize: '0.95rem', fontWeight: 800, color: '#F8FAFC' }}>
                🏢 Top Hiring Quantum Labs
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.82rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span>🟦</span>
                    <span style={{ color: '#F8FAFC', fontWeight: 700 }}>IBM Quantum</span>
                  </div>
                  <span style={{ color: '#00F2FE', fontWeight: 800 }}>12 Jobs</span>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span>🟪</span>
                    <span style={{ color: '#F8FAFC', fontWeight: 700 }}>Xanadu & PennyLane</span>
                  </div>
                  <span style={{ color: '#00F2FE', fontWeight: 800 }}>8 Jobs</span>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span>🟩</span>
                    <span style={{ color: '#F8FAFC', fontWeight: 700 }}>Rigetti Computing</span>
                  </div>
                  <span style={{ color: '#00F2FE', fontWeight: 800 }}>5 Jobs</span>
                </div>
              </div>
            </div>

            {/* In-Demand Quantum Skills Trends */}
            <div style={{ background: '#141E33', border: '1px solid rgba(0, 242, 254, 0.25)', borderRadius: '20px', padding: '20px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <h4 style={{ margin: 0, fontSize: '0.95rem', fontWeight: 800, color: '#00F2FE' }}>
                📈 In-Demand Quantum Skills
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.8rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', color: '#CBD5E1' }}>
                  <span>1. QAOA Optimization</span>
                  <strong style={{ color: '#34D399' }}>+58% Demand</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', color: '#CBD5E1' }}>
                  <span>2. VQE Molecular Dynamics</span>
                  <strong style={{ color: '#34D399' }}>+42% Demand</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', color: '#CBD5E1' }}>
                  <span>3. Surface Code QEC</span>
                  <strong style={{ color: '#34D399' }}>+36% Demand</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', color: '#CBD5E1' }}>
                  <span>4. PennyLane & Qiskit</span>
                  <strong style={{ color: '#34D399' }}>+65% Demand</strong>
                </div>
              </div>
            </div>

            {/* Fast-Track Skill Verification Banner */}
            <div style={{ background: 'linear-gradient(135deg, #141E33 0%, #1B2742 100%)', border: '1px solid #00F2FE', borderRadius: '20px', padding: '20px', display: 'flex', flexDirection: 'column', gap: '10px', boxShadow: '0 8px 20px rgba(0, 242, 254, 0.15)' }}>
              <h4 style={{ margin: 0, fontSize: '0.95rem', fontWeight: 800, color: '#F8FAFC' }}>
                ⚡ Boost Match Ranking
              </h4>
              <p style={{ margin: 0, fontSize: '0.8rem', color: '#94A3B8', lineHeight: '1.4' }}>
                Complete a 2-minute diagnostic puzzle to boost your match ranking to 99% for top IBM & Xanadu listings.
              </p>
              <button
                onClick={() => navigate('/challenges')}
                style={{
                  padding: '10px 16px',
                  borderRadius: '9999px',
                  background: '#00F2FE',
                  border: 'none',
                  color: '#080C14',
                  fontWeight: 800,
                  fontSize: '0.8rem',
                  cursor: 'pointer',
                  marginTop: '4px'
                }}
              >
                Take Diagnostic Quiz →
              </button>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
