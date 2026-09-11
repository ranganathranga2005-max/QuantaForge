import React, { useState } from 'react';
import MasteryBadge from './MasteryBadge';

const CATEGORIES = [
  { id: 'all', label: 'All 20 Pillars', range: [1, 20] },
  { id: 'foundations', label: '1. Foundations & Principles', range: [1, 4] },
  { id: 'circuits', label: '2. Circuits & Mechanics', range: [5, 7] },
  { id: 'algorithms', label: '3. Algorithms & NISQ', range: [8, 9] },
  { id: 'hardware_qec', label: '4. Error, Hardware & Software', range: [10, 13] },
  { id: 'applied', label: '5. Advantages & Applications', range: [14, 17] },
  { id: 'frontier', label: '6. Frontier (QML, QKD & Chemistry)', range: [18, 20] },
];

export default function CurriculumOverview({ modules, progress, mastery, onSelectLesson }) {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  if (!modules || modules.length === 0) {
    return (
      <div style={{ padding: '60px 40px', textAlign: 'center', color: 'var(--text-muted)' }}>
        Loading curriculum modules...
      </div>
    );
  }

  const currentCat = CATEGORIES.find(c => c.id === activeCategory) || CATEGORIES[0];

  const filteredModules = modules.filter(mod => {
    const order = mod.order || 1;
    const inCategory = order >= currentCat.range[0] && order <= currentCat.range[1];
    if (!inCategory) return false;

    if (!searchQuery.trim()) return true;
    const query = searchQuery.toLowerCase();
    const matchesMod = mod.title.toLowerCase().includes(query) || (mod.description && mod.description.toLowerCase().includes(query));
    const matchesLessons = (mod.lessons || []).some(l => 
      l.title.toLowerCase().includes(query) || (l.description && l.description.toLowerCase().includes(query))
    );
    return matchesMod || matchesLessons;
  });

  const totalLessons = modules.reduce((sum, m) => sum + (m.lessons?.length || 0), 0);
  const completedCount = progress?.completed_lessons?.length || 0;
  const progressPercent = totalLessons > 0 ? Math.round((completedCount / totalLessons) * 100) : 0;

  return (
    <div>
      {/* Header */}
      <div style={{ marginBottom: '32px' }}>
        <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--accent-primary)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '8px', fontFamily: 'var(--font-mono)' }}>
          ACADEMIC CURRICULUM • 20-PILLAR MASTER SYLLABUS
        </div>
        <h1 style={{ fontSize: '2.4rem', marginBottom: '10px', letterSpacing: '-0.03em', color: 'var(--text-primary)', fontWeight: 800 }}>
          Quantum Computing Master Learning Path
        </h1>
        <p style={{ fontSize: '1.05rem', color: 'var(--text-secondary)', maxWidth: '820px', lineHeight: 1.6, margin: 0 }}>
          A rigorous 20-pillar curriculum spanning physical quantum mechanics, unitary circuit synthesis, landmark algorithms (Shor, Grover, QFT), NISQ variational methods (VQE/QAOA), error correction, Quantum Machine Learning (QML), Cryptography (BB84/E91), and Molecular Chemistry Simulation.
        </p>

        {/* Stats Row */}
        <div style={{ display: 'flex', gap: '20px', marginTop: '24px', flexWrap: 'wrap' }}>
          <div style={{ padding: '12px 18px', backgroundColor: '#FFFFFF', border: '1px solid var(--border-subtle)', borderRadius: '8px', boxShadow: 'var(--shadow-xs)' }}>
            <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontWeight: 700, textTransform: 'uppercase' }}>Total Pillars</div>
            <div style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--text-primary)', fontFamily: 'var(--font-mono)' }}>20 Modules</div>
          </div>
          <div style={{ padding: '12px 18px', backgroundColor: '#FFFFFF', border: '1px solid var(--border-subtle)', borderRadius: '8px', boxShadow: 'var(--shadow-xs)' }}>
            <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontWeight: 700, textTransform: 'uppercase' }}>Interactive Lessons</div>
            <div style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--accent-primary)', fontFamily: 'var(--font-mono)' }}>{totalLessons} Lessons</div>
          </div>
          <div style={{ padding: '12px 18px', backgroundColor: '#FFFFFF', border: '1px solid var(--border-subtle)', borderRadius: '8px', boxShadow: 'var(--shadow-xs)' }}>
            <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontWeight: 700, textTransform: 'uppercase' }}>Curriculum Completion</div>
            <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#10B981', fontFamily: 'var(--font-mono)' }}>{completedCount}/{totalLessons} ({progressPercent}%)</div>
          </div>
        </div>
      </div>

      {/* Category Tabs & Search Bar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '16px', marginBottom: '24px', flexWrap: 'wrap' }}>
        <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
          {CATEGORIES.map(cat => {
            const isSelected = cat.id === activeCategory;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setActiveCategory(cat.id)}
                style={{
                  padding: '7px 14px',
                  backgroundColor: isSelected ? 'var(--accent-primary)' : '#FFFFFF',
                  color: isSelected ? '#FFFFFF' : 'var(--text-secondary)',
                  border: isSelected ? '1px solid var(--accent-primary)' : '1px solid var(--border-subtle)',
                  borderRadius: '6px',
                  fontSize: '0.8rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'all 0.15s ease',
                  boxShadow: 'var(--shadow-xs)'
                }}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Search Input */}
        <div style={{ position: 'relative', minWidth: '240px' }}>
          <input
            type="text"
            placeholder="Search topics, oracles, gates..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              width: '100%',
              padding: '7px 12px 7px 32px',
              backgroundColor: '#FFFFFF',
              border: '1px solid var(--border-medium)',
              borderRadius: '6px',
              fontSize: '0.825rem',
              color: 'var(--text-primary)',
              outline: 'none',
              boxSizing: 'border-box'
            }}
          />
          <svg
            width="13"
            height="13"
            viewBox="0 0 24 24"
            fill="none"
            stroke="var(--text-muted)"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)' }}
          >
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
        </div>
      </div>

      {/* Modules List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
        {filteredModules.map((mod) => {
          const modProgress = progress?.completed_modules?.includes(mod.id);

          return (
            <div
              key={mod.id}
              style={{
                backgroundColor: '#FFFFFF',
                border: '1px solid var(--border-subtle)',
                borderRadius: '10px',
                padding: '26px',
                boxShadow: 'var(--shadow-sm)',
                transition: 'all 0.15s ease'
              }}
            >
              {/* Module Header */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '18px', flexWrap: 'wrap', gap: '14px' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                    <span style={{ fontSize: '0.725rem', fontWeight: 700, padding: '3px 8px', backgroundColor: '#EFF6FF', color: 'var(--accent-primary)', borderRadius: '4px', border: '1px solid #BFDBFE', fontFamily: 'var(--font-mono)' }}>
                      MODULE {mod.order || mod.id}
                    </span>
                    {modProgress && (
                      <span style={{ fontSize: '0.75rem', color: '#15803D', fontWeight: 700, fontFamily: 'var(--font-mono)' }}>✓ COMPLETED</span>
                    )}
                  </div>
                  <h3 style={{ fontSize: '1.35rem', margin: 0, color: 'var(--text-primary)', fontWeight: 700 }}>
                    {mod.title}
                  </h3>
                  <p style={{ margin: '6px 0 0 0', color: 'var(--text-secondary)', fontSize: '0.9rem', maxWidth: '750px', lineHeight: 1.5 }}>
                    {mod.description}
                  </p>
                </div>
              </div>

              {/* Lessons Grid in Module */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '14px', marginTop: '16px' }}>
                {(mod.lessons || []).map((les) => {
                  const isLessonDone = progress?.completed_lessons?.includes(les.id);
                  const conceptMastery = mastery?.concepts?.[les.concept_id];
                  const status = isLessonDone ? (conceptMastery?.mastery_status || 'COMPLETED') : (progress?.started_lessons?.includes(les.id) ? 'IN_PROGRESS' : 'NOT_STARTED');

                  return (
                    <div
                      key={les.id}
                      onClick={() => onSelectLesson(les.id)}
                      style={{
                        padding: '16px',
                        backgroundColor: '#F8FAFC',
                        border: '1px solid var(--border-subtle)',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        gap: '12px',
                        transition: 'all 0.15s ease'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.borderColor = 'var(--accent-primary)';
                        e.currentTarget.style.backgroundColor = '#FFFFFF';
                        e.currentTarget.style.boxShadow = 'var(--shadow-md)';
                        e.currentTarget.style.transform = 'translateY(-2px)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.borderColor = 'var(--border-subtle)';
                        e.currentTarget.style.backgroundColor = '#F8FAFC';
                        e.currentTarget.style.boxShadow = 'none';
                        e.currentTarget.style.transform = 'translateY(0)';
                      }}
                    >
                      <div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>{les.time_minutes || 10} min • {les.difficulty || 'Beginner'}</span>
                          <MasteryBadge status={status} />
                        </div>
                        <h4 style={{ fontSize: '0.95rem', margin: '0 0 6px 0', color: 'var(--text-primary)', fontWeight: 700 }}>
                          {les.title}
                        </h4>
                        <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: 1.4 }}>
                          {les.description || les.summary}
                        </p>
                      </div>

                      <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--accent-primary)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                        OPEN LESSON →
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

