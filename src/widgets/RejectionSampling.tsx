import { useState } from 'react'
import { motion } from 'framer-motion'

export default function RejectionSampling() {
  const [hist, setHist] = useState<number[]>([])
  const [trace, setTrace] = useState<boolean[]>([])
  const [busy, setBusy] = useState(false)
  const bound = 0.62 // acceptance probability per try (approx for toy)
  const run = () => {
    if (busy) return
    setBusy(true)
    const tries: boolean[] = []
    const step = () => {
      const ok = Math.random() < bound
      tries.push(ok)
      setTrace([...tries])
      if (ok) {
        setHist((h) => [...h, tries.length])
        setBusy(false)
      } else setTimeout(step, 260)
    }
    setTrace([])
    setTimeout(step, 100)
  }
  const maxT = Math.max(1, ...hist)
  const counts = Array.from({ length: Math.min(maxT, 8) }, (_, i) => hist.filter((h) => h === i + 1).length)
  const avg = hist.length ? (hist.reduce((a, b) => a + b, 0) / hist.length).toFixed(2) : '-'
  return (
    <div>
      <div className="controls">
        <button className="btn small primary" onClick={run} disabled={busy}>✍️ 서명 한 번</button>
        <button className="btn small" onClick={() => { for (let i = 0; i < 20; i++) { let t = 1; while (Math.random() >= bound) t++; hist.push(t) } setHist([...hist]) }}>20번 한꺼번에</button>
        <button className="btn small" onClick={() => { setHist([]); setTrace([]) }}>초기화</button>
        <span className="mono" style={{ fontSize: '0.85rem' }}>서명 {hist.length}회 · 평균 시도 {avg}</span>
      </div>
      <div style={{ display: 'flex', gap: 6, minHeight: 34, marginBottom: 10, flexWrap: 'wrap' }}>
        {trace.map((ok, i) => (
          <motion.div key={i} initial={{ scale: 0 }} animate={{ scale: 1 }} style={{ padding: '4px 10px', borderRadius: 8, background: ok ? 'rgba(53,201,138,0.2)' : 'rgba(240,87,93,0.2)', color: ok ? 'var(--c-apply)' : 'var(--c-threat)', fontSize: 12 }}>
            후보 {i + 1}: {ok ? '범위 안 → 채택' : '범위 밖 → 찢고 다시'}
          </motion.div>
        ))}
      </div>
      <svg viewBox="0 0 420 120" style={{ width: '100%', display: 'block' }}>
        {counts.map((c, i) => {
          const h = hist.length ? (c / Math.max(...counts, 1)) * 80 : 0
          return (
            <g key={i}>
              <motion.rect initial={false} x={30 + i * 48} width={36} rx={3} fill="#4f8cff" animate={{ y: 95 - h, height: h }} />
              <text x={48 + i * 48} y={110} textAnchor="middle" fill="#a8b1c2" fontSize={9}>{i + 1}회</text>
              <text x={48 + i * 48} y={92 - h} textAnchor="middle" fill="#e6eaf2" fontSize={9}>{c || ''}</text>
            </g>
          )
        })}
        <text x={410} y={12} textAnchor="end" fill="#6b7484" fontSize={9}>서명 1건에 걸린 시도 횟수 분포</text>
      </svg>
    </div>
  )
}
