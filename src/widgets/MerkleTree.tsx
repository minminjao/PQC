import { useState } from 'react'
import { motion } from 'framer-motion'

export default function MerkleTree() {
  const leaves = 8
  const [used, setUsed] = useState<number[]>([])
  const [sel, setSel] = useState<number | null>(null)
  const sign = () => {
    const free = Array.from({ length: leaves }, (_, i) => i).filter((i) => !used.includes(i))
    if (!free.length) return
    const pick = free[Math.floor(Math.random() * free.length)]
    setSel(pick); setUsed((u) => [...u, pick])
  }
  const W = 420, H = 190
  const pos = (level: number, idx: number) => { const n = 1 << level; return { x: (W / n) * (idx + 0.5), y: 30 + level * 50 } }
  const path: [number, number][] = []
  if (sel !== null) { let idx = sel; for (let l = 3; l >= 0; l--) { path.push([l, idx]); idx = Math.floor(idx / 2) } }
  const onPath = (l: number, i: number) => path.some(([a, b]) => a === l && b === i)
  return (
    <div>
      <div className="controls">
        <button className="btn small primary" onClick={sign} disabled={used.length >= leaves}>✍️ 서명 (잎 하나 사용)</button>
        <button className="btn small" onClick={() => { setUsed([]); setSel(null) }}>초기화</button>
        <span style={{ fontSize: '0.85rem', color: 'var(--fg-2)' }}>남은 일회용 키 {leaves - used.length}개</span>
      </div>
      <svg viewBox={`0 0 ${W} ${H}`} style={{ width: '100%', display: 'block' }}>
        {[1, 2, 3].map((l) => Array.from({ length: 1 << l }, (_, i) => {
          const a = pos(l, i), b = pos(l - 1, Math.floor(i / 2))
          const hot = onPath(l, i)
          return <motion.line initial={false} key={`${l}-${i}`} x1={a.x} y1={a.y} x2={b.x} y2={b.y} stroke={hot ? '#f5b544' : '#273046'} strokeWidth={hot ? 2.5 : 1} animate={{ stroke: hot ? '#f5b544' : '#273046' }} />
        }))}
        {[0, 1, 2, 3].map((l) => Array.from({ length: 1 << l }, (_, i) => {
          const p = pos(l, i)
          const hot = onPath(l, i)
          const isLeaf = l === 3
          const spent = isLeaf && used.includes(i)
          return (
            <g key={`${l}-${i}`}>
              <motion.circle initial={false} cx={p.x} cy={p.y} r={l === 0 ? 14 : 10} fill={spent && !hot ? '#1a2236' : hot ? '#f5b544' : l === 0 ? '#35c98a' : '#273046'} stroke={hot ? '#f5b544' : '#3a4560'} animate={{ scale: hot ? 1.15 : 1 }} />
              {isLeaf && <text x={p.x} y={p.y + 3} textAnchor="middle" fontSize={9} fill={spent ? '#6b7484' : '#e6eaf2'}>{spent ? '✗' : '🔑'}</text>}
              {l === 0 && <text x={p.x} y={p.y + 4} textAnchor="middle" fontSize={9} fill="#000" fontWeight={700}>루트</text>}
            </g>
          )
        }))}
        <text x={8} y={H - 6} fill="#6b7484" fontSize={9}>루트 = 공개키 (32 B) · 잎 = 일회용 서명 키 · 노란 경로 = 서명에 함께 담는 인증 경로</text>
      </svg>
    </div>
  )
}
