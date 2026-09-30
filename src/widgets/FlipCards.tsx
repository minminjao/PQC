import { useState } from 'react'

export type Card = { icon: string; title: string; sub: string; back: React.ReactNode }
export default function FlipCards({ cards }: { cards: Card[] }) {
  const [on, setOn] = useState<Record<number, boolean>>({})
  return (
    <div className="flip-grid">
      {cards.map((c, i) => (
        <div key={i} className={'flip ' + (on[i] ? 'on' : '')} onClick={() => setOn((o) => ({ ...o, [i]: !o[i] }))}>
          <div className="flip-inner">
            <div className="flip-face">
              <div className="big">{c.icon}</div>
              <h4>{c.title}</h4>
              <div style={{ color: 'var(--fg-2)', fontSize: '0.88rem' }}>{c.sub}</div>
              <div style={{ color: 'var(--fg-3)', fontSize: '0.75rem', marginTop: 8 }}>클릭해서 뒤집기</div>
            </div>
            <div className="flip-face back">{c.back}</div>
          </div>
        </div>
      ))}
    </div>
  )
}
