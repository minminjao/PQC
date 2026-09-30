import { useState } from 'react'
import { motion } from 'framer-motion'

const pts = [
  { year: 2019, q: 20_000_000, who: 'Gidney + Ekerå', ref: 'arXiv:1905.09749' },
  { year: 2025, q: 1_000_000, who: 'Gidney', ref: 'arXiv:2505.15917' },
  { year: 2026, q: 100_000, who: 'Webster et al.', ref: 'arXiv:2602.11457' },
]

export default function QubitRequirement() {
  const [log, setLog] = useState(true)
  const [hover, setHover] = useState<number | null>(null)
  const W = 420, H = 200, pl = 50, pb = 30
  const x = (y: number) => pl + ((y - 2018) / (2027 - 2018)) * (W - pl - 15)
  const y = (q: number) => {
    const v = log ? Math.log10(q) : q / 20_000_000
    const lo = log ? 4 : 0, hi = log ? 7.4 : 1
    return H - pb - ((v - lo) / (hi - lo)) * (H - pb - 15)
  }
  return (
    <div>
      <div className="controls">
        <div className="toggle">
          <button className={!log ? 'on' : ''} onClick={() => setLog(false)}>선형</button>
          <button className={log ? 'on' : ''} onClick={() => setLog(true)}>로그</button>
        </div>
        <span style={{ fontSize: '0.85rem', color: 'var(--fg-2)' }}>RSA-2048 해독에 필요한 물리 큐비트 추정치</span>
      </div>
      <svg viewBox={`0 0 ${W} ${H}`} style={{ width: '100%', display: 'block' }}>
        <line x1={pl} x2={W - 10} y1={H - pb} y2={H - pb} stroke="#273046" />
        <line x1={pl} x2={pl} y1={10} y2={H - pb} stroke="#273046" />
        {[2018, 2020, 2022, 2024, 2026].map((yr) => (
          <text key={yr} x={x(yr)} y={H - pb + 14} textAnchor="middle" fill="#6b7484" fontSize={9}>{yr}</text>
        ))}
        {(log ? [1e4, 1e5, 1e6, 1e7] : [5e6, 1e7, 1.5e7, 2e7]).map((v) => (
          <g key={v}>
            <line x1={pl} x2={W - 10} y1={y(v)} y2={y(v)} stroke="#1a2236" />
            <text x={pl - 4} y={y(v) + 3} textAnchor="end" fill="#6b7484" fontSize={8} className="svg-mono">{v >= 1e6 ? `${v / 1e6}M` : `${v / 1e3}K`}</text>
          </g>
        ))}
        <motion.polyline points={pts.map((p) => `${x(p.year)},${y(p.q)}`).join(' ')} fill="none" stroke="#f0575d" strokeWidth={2}
          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.2 }} />
        {pts.map((p, i) => (
          <g key={i} onMouseEnter={() => setHover(i)} onMouseLeave={() => setHover(null)} style={{ cursor: 'pointer' }}>
            <motion.circle cx={x(p.year)} cy={y(p.q)} r={hover === i ? 8 : 5} fill="#f0575d" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.4 + i * 0.3 }} />
            <text x={x(p.year)} y={y(p.q) - 12} textAnchor="middle" fill="#e6eaf2" fontSize={10} className="svg-mono">{p.q >= 1e6 ? `~${p.q / 1e6}M` : `~${p.q / 1e3}K`}</text>
          </g>
        ))}
        {hover !== null && (
          <g>
            <rect x={pl + 10} y={12} width={200} height={38} rx={6} fill="#1a2236" stroke="#273046" />
            <text x={pl + 18} y={28} fill="#e6eaf2" fontSize={10}>{pts[hover].year} · {pts[hover].who}</text>
            <text x={pl + 18} y={42} fill="#a8b1c2" fontSize={9} className="svg-mono">{pts[hover].ref}</text>
          </g>
        )}
      </svg>
      <div className="stat-row">
        <div className="stat"><div className="k">2019 → 2026</div><div className="v">약 1/200</div></div>
        <div className="stat danger"><div className="k">의미</div><div className="v" style={{ fontSize: '0.9rem' }}>Q-Day가 앞당겨진다</div></div>
      </div>
    </div>
  )
}
