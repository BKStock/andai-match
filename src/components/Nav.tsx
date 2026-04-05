'use client'

import Link from 'next/link'
import { useApp } from '@/context/AppContext'

export default function Nav() {
  const { theme, lang, toggleTheme, toggleLang } = useApp()

  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 300,
      padding: '0 20px', height: '60px',
      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      background: theme === 'dark' ? 'rgba(6,6,8,0.85)' : 'rgba(242,242,247,0.9)',
      backdropFilter: 'blur(24px)',
      borderBottom: '1px solid var(--pp-border)',
    }}>
      <Link href="/" style={{ textDecoration: 'none' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{
            width: 30, height: 30, borderRadius: 9,
            background: 'var(--pp-rg)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <span className="syne-heading" style={{ fontSize: 18, color: 'var(--pp-text)', letterSpacing: '-0.5px' }}>
            PayPay <span style={{ color: 'var(--pp-red)' }}>Match</span>
          </span>
        </div>
      </Link>

      <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
        <button
          onClick={toggleLang}
          className="pp-nav-pill"
          style={{ fontFamily: "'Inter', sans-serif" }}
        >
          <span className="jp-text">EN</span>
          <span className="en-text">JP</span>
        </button>
        <button
          onClick={toggleTheme}
          style={{
            width: 36, height: 36, borderRadius: '50%',
            background: 'var(--pp-surface)',
            border: '1px solid var(--pp-border)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer', fontSize: 15, transition: 'border-color 0.2s',
          }}
        >
          {theme === 'dark' ? '☀️' : '🌙'}
        </button>
        <Link href="/register" className="pp-btn" style={{ width: 'auto', padding: '8px 16px', fontSize: 13 }}>
          <span className="jp-text">無料で始める</span>
          <span className="en-text">Get Started</span>
        </Link>
      </div>
    </nav>
  )
}
