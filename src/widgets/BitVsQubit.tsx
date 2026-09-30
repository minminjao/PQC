import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function BitVsQubit() {
  const [bits, setBits] = useState(3)
  const [running, setRunning] = useState(false)
  const [step, setStep] = useState(0)
  const [qstep, setQstep] = useState(0)
  const n = 1 << bits
  const answer = n - 2 // deterministic 'answer' index for demo

  useEffect(() => {
    if (!running) return
    setStep(0)
    setQstep(0)
    const id = setInterval(() => {
      setStep((s) => {
        if (s >= answer) {
          clearInterval(id)
          return s
        }
        return s + 1
      })
      setQstep((q) => Math.min(q + 1, 2))
    }, Math.max(60, 700 / Math.min(n, 16)))
    return () => clearInterval(id)
  }, [running, answer, n])

  const show = Math.min(n, 16)
  return (
    <div>
      <div className="controls">
        <label>
          비트 수 {bits}
          <input type="range" min={2} max={8} value={bits} onChange={(e) => { setBits(+e.target.value); setRunning(false); setStep(0); setQstep(0) }} />
        </label>
        <button className="btn small primary" onClick={() => setRunning(false)} style={{ display: 'none' }} />
        <button className="btn small primary" onClick={() => { setRunning(false); setTimeout(() => setRunning(true), 20) }}>
          ▶ 정답 찾기
        </button>
        <span style={{ fontSize: '0.85rem', color: 'var(--fg-2)' }}>후보 {n.toLocaleString()}개 중 정답 1개</span>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
        <Panel title="고전 비트" color="var(--c-classic)" count={running ? step + 1 : 0} total={answer + 1}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
            {Array.from({ length: show }, (_, i) => {
              const idx = i
              const state = !running ? 'idle' : idx < step ? 'done' : idx === step ? 'now' : 'idle'
              const isAns = idx === answer
              return (
                <div
                  key={i}
                  className="mono"
                  style={{
                    width: 40, height: 26, borderRadius: 6, fontSize: 10, display: 'grid', placeItems: 'center',
                    background: state === 'now' ? (isAns ? 'var(--c-apply)' : 'var(--c-threat)') : state === 'done' ? 'var(--bg)' : 'var(--bg-3)',
                    color: state === 'now' ? '#000' : state === 'done' ? 'var(--fg-3)' : 'var(--fg-2)',
                    transition: 'background 0.15s',
                  }}
                >
                  {idx.toString(2).padStart(bits, '0').slice(-6)}
                </div>
              )
            })}
            {n > show && <div style={{ fontSize: 12, color: 'var(--fg-3)', alignSelf: 'center' }}>… +{(n - show).toLocaleString()}</div>}
          </div>
        </Panel>
        <Panel title="큐비트 (중첩)" color="var(--c-quantum)" count={running ? qstep : 0} total={2}>
          <div style={{ position: 'relative', height: 110 }}>
            <AnimatePresence>
              {Array.from({ length: show }, (_, i) => {
                const isAns = i === answer
                const dim = qstep >= 2 && !isAns
                return (
                  <motion.div
                    key={i}
                    className="mono"
                    initial={{ opacity: 0.35 }}
                    animate={{
                      opacity: !running ? 0.35 : dim ? 0.05 : isAns && qstep >= 1 ? 1 : 0.35,
                      scale: isAns && qstep >= 2 ? 1.4 : 1,
                      x: (i % 8) * 46,
                      y: Math.floor(i / 8) * 40 + (isAns && qstep >= 2 ? 6 : 0),
                    }}
                    transition={{ duration: 0.5 }}
                    style={{
                      position: 'absolute', width: 40, height: 26, borderRadius: 6, fontSize: 10, display: 'grid', placeItems: 'center',
                      background: isAns && qstep >= 1 && running ? 'var(--c-quantum)' : 'var(--c-quantum)',
                      color: '#000',
                    }}
                  >
                    {i.toString(2).padStart(bits, '0').slice(-6)}
                  </motion.div>
                )
              })}
            </AnimatePresence>
          </div>
        </Panel>
      </div>
    </div>
  )
}

function Panel({ title, color, count, total, children }: { title: string; color: string; count: number; total: number; children: React.ReactNode }) {
  return (
    <div style={{ background: 'var(--bg-3)', borderRadius: 10, padding: 12 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 8 }}>
        <strong style={{ color }}>{title}</strong>
        <span className="mono" style={{ fontSize: 12, color: 'var(--fg-2)' }}>
          계산 {count} / {total}회
        </span>
      </div>
      {children}
    </div>
  )
}
