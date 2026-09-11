import React, { useState, useEffect, useCallback } from 'react'
import {
  BrowserRouter as Router,
  Routes, Route, NavLink, Navigate, useNavigate, useLocation
} from 'react-router-dom'

// Pages
import Dashboard       from './pages/Dashboard'
import Lab             from './pages/Lab'
import Learn           from './pages/Learn'
import Experiments     from './pages/Experiments'
import Algorithms      from './pages/Algorithms'
import AITutor         from './pages/AITutor'
import AssessmentProgress from './pages/AssessmentProgress'
import Course          from './pages/Course'
import Lesson          from './pages/Lesson'
import Assessment      from './pages/Assessment'
import Challenge       from './pages/Challenge'
import Profile         from './pages/Profile'
import Login           from './pages/Login'
import Register        from './pages/Register'

// Components
import LabErrorBoundary   from './components/ui/LabErrorBoundary'
import LivingVoidBackground from './components/ui/LivingVoidBackground'
import StudentProfileModal  from './components/auth/StudentProfileModal'
import FloatingChatBot      from './components/ai/FloatingChatBot'

// Auth service
import { getMe, logout as authLogout, getToken } from './services/authService'

// ─── SVG Icons ────────────────────────────────────────────────────────────────
const IconDashboard  = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="9" rx="1"/><rect x="14" y="3" width="7" height="5" rx="1"/><rect x="14" y="12" width="7" height="9" rx="1"/><rect x="3" y="16" width="7" height="5" rx="1"/></svg>
const IconLearn      = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>
const IconLab        = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M10 2v7.31"/><path d="M14 9.3V1.99"/><path d="M8.5 2h7"/><path d="M14 9.3a6.5 6.5 0 1 1-4 0"/><circle cx="12" cy="16" r="2.5"/></svg>
const IconExperiment = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 2v6l-3.5 7A3 3 0 0 0 5.2 19h13.6a3 3 0 0 0 2.7-4L18 8V2"/><path d="M6 2h12"/><path d="M6 14h12"/></svg>
const IconAlgorithm  = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="18" cy="18" r="3"/><circle cx="6" cy="6" r="3"/><path d="M13 6h3a2 2 0 0 1 2 2v7"/><line x1="6" y1="9" x2="6" y2="21"/></svg>
const IconChallenges = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="8" r="6"/><path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11"/></svg>
const IconAI         = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2a2 2 0 0 1 2 2c0 1.1-.9 2-2 2s-2-.9-2-2 2-2 2-2z"/><path d="M12 6v6"/><path d="M8 12h8"/><path d="M8 16h8"/><path d="M4 12c0-4.4 3.6-8 8-8s8 3.6 8 8-3.6 8-8 8-8-3.6-8-8z"/></svg>
const IconUser       = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
const IconLogout     = () => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>

// ─── Public-only route (redirect to / if logged in) ───────────────────────────
function PublicRoute({ isLoggedIn, children }) {
  if (isLoggedIn) return <Navigate to="/" replace />
  return children
}

