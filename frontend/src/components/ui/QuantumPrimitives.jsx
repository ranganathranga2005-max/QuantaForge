import React from 'react';

/**
 * QUANTUM DESIGN SYSTEM PRIMITIVES
 * Standardized design tokens & components for QuantumLearning UI/UX Architecture
 */

// Spacing Scale: 8px (0.5rem), 12px (0.75rem), 16px (1rem), 24px (1.5rem), 32px (2rem), 48px (3rem)

export function QuantumPage({ children, env = 'learn', maxWidth = 1200, className = '', style = {} }) {
  // Environmental visual identities
  const envStyles = {
    learn: { bg: 'var(--bg-primary)' },
    lab: { bg: 'linear-gradient(180deg, #07090E 0%, #05060A 100%)' },
    experiments: { bg: 'linear-gradient(180deg, #06080F 0%, #070B14 100%)' },
    algorithms: { bg: 'linear-gradient(180deg, #070810 0%, #05060C 100%)' },
    aitutor: { bg: 'linear-gradient(180deg, #06070C 0%, #05060A 100%)' },
  };

  const currentEnv = envStyles[env] || envStyles.learn;

  return (
    <div 
      className={`quantum-page ${className}`} 
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        width: '100%',
        overflowY: 'auto',
        background: currentEnv.bg,
        boxSizing: 'border-box',
        ...style
      }}
    >
      <div 
        style={{
          maxWidth: `${maxWidth}px`,
          width: '100%',
          margin: '0 auto',
          padding: '32px 32px 64px 32px',
          boxSizing: 'border-box',
          display: 'flex',
          flexDirection: 'column',
          gap: '24px'
        }}
      >
        {children}
      </div>
    </div>
  );
}

export function QuantumHeader({ title, subtitle, category, actions, breadcrumb }) {
  return (
    <div 
      style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'flex-start', 
        paddingBottom: '20px', 
        borderBottom: '1px solid var(--border-subtle)',
        flexWrap: 'wrap',
        gap: '16px'
      }}
    >
      <div style={{ maxWidth: '750px' }}>
        {breadcrumb && (
          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '8px', fontFamily: 'monospace' }}>
            {breadcrumb}
          </div>
        )}
        {category && (
          <div style={{ color: 'var(--accent-secondary)', fontSize: '0.8rem', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '8px', fontFamily: 'monospace' }}>
            {category}
          </div>
        )}
        <h1 style={{ fontSize: '2.4rem', fontWeight: 700, margin: 0, letterSpacing: '-0.02em', color: 'var(--text-primary)', lineHeight: 1.15 }}>
          {title}
        </h1>
        {subtitle && (
          <p style={{ fontSize: '1.05rem', color: 'var(--text-muted)', margin: '10px 0 0 0', lineHeight: 1.5 }}>
            {subtitle}
          </p>
        )}
      </div>
      {actions && (
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          {actions}
        </div>
      )}
    </div>
  );
}

export function QuantumPanel({ children, title, subtitle, badgeText, badgeVariant = 'cyan', actions, className = '', style = {} }) {
  return (
    <div 
      className={`quantum-panel ${className}`}
      style={{
        backgroundColor: 'rgba(11, 17, 33, 0.75)',
        backdropFilter: 'blur(12px)',
        border: '1px solid var(--border-subtle)',
        borderRadius: '8px',
        padding: '24px',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4), inset 0 1px 1px rgba(255, 255, 255, 0.05)',
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
        ...style
      }}
    >
      {(title || badgeText || actions) && (
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: title ? '1px solid rgba(30, 41, 59, 0.6)' : 'none', paddingBottom: title ? '14px' : '0' }}>
          <div>
            {title && <h3 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 600, color: 'var(--text-primary)' }}>{title}</h3>}
            {subtitle && <p style={{ margin: '4px 0 0 0', fontSize: '0.85rem', color: 'var(--text-muted)' }}>{subtitle}</p>}
          </div>
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            {badgeText && <QuantumBadge variant={badgeVariant}>{badgeText}</QuantumBadge>}
            {actions}
          </div>
        </div>
      )}
      {children}
    </div>
  );
}

export function QuantumCard({ children, onClick, active = false, hoverable = true, className = '', style = {} }) {
  return (
    <div
      className={className}
      onClick={onClick}
      style={{
        backgroundColor: active ? 'rgba(6, 182, 212, 0.12)' : 'var(--bg-panel)',
        border: active ? '1px solid var(--accent-secondary)' : '1px solid var(--border-subtle)',
        borderRadius: '8px',
        padding: '20px',
        cursor: onClick ? 'pointer' : 'default',
        transition: 'all 0.2s ease',
        ...style
      }}
      onMouseEnter={(e) => {
        if (hoverable && onClick) {
          e.currentTarget.style.borderColor = 'var(--border-active)';
          e.currentTarget.style.transform = 'translateY(-2px)';
        }
      }}
      onMouseLeave={(e) => {
        if (hoverable && onClick) {
          e.currentTarget.style.borderColor = active ? 'var(--accent-secondary)' : 'var(--border-subtle)';
          e.currentTarget.style.transform = 'translateY(0)';
        }
      }}
    >
      {children}
    </div>
  );
}

