import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'

// 2D lattice with good/bad basis; user picks integer coefficients to reach the target
export default function Lattice() {
  const [good, setGood] = useState(true)
  const [c1, setC1] = useState(0)
  const [c2, setC2] = useState(0)
  const B = good ? { u: [3, 0.5], v: [0.5, 3] } : { u: [3, 0.5], v: [9.5, 4.5] } // bad = u, 3u+v (same lattice)
  const target = { x: 3 * 3 + 2 * 0.5, y: 3 * 0.5 + 2 * 3 } // 3u+2v in good basis
  const cur = { x: c1 * B.u[0] + c2 * B.v[0], y: c1 * B.u[1] + c2 * B.v[1] }
  const dist = Math.hypot(cur.x - target.x, cur.y - target.y)
  const hit = dist < 0.01
  const W = 360, H = 260, cx = 40, cy = 220, s = 14
  const px = (x: number, y: number) => ({ X: cx + x * s, Y: cy - y * s })
  const pts = useMemo(() => {
    const out: { x: number; y: number }[] = []
    for (let i = -3; i <= 12; i++) for (let j = -3; j <= 12; j++) {
      const x = i * 3 + j * 0.5, y = i * 0.5 + j * 3
      if (x >= -1 && x <= 22 && y >= -1 && y <= 15) out.push({ x, y })
    }
    return out
  }, [])
  const t = px(target.x, target.y), c = px(cur.x, cur.y), u = px(B.u[0], B.u[1]), v = px(B.v[0], B.v[1]), o = px(0, 0)
  return (
    <div>
      <div className="controls">
        <div className="toggle">
          <button className={good ? 'on' : ''} onClick={() => { setGood(true); setC1(0); setC2(0) }}>좋은 기저 (비밀키)</button>
          <button className={!good ? 'on' : ''} onClick={() => { setGood(false); setC1(0); setC2(0) }}>나쁜 기저 (공개키)</button>
        </div>
        <label>a<input type="range" min={-10} max={10} value={c1} onChange={(e) => setC1(+e.target.value)} /><span className="mono">{c1}</span></label>
        <label>b<input type="range" min={-10} max={10} value={c2} onChange={(e) => setC2(+e.target.value)} /><span className="mono">{c2}</span></label>
      </div>
      <svg viewBox={`0 0 ${W} ${H}`} style={{ width: '100%', display: 'block', background: '#0b0f1a', borderRadius: 8 }}>
        {pts.map((p, i) => { const q = px(p.x, p.y); return <circle key={i} cx={q.X} cy={q.Y} r={1.6} fill="#3a4560" /> })}
        <line x1={o.X} y1={o.Y} x2={u.X} y2={u.Y} stroke="#4f8cff" strokeWidth={2} markerEnd="url(#ar)" />
        <line x1={o.X} y1={o.Y} x2={v.X} y2={v.Y} stroke="#b57cff" strokeWidth={2} />
        <text x={u.X + 4} y={u.Y} fill="#4f8cff" fontSize={10}>u</text>
        <text x={v.X + 4} y={v.Y} fill="#b57cff" fontSize={10}>v</text>
        <circle cx={o.X} cy={o.Y} r={3} fill="#e6eaf2" />
        <text x={t.X} y={t.Y - 8} textAnchor="middle" fill="#f5b544" fontSize={14}>★</text>
        <text x={t.X} y={t.Y - 20} textAnchor="middle" fill="#f5b544" fontSize={9}>목표</text>
        <motion.circle initial={false} r={6} fill="none" stroke={hit ? '#35c98a' : '#f0575d'} strokeWidth={2} animate={{ cx: c.X, cy: c.Y }} transition={{ type: 'spring', stiffness: 200, damping: 20 }} />
        <motion.line initial={false} x1={o.X} y1={o.Y} stroke="#e6eaf2" strokeDasharray="3 3" opacity={0.4} animate={{ x2: c.X, y2: c.Y }} />
      </svg>
      <div className="stat-row">
        <div className="stat"><div className="k">현재 위치 = a·u + b·v</div><div className="v">({cur.x.toFixed(1)}, {cur.y.toFixed(1)})</div></div>
        <div className={'stat ' + (hit ? 'safe' : '')}><div className="k">목표까지 거리</div><div className="v">{hit ? '도달!' : dist.toFixed(1)}</div></div>
        <div className="stat"><div className="k">정답 계수</div><div className="v">{good ? 'a=3, b=2' : 'a=−3, b=2'}</div></div>
      </div>
      <p style={{ fontSize: '0.88rem', color: 'var(--fg-2)', margin: 0 }}>
        {good
          ? '좋은 기저는 짧고 서로 거의 직각이라, 목표에 가까운 격자점을 몇 번 만에 찾습니다.'
          : '나쁜 기저는 길고 비뚤어져 같은 점을 만들려면 계수가 음수·큰 값으로 튑니다. 2차원에서도 헷갈리는데, 실제 격자는 수백 차원입니다.'}
      </p>
    </div>
  )
}
