import { useState } from 'react'
import { motion } from 'framer-motion'

export default function HybridLocks() {
  const [q, setQ] = useState(false)
  const [l, setL] = useState(false)
  const open = q && l
  return (
    <div>
      <div className="controls">
        <label><input type="checkbox" checked={q} onChange={(e) => setQ(e.target.checked)} /> 양자 컴퓨터 등장 (X25519 붕괴)</label>
        <label><input type="checkbox" checked={l} onChange={(e) => setL(e.target.checked)} /> 새로운 격자 공격 발견 (ML-KEM 붕괴)</label>
      </div>
      <svg viewBox="0 0 420 150" style={{ width: '100%', display: 'block' }}>
        <rect x={120} y={40} width={180} height={90} rx={10} fill={open ? '#3a1b1e' : '#1a2236'} stroke={open ? '#f0575d' : '#273046'} strokeWidth={2} />
        <text x={210} y={95} textAnchor="middle" fontSize={26}>{open ? '🔓' : '🔒'}</text>
        <text x={210} y={120} textAnchor="middle" fill="#a8b1c2" fontSize={10}>최종 키 = KDF(고전 비밀 ∥ PQC 비밀)</text>
        <Lock x={165} y={40} label="X25519" broken={q} color="#6b7484" />
        <Lock x={255} y={40} label="ML-KEM" broken={l} color="#4f8cff" />
        <motion.text initial={false} x={210} y={25} textAnchor="middle" fontSize={11} fontWeight={700} animate={{ fill: open ? '#f0575d' : '#35c98a' }}>
          {open ? '둘 다 깨져야 열린다 — 이제 열렸다' : q ? '고전 자물쇠가 깨졌지만 PQC가 버틴다' : l ? 'PQC 자물쇠가 깨졌지만 고전이 버틴다' : '두 자물쇠 모두 잠김'}
        </motion.text>
      </svg>
    </div>
  )
}
function Lock({ x, y, label, broken, color }: { x: number; y: number; label: string; broken: boolean; color: string }) {
  return (
    <motion.g initial={false} animate={{ rotate: broken ? 25 : 0, y: broken ? 6 : 0, opacity: broken ? 0.5 : 1 }} style={{ originX: `${x}px`, originY: `${y}px` }}>
      <path d={`M ${x - 10} ${y} v -10 a 10 10 0 0 1 20 0 v 10`} fill="none" stroke={color} strokeWidth={4} />
      <rect x={x - 16} y={y} width={32} height={22} rx={4} fill={color} />
      <text x={x} y={y + 15} textAnchor="middle" fontSize={8} fill="#000" fontWeight={700}>{label}</text>
      {broken && <text x={x + 14} y={y - 8} fontSize={12}>💥</text>}
    </motion.g>
  )
}
