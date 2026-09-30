import { useState } from 'react'
import { motion } from 'framer-motion'

export default function GroverCounter() {
  const [bits, setBits] = useState(128)
  const classical = bits - 1 // log2(N/2)
  const grover = bits / 2 // log2(sqrt N)
  const safe = grover >= 128
  const W = 420
  const bar = (v: number) => (v / 256) * (W - 120)
  return (
    <div>
      <div className="controls">
        <label>
          키 길이
          <input type="range" min={32} max={256} step={8} value={bits} onChange={(e) => setBits(+e.target.value)} />
          <span className="mono">{bits}비트</span>
        </label>
        <div className="toggle">
          {[64, 128, 192, 256].map((b) => (
            <button key={b} className={bits === b ? 'on' : ''} onClick={() => setBits(b)}>AES-{b === 64 ? '64?' : b}</button>
          ))}
        </div>
      </div>
      <svg viewBox={`0 0 ${W} 110`} style={{ width: '100%', display: 'block' }}>
        <text x={0} y={22} fill="#a8b1c2" fontSize={11}>고전 완전탐색</text>
        <motion.rect initial={false} x={110} y={10} height={18} rx={4} fill="#6b7484" animate={{ width: bar(classical) }} />
        <motion.text initial={false} y={23} fill="#e6eaf2" fontSize={11} className="svg-mono" animate={{ x: 116 + bar(classical) }}>2^{classical}회</motion.text>
        <text x={0} y={62} fill="#b57cff" fontSize={11}>그로버 (양자)</text>
        <motion.rect initial={false} x={110} y={50} height={18} rx={4} fill="#b57cff" animate={{ width: bar(grover) }} />
        <motion.text initial={false} y={63} fill="#e6eaf2" fontSize={11} className="svg-mono" animate={{ x: 116 + bar(grover) }}>2^{grover}회 (√)</motion.text>
        <line x1={110 + bar(128)} x2={110 + bar(128)} y1={5} y2={78} stroke="#35c98a" strokeDasharray="4 3" />
        <text x={110 + bar(128)} y={92} textAnchor="middle" fill="#35c98a" fontSize={10}>128비트 안전선 (2^128)</text>
        <text x={W} y={106} textAnchor="end" fill="#6b7484" fontSize={9}>가로축: log₂ 연산 횟수</text>
      </svg>
      <div className="stat-row">
        <div className="stat"><div className="k">유효 강도 (그로버 후)</div><div className="v">{grover}비트</div></div>
        <div className={'stat ' + (safe ? 'safe' : 'danger')}><div className="k">판정</div><div className="v">{safe ? '안전' : '위험'}</div></div>
        <div className="stat"><div className="k">대응</div><div className="v" style={{ fontSize: '0.9rem' }}>{safe ? '그대로 사용' : `키를 ${Math.max(256, bits * 2)}비트로`}</div></div>
      </div>
    </div>
  )
}
