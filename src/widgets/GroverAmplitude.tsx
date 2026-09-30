import { useState } from 'react'
import { motion } from 'framer-motion'

// 2-qubit Grover: 4 basis states, target |11>
export default function GroverAmplitude() {
  const [step, setStep] = useState(0)
  const target = 3
  // amplitudes after each step (exact for N=4, one iteration)
  const states: number[][] = [
    [0, 0, 0, 0],
    [0.5, 0.5, 0.5, 0.5],          // H
    [0.5, 0.5, 0.5, -0.5],         // oracle
    [0, 0, 0, 1],                  // diffusion (exact for N=4)
    [0, 0, 0, 1],                  // measure
  ]
  const amp = states[step]
  const labels = ['초기 상태 |00⟩', '① 초기화 (H) — 모든 후보를 같은 확률로 중첩', '② 오라클 (CZ) — 정답 |11⟩의 부호만 뒤집기', '③ 확산 — 평균 기준 반전으로 정답 진폭 증폭', '④ 측정 — 정답 |11⟩이 100% 확률']
  const W = 400, H = 170, base = 95, unit = 70
  return (
    <div>
      <div className="controls">
        <button className="btn small primary" onClick={() => setStep((s) => Math.min(s + 1, 4))} disabled={step >= 4}>다음 단계</button>
        <button className="btn small" onClick={() => setStep(0)}>처음부터</button>
        <span style={{ fontSize: '0.9rem' }}>{labels[step]}</span>
      </div>
      <svg viewBox={`0 0 ${W} ${H}`} style={{ width: '100%', display: 'block' }}>
        <line x1={20} x2={W - 20} y1={base} y2={base} stroke="#273046" />
        {step >= 2 && step < 3 && (
          <line x1={20} x2={W - 20} y1={base - 0.25 * unit} y2={base - 0.25 * unit} stroke="#f5b544" strokeDasharray="3 3" />
        )}
        {step === 2 && <text x={W - 22} y={base - 0.25 * unit - 4} textAnchor="end" fill="#f5b544" fontSize={9}>평균 0.25</text>}
        {amp.map((a, i) => {
          const x = 50 + i * 90
          const prob = Math.round(a * a * 100)
          return (
            <g key={i}>
              <motion.rect initial={false} x={x} width={50} rx={4} fill={i === target ? '#b57cff' : '#4f8cff'}
                animate={{ y: a >= 0 ? base - a * unit : base, height: Math.abs(a) * unit }} transition={{ duration: 0.6 }} />
              <text x={x + 25} y={base + 16} textAnchor="middle" fill="#a8b1c2" fontSize={10} className="svg-mono">|{i.toString(2).padStart(2, '0')}⟩</text>
              <text x={x + 25} y={base + 30} textAnchor="middle" fill="#e6eaf2" fontSize={10}>{step > 0 ? `${prob}%` : ''}</text>
              <motion.text initial={false} x={x + 25} y={base - a * unit - 5} textAnchor="middle" fill="#e6eaf2" fontSize={9} className="svg-mono" animate={{ opacity: step > 0 ? 1 : 0 }}>
                {a.toFixed(2)}
              </motion.text>
            </g>
          )
        })}
        <text x={20} y={base - unit - 6} fill="#6b7484" fontSize={9}>진폭 +1</text>
        <text x={20} y={base + unit * 0.6} fill="#6b7484" fontSize={9}>−</text>
        {step === 4 && (
          <motion.text x={W / 2} y={H - 4} textAnchor="middle" fill="#35c98a" fontSize={12} fontWeight={700} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            2큐비트는 단 1번 반복으로 정답. 일반적으로 ≈ (π/4)·√N 번
          </motion.text>
        )}
      </svg>
    </div>
  )
}