export function QuantumButton({ children, onClick, variant = 'primary', size = 'medium', disabled = false, loading = false, style = {}, type = 'button' }) {
  const sizePadding = {
    small: '6px 12px',
    medium: '10px 18px',
    large: '14px 28px'
  }[size] || '10px 18px';

  const sizeFontSize = {
    small: '0.8rem',
    medium: '0.9rem',
    large: '1rem'
  }[size] || '0.9rem';

  const variants = {
    primary: {
      bg: 'linear-gradient(135deg, #06b6d4 0%, #3b82f6 100%)',
      color: '#0b1120',
      border: 'none',
      boxShadow: '0 0 15px rgba(6, 182, 212, 0.3)'
    },
    secondary: {
      bg: 'rgba(30, 41, 59, 0.8)',
      color: 'var(--text-primary)',
      border: '1px solid var(--border-subtle)',
      boxShadow: 'none'
    },
    outline: {
      bg: 'transparent',
      color: 'var(--accent-secondary)',
      border: '1px solid var(--accent-secondary)',
      boxShadow: 'none'
    },
    danger: {
      bg: 'rgba(239, 68, 68, 0.15)',
      color: 'var(--gate-x)',
      border: '1px solid var(--gate-x)',
      boxShadow: 'none'
    },
    ghost: {
      bg: 'transparent',
      color: 'var(--text-muted)',
      border: 'none',
      boxShadow: 'none'
    }
  };

  const v = variants[variant] || variants.primary;

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      style={{
        background: v.bg,
        color: v.color,
        fontWeight: 600,
        fontFamily: 'monospace',
        fontSize: sizeFontSize,
        letterSpacing: '0.05em',
        padding: sizePadding,
        border: v.border,
        borderRadius: '6px',
        cursor: disabled || loading ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.5 : 1,
        transition: 'all 0.2s ease',
        boxShadow: v.boxShadow,
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '8px',
        ...style
      }}
    >
      {loading && (
        <span 
          style={{
            width: '14px',
            height: '14px',
            border: '2px solid currentColor',
            borderTopColor: 'transparent',
            borderRadius: '50%',
            animation: 'spin 0.8s linear infinite',
            display: 'inline-block'
          }} 
        />
      )}
      {children}
    </button>
  );
}

export function QuantumSelect({ options, value, onChange, label, disabled = false, style = {} }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', ...style }}>
      {label && <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontFamily: 'monospace' }}>{label}</label>}
      <select
        value={value}
        onChange={onChange}
        disabled={disabled}
        style={{
          padding: '10px 14px',
          backgroundColor: 'rgba(15, 23, 42, 0.9)',
          color: 'var(--text-primary)',
          border: '1px solid var(--border-subtle)',
          borderRadius: '6px',
          fontFamily: 'monospace',
          fontSize: '0.9rem',
          cursor: disabled ? 'not-allowed' : 'pointer',
          outline: 'none',
          transition: 'all 0.2s ease'
        }}
      >
        {options.map((opt) => (
          <option key={opt.value ?? opt.id} value={opt.value ?? opt.id}>
            {opt.label ?? opt.name ?? opt.title}
          </option>
        ))}
      </select>
    </div>
  );
}

export function QuantumInput({ value, onChange, placeholder, type = 'text', label, error, disabled = false, style = {} }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', ...style }}>
      {label && <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontFamily: 'monospace' }}>{label}</label>}
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        style={{
          padding: '10px 14px',
          backgroundColor: 'rgba(15, 23, 42, 0.9)',
          color: 'var(--text-primary)',
          border: error ? '1px solid var(--gate-x)' : '1px solid var(--border-subtle)',
          borderRadius: '6px',
          fontFamily: 'monospace',
          fontSize: '0.9rem',
          outline: 'none',
          transition: 'all 0.2s ease'
        }}
      />
      {error && <span style={{ fontSize: '0.75rem', color: 'var(--gate-x)' }}>{error}</span>}
    </div>
  );
}

export function QuantumBadge({ children, variant = 'cyan' }) {
  const colors = {
    cyan: { bg: 'rgba(6, 182, 212, 0.15)', text: '#06b6d4', border: 'rgba(6, 182, 212, 0.4)' },
    violet: { bg: 'rgba(139, 92, 246, 0.15)', text: '#a78bfa', border: 'rgba(139, 92, 246, 0.4)' },
    green: { bg: 'rgba(34, 197, 94, 0.15)', text: '#4ade80', border: 'rgba(34, 197, 94, 0.4)' },
    amber: { bg: 'rgba(245, 158, 11, 0.15)', text: '#fbbf24', border: 'rgba(245, 158, 11, 0.4)' },
    red: { bg: 'rgba(239, 68, 68, 0.15)', text: '#f87171', border: 'rgba(239, 68, 68, 0.4)' }
  };
  const c = colors[variant] || colors.cyan;

  return (
    <span style={{
      fontSize: '0.75rem',
      fontWeight: 600,
      fontFamily: 'monospace',
      letterSpacing: '0.05em',
      padding: '3px 8px',
      borderRadius: '4px',
      background: c.bg,
      color: c.text,
      border: `1px solid ${c.border}`,
      textTransform: 'uppercase',
      display: 'inline-flex',
      alignItems: 'center',
      gap: '4px'
    }}>
      {children}
    </span>
  );
}

