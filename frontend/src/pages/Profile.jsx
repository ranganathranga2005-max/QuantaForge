import React, { useState, useEffect } from 'react';
import MasteryBadge from '../components/learning/MasteryBadge';
import { fetchProgress, fetchMastery } from '../services/learningApi';

export default function Profile() {
  const [profile, setProfile] = useState(null);
  const [progress, setProgress] = useState(null);
  const [mastery, setMastery] = useState(null);

  useEffect(() => {
    async function loadAccountData() {
      try {
        const res = await fetch('/api/auth/me');
        if (res.ok) {
          const data = await res.json();
          setProfile(data.profile);
        }
        const [progData, mastData] = await Promise.all([
          fetchProgress(),
          fetchMastery()
        ]);
        if (progData) setProgress(progData);
        if (mastData) setMastery(mastData);
      } catch (err) {
        console.warn('Account profile load error:', err);
      }
    }
    loadAccountData();
  }, []);

  const conceptList = Object.entries(mastery?.concepts || {});

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', overflowY: 'auto', backgroundColor: 'var(--bg-primary)' }}>
      {/* Page Header */}
      <div className="workspace-header" style={{ borderBottom: '1px solid var(--border-subtle)', padding: '24px 40px', backgroundColor: 'var(--bg-panel)' }}>
        <div style={{ fontSize: '0.8rem', color: 'var(--accent-secondary)', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '4px' }}>
          Platform Student Account
        </div>
        <h1 style={{ margin: 0, fontSize: '2.2rem', color: 'var(--text-primary)', letterSpacing: '-0.02em' }}>
          Student Identity & Platform Settings
        </h1>
      </div>

      <div className="workspace-content" style={{ maxWidth: '1040px', margin: '0 auto', width: '100%', padding: '40px' }}>
        
        {/* Account Identity Card */}
        <div style={{
          backgroundColor: 'var(--bg-panel)',
          border: '1px solid var(--border-active)',
          borderRadius: '12px',
          padding: '32px',
          marginBottom: '32px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '24px'
        }}>
          <div>
            <div style={{ fontSize: '0.85rem', color: 'var(--accent-primary)', fontFamily: 'monospace', fontWeight: 600 }}>
              {profile ? profile.user_id : 'STUDENT_GUEST'}
            </div>
            <h2 style={{ fontSize: '2rem', color: 'var(--text-primary)', margin: '8px 0 4px 0' }}>
              {profile ? profile.username : 'Default Student User'}
            </h2>
            <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
              Level: <strong style={{ color: 'var(--accent-secondary)' }}>{profile ? profile.level : 'Foundational Scholar'}</strong>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '16px' }}>
            <div style={{ padding: '16px 24px', backgroundColor: 'var(--bg-primary)', border: '1px solid var(--border-subtle)', borderRadius: '8px', textAlign: 'center' }}>
              <div style={{ fontSize: '1.6rem', fontWeight: 700, color: 'var(--accent-primary)', fontFamily: 'monospace' }}>
                {progress?.completed_lessons?.length || 0}
              </div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', marginTop: '4px' }}>
                Completed Lessons
              </div>
            </div>
            <div style={{ padding: '16px 24px', backgroundColor: 'var(--bg-primary)', border: '1px solid var(--border-subtle)', borderRadius: '8px', textAlign: 'center' }}>
              <div style={{ fontSize: '1.6rem', fontWeight: 700, color: 'var(--gate-y)', fontFamily: 'monospace' }}>
                {mastery?.average_score !== undefined ? `${Math.round(mastery.average_score)}%` : 'N/A'}
              </div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', marginTop: '4px' }}>
                Avg Quiz Score
              </div>
            </div>
          </div>
        </div>

        {/* Concept Mastery Evidence */}
        <div style={{ marginBottom: '40px' }}>
          <h3 style={{ fontSize: '1.1rem', color: 'var(--text-muted)', margin: '0 0 16px 0', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
            Concept Mastery & Evidence Record
          </h3>

          <div style={{ backgroundColor: 'var(--bg-panel)', border: '1px solid var(--border-subtle)', borderRadius: '8px', overflow: 'hidden' }}>
            {conceptList.length === 0 ? (
              <div style={{ padding: '32px', textAlign: 'center', color: 'var(--text-muted)', fontStyle: 'italic' }}>
                No active mastery records. Complete lessons and assessments to record mastery evidence.
              </div>
            ) : (
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
                      <td style={{ padding: '16px 24px', fontFamily: 'monospace', color: 'var(--text-muted)' }}>
                        {data.assessment_score !== undefined ? `${data.assessment_score}%` : 'N/A'}
                      </td>
                      <td style={{ padding: '16px 24px', fontFamily: 'monospace', color: 'var(--text-muted)' }}>
                        {data.exercise_attempts_count || 0}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>

        {/* Student Communication & Platform Integration Boundary */}
        <div style={{ backgroundColor: 'var(--bg-panel)', border: '1px solid var(--border-subtle)', borderRadius: '8px', padding: '24px' }}>
          <h3 style={{ fontSize: '1.1rem', color: 'var(--text-primary)', margin: '0 0 8px 0' }}>
            Platform Communication & Mail API Boundary
          </h3>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', margin: '0 0 16px 0', lineHeight: 1.5 }}>
            Automated email notifications, assignment dispatch, and progress certificates integrate via environment-configured SMTP/Mail providers.
          </p>
          <div style={{
            padding: '12px 16px',
            backgroundColor: 'rgba(239, 68, 68, 0.08)',
            border: '1px solid rgba(239, 68, 68, 0.25)',
            borderRadius: '6px',
            color: 'var(--gate-x)',
            fontSize: '0.85rem',
            fontFamily: 'monospace'
          }}>
            ℹ Communication service is not configured (mail API integration ready).
          </div>
        </div>

      </div>
    </div>
  );
}
