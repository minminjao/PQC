import { Link, NavLink, useLocation } from 'react-router-dom'
import { motion, useScroll } from 'framer-motion'
import { toc } from '../toc'

export default function Header() {
  const { scrollYProgress } = useScroll()
  const { pathname } = useLocation()
  const part = toc.find((p) => pathname.startsWith('/' + p.slug))
  return (
    <>
      <header className="header">
        <div className="header-inner">
          <Link to="/" className="logo">
            <span className="logo-mark">🔐</span>
            <span>PQC</span>
          </Link>
          <nav className="header-nav">
            {toc.map((p) => (
              <NavLink key={p.slug} to={p.content[0].route} className={pathname.startsWith('/' + p.slug) ? 'active' : ''}>
                {p.title}
              </NavLink>
            ))}
          </nav>
        </div>
      </header>
      {part && (
        <motion.div
          className="progress"
          style={{ scaleX: scrollYProgress, width: '100%', background: part.accent }}
        />
      )}
    </>
  )
}
