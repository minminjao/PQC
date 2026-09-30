import { useState } from 'react'
import { motion } from 'framer-motion'

type Row = { name: string; pk: number; out: number; fam: string; level?: string }
const rows: Row[] = [
  { name: 'ECC P-256', pk: 64, out: 64, fam: '고전' },
  { name: 'RSA-2048', pk: 256, out: 256, fam: '고전' },
  { name: 'ML-KEM-512', pk: 800, out: 768, fam: '격자', level: '1' },
  { name: 'ML-KEM-768', pk: 1184, out: 1088, fam: '격자', level: '3' },
  { name: 'ML-KEM-1024', pk: 1568, out: 1568, fam: '격자', level: '5' },
  { name: 'ML-DSA-44', pk: 1312, out: 2420, fam: '격자', level: '2' },
  { name: 'ML-DSA-65', pk: 1952, out: 3300, fam: '격자', level: '3' },
  { name: 'ML-DSA-87', pk: 2592, out: 4595, fam: '격자', level: '5' },
  { name: 'FN-DSA-512', pk: 897, out: 666, fam: '격자', level: '1' },
  { name: 'FN-DSA-1024', pk: 1793, out: 1280, fam: '격자', level: '5' },
  { name: 'SLH-DSA-128s', pk: 32, out: 7856, fam: '해시', level: '1' },
  { name: 'SLH-DSA-128f', pk: 32, out: 17088, fam: '해시', level: '1' },
  { name: 'SLH-DSA-256f', pk: 64, out: 49856, fam: '해시', level: '5' },
  { name: 'Classic McEliece-348864', pk: 261120, out: 96, fam: '코드', level: '1' },
]
const famColor: Record<string, string> = { 고전: '#6b7484', 격자: '#4f8cff', 해시: '#f5b544', 코드: '#35c98a' }

export default function SizeBars({ only }: { only?: string[] }) {
  const [log, setLog] = useState(true)
  const [fam, setFam] = useState<string>('전체')
  const list = rows.filter((r) => (!only || only.some((o) => r.name.startsWith(o))) && (fam === '전체' || r.fam === fam))
  const max = 300000
  const W = 460, rowH = 22, pl = 150
  const len = (v: number) => (log ? (Math.log10(v) / Math.log10(max)) * (W - pl - 60) : (v / 50000) * (W - pl - 60))
  return (
    <div>
      <div className="controls">
        <div className="toggle">
          <button className={log ? 'on' : ''} onClick={() => setLog(true)}>로그</button>
          <button className={!log ? 'on' : ''} onClick={() => setLog(false)}>선형</button>
        </div>
        {!only && (
          <div className="toggle">
            {['전체', '고전', '격자', '해시', '코드'].map((f) => <button key={f} className={fam === f ? 'on' : ''} onClick={() => setFam(f)}>{f}</button>)}
          </div>
        )}
        <span style={{ fontSize: '0.8rem', color: 'var(--fg-2)' }}><span style={{ color: '#e6eaf2' }}>■</span> 공개키 &nbsp; <span style={{ opacity: 0.55 }}>■</span> 암호문/서명</span>
      </div>
      <svg viewBox={`0 0 ${W} ${list.length * rowH * 2 + 10}`} style={{ width: '100%', display: 'block' }}>
        {list.map((r, i) => {
          const y = i * rowH * 2
          const c = famColor[r.fam]
          return (
            <g key={r.name} transform={`translate(0 ${y})`}>
              <text x={pl - 6} y={16} textAnchor="end" fill="#e6eaf2" fontSize={10}>{r.name}</text>
              <text x={pl - 6} y={28} textAnchor="end" fill={c} fontSize={8}>{r.fam}{r.level ? ` · Lv.${r.level}` : ''}</text>
              <motion.rect x={pl} y={6} height={9} rx={2} fill={c} initial={{ width: 0 }} animate={{ width: Math.min(len(r.pk), W - pl - 60) }} transition={{ duration: 0.6 }} />
              <motion.text y={14} fill="#a8b1c2" fontSize={8} className="svg-mono" initial={{ opacity: 0 }} animate={{ opacity: 1, x: pl + Math.min(len(r.pk), W - pl - 60) + 4 }}>{fmt(r.pk)}</motion.text>
              <motion.rect x={pl} y={18} height={9} rx={2} fill={c} opacity={0.5} initial={{ width: 0 }} animate={{ width: Math.min(len(r.out), W - pl - 60) }} transition={{ duration: 0.6, delay: 0.1 }} />
              <motion.text y={26} fill="#a8b1c2" fontSize={8} className="svg-mono" initial={{ opacity: 0 }} animate={{ opacity: 1, x: pl + Math.min(len(r.out), W - pl - 60) + 4 }}>{fmt(r.out)}</motion.text>
            </g>
          )
        })}
      </svg>
    </div>
  )
}
function fmt(v: number) { return v >= 10000 ? `${(v / 1024).toFixed(0)} KB` : `${v.toLocaleString()} B` }
