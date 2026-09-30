import { motion } from 'framer-motion'

// Background: a lock made of bits that "quantum" particles dissolve, then a lattice rebuilds it.
export default function HeroAnimation() {
  const dots = Array.from({ length: 36 }, (_, i) => ({
    x: (i % 9) * 12 + 2,
    y: Math.floor(i / 9) * 12 + 2,
    d: (i * 37) % 11,
  }))
  return (
    <svg
      viewBox="0 0 110 48"
      preserveAspectRatio="xMidYMid slice"
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.35, pointerEvents: 'none' }}
      aria-hidden
    >
      <defs>
        <radialGradient id="g" cx="50%" cy="50%">
          <stop offset="0" stopColor="#4f8cff" />
          <stop offset="1" stopColor="#0b0f1a" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="110" height="48" fill="url(#g)" opacity="0.25" />
      {dots.map((p, i) => (
        <motion.circle
          key={i}
          cx={p.x}
          cy={p.y}
          r={0.9}
          fill={i % 3 === 0 ? '#b57cff' : '#4f8cff'}
          initial={{ opacity: 0.2 }}
          animate={{ opacity: [0.15, 0.9, 0.15], r: [0.7, 1.3, 0.7] }}
          transition={{ duration: 3 + (p.d % 4), repeat: Infinity, delay: p.d * 0.3, ease: 'easeInOut' }}
        />
      ))}
      {[0, 1, 2, 3].map((k) => (
        <motion.line
          key={k}
          x1={2 + k * 24}
          y1={2}
          x2={2 + k * 24 + 24}
          y2={38}
          stroke="#4f8cff"
          strokeWidth={0.2}
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: [0, 1, 1, 0], opacity: [0, 0.6, 0.6, 0] }}
          transition={{ duration: 6, repeat: Infinity, delay: k * 1.2 }}
        />
      ))}
    </svg>
  )
}
