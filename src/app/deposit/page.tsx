'use client'

import Link from 'next/link'
import { useState } from 'react'
import Nav from '@/components/Nav'

type Step = 'select' | 'qr' | 'waiting' | 'success'

const AMOUNTS = [1000, 3000, 5000, 10000, 30000]
const PAYPAY_ID = '@paypay-match-jp'
const RATE_USDT = 6.45   // USDT per 1000 yen
const RATE_CASH = 0.62   // cash payout ratio (62% of deposited yen)
const QR_FILLED_CELLS = new Set([0,1,2,7,8,14,16,17,18,19,20,21,22,24,28,29,30,31,32,33,34,36,42,43,44,45,46,47,48])

export default function DepositPage() {
  const [step, setStep] = useState<Step>('select')
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null)
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(PAYPAY_ID)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // クリップボードアクセス不可の場合は無視
    }
  }

  const handleConfirmSent = () => setStep('waiting')

  const handleSimulateConfirm = () => {
    setTimeout(() => setStep('success'), 2000)
  }

  const estimatedUsdt = selectedAmount ? ((selectedAmount / 1000) * RATE_USDT).toFixed(2) : '0.00'
  const estimatedCash = selectedAmount ? Math.floor(selectedAmount * RATE_CASH).toLocaleString() : '0'

  // Step: Select amount
  if (step === 'select') {
    return (
      <div className="pp-body" style={{ minHeight: '100vh' }}>
        <Nav />
        <main style={{ padding: '80px 20px 48px' }}>
          <div style={{ maxWidth: 480, margin: '0 auto' }}>
            {/* Back */}
            <Link href="/dashboard" style={{
              display: 'inline-flex', alignItems: 'center', gap: 6,
              color: 'var(--pp-text-2)', fontSize: 14, textDecoration: 'none', marginBottom: 24,
            }}>
              ← <span className="jp-text">ダッシュボードへ</span>
              <span className="en-text">Back to Dashboard</span>
            </Link>

            <span className="pp-label">
              <span className="jp-text">PayPay入金</span>
              <span className="en-text">PayPay Deposit</span>
            </span>
            <h1 className="syne-heading" style={{ fontSize: 26, letterSpacing: '-0.5px', marginBottom: 8 }}>
              <span className="jp-text">金額を選択</span>
              <span className="en-text">Select Amount</span>
            </h1>
            <p style={{ fontSize: 14, color: 'var(--pp-text-2)', marginBottom: 28 }}>
              <span className="jp-text">送金するPayPay金額を選んでください</span>
              <span className="en-text">Choose the amount to send via PayPay</span>
            </p>

            {/* Amount grid */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 20 }}>
              {AMOUNTS.map(a => (
                <button
                  key={a}
                  type="button"
                  className={`pp-amount-btn${selectedAmount === a ? ' active' : ''}`}
                  onClick={() => setSelectedAmount(a)}
                >
                  ¥{a.toLocaleString()}
                </button>
              ))}
            </div>

            {/* Preview */}
            {selectedAmount && (
              <div className="pp-card" style={{ padding: '16px', marginBottom: 20 }}>
                <div style={{ fontSize: 12, color: 'var(--pp-text-3)', marginBottom: 12 }}>
                  <span className="jp-text">換算レート（概算）</span>
                  <span className="en-text">Estimated conversion</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12 }}>
                  <div style={{ textAlign: 'center', flex: 1 }}>
                    <div className="mono-val" style={{ color: 'var(--pp-green)', fontSize: 18 }}>{estimatedUsdt} USDT</div>
                    <div style={{ fontSize: 11, color: 'var(--pp-text-3)' }}>TRC20</div>
                  </div>
                  <div style={{ color: 'var(--pp-border)', fontSize: 20 }}>|</div>
                  <div style={{ textAlign: 'center', flex: 1 }}>
                    <div className="mono-val" style={{ color: 'var(--pp-gold)', fontSize: 18 }}>¥{estimatedCash}</div>
                    <div style={{ fontSize: 11, color: 'var(--pp-text-3)' }}>
                      <span className="jp-text">現金</span>
                      <span className="en-text">Cash</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <button
              type="button"
              className="pp-btn"
              disabled={!selectedAmount}
              onClick={() => setStep('qr')}
              style={{ opacity: selectedAmount ? 1 : 0.4, cursor: selectedAmount ? 'pointer' : 'not-allowed' }}
            >
              <span className="jp-text">次へ → 送金先を確認</span>
              <span className="en-text">Next → View Payment Details</span>
            </button>
          </div>
        </main>
      </div>
    )
  }

  // Step: QR / send
  if (step === 'qr') {
    return (
      <div className="pp-body" style={{ minHeight: '100vh' }}>
        <Nav />
        <main style={{ padding: '80px 20px 48px' }}>
          <div style={{ maxWidth: 480, margin: '0 auto' }}>
            <button
              type="button"
              onClick={() => setStep('select')}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 6,
                color: 'var(--pp-text-2)', fontSize: 14, background: 'none', border: 'none',
                cursor: 'pointer', marginBottom: 24,
              }}
            >
              ← <span className="jp-text">金額選択へ戻る</span>
              <span className="en-text">Back to Amount</span>
            </button>

            <span className="pp-label">
              <span className="jp-text">送金先</span>
              <span className="en-text">Send To</span>
            </span>
            <h1 className="syne-heading" style={{ fontSize: 26, letterSpacing: '-0.5px', marginBottom: 24 }}>
              <span className="jp-text">PayPayで送金してください</span>
              <span className="en-text">Send via PayPay</span>
            </h1>

            {/* Amount reminder */}
            <div style={{
              background: 'rgba(229,57,53,0.08)', border: '1px solid rgba(229,57,53,0.2)',
              borderRadius: 14, padding: '12px 16px', marginBottom: 24,
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            }}>
              <span style={{ fontSize: 14, color: 'var(--pp-text-2)' }}>
                <span className="jp-text">送金金額</span>
                <span className="en-text">Amount to send</span>
              </span>
              <span className="mono-val" style={{ color: 'var(--pp-red)', fontSize: 20 }}>
                ¥{selectedAmount?.toLocaleString()}
              </span>
            </div>

            {/* QR placeholder */}
            <div className="pp-card" style={{ padding: 24, textAlign: 'center', marginBottom: 20 }}>
              <div style={{
                width: 180, height: 180, margin: '0 auto 16px',
                background: 'var(--pp-elevated)', borderRadius: 16,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                border: '1px solid var(--pp-border)',
              }}>
                {/* QR grid placeholder */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7,1fr)', gap: 3, padding: 16 }}>
                  {Array.from({ length: 49 }, (_, i) => (
                    <div key={i} style={{
                      width: 14, height: 14, borderRadius: 2,
                      background: QR_FILLED_CELLS.has(i) ? 'var(--pp-text)' : 'transparent',
                    }} />
                  ))}
                </div>
              </div>
              <div style={{ fontSize: 12, color: 'var(--pp-text-3)', marginBottom: 4 }}>
                <span className="jp-text">PayPay ID</span>
                <span className="en-text">PayPay ID</span>
              </div>
              <div className="mono-val" style={{ fontSize: 18, marginBottom: 12 }}>{PAYPAY_ID}</div>
              <button type="button" className="copy-btn" onClick={handleCopy} style={{ margin: '0 auto' }}>
                {copied ? (
                  <><svg aria-hidden="true" width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M20 6L9 17l-5-5" stroke="var(--pp-green)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  <span style={{ color: 'var(--pp-green)' }}>
                    <span className="jp-text">コピー済</span>
                    <span className="en-text">Copied!</span>
                  </span></>
                ) : (
                  <><svg aria-hidden="true" width="14" height="14" viewBox="0 0 24 24" fill="none"><rect x="9" y="9" width="13" height="13" rx="2" stroke="currentColor" strokeWidth="1.8"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" stroke="currentColor" strokeWidth="1.8"/></svg>
                  <span className="jp-text">IDをコピー</span>
                  <span className="en-text">Copy ID</span></>
                )}
              </button>
            </div>

            <div style={{
              fontSize: 13, color: 'var(--pp-text-2)', marginBottom: 24,
              background: 'var(--pp-elevated)', borderRadius: 12, padding: '12px 14px',
              lineHeight: 1.7,
            }}>
              <span className="jp-text">
                ① PayPayアプリを開く → 送る<br />
                ② 上記IDを検索 → 送金額を入力<br />
                ③ マネーライトで支払い → 「送金完了した」を押す
              </span>
              <span className="en-text">
                ① Open PayPay app → Send<br />
                ② Search the ID above → Enter amount<br />
                ③ Pay with MoneyLight → Tap &quot;I&apos;ve sent it&quot;
              </span>
            </div>

            <button type="button" className="pp-btn" onClick={handleConfirmSent}>
              <span className="jp-text">送金完了した →</span>
              <span className="en-text">I&apos;ve Sent It →</span>
            </button>
          </div>
        </main>
      </div>
    )
  }

  // Step: Waiting
  if (step === 'waiting') {
    return (
      <div className="pp-body" style={{ minHeight: '100vh' }}>
        <Nav />
        <main style={{
          padding: '80px 20px 48px',
          display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh',
        }}>
          <div style={{ maxWidth: 400, textAlign: 'center', width: '100%' }}>
            <div style={{
              width: 80, height: 80, borderRadius: '50%',
              background: 'rgba(229,57,53,0.1)', border: '1px solid rgba(229,57,53,0.2)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              margin: '0 auto 24px',
            }}>
              <span className="spinner" style={{ width: 32, height: 32, borderWidth: 3 }} />
            </div>

            <h1 className="syne-heading" style={{ fontSize: 24, marginBottom: 12, letterSpacing: '-0.5px' }}>
              <span className="jp-text">送金確認中...</span>
              <span className="en-text">Confirming Payment...</span>
            </h1>
            <p style={{ color: 'var(--pp-text-2)', fontSize: 14, marginBottom: 32, lineHeight: 1.7 }}>
              <span className="jp-text">
                PayPayからの送金を確認しています。<br />
                通常1〜5分で完了します。このまましばらくお待ちください。
              </span>
              <span className="en-text">
                We&apos;re confirming your PayPay payment.<br />
                This usually takes 1–5 minutes. Please wait.
              </span>
            </p>

            <div className="pp-card" style={{ padding: '16px', marginBottom: 24 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14, marginBottom: 10 }}>
                <span style={{ color: 'var(--pp-text-2)' }}>
                  <span className="jp-text">送金額</span>
                  <span className="en-text">Amount</span>
                </span>
                <span className="mono-val">¥{selectedAmount?.toLocaleString()}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14 }}>
                <span style={{ color: 'var(--pp-text-2)' }}>
                  <span className="jp-text">受取予定</span>
                  <span className="en-text">Expected</span>
                </span>
                <span className="mono-val" style={{ color: 'var(--pp-green)' }}>{estimatedUsdt} USDT</span>
              </div>
            </div>

            {/* Dev: simulate confirm */}
            {process.env.NODE_ENV === 'development' && (
              <button
                type="button"
                onClick={handleSimulateConfirm}
                style={{
                  fontSize: 12, color: 'var(--pp-text-3)', background: 'none',
                  border: '1px solid var(--pp-border)', borderRadius: 8, padding: '8px 16px',
                  cursor: 'pointer',
                }}
              >
                [Demo] Simulate Confirmation
              </button>
            )}
          </div>
        </main>
      </div>
    )
  }

  // Step: Success
  return (
    <div className="pp-body" style={{ minHeight: '100vh' }}>
      <Nav />
      <main style={{
        padding: '80px 20px 48px',
        display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh',
      }}>
        <div style={{ maxWidth: 400, textAlign: 'center', width: '100%' }}>
          <div style={{
            width: 80, height: 80, borderRadius: '50%',
            background: 'rgba(0,229,160,0.1)', border: '1px solid rgba(0,229,160,0.25)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            margin: '0 auto 24px',
          }}>
            <svg aria-hidden="true" width="36" height="36" viewBox="0 0 24 24" fill="none">
              <path d="M20 6L9 17l-5-5" stroke="var(--pp-green)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>

          <h1 className="syne-heading" style={{ fontSize: 28, marginBottom: 8, letterSpacing: '-0.5px', color: 'var(--pp-green)' }}>
            <span className="jp-text">入金完了！</span>
            <span className="en-text">Deposit Complete!</span>
          </h1>
          <p style={{ color: 'var(--pp-text-2)', fontSize: 14, marginBottom: 32 }}>
            <span className="jp-text">USDTがウォレットに送金されました</span>
            <span className="en-text">USDT has been sent to your wallet</span>
          </p>

          <div className="pp-card" style={{ padding: '20px', marginBottom: 32 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12, fontSize: 14 }}>
              <span style={{ color: 'var(--pp-text-2)' }}>
                <span className="jp-text">入金額</span>
                <span className="en-text">Deposited</span>
              </span>
              <span className="mono-val">¥{selectedAmount?.toLocaleString()}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14 }}>
              <span style={{ color: 'var(--pp-text-2)' }}>
                <span className="jp-text">受取USDT</span>
                <span className="en-text">USDT Received</span>
              </span>
              <span className="mono-val" style={{ color: 'var(--pp-green)', fontSize: 18 }}>{estimatedUsdt} USDT</span>
            </div>
          </div>

          <Link href="/dashboard" className="pp-btn">
            <span className="jp-text">ダッシュボードへ →</span>
            <span className="en-text">Go to Dashboard →</span>
          </Link>
        </div>
      </main>
    </div>
  )
}
