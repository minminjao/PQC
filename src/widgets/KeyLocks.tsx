import { useState } from 'react'
import { motion } from 'framer-motion'

export default function KeyLocks() {
  const [mode, setMode] = useState<'sym' | 'pub'>('sym')
  const [t, setT] = useState(0)
  const people = ['A', 'B', 'C', 'D']
  return (
    <div>
      <div className="controls">
        <div className="toggle">
          <button className={mode === 'sym' ? 'on' : ''} onClick={() => { setMode('sym'); setT(0) }}>대칭키</button>
          <button className={mode === 'pub' ? 'on' : ''} onClick={() => { setMode('pub'); setT(0) }}>공개키</button>
        </div>
        <button className="btn small" onClick={() => setT((x) => (x + 1) % 3)}>다음 단계 ({t + 1}/3)</button>
      </div>
      <svg viewBox="0 0 400 150" style={{ width: '100%', display: 'block' }}>
        {mode === 'sym' ? (
          <>
            <Person x={50} label="보내는 쪽" />
            <Person x={350} label="받는 쪽" />
            {/* same key on both sides */}
            <Key x={50} y={95} color="#f5b544" />
            <motion.g initial={false} animate={{ opacity: t >= 2 ? 1 : 0.25 }}>
              <Key x={350} y={95} color="#f5b544" />
            </motion.g>
            {/* key travel with question */}
            <motion.g initial={false} animate={{ x: t >= 1 ? 300 : 0, opacity: t === 1 ? 1 : 0 }} transition={{ duration: 0.9 }}>
              <Key x={50} y={40} color="#f5b544" />
            </motion.g>
            <motion.text initial={false} x={200} y={30} textAnchor="middle" fill="#f0575d" fontSize={16} fontWeight={700} animate={{ opacity: t === 1 ? 1 : 0 }}>
              이 열쇠를 어떻게 안전하게 건네지?
            </motion.text>
            <Box x={200} y={95} locked={t >= 1} color="#f5b544" />
            <text x={200} y={140} textAnchor="middle" fill="#a8b1c2" fontSize={11}>
              {['같은 열쇠를 양쪽이 가져야 한다', '열쇠 전달 자체가 문제', '같은 열쇠로 잠그고 연다 — 빠르고 가볍다'][t]}
            </text>
          </>
        ) : (
          <>
            <Person x={350} label="본인 (개인키)" />
            <Key x={350} y={95} color="#f0575d" />
            {people.map((p, i) => (
              <g key={p}>
                <Person x={30 + i * 45} label={p} small />
                <motion.g initial={false} animate={{ opacity: t >= 1 ? 1 : 0 }} transition={{ delay: i * 0.15 }}>
                  <Key x={30 + i * 45} y={95} color="#4f8cff" small />
                </motion.g>
              </g>
            ))}
            <motion.g initial={false} animate={{ opacity: t === 0 ? 1 : 0.3 }}>
              <Key x={350} y={40} color="#4f8cff" />
              <text x={350} y={25} textAnchor="middle" fill="#4f8cff" fontSize={10}>공개키 (복사해서 배포)</text>
            </motion.g>
            {t >= 1 && people.map((p, i) => (
              <motion.line key={p} x1={350} y1={40} x2={30 + i * 45} y2={85} stroke="#4f8cff" strokeWidth={0.8} strokeDasharray="3 3"
                initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.6, delay: i * 0.1 }} />
            ))}
            <Box x={230} y={95} locked={t >= 2} color={t >= 2 ? '#4f8cff' : '#6b7484'} />
            <text x={200} y={140} textAnchor="middle" fill="#a8b1c2" fontSize={11}>
              {['잠그는 열쇠(공개키)와 여는 열쇠(개인키)가 다르다', '공개키는 누구에게나 나눠 준다', '누구나 잠글 수 있지만, 여는 건 개인키를 가진 한 사람뿐'][t]}
            </text>
          </>
        )}
      </svg>
    </div>
  )
}

function Person({ x, label, small }: { x: number; label: string; small?: boolean }) {
  const r = small ? 7 : 10
  return (
    <g>
      <circle cx={x} cy={small ? 60 : 55} r={r} fill="#273046" stroke="#a8b1c2" />
      <text x={x} y={small ? 80 : 78} textAnchor="middle" fill="#a8b1c2" fontSize={small ? 9 : 10}>{label}</text>
    </g>
  )
}
function Key({ x, y, color, small }: { x: number; y: number; color: string; small?: boolean }) {
  const s = small ? 0.7 : 1
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <circle cx={-8} cy={0} r={6} fill="none" stroke={color} strokeWidth={3} />
      <line x1={-2} y1={0} x2={14} y2={0} stroke={color} strokeWidth={3} />
      <line x1={10} y1={0} x2={10} y2={5} stroke={color} strokeWidth={3} />
      <line x1={14} y1={0} x2={14} y2={4} stroke={color} strokeWidth={3} />
    </g>
  )
}
function Box({ x, y, locked, color }: { x: number; y: number; locked: boolean; color: string }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <rect x={-22} y={-14} width={44} height={30} rx={5} fill="#1a2236" stroke="#a8b1c2" />
      <motion.path initial={false} d="M -7 -14 v -8 a 7 7 0 0 1 14 0 v 8" fill="none" stroke={color} strokeWidth={3}
        animate={{ y: locked ? 0 : -6, rotate: locked ? 0 : -20 }} style={{ originX: '7px', originY: '-14px' }} />
      <text x={0} y={5} textAnchor="middle" fontSize={11} fill={color}>{locked ? '🔒' : '🔓'}</text>
    </g>
  )
}
