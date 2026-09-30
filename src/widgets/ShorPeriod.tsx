import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'

function gcd(a: number, b: number): number { return b === 0 ? a : gcd(b, a % b) }
function modpow(a: number, e: number, n: number) { let r = 1; a %= n; for (let i = 0; i < e; i++) r = (r * a) % n; return r }

export default function ShorPeriod() {
  const [N, setN] = useState(21)
  const [a, setA] = useState(2)
  const [stage, setStage] = useState(0)

  const data = useMemo(() => {
    const xs = Array.from({ length: 20 }, (_, k) => k)
    const ys = xs.map((k) => modpow(a, k, N))
    let r = 0
    for (let k = 1; k < 200; k++) if (modpow(a, k, N) === 1) { r = k; break }
    let p = 0, q = 0, y = 0, ok = false
    if (r && r % 2 === 0) {
      y = modpow(a, r / 2, N)
      p = gcd(y - 1, N); q = gcd(y + 1, N)
      ok = p > 1 && p < N && q > 1 && q < N
    }
    return { xs, ys, r, p, q, y, ok, coprime: gcd(a, N) === 1 }
  }, [N, a])

  const W = 420, H = 170, pad = 30
  const sx = (k: number) => pad + (k / 19) * (W - pad - 10)
  const sy = (v: number) => H - pad - (v / (N - 1)) * (H - pad - 15)

  return (
    <div>
      <div className="controls">
        <label>
          N =
          <select value={N} onChange={(e) => { setN(+e.target.value); setStage(0) }}>
            {[15, 21, 33, 35, 39, 51, 55, 77].map((v) => <option key={v} value={v}>{v}</option>)}
          </select>
        </label>
        <label>
          a =
          <input type="range" min={2} max={N - 1} value={Math.min(a, N - 1)} onChange={(e) => { setA(+e.target.value); setStage(0) }} />
          <span className="mono">{a}</span>
        </label>
        <button className="btn small primary" onClick={() => setStage((s) => Math.min(s + 1, 3))} disabled={!data.coprime}>
          {['1. 주기 찾기 (양자)', '2. y = a^(r/2) mod N', '3. gcd로 소인수', '완료'][stage]}
        </button>
        <button className="btn small" onClick={() => setStage(0)}>초기화</button>
      </div>
      <svg viewBox={`0 0 ${W} ${H}`} style={{ width: '100%', display: 'block' }}>
        <line x1={pad} y1={H - pad} x2={W - 5} y2={H - pad} stroke="#273046" />
        <line x1={pad} y1={10} x2={pad} y2={H - pad} stroke="#273046" />
        <text x={W / 2} y={H - 6} textAnchor="middle" fill="#6b7484" fontSize={10}>k (곱한 횟수)</text>
        <text x={8} y={14} fill="#6b7484" fontSize={10}>aᵏ mod N</text>
        {stage >= 1 && data.r > 0 && data.xs.filter((k) => k > 0 && k % data.r === 0).map((k) => (
          <motion.line key={k} x1={sx(k)} x2={sx(k)} y1={12} y2={H - pad} stroke="#f0575d" strokeDasharray="4 3"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: (k / data.r) * 0.2 }} />
        ))}
        <polyline points={data.xs.map((k) => `${sx(k)},${sy(data.ys[k])}`).join(' ')} fill="none" stroke="#4f8cff" strokeWidth={1.2} opacity={0.6} />
        {data.xs.map((k) => (
          <motion.circle key={k} cx={sx(k)} cy={sy(data.ys[k])} r={3.5} fill={data.ys[k] === 1 ? '#f5b544' : '#4f8cff'}
            initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: k * 0.04 }} />
        ))}
        {data.xs.map((k) => (
          <text key={k} x={sx(k)} y={sy(data.ys[k]) - 7} textAnchor="middle" fill="#a8b1c2" fontSize={8} className="svg-mono">{data.ys[k]}</text>
        ))}
      </svg>
      <div className="stat-row">
        <div className="stat"><div className="k">주기 r</div><div className="v">{stage >= 1 ? data.r : '?'}</div></div>
        <div className="stat"><div className="k">y = a^(r/2) mod N</div><div className="v">{stage >= 2 ? (data.r % 2 === 0 ? data.y : '주기가 홀수') : '?'}</div></div>
        <div className={'stat ' + (stage >= 3 && data.ok ? 'safe' : '')}><div className="k">gcd(y−1, N), gcd(y+1, N)</div><div className="v">{stage >= 3 ? (data.ok ? `${data.p}, ${data.q}` : '실패 → 다른 a로 재시도') : '?'}</div></div>
      </div>
      {!data.coprime && <div className="badge warn">a와 N이 서로소가 아닙니다. 이 경우 gcd(a, N)이 바로 소인수입니다: {gcd(a, N)}</div>}
      {stage >= 3 && data.ok && (
        <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} style={{ marginTop: 8, fontWeight: 700, color: 'var(--c-apply)' }}>
          🔓 {N} = {data.p} × {data.q} — 주기만 알면 나머지는 초등 수학(최대공약수)뿐입니다.
        </motion.div>
      )}
    </div>
  )
}
