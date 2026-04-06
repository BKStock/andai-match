'use client'

import Link from 'next/link'
import { useEffect, useRef } from 'react'
import Nav from '@/components/Nav'

const RATE_USDT = '6.45'
const RATE_CASH = '620'
const FEE = '3.5'

export default function LPPage() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(e => {
          if (e.isIntersecting) e.target.classList.add('visible')
        })
      },
      { threshold: 0.1 }
    )
    document.querySelectorAll('.anim').forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <div ref={ref} className="pp-body">
      <Nav />

      {/* Hero */}
      <section style={{
        paddingTop: 120, paddingBottom: 60, padding: '120px 20px 60px',
        position: 'relative', overflow: 'hidden',
        background: [
          'radial-gradient(ellipse 120% 80% at 50% -10%, rgba(229,57,53,0.18) 0%, transparent 60%)',
          'radial-gradient(ellipse 70% 50% at 15% 110%, rgba(0,229,160,0.06) 0%, transparent 60%)',
          'var(--pp-bg)',
        ].join(', '),
      }}>
        <div style={{ maxWidth: 600, margin: '0 auto', textAlign: 'center' }}>
          <div className="anim" style={{ display: 'flex', justifyContent: 'center', marginBottom: 20 }}>
            <span style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              background: 'rgba(0,229,160,0.08)',
              border: '1px solid rgba(0,229,160,0.2)',
              borderRadius: 100, padding: '6px 14px',
              fontSize: 12, fontWeight: 700, color: 'var(--pp-green)',
            }}>
              <span className="live-dot" />
              <span className="jp-text">レート更新中</span>
              <span className="en-text">Live Rates</span>
            </span>
          </div>

          <h1 className="anim d1 syne-heading" style={{
            fontSize: 'clamp(28px,8vw,46px)', lineHeight: 1.12,
            letterSpacing: '-1.5px', marginBottom: 20,
          }}>
            <span className="jp-text">
              PayPayマネーライトを<br />
              <span style={{ color: 'var(--pp-red)' }}>現金・USDT</span>に換金
            </span>
            <span className="en-text">
              Convert PayPay MoneyLight<br />
              to <span style={{ color: 'var(--pp-red)' }}>Cash & USDT</span>
            </span>
          </h1>

          <p className="anim d2" style={{
            fontSize: 15, lineHeight: 1.7, color: 'var(--pp-text-2)',
            maxWidth: 460, margin: '0 auto 32px',
          }}>
            <span className="jp-text">日本唯一のマネーライト換金サービス。送金→即時変換→出金まで最短5分。</span>
            <span className="en-text">Japan&apos;s only MoneyLight exchange. Send → Convert → Withdraw in as little as 5 minutes.</span>
          </p>

          <div className="anim d3" style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap', marginBottom: 32 }}>
            <Link href="/register" className="pp-btn" style={{ width: 'auto', padding: '15px 32px', fontSize: 15 }}>
              <span className="jp-text">無料で始める →</span>
              <span className="en-text">Get Started Free →</span>
            </Link>
            <a href="#how" className="pp-btn-ghost" style={{ padding: '15px 24px' }}>
              <span className="jp-text">仕組みを見る</span>
              <span className="en-text">How It Works</span>
            </a>
          </div>

          <div className="anim d4" style={{ display: 'flex', gap: 10, justifyContent: 'center', flexWrap: 'wrap' }}>
            {[
              { icon: '🔒', jp: 'SSL暗号化', en: 'SSL Encrypted' },
              { icon: '⚡', jp: '即時処理', en: 'Instant' },
              { icon: '✅', jp: '本人確認済', en: 'KYC Verified' },
            ].map(b => (
              <span key={b.jp} className="pp-trust">
                <span>{b.icon}</span>
                <span className="jp-text">{b.jp}</span>
                <span className="en-text">{b.en}</span>
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Rate Card */}
      <section style={{ padding: '0 20px 48px' }}>
        <div style={{ maxWidth: 480, margin: '0 auto' }}>
          <div className="pp-card anim" style={{ padding: 20 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
              <span className="pp-label" style={{ marginBottom: 0 }}>
                <span className="jp-text">現在のレート</span>
                <span className="en-text">Current Rates</span>
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: 'var(--pp-green)' }}>
                <span className="live-dot" />
                <span className="jp-text">リアルタイム</span>
                <span className="en-text">Real-time</span>
              </span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {[
                { label_jp: 'USDT (TRC20)', label_en: 'USDT (TRC20)', val: `¥1,000 → ${RATE_USDT} USDT`, color: 'var(--pp-green)', sub_jp: 'テザー送金', sub_en: 'Tether Transfer' },
                { label_jp: '現金振込', label_en: 'Cash Transfer', val: `¥1,000 → ¥${RATE_CASH}`, color: 'var(--pp-gold)', sub_jp: '銀行振込', sub_en: 'Bank Transfer' },
              ].map(r => (
                <div key={r.label_jp} style={{
                  background: 'var(--pp-elevated)', border: '1px solid var(--pp-border)',
                  borderRadius: 14, padding: '14px 16px',
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                }}>
                  <div>
                    <div style={{ fontWeight: 700, marginBottom: 2, fontSize: 14 }}>
                      <span className="jp-text">{r.label_jp}</span>
                      <span className="en-text">{r.label_en}</span>
                    </div>
                    <div style={{ fontSize: 12, color: 'var(--pp-text-2)' }}>
                      <span className="jp-text">{r.sub_jp}</span>
                      <span className="en-text">{r.sub_en}</span>
                    </div>
                  </div>
                  <span className="mono-val" style={{ color: r.color, fontSize: 13 }}>{r.val}</span>
                </div>
              ))}
            </div>
            <div style={{ marginTop: 12, textAlign: 'center', fontSize: 11, color: 'var(--pp-text-3)' }}>
              <span className="jp-text">手数料 {FEE}% 込み · 最小 ¥1,000</span>
              <span className="en-text">{FEE}% fee included · Min ¥1,000</span>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how" style={{ padding: '40px 20px' }}>
        <div style={{ maxWidth: 480, margin: '0 auto' }}>
          <div className="anim" style={{ marginBottom: 28 }}>
            <span className="pp-label">
              <span className="jp-text">使い方</span>
              <span className="en-text">How It Works</span>
            </span>
            <h2 className="syne-heading" style={{ fontSize: 'clamp(20px,5vw,26px)', letterSpacing: '-0.5px' }}>
              <span className="jp-text">3ステップで完了</span>
              <span className="en-text">3 Simple Steps</span>
            </h2>
          </div>
          <div className="pp-card anim d1" style={{ overflow: 'hidden' }}>
            {[
              { n: '01', tj: 'PayPay送金', te: 'Send PayPay', dj: '指定IDにPayPayで送金。マネーライト対応。', de: 'Send PayPay to our ID. MoneyLight supported.' },
              { n: '02', tj: 'ポイント確認', te: 'Points Confirmed', dj: '受取確認後、即座にポイントへ変換します。', de: 'After confirmation, points are converted instantly.' },
              { n: '03', tj: 'USDT / 現金受取', te: 'Receive USDT / Cash', dj: '選択した方法で即時送金。最短5分。', de: 'Instant transfer via your chosen method. Min 5 mins.' },
            ].map((s, i) => (
              <div key={s.n} style={{
                display: 'flex', gap: 16, padding: '20px',
                borderBottom: i < 2 ? '1px solid var(--pp-border)' : 'none',
                alignItems: 'flex-start',
              }}>
                <div className="step-circle">{s.n}</div>
                <div>
                  <div style={{ fontWeight: 700, marginBottom: 4, fontSize: 15 }}>
                    <span className="jp-text">{s.tj}</span>
                    <span className="en-text">{s.te}</span>
                  </div>
                  <div style={{ fontSize: 13, color: 'var(--pp-text-2)', lineHeight: 1.6 }}>
                    <span className="jp-text">{s.dj}</span>
                    <span className="en-text">{s.de}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features grid */}
      <section style={{ padding: '40px 20px' }}>
        <div style={{ maxWidth: 480, margin: '0 auto' }}>
          <div className="anim" style={{ marginBottom: 24 }}>
            <span className="pp-label">
              <span className="jp-text">特徴</span>
              <span className="en-text">Features</span>
            </span>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            {[
              { icon: '🇯🇵', tj: '日本唯一', te: 'Japan Exclusive', dj: 'マネーライト換金対応', de: 'MoneyLight exchange' },
              { icon: '⚡', tj: '即時処理', te: 'Instant', dj: '最短5分で着金', de: 'Arrives in 5 min' },
              { icon: '🔒', tj: '安全・匿名', te: 'Secure & Private', dj: 'SSL + 本人確認', de: 'SSL + KYC verified' },
              { icon: '💱', tj: '低手数料', te: 'Low Fees', dj: `業界最安 ${FEE}%`, de: `Industry low ${FEE}%` },
            ].map(f => (
              <div key={f.tj} className="pp-card anim d1" style={{ padding: '18px 16px' }}>
                <div style={{ fontSize: 22, marginBottom: 10 }}>{f.icon}</div>
                <div style={{ fontWeight: 700, marginBottom: 4, fontSize: 14 }}>
                  <span className="jp-text">{f.tj}</span>
                  <span className="en-text">{f.te}</span>
                </div>
                <div style={{ fontSize: 12, color: 'var(--pp-text-2)' }}>
                  <span className="jp-text">{f.dj}</span>
                  <span className="en-text">{f.de}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: '40px 20px 80px' }}>
        <div style={{ maxWidth: 480, margin: '0 auto', textAlign: 'center' }}>
          <div className="pp-card anim" style={{
            padding: '40px 24px',
            background: 'linear-gradient(135deg, rgba(229,57,53,0.06), rgba(0,229,160,0.03))',
          }}>
            <h2 className="syne-heading" style={{ fontSize: 'clamp(20px,5vw,26px)', marginBottom: 12, letterSpacing: '-0.5px' }}>
              <span className="jp-text">今すぐ無料登録</span>
              <span className="en-text">Sign Up Free Today</span>
            </h2>
            <p style={{ color: 'var(--pp-text-2)', marginBottom: 24, fontSize: 14 }}>
              <span className="jp-text">30秒で登録完了。手数料なし。いつでも退会可能。</span>
              <span className="en-text">Register in 30 seconds. No fee. Cancel anytime.</span>
            </p>
            <Link href="/register" className="pp-btn">
              <span className="jp-text">無料で始める →</span>
              <span className="en-text">Get Started Free →</span>
            </Link>
          </div>
        </div>
      </section>

      <footer style={{
        padding: '24px 20px', borderTop: '1px solid var(--pp-border)',
        textAlign: 'center', color: 'var(--pp-text-3)', fontSize: 12,
      }}>
        <div className="syne-heading" style={{ marginBottom: 8, color: 'var(--pp-text-2)', fontSize: 14 }}>
          PayPay <span style={{ color: 'var(--pp-red)' }}>Match</span>
        </div>
        <div>
          <span className="jp-text">© 2026 PayPay Match. 全著作権所有。</span>
          <span className="en-text">© 2026 PayPay Match. All rights reserved.</span>
        </div>
      </footer>
    </div>
  )
}
