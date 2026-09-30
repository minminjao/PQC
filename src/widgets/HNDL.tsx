import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

export default function HNDL() {
  const [t, setT] = useState(0) // 0..100 timeline
  const [auto, setAuto] = useState(true)
  useEffect(() => {
    if (!auto) return
    const id = setInterval(() => setT((v) => (v >= 100 ? 0 : v + 1)), 60)
    return () => clearInterval(id)
  }, [auto])
  const qday = 70
  const after = t >= qday
  const stored = Math.min(6, Math.floor(t / 10))
  return (
    <div>
      <div className="controls">
        <label>
          타임라인
          <input type="range" min={0} max={100} value={t} onChange={(e) => { setAuto(false); setT(+e.target.value) }} />
        </label>
        <button className="btn small" onClick={() => setAuto((a) => !a)}>{auto ? '⏸ 멈춤' : '▶ 자동 재생'}</button>
        <span className={'badge ' + (after ? 'danger' : 'info')}>{after ? 'Q-Day 이후' : '오늘 — 아직 못 연다'}</span>
      </div>
      <svg viewBox="0 0 420 190" style={{ width: '100%', display: 'block' }}>
        {/* timeline */}
        <line x1={20} x2={400} y1={170} y2={170} stroke="#273046" strokeWidth={2} />
        <line x1={20 + qday * 3.8} x2={20 + qday * 3.8} y1={150} y2={178} stroke="#f0575d" strokeDasharray="4 3" />
        <text x={20 + qday * 3.8} y={188} textAnchor="middle" fill="#f0575d" fontSize={9}>Q-Day</text>
        <text x={20} y={188} fill="#6b7484" fontSize={9}>오늘</text>
        <motion.circle initial={false} cy={170} r={5} fill="#e6eaf2" animate={{ cx: 20 + t * 3.8 }} transition={{ duration: 0.05 }} />
        {/* Alice, Bob */}
        <Actor x={40} y={60} label="앨리스" />
        <Actor x={380} y={60} label="밥" />
        <line x1={60} x2={360} y1={60} y2={60} stroke="#4f8cff" strokeWidth={1.5} />
        <text x={210} y={45} textAnchor="middle" fill="#4f8cff" fontSize={9}>TLS · VPN 암호화 통신</text>
        {/* envelopes moving */}
        {!after && [0, 1, 2].map((k) => (
          <motion.g initial={false} key={k} animate={{ x: [60, 340] }} transition={{ duration: 3, repeat: Infinity, delay: k, ease: 'linear' }}>
            <Envelope y={60} locked />
          </motion.g>
        ))}
        {/* Eve */}
        <Actor x={210} y={120} label="이브 (도청자)" bad />
        <text x={210} y={100} textAnchor="middle" fill="#a8b1c2" fontSize={8}>{after ? '창고의 자물쇠를 한꺼번에 연다' : '못 열어도 통째로 저장한다'}</text>
        {/* warehouse */}
        <rect x={250} y={100} width={130} height={48} rx={6} fill="#1a2236" stroke="#273046" />
        <text x={315} y={96} textAnchor="middle" fill="#6b7484" fontSize={8}>이브의 창고</text>
        {Array.from({ length: stored }, (_, i) => (
          <motion.g key={i} initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }}>
            <Envelope x={262 + (i % 3) * 38} y={116 + Math.floor(i / 3) * 18} locked={!after} small />
          </motion.g>
        ))}
        {after && (
          <motion.text x={315} y={160} textAnchor="middle" fill="#f0575d" fontSize={10} fontWeight={700} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            과거 통신이 전부 해독됨
          </motion.text>
        )}
      </svg>
    </div>
  )
}

function Actor({ x, y, label, bad }: { x: number; y: number; label: string; bad?: boolean }) {
  return (
    <g>
      <circle cx={x} cy={y} r={11} fill="#273046" stroke={bad ? '#f0575d' : '#a8b1c2'} />
      <text x={x} y={y + 24} textAnchor="middle" fill={bad ? '#f0575d' : '#a8b1c2'} fontSize={9}>{label}</text>
    </g>
  )
}
function Envelope({ x = 0, y, locked, small }: { x?: number; y: number; locked: boolean; small?: boolean }) {
  const w = small ? 26 : 22, h = small ? 14 : 14
  return (
    <g transform={`translate(${x} ${y - h / 2})`}>
      <rect width={w} height={h} rx={2} fill={locked ? '#111827' : '#3a1b1e'} stroke={locked ? '#f5b544' : '#f0575d'} />
      <text x={w / 2} y={h - 3} textAnchor="middle" fontSize={9}>{locked ? '🔒' : '🔓'}</text>
    </g>
  )
}
