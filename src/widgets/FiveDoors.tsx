import { useState } from 'react'
import { motion } from 'framer-motion'

export default function FiveDoors() {
  const [closed, setClosed] = useState<number | null>(null)
  const [runs, setRuns] = useState(0)
  const verify = () => { setClosed(Math.floor(Math.random() * 5)); setRuns((r) => r + 1) }
  return (
    <div>
      <div className="controls">
        <button className="btn small primary" onClick={verify}>🔍 검증 (무작위 4개 열기)</button>
        <span style={{ fontSize: '0.85rem', color: 'var(--fg-2)' }}>검증 {runs}회 — 매번 다른 방이 닫힌다</span>
      </div>
      <div style={{ display: 'flex', gap: 10, justifyContent: 'center' }}>
        {[0, 1, 2, 3, 4].map((i) => {
          const isClosed = closed === i
          const opened = closed !== null && !isClosed
          return (
            <motion.div initial={false} key={i} animate={{ rotateY: opened ? -60 : 0 }} style={{ width: 62, height: 90, borderRadius: 8, background: isClosed ? '#3a1b1e' : opened ? 'rgba(53,201,138,0.15)' : 'var(--bg-3)', border: `1px solid ${isClosed ? 'var(--c-threat)' : opened ? 'var(--c-apply)' : 'var(--line)'}`, display: 'grid', placeItems: 'center', fontSize: 12, textAlign: 'center', transformOrigin: 'left' }}>
              {closed === null ? `파티 ${i + 1}` : isClosed ? '🔒 비밀' : '✓ 일치'}
            </motion.div>
          )
        })}
      </div>
      <p style={{ fontSize: '0.88rem', color: 'var(--fg-2)', margin: '10px 0 0', textAlign: 'center' }}>
        {closed === null ? '서명자의 비밀은 5개 조각으로 나뉘어 각 방에 있다.' : '열린 4개 방의 계산이 완벽히 일치하면, 닫힌 1개 방을 보지 않고도 서명을 신뢰한다 — 영지식 증명.'}
      </p>
    </div>
  )
}
