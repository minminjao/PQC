import { useState } from 'react'
import { motion } from 'framer-motion'

const msg = 'POST-QUANTUM'
export default function NoiseRecover() {
  const [state, setState] = useState<'orig' | 'noisy' | 'fail' | 'ok'>('orig')
  const seedNoise = [1, 4, 7, 10]
  const chars = msg.split('').map((ch, i) => {
    if (state === 'orig' || state === 'ok') return { ch, bad: false }
    if (seedNoise.includes(i)) return { ch: state === 'fail' ? '#' : String.fromCharCode(33 + ((i * 7) % 60)), bad: true }
    if (state === 'fail' && i % 3 === 0) return { ch: '?', bad: true }
    return { ch, bad: false }
  })
  return (
    <div>
      <div className="controls">
        <button className="btn small" onClick={() => setState('noisy')}>① 노이즈 추가 (공개키로 암호화)</button>
        <button className="btn small" onClick={() => setState('fail')} disabled={state === 'orig'}>② 복구키 없이 시도</button>
        <button className="btn small primary" onClick={() => setState('ok')} disabled={state === 'orig'}>③ 복구키로 복원</button>
        <button className="btn small" onClick={() => setState('orig')}>초기화</button>
      </div>
      <div style={{ display: 'flex', gap: 6, justifyContent: 'center', padding: '12px 0' }}>
        {chars.map((c, i) => (
          <motion.div initial={false} key={i} className="mono" animate={{ rotate: c.bad ? [0, -8, 8, 0] : 0, y: c.bad ? -4 : 0 }} transition={{ duration: 0.4 }}
            style={{ width: 28, height: 36, display: 'grid', placeItems: 'center', borderRadius: 6, fontSize: 18, fontWeight: 600,
              background: c.bad ? 'rgba(240,87,93,0.2)' : state === 'ok' ? 'rgba(53,201,138,0.2)' : 'var(--bg-3)', color: c.bad ? 'var(--c-threat)' : 'var(--fg)' }}>
            {c.ch}
          </motion.div>
        ))}
      </div>
      <p style={{ fontSize: '0.88rem', color: 'var(--fg-2)', margin: 0, textAlign: 'center' }}>
        {{ orig: '원본 데이터 — 모든 조각이 제자리에 있다.', noisy: '일부러 오류를 섞었다. 어느 위치가 오류인지는 겉으로 알 수 없다.', fail: '복구키 없이 고치려 하면 더 망가진다 — 어떤 조각이 오류인지 모르기 때문.', ok: '복구키(오류정정 코드의 비밀 구조)가 노이즈를 정확히 상쇄해 원본과 동일하게 복원했다.' }[state]}
      </p>
    </div>
  )
}
