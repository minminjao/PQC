import { motion } from 'framer-motion'

export default function Timeline({ items }: { items: { y: string; t: string; hi?: boolean }[] }) {
  return (
    <div style={{ position: 'relative', paddingLeft: 22 }}>
      <div style={{ position: 'absolute', left: 6, top: 6, bottom: 6, width: 2, background: 'var(--line)' }} />
      {items.map((it, i) => (
        <motion.div key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.08 }} style={{ position: 'relative', marginBottom: 12 }}>
          <div style={{ position: 'absolute', left: -21, top: 6, width: 12, height: 12, borderRadius: '50%', background: it.hi ? 'var(--c-pqc)' : 'var(--bg-3)', border: '2px solid ' + (it.hi ? 'var(--c-pqc)' : 'var(--fg-3)') }} />
          <div className="mono" style={{ fontSize: '0.8rem', color: it.hi ? 'var(--c-pqc)' : 'var(--fg-3)' }}>{it.y}</div>
          <div style={{ fontWeight: it.hi ? 700 : 400 }}>{it.t}</div>
        </motion.div>
      ))}
    </div>
  )
}
