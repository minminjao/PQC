import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'

export default function Bimodal() {
  const [after, setAfter] = useState(false)
  const pts = useMemo(() => {
    const out: { x: number; y: number; keep: boolean }[] = []
    let seed = 7
    const rnd = () => { seed = (seed * 9301 + 49297) % 233280; return seed / 233280 }
    for (let i = 0; i < 260; i++) {
      const side = rnd() < 0.5 ? -1 : 1
      const r = Math.sqrt(-2 * Math.log(rnd() + 1e-9)) * 22
      const th = rnd() * Math.PI * 2
      const x = side * 55 + r * Math.cos(th), y = r * Math.sin(th)
      out.push({ x, y, keep: Math.hypot(x, y) < 48 })
    }
    return out
  }, [])
  return (
    <div>
      <div className="controls">
        <div className="toggle">
          <button className={!after ? 'on' : ''} onClick={() => setAfter(false)}>거부 샘플링 전 (쌍봉, 반지름 B)</button>
          <button className={after ? 'on' : ''} onClick={() => setAfter(true)}>후 (균등 하이퍼볼, B′ &lt; B)</button>
        </div>
      </div>
      <svg viewBox="-160 -90 320 180" style={{ width: '100%', display: 'block' }}>
        <circle cx={0} cy={0} r={110} fill="none" stroke="#273046" strokeDasharray="4 3" />
        <text x={0} y={-80} textAnchor="middle" fill="#6b7484" fontSize={8}>B</text>
        <motion.circle initial={false} cx={0} cy={0} r={48} fill="none" stroke="#35c98a" animate={{ opacity: after ? 1 : 0.2 }} />
        <text x={0} y={-52} textAnchor="middle" fill="#35c98a" fontSize={8}>B′</text>
        <text x={-55} y={75} textAnchor="middle" fill="#a8b1c2" fontSize={8}>−cs</text>
        <text x={55} y={75} textAnchor="middle" fill="#a8b1c2" fontSize={8}>+cs</text>
        {pts.map((p, i) => (
          <motion.circle initial={false} key={i} cx={p.x} cy={p.y} r={1.8} fill={p.keep ? '#4f8cff' : '#b57cff'} animate={{ opacity: after && !p.keep ? 0.05 : 0.9 }} transition={{ delay: (i % 20) * 0.01 }} />
        ))}
      </svg>
      <p style={{ fontSize: '0.88rem', color: 'var(--fg-2)', margin: 0 }}>{after ? '더 작은 반지름 B′의 균등 하이퍼볼 안에 있는 점만 최종 서명 z로 채택 → 서명 크기가 줄어든다 (Dilithium 대비 최대 39% 감소).' : '기존 방식은 두 봉우리(+cs, −cs)로 퍼진 넓은 공간에서 샘플을 뽑아 서명이 비대해진다.'}</p>
    </div>
  )
}