// ─── Main App shell (needs Router context) ───────────────────────────────────
function AppShell() {
  const navigate = useNavigate()
  const location = useLocation()

  const [studentProfile, setStudentProfile] = useState(null)
  const [studentProgress, setStudentProgress] = useState(null)
  const [authReady, setAuthReady]   = useState(false)   // true once first /me call done
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false)

  // ── Restore auth on mount ────────────────────────────────────────────────
  useEffect(() => {
    async function restoreSession() {
      const token = getToken()
      if (!token) {
        setAuthReady(true)
        return
      }
      const data = await getMe()   // sends Bearer token
      if (data?.profile) {
        setStudentProfile(data.profile)
        setStudentProgress(data.progress)
      }
      setAuthReady(true)
    }
    restoreSession()
  }, [])

  // ── Listen for auth:login event dispatched by Login.jsx ──────────────────
  useEffect(() => {
    function onLogin(e) {
      const { profile, progress } = e.detail || {}
      setStudentProfile(profile || null)
      setStudentProgress(progress || null)
    }
    window.addEventListener('auth:login', onLogin)
    return () => window.removeEventListener('auth:login', onLogin)
  }, [])

  // ── Logout ───────────────────────────────────────────────────────────────
  const handleLogout = useCallback(async () => {
    await authLogout()
    setStudentProfile(null)
    setStudentProgress(null)
    navigate('/login')
  }, [navigate])

  // ── Auth modal success (existing StudentProfileModal flow) ───────────────
  const handleAuthSuccess = useCallback((data) => {
    setStudentProfile(data.profile || null)
    setStudentProgress(data.progress || null)
  }, [])

  // Auth-only route: show spinner until auth is resolved
  const isLoggedIn = !!studentProfile

  // Auth pages (login/register) — render without sidebar
  const isAuthPage = ['/login', '/register'].includes(location.pathname)

  if (!authReady) {
    return (
      <div style={{
        minHeight: '100vh', display: 'flex',
        alignItems: 'center', justifyContent: 'center',
        background: 'linear-gradient(135deg,#0F172A,#1E1B4B)'
      }}>
        <div style={{ textAlign: 'center', color: '#fff' }}>
          <div style={{
            width: '40px', height: '40px', margin: '0 auto 16px',
            border: '3px solid rgba(255,255,255,0.2)',
            borderTopColor: '#2563EB', borderRadius: '50%',
            animation: 'spin 0.8s linear infinite'
          }}/>
          <p style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.5)', margin: 0 }}>
            Loading Quantum Lab…
          </p>
        </div>
        <style>{`@keyframes spin { to { transform:rotate(360deg); }}`}</style>
      </div>
    )
  }

  // ── Auth pages layout (no sidebar) ──────────────────────────────────────
  if (isAuthPage) {
    return (
      <Routes>
        <Route path="/login"    element={<PublicRoute isLoggedIn={isLoggedIn}><Login /></PublicRoute>} />
        <Route path="/register" element={<PublicRoute isLoggedIn={isLoggedIn}><Register /></PublicRoute>} />
        <Route path="*"         element={<Navigate to="/" replace />} />
      </Routes>
    )
  }

  // ── Main app layout (with sidebar) ──────────────────────────────────────
  return (
    <div style={{ display:'flex', width:'100vw', height:'100vh', overflow:'hidden', position:'relative' }}>
      <LivingVoidBackground />

      {/* ── Sidebar ── */}
      <aside className="sidebar" style={{ display:'flex', flexDirection:'column', justifyContent:'space-between', height:'100vh', zIndex:20 }}>
        <div>
          {/* Brand */}
          <div className="sidebar-brand">
            <div style={{ width:'32px', height:'32px', borderRadius:'8px', backgroundColor:'#EFF6FF', border:'1px solid #BFDBFE', display:'flex', alignItems:'center', justifyContent:'center' }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--accent-primary)" strokeWidth="2.2">
                <circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="3"/>
                <path d="M12 2a10 10 0 0 1 10 10"/><path d="M12 2a15 15 0 0 0 0 20"/>
              </svg>
            </div>
            <div>
              <div style={{ fontSize:'0.95rem', fontWeight:800, color:'var(--text-primary)', letterSpacing:'-0.02em' }}>QUANTUM LAB</div>
              <div style={{ fontSize:'0.65rem', fontWeight:600, color:'var(--accent-primary)', textTransform:'uppercase', letterSpacing:'0.06em' }}>Academy & Simulator</div>
            </div>
          </div>

          {/* Nav links */}
          <div className="sidebar-nav">
            <div className="sidebar-section-header">ACADEMICS</div>
            <NavLink to="/" className={({isActive}) => isActive ? 'nav-item active' : 'nav-item'} end>
              <IconDashboard /> Overview &amp; Lab
            </NavLink>
            <NavLink to="/learn" className={({isActive}) => isActive ? 'nav-item active' : 'nav-item'}>
              <IconLearn /> Course Curriculum
            </NavLink>
            <NavLink to="/assessment" className={({isActive}) => isActive ? 'nav-item active' : 'nav-item'}>
              <IconChallenges /> Assessments &amp; Quizzes
            </NavLink>

            <div className="sidebar-section-header">SIMULATION ENGINE</div>
            <NavLink to="/lab" className={({isActive}) => isActive ? 'nav-item active' : 'nav-item'}>
              <IconLab /> Quantum Circuit Lab
            </NavLink>
            <NavLink to="/experiments" className={({isActive}) => isActive ? 'nav-item active' : 'nav-item'}>
              <IconExperiment /> Quantum Experiments
            </NavLink>
            <NavLink to="/algorithms" className={({isActive}) => isActive ? 'nav-item active' : 'nav-item'}>
              <IconAlgorithm /> Algorithm Engine
            </NavLink>

            <div className="sidebar-section-header">AI TUTOR</div>
            <NavLink to="/ai-tutor" className={({isActive}) => isActive ? 'nav-item active' : 'nav-item'}>
              <IconAI /> Quantum AI Tutor
            </NavLink>

            <div className="sidebar-section-header">STUDENT ACCOUNT</div>
            <NavLink to="/profile" className={({isActive}) => isActive ? 'nav-item active' : 'nav-item'}>
              <IconUser /> Student Profile
            </NavLink>
          </div>
        </div>

        {/* ── Sidebar bottom: user pill ── */}
        <div style={{ padding:'16px', borderTop:'1px solid var(--border-subtle)' }}>
          {isLoggedIn ? (
            /* Logged-in state */
            <div style={{ display:'flex', flexDirection:'column', gap:'6px' }}>
              {/* Avatar + info */}
              <div style={{
                display:'flex', alignItems:'center', gap:'10px',
                padding:'9px 12px',
                backgroundColor:'#EFF6FF',
                border:'1px solid #BFDBFE',
                borderRadius:'8px',
              }}>
                <div style={{
                  width:'30px', height:'30px', borderRadius:'50%',
                  background:'linear-gradient(135deg,#2563EB,#7C3AED)',
                  display:'flex', alignItems:'center', justifyContent:'center',
                  color:'#fff', fontWeight:800, fontSize:'0.8rem', flexShrink:0
                }}>
                  {studentProfile.username?.[0]?.toUpperCase() || 'U'}
                </div>
                <div style={{ flex:1, minWidth:0 }}>
                  <div style={{ fontWeight:700, fontSize:'0.825rem', color:'var(--text-primary)', overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>
                    {studentProfile.username}
                  </div>
                  <div style={{ fontSize:'0.7rem', color:'var(--accent-primary)', fontWeight:600 }}>
                    {studentProfile.level}
                  </div>
                </div>
              </div>

              {/* Logout button */}
              <button
                onClick={handleLogout}
                style={{
                  width:'100%', display:'flex', alignItems:'center',
                  justifyContent:'center', gap:'6px',
                  padding:'7px 12px',
                  backgroundColor:'transparent',
                  border:'1px solid var(--border-medium)',
                  borderRadius:'7px',
                  color:'var(--text-muted)',
                  cursor:'pointer', fontSize:'0.8rem',
                  transition:'all 0.15s'
                }}
                onMouseEnter={e => { e.currentTarget.style.backgroundColor='#FEF2F2'; e.currentTarget.style.color='#B91C1C'; e.currentTarget.style.borderColor='#FECACA'; }}
                onMouseLeave={e => { e.currentTarget.style.backgroundColor='transparent'; e.currentTarget.style.color='var(--text-muted)'; e.currentTarget.style.borderColor='var(--border-medium)'; }}
              >
                <IconLogout /> Sign Out
              </button>
            </div>
          ) : (
            /* Logged-out state */
            <div style={{ display:'flex', flexDirection:'column', gap:'6px' }}>
              <button
                onClick={() => navigate('/login')}
                style={{
                  width:'100%', padding:'9px 12px',
                  background:'linear-gradient(135deg,#2563EB,#7C3AED)',
                  color:'#fff', border:'none', borderRadius:'8px',
                  fontWeight:700, fontSize:'0.85rem', cursor:'pointer',
                  transition:'opacity 0.15s'
                }}
              >
                Sign In
              </button>
              <button
                onClick={() => navigate('/register')}
                style={{
                  width:'100%', padding:'8px 12px',
                  background:'transparent',
                  color:'var(--text-secondary)',
                  border:'1px solid var(--border-medium)',
                  borderRadius:'8px',
                  fontWeight:600, fontSize:'0.82rem', cursor:'pointer',
                  transition:'all 0.15s'
                }}
              >
                Create Account
              </button>
            </div>
          )}
        </div>
      </aside>

      {/* ── Main workspace ── */}
      <main className="workspace">
        <Routes>
          <Route path="/"           element={<Dashboard studentProfile={studentProfile} />} />
          <Route path="/dashboard"  element={<Navigate to="/" replace />} />
          <Route path="/learn"      element={<Learn />} />
          <Route path="/curriculum" element={<Navigate to="/learn" replace />} />
          <Route path="/learning"   element={<Learn />} />
          <Route path="/learning/courses/:courseId"          element={<Course />} />
          <Route path="/learning/lessons/:lessonId"          element={<Lesson />} />
          <Route path="/learning/assessments/:assessmentId"  element={<Assessment />} />
          <Route path="/learning/challenges/:challengeId"    element={<Challenge />} />
          <Route path="/assessment" element={<AssessmentProgress />} />
          <Route path="/progress"   element={<Navigate to="/assessment" replace />} />
          <Route path="/challenges" element={<Navigate to="/assessment" replace />} />
          <Route path="/lab"        element={<LabErrorBoundary><Lab /></LabErrorBoundary>} />
          <Route path="/experiments" element={<Experiments />} />
          <Route path="/algorithms"  element={<Algorithms />} />
          <Route path="/ai-tutor"    element={<AITutor />} />
          <Route path="/profile"     element={<Profile studentProfile={studentProfile} studentProgress={studentProgress} />} />
          {/* Catch-all */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      {/* Legacy modal (kept for backward compat with other pages) */}
      <StudentProfileModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        studentProfile={studentProfile}
        studentProgress={studentProgress}
        onAuthSuccess={handleAuthSuccess}
      />

      {/* Floating AI chatbot */}
      <FloatingChatBot pageContext="general" />
    </div>
  )
}

// ─── Root: provides Router context ───────────────────────────────────────────
export default function App() {
  return (
    <Router>
      <AppShell />
    </Router>
  )
}
