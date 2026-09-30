import { useState } from 'react'
import { motion } from 'framer-motion'

const presets = [
  { name: '일반 웹세션', S: 1 },
  { name: '결제 승인', S: 2 },
  { name: '금융 거래기록', S: 10 },
  { name: '진료기록 (EMR)', S: 15 },
  { name: '장기 계약서', S: 25 },
  { name: '국가기밀 문서', S: 30 },
  { name: '유전체 정보', S: 50 },
]

export default function Mosca() {
  const now = 2026
  const [S, setS] = useState(10)
  const [M, setM] = useState(7)
  const [Q, setQ] = useState(2035)
  const T = Q - now
  const risky = S + M > T
  const W = 420
  const scale = (yrs: number) => (yrs / 60) * (W - 40)
  return (
    <div>
      <div className="controls">
        <label>
          S 기밀 수명
          <input type="range" min={1} max={50} value={S} onChange={(e) => setS(+e.target.value)} />
          <span className="mono">{S}년</span>
        </label>
        <label>
          M 전환 기간
          <input type="range" min={1} max={15} value={M} onChange={(e) => setM(+e.target.value)} />
          <span className="mono">{M}년</span>
        </label>
        <label>
          Q-Day 예상
          <input type="range" min={2028} max={2050} value={Q} onChange={(e) => setQ(+e.target.value)} />
          <span className="mono">{Q}년</span>
        </label>
      </div>
      <div className="controls">
        {presets.map((p) => (
          <button key={p.name} className={'chip ' + (S === p.S ? 'ok' : '')} onClick={() => setS(p.S)}>{p.name} ({p.S}년)</button>
        ))}
      </div>
      <svg viewBox={`0 0 ${W} 120`} style={{ width: '100%', display: 'block' }}>
        <text x={20} y={20} fill="#a8b1c2" fontSize={10}>S + M (지켜야 할 기간 + 갈아타는 기간)</text>
        <motion.rect initial={false} x={20} y={28} height={22} rx={4} fill="#4f8cff" animate={{ width: scale(M) }} />
        <motion.rect initial={false} y={28} height={22} rx={4} fill={risky ? '#f0575d' : '#35c98a'} animate={{ x: 20 + scale(M), width: scale(S) }} />
        <motion.text initial={false} y={42} fill="#000" fontSize={9} fontWeight={700} animate={{ x: 24 }}>M={M}</motion.text>
        <motion.text initial={false} y={42} fill="#000" fontSize={9} fontWeight={700} animate={{ x: 24 + scale(M) }}>S={S}</motion.text>
        <motion.line initial={false} y1={10} y2={100} stroke="#e6eaf2" strokeDasharray="4 3" animate={{ x1: 20 + scale(T), x2: 20 + scale(T) }} />
        <motion.text initial={false} y={112} textAnchor="middle" fill="#e6eaf2" fontSize={10} animate={{ x: 20 + scale(T) }}>T = {T}년 (Q-Day까지)</motion.text>
        <line x1={20} x2={W - 20} y1={70} y2={70} stroke="#273046" />
        {[0, 10, 20, 30, 40, 50].map((v) => (
          <text key={v} x={20 + scale(v)} y={84} textAnchor="middle" fill="#6b7484" fontSize={8}>{now + v}</text>
        ))}
      </svg>
      <div className="stat-row">
        <div className="stat"><div className="k">S + M</div><div className="v">{S + M}년</div></div>
        <div className="stat"><div className="k">T</div><div className="v">{T}년</div></div>
        <div className={'stat ' + (risky ? 'danger' : 'safe')}>
          <div className="k">모스카 부등식 S + M &gt; T</div>
          <div className="v">{risky ? '성립 → 이미 위험' : '불성립 → 아직 여유'}</div>
        </div>
      </div>
      <p style={{ fontSize: '0.9rem', color: 'var(--fg-2)', margin: 0 }}>
        {risky
          ? `지금 이 순간 도청당한 암호문이, 아직 비밀이어야 할 ${now + T}년에 풀립니다. 전환을 지금 시작해도 ${S + M - T}년이 모자랍니다.`
          : `이 데이터는 Q-Day 전에 기밀 수명이 끝나거나 전환이 완료됩니다. 단, 전환 기간이 길어지면 판정이 바뀝니다.`}
      </p>
    </div>
  )
}
