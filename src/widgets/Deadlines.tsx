import { useState } from 'react'
import { motion } from 'framer-motion'

const ms = [
  { who: '미국 NSA/NIST', y: 2030, t: 'RSA·ECC 사용 축소 (NIST IR 8547)', c: '#4f8cff' },
  { who: '미국 NSA/NIST', y: 2035, t: 'RSA·ECC 전면 금지', c: '#4f8cff' },
  { who: '프랑스 ANSSI', y: 2027, t: '양자내성 미지원 제품 인증 제외', c: '#b57cff' },
  { who: '영국 NCSC', y: 2028, t: '자산 목록화·계획 수립', c: '#f5b544' },
  { who: '영국 NCSC', y: 2031, t: '고위험 시스템 전환', c: '#f5b544' },
  { who: '영국 NCSC', y: 2035, t: '전면 완료', c: '#f5b544' },
  { who: '독일 BSI', y: 2030, t: 'quantum-safe 전환 권고', c: '#35c98a' },
  { who: 'EU 집행위', y: 2026, t: '회원국 로드맵 수립', c: '#f0575d' },
  { who: 'EU 집행위', y: 2030, t: '고위험 인프라 PQC 적용', c: '#f0575d' },
  { who: '한국 (범국가)', y: 2030, t: '목표 2 완료', c: '#e6eaf2' },
  { who: '한국 (범국가)', y: 2035, t: '전환 완료', c: '#e6eaf2' },
]
export default function Deadlines() {
  const [sel, setSel] = useState<number | null>(null)
  const W = 440, x = (y: number) => 30 + ((y - 2025) / 11) * (W - 60)
  const rowsBy: Record<string, number> = {}
  let r = 0
  ms.forEach((m) => { if (rowsBy[m.who] === undefined) rowsBy[m.who] = r++ })
  const H = 40 + r * 26
  return (
    <div>
      <svg viewBox={`0 0 ${W} ${H}`} style={{ width: '100%', display: 'block' }}>
        {[2026, 2028, 2030, 2032, 2034, 2036].map((y) => (
          <g key={y}><line x1={x(y)} x2={x(y)} y1={10} y2={H - 20} stroke="#1a2236" /><text x={x(y)} y={H - 6} textAnchor="middle" fill="#6b7484" fontSize={9}>{y}</text></g>
        ))}
        <line x1={x(2026.75)} x2={x(2026.75)} y1={5} y2={H - 20} stroke="#f0575d" strokeDasharray="3 3" />
        <text x={x(2026.75) + 3} y={12} fill="#f0575d" fontSize={8}>오늘</text>
        {Object.entries(rowsBy).map(([who, i]) => <text key={who} x={0} y={30 + i * 26} fill="#a8b1c2" fontSize={8}>{who.split(' ')[0]}</text>)}
        {ms.map((m, i) => (
          <g key={i} onClick={() => setSel(i)} style={{ cursor: 'pointer' }}>
            <motion.circle cx={x(m.y)} cy={26 + rowsBy[m.who] * 26} r={sel === i ? 8 : 5} fill={m.c} initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: i * 0.05 }} />
          </g>
        ))}
      </svg>
      <div className="stat" style={{ marginTop: 6 }}>
        {sel === null ? <span style={{ color: 'var(--fg-3)' }}>점을 클릭하면 요구 사항이 표시됩니다</span> : <><strong>{ms[sel].who} · {ms[sel].y}</strong> — {ms[sel].t}</>}
      </div>
    </div>
  )
}
