'use client'

import Link from 'next/link'
import Nav from '@/components/Nav'
import { RATE_USDT, RATE_CASH_PER_1000, FEE_PCT } from '@/lib/rates'

const MOCK_BALANCE = 12_450
const MOCK_USDT = '80.25'

const QUICK_ACTIONS = [
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <rect x="2" y="5" width="20" height="14" rx="2" stroke="currentColor" strokeWidth="1.8"/>
        <path d="M2 10h20" stroke="currentColor" strokeWidth="1.8"/>
      </svg>
    ),
    label_jp: 'PayPay入金',
    label_en: 'PayPay Deposit',
    sub_jp: 'マネーライト',
    sub_en: 'MoneyLight',
    color: 'var(--pp-red)',
    href: '/deposit',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.8"/>
        <path d="M8 12h8M12 8v8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
      </svg>
    ),
    label_jp: 'USDT購入',
    label_en: 'Buy USDT',
    sub_jp: 'TRC20送金',
    sub_en: 'TRC20 Transfer',
    color: 'var(--pp-green)',
    href: '/deposit',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
      </svg>
    ),
    label_jp: '現金換金',
    label_en: 'Cash Exchange',
    sub_jp: '銀行振込',
    sub_en: 'Bank Transfer',
    color: 'var(--pp-gold)',
    href: '/deposit',
  },
]

type TxType = 'deposit' | 'usdt' | 'cash'

const TX_STYLE: Record<TxType, { bg: string; color: string; icon: string; amountColor: string }> = {
  deposit: { bg: 'rgba(229,57,53,0.1)', color: 'var(--pp-red)',   icon: '⬆', amountColor: 'var(--pp-text)' },
  usdt:    { bg: 'rgba(0,229,160,0.1)', color: 'var(--pp-green)', icon: '◎', amountColor: 'var(--pp-green)' },
  cash:    { bg: 'rgba(255,179,0,0.1)', color: 'var(--pp-gold)',  icon: '¥', amountColor: 'var(--pp-text)' },
}

const MOCK_TX: Array<{
  type: TxType
  label_jp: string
  label_en: string
  amount: string
  date: string
  status: 'completed' | 'pending'
}> = [
  { type: 'deposit', label_jp: 'PayPay入金', label_en: 'PayPay Deposit', amount: '+¥10,000', date: '04/06 14:32', status: 'completed' },
  { type: 'usdt', label_jp: 'USDT購入', label_en: 'USDT Purchase', amount: '+64.50 USDT', date: '04/06 14:35', status: 'completed' },
  { type: 'deposit', label_jp: 'PayPay入金', label_en: 'PayPay Deposit', amount: '+¥5,000', date: '04/05 10:20', status: 'completed' },
]

