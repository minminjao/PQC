import { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { findEntry } from '../toc'
import { useReveal } from './useReveal'

export function Chapter({ route, children }: { route: string; children: ReactNode }) {
  const { entry, prev, next } = findEntry(route)
  return (
    <main className="container" style={{ ['--accent' as string]: entry.part.accent }}>
      <motion.div className="chapter-head" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <div className="crumb">
          {entry.partIndex + 1}. {entry.part.title} · {entry.label}
        </div>
        <h1>{entry.title}</h1>
        <p className="lead">{entry.description}</p>
      </motion.div>
      {children}
      <nav className="chapter-nav">
        {prev ? (
          <Link to={prev.route} className="prev">
            <div className="dir">← 이전</div>
            <div className="t">{prev.title}</div>
          </Link>
        ) : (
          <Link to="/" className="prev">
            <div className="dir">← 처음으로</div>
            <div className="t">목차</div>
          </Link>
        )}
        {next ? (
          <Link to={next.route} className="next">
            <div className="dir">다음 →</div>
            <div className="t">{next.title}</div>
          </Link>
        ) : (
          <Link to="/" className="next">
            <div className="dir">완료 →</div>
            <div className="t">목차로 돌아가기</div>
          </Link>
        )}
      </nav>
    </main>
  )
}

export function Section({ title, children }: { title?: string; children: ReactNode }) {
  const [ref, seen] = useReveal<HTMLElement>()
  return (
    <motion.section
      ref={ref}
      className="section"
      initial={{ opacity: 0, y: 24 }}
      animate={seen ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
      transition={{ duration: 0.55, ease: 'easeOut' }}
    >
      {title && <h2>{title}</h2>}
      {children}
    </motion.section>
  )
}

export function Key({ children, title = '핵심' }: { children: ReactNode; title?: string }) {
  return (
    <div className="callout key">
      <div className="icon">💡</div>
      <div className="body">
        <div className="title">{title}</div>
        {typeof children === 'string' ? <p>{children}</p> : children}
      </div>
    </div>
  )
}
export function Warn({ children, title }: { children: ReactNode; title?: string }) {
  return (
    <div className="callout warn">
      <div className="icon">⚠️</div>
      <div className="body">
        {title && <div className="title">{title}</div>}
        {typeof children === 'string' ? <p>{children}</p> : children}
      </div>
    </div>
  )
}
export function Info({ children, title }: { children: ReactNode; title?: string }) {
  return (
    <div className="callout info">
      <div className="icon">ℹ️</div>
      <div className="body">
        {title && <div className="title">{title}</div>}
        {typeof children === 'string' ? <p>{children}</p> : children}
      </div>
    </div>
  )
}

export function Widget({ title, caption, children }: { title: string; caption?: ReactNode; children: ReactNode }) {
  return (
    <div className="widget">
      <div className="widget-head">
        <span className="dot" />
        <span>인터랙티브 · {title}</span>
      </div>
      <div className="widget-body">{children}</div>
      {caption && <div className="widget-caption">{caption}</div>}
    </div>
  )
}

export function Table({ head, rows }: { head: string[]; rows: ReactNode[][] }) {
  return (
    <div className="table-wrap">
      <table>
        <thead>
          <tr>
            {head.map((h, i) => (
              <th key={i}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i}>
              {r.map((c, j) => (
                <td key={j}>{c}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
