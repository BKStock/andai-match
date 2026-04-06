'use client'

import Link from 'next/link'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Nav from '@/components/Nav'

export default function RegisterPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [agreed, setAgreed] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (!email || !password) {
      setError('メールとパスワードを入力してください。')
      return
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('有効なメールアドレスを入力してください。')
      return
    }
    if (password.length < 8) {
      setError('パスワードは8文字以上必要です。')
      return
    }
    if (!agreed) {
      setError('利用規約に同意してください。')
      return
    }

    setLoading(true)
    try {
      // Simulate registration
      await new Promise(r => setTimeout(r, 1200))
      router.push('/dashboard')
    } catch {
      setError('登録に失敗しました。もう一度お試しください。')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="pp-body" style={{ minHeight: '100vh' }}>
      <Nav />

      <main id="main-content" style={{
        minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '80px 20px 40px',
        background: [
          'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(229,57,53,0.1) 0%, transparent 60%)',
          'var(--pp-bg)',
        ].join(', '),
      }}>
        <div style={{ width: '100%', maxWidth: 400 }}>
          {/* Header */}
          <div style={{ textAlign: 'center', marginBottom: 32 }}>
            <h1 className="syne-heading" style={{ fontSize: 28, letterSpacing: '-0.5px', marginBottom: 8 }}>
              <span className="jp-text">アカウント作成</span>
              <span className="en-text">Create Account</span>
            </h1>
            <p style={{ color: 'var(--pp-text-2)', fontSize: 14 }}>
              <span className="jp-text">無料・30秒で完了</span>
              <span className="en-text">Free · 30 seconds</span>
            </p>
          </div>

          {/* Form card */}
          <div className="pp-card" style={{ padding: 24 }}>
            <form onSubmit={handleSubmit} noValidate>
              {/* Email */}
              <div style={{ marginBottom: 16 }}>
                <label htmlFor="register-email" style={{
                  display: 'block', marginBottom: 8, fontSize: 13,
                  fontWeight: 600, color: 'var(--pp-text-2)',
                }}>
                  <span className="jp-text">メールアドレス</span>
                  <span className="en-text">Email Address</span>
                </label>
                <input
                  id="register-email"
                  type="email"
                  className="pp-input"
                  placeholder="you@example.com"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  autoComplete="email"
                  aria-describedby={error ? 'register-error' : undefined}
                  aria-invalid={error ? true : undefined}
                  inputMode="email"
                  required
                />
              </div>

              {/* Password */}
              <div style={{ marginBottom: 20 }}>
                <label htmlFor="register-password" style={{
                  display: 'block', marginBottom: 8, fontSize: 13,
                  fontWeight: 600, color: 'var(--pp-text-2)',
                }}>
                  <span className="jp-text">パスワード</span>
                  <span className="en-text">Password</span>
                </label>
                <input
                  id="register-password"
                  type="password"
                  className="pp-input"
                  placeholder="8文字以上 / Min 8 characters"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  autoComplete="new-password"
                  aria-describedby={error ? 'register-error' : undefined}
                  aria-invalid={error ? true : undefined}
                  minLength={8}
                  required
                />
              </div>

              {/* Terms checkbox */}
              <label style={{
                display: 'flex', alignItems: 'flex-start', gap: 12,
                cursor: 'pointer', marginBottom: 20,
              }}>
                <div className="pp-checkbox-wrap" style={{ position: 'relative', flexShrink: 0, marginTop: 1 }}>
                  <input
                    type="checkbox"
                    checked={agreed}
                    onChange={e => setAgreed(e.target.checked)}
                    style={{ position: 'absolute', opacity: 0, width: 20, height: 20, cursor: 'pointer', margin: 0 }}
                  />
                  <div
                    aria-hidden="true"
                    className="pp-checkbox-visual"
                    style={{
                      width: 20, height: 20, borderRadius: 6,
                      border: `2px solid ${agreed ? 'var(--pp-red)' : 'var(--pp-border-strong)'}`,
                      background: agreed ? 'var(--pp-red)' : 'transparent',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      transition: 'border-color 0.15s, background 0.15s', pointerEvents: 'none',
                    }}
                  >
                    {agreed && (
                      <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                        <path d="M1 4l3 3 5-6" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    )}
                  </div>
                </div>
                <span style={{ fontSize: 13, color: 'var(--pp-text-2)', lineHeight: 1.5 }}>
                  <span className="jp-text">
                    <Link href="/terms" style={{ color: 'var(--pp-red)' }}>利用規約</Link>と
                    <Link href="/privacy" style={{ color: 'var(--pp-red)' }}>プライバシーポリシー</Link>に同意します
                  </span>
                  <span className="en-text">
                    I agree to the <Link href="/terms" style={{ color: 'var(--pp-red)' }}>Terms of Service</Link> and{' '}
                    <Link href="/privacy" style={{ color: 'var(--pp-red)' }}>Privacy Policy</Link>
                  </span>
                </span>
              </label>

              {/* Error */}
              {error && (
                <div
                  id="register-error"
                  role="alert"
                  style={{
                    background: 'rgba(229,57,53,0.08)', border: '1px solid rgba(229,57,53,0.2)',
                    borderRadius: 10, padding: '10px 14px', marginBottom: 16,
                    fontSize: 13, color: 'var(--pp-red)',
                  }}
                >
                  {error}
                </div>
              )}

              {/* Submit */}
              <button type="submit" className="pp-btn" disabled={loading}>
                {loading ? (
                  <span style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <span aria-hidden="true" className="spinner" style={{ width: 18, height: 18 }} />
                    <span className="jp-text">登録中...</span>
                    <span className="en-text">Registering...</span>
                  </span>
                ) : (
                  <>
                    <span className="jp-text">無料で始める →</span>
                    <span className="en-text">Get Started Free →</span>
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Login link */}
          <p style={{ textAlign: 'center', marginTop: 20, fontSize: 14, color: 'var(--pp-text-2)' }}>
            <span className="jp-text">アカウントをお持ちの方は</span>
            <span className="en-text">Already have an account? </span>
            {' '}
            <Link href="/dashboard" style={{ color: 'var(--pp-red)', fontWeight: 600, textDecoration: 'none' }}>
              <span className="jp-text">ログイン</span>
              <span className="en-text">Log In</span>
            </Link>
          </p>
        </div>
      </main>
    </div>
  )
}