export function QuantumTabs({ tabs, activeTab, onChangeTab }) {
  return (
    <div style={{ display: 'flex', gap: '4px', borderBottom: '1px solid var(--border-subtle)', marginBottom: '24px' }}>
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => onChangeTab(tab.id)}
            style={{
              padding: '12px 20px',
              backgroundColor: 'transparent',
              border: 'none',
              borderBottom: isActive ? '2px solid var(--accent-secondary)' : '2px solid transparent',
              color: isActive ? 'var(--accent-secondary)' : 'var(--text-muted)',
              fontWeight: 600,
              fontSize: '0.85rem',
              fontFamily: 'monospace',
              cursor: 'pointer',
              letterSpacing: '0.05em',
              transition: 'all 0.2s ease'
            }}
          >
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}

export function QuantumEmptyState({ title = 'No Data Recorded', description, actionLabel, onAction, icon }) {
  return (
    <div 
      style={{ 
        padding: '48px 24px', 
        textAlign: 'center', 
        backgroundColor: 'var(--bg-panel)', 
        borderRadius: '8px', 
        border: '1px solid var(--border-subtle)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '16px'
      }}
    >
      <div style={{ fontSize: '2.5rem', opacity: 0.7 }}>
        {icon || '🔬'}
      </div>
      <div style={{ maxWidth: '480px' }}>
        <h4 style={{ fontSize: '1.25rem', color: 'var(--text-primary)', margin: '0 0 8px 0', fontWeight: 600 }}>
          {title}
        </h4>
        {description && (
          <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)', margin: 0, lineHeight: 1.5 }}>
            {description}
          </p>
        )}
      </div>
      {actionLabel && onAction && (
        <QuantumButton onClick={onAction} style={{ marginTop: '8px' }}>
          {actionLabel}
        </QuantumButton>
      )}
    </div>
  );
}

export function QuantumLoadingState({ message = 'Executing Quantum Computations...' }) {
  return (
    <div style={{ padding: '64px 24px', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px', color: 'var(--text-muted)' }}>
      <div 
        style={{ 
          width: '32px', 
          height: '32px', 
          border: '3px solid var(--accent-secondary)', 
          borderTopColor: 'transparent', 
          borderRadius: '50%', 
          animation: 'spin 1s linear infinite' 
        }} 
      />
      <span style={{ fontSize: '0.95rem', fontFamily: 'monospace', letterSpacing: '0.05em' }}>{message}</span>
    </div>
  );
}

export function QuantumErrorState({ title = 'Quantum Execution Error', message, onRetry }) {
  return (
    <div 
      style={{ 
        padding: '32px', 
        backgroundColor: 'rgba(239, 68, 68, 0.08)', 
        borderRadius: '8px', 
        border: '1px solid var(--gate-x)', 
        color: 'var(--text-primary)',
        display: 'flex',
        flexDirection: 'column',
        gap: '16px'
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <span style={{ fontSize: '1.5rem', color: 'var(--gate-x)' }}>⚠️</span>
        <h4 style={{ margin: 0, fontSize: '1.2rem', color: 'var(--gate-x)', fontWeight: 600 }}>{title}</h4>
      </div>
      <p style={{ margin: 0, color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: 1.6 }}>
        {message}
      </p>
      {onRetry && (
        <div>
          <QuantumButton variant="danger" size="small" onClick={onRetry}>
            RETRY ACTION
          </QuantumButton>
        </div>
      )}
    </div>
  );
}

export function QuantumMetric({ label, value, unit = '', color = 'var(--accent-secondary)' }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', padding: '16px', backgroundColor: 'var(--bg-primary)', borderRadius: '6px', border: '1px solid var(--border-subtle)' }}>
      <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', fontFamily: 'monospace' }}>{label}</span>
      <span style={{ fontSize: '1.6rem', fontWeight: 700, color: color, fontFamily: 'monospace', marginTop: '4px' }}>
        {value !== undefined && value !== null ? value : 'N/A'}{unit && <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginLeft: '4px' }}>{unit}</span>}
      </span>
    </div>
  );
}

export function QuantumStatusIndicator({ status = 'ready', label = 'SYSTEM OPERATIONAL' }) {
  const isOk = status === 'ready' || status === 'operational';
  return (
    <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', fontFamily: 'monospace', fontSize: '0.75rem', color: isOk ? '#4ade80' : '#f87171' }}>
      <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: isOk ? '#22c55e' : '#ef4444', boxShadow: `0 0 8px ${isOk ? '#22c55e' : '#ef4444'}` }} />
      <span>{label}</span>
    </div>
  );
}