export default function DashboardPage() {
  return (
    <div className="pp-body" style={{ minHeight: '100vh' }}>
      <Nav />

      <main id="main-content" style={{ paddingTop: 76, paddingBottom: 48 }}>
        <h1 className="sr-only">
          <span className="jp-text">ダッシュボード</span>
          <span className="en-text">Dashboard</span>
        </h1>
        {/* Balance section */}
        <section style={{
          padding: '32px 20px 24px',
          background: [
            'radial-gradient(ellipse 100% 70% at 50% 0%, rgba(229,57,53,0.12) 0%, transparent 60%)',
            'var(--pp-bg)',
          ].join(', '),
        }}>
          <div className="pp-container">
            <div style={{ marginBottom: 4, fontSize: 13, color: 'var(--pp-text-2)' }}>
              <span className="jp-text">ポイント残高</span>
              <span className="en-text">Point Balance</span>
            </div>
            <div className="mono-val" style={{ fontSize: 42, color: 'var(--pp-gold)', marginBottom: 4, letterSpacing: '-1px' }}>
              {MOCK_BALANCE.toLocaleString()}
              <span className="jp-text" style={{ fontSize: 16, marginLeft: 6, fontWeight: 600 }}>pt</span>
              <span className="en-text" style={{ fontSize: 16, marginLeft: 6, fontWeight: 600 }}>pts</span>
            </div>
            <div style={{ display: 'flex', gap: 16, fontSize: 13, color: 'var(--pp-text-2)' }}>
              <span>
                <span className="mono-val" style={{ color: 'var(--pp-green)' }}>{MOCK_USDT} USDT</span>
                <span className="jp-text" style={{ marginLeft: 6 }}>USDT残高</span>
                <span className="en-text" style={{ marginLeft: 6 }}>USDT balance</span>
              </span>
            </div>
          </div>
        </section>

        {/* Quick Actions */}
        <section style={{ padding: '0 20px 24px' }}>
          <div className="pp-container">
            <span className="pp-label" style={{ marginBottom: 14 }}>
              <span className="jp-text">クイックアクション</span>
              <span className="en-text">Quick Actions</span>
            </span>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10 }}>
              {QUICK_ACTIONS.map(a => (
                <Link key={a.label_jp} href={a.href} className="pp-action">
                  <div aria-hidden="true" style={{ color: a.color }}>{a.icon}</div>
                  <div style={{ fontSize: 12, fontWeight: 700, textAlign: 'center', lineHeight: 1.3 }}>
                    <span className="jp-text">{a.label_jp}</span>
                    <span className="en-text">{a.label_en}</span>
                  </div>
                  <div style={{ fontSize: 10, color: 'var(--pp-text-3)' }}>
                    <span className="jp-text">{a.sub_jp}</span>
                    <span className="en-text">{a.sub_en}</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Rate bar */}
        <section style={{ padding: '0 20px 24px' }}>
          <div className="pp-container">
            <div className="pp-card" style={{ padding: '14px 16px', display: 'flex', justifyContent: 'space-around' }}>
              {[
                { label: 'USDT', val: `${RATE_USDT} USDT`, sub: '/ ¥1,000', color: 'var(--pp-green)' },
                { label: '現金/Cash', val: `¥${RATE_CASH_PER_1000}`, sub: '/ ¥1,000', color: 'var(--pp-gold)' },
              ].map(r => (
                <div key={r.label} style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: 11, color: 'var(--pp-text-3)', marginBottom: 4 }}>{r.label}</div>
                  <div className="mono-val" style={{ color: r.color, fontSize: 15 }}>{r.val}</div>
                  <div style={{ fontSize: 10, color: 'var(--pp-text-3)' }}>{r.sub}</div>
                </div>
              ))}
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: 11, color: 'var(--pp-text-3)', marginBottom: 4 }}>
                  <span className="jp-text">手数料</span>
                  <span className="en-text">Fee</span>
                </div>
                <div className="mono-val" style={{ color: 'var(--pp-red)', fontSize: 15 }}>{FEE_PCT}%</div>
                <div style={{ fontSize: 10, color: 'var(--pp-text-3)' }}>
                  <span className="jp-text">業界最安</span>
                  <span className="en-text">Lowest</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Recent transactions */}
        <section style={{ padding: '0 20px' }}>
          <div className="pp-container">
            <span className="pp-label" style={{ marginBottom: 14 }}>
              <span className="jp-text">最近の取引</span>
              <span className="en-text">Recent Transactions</span>
            </span>

            {MOCK_TX.length === 0 ? (
              /* Empty state */
              <div className="pp-card" style={{ padding: '40px 24px', textAlign: 'center' }}>
                <div aria-hidden="true" style={{ fontSize: 40, marginBottom: 12, opacity: 0.3 }}>📋</div>
                <div style={{ fontWeight: 600, marginBottom: 8 }}>
                  <span className="jp-text">取引履歴なし</span>
                  <span className="en-text">No transactions yet</span>
                </div>
                <p style={{ fontSize: 13, color: 'var(--pp-text-2)' }}>
                  <span className="jp-text">最初の入金をして始めましょう</span>
                  <span className="en-text">Make your first deposit to get started</span>
                </p>
              </div>
            ) : (
              <div className="pp-card" style={{ overflow: 'hidden' }}>
                {MOCK_TX.map((tx) => (
                  <div key={`${tx.date}-${tx.type}`} className="tx-row">
                    {/* Icon */}
                    <div aria-hidden="true" style={{
                      width: 38, height: 38, borderRadius: 12, flexShrink: 0,
                      background: TX_STYLE[tx.type].bg,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      color: TX_STYLE[tx.type].color,
                    }}>
                      {TX_STYLE[tx.type].icon}
                    </div>

                    {/* Label */}
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: 600, fontSize: 14, marginBottom: 2 }}>
                        <span className="jp-text">{tx.label_jp}</span>
                        <span className="en-text">{tx.label_en}</span>
                      </div>
                      <div style={{ fontSize: 12, color: 'var(--pp-text-2)' }}>{tx.date}</div>
                    </div>

                    {/* Amount + status */}
                    <div style={{ textAlign: 'right' }}>
                      <div className="mono-val" style={{
                        fontSize: 14, marginBottom: 2,
                        color: TX_STYLE[tx.type].amountColor,
                      }}>
                        {tx.amount}
                      </div>
                      <div style={{
                        fontSize: 10, fontWeight: 700,
                        color: tx.status === 'completed' ? 'var(--pp-green)' : 'var(--pp-gold)',
                        textTransform: 'uppercase', letterSpacing: '0.5px',
                      }}>
                        {tx.status === 'completed' ? (
                          <>
                            <span className="jp-text">完了</span>
                            <span className="en-text">Done</span>
                          </>
                        ) : (
                          <>
                            <span className="jp-text">処理中</span>
                            <span className="en-text">Pending</span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  )
}
