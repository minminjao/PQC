import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { toc } from '../toc'
import HeroAnimation from '../widgets/HeroAnimation'

export default function MainPage() {
  return (
    <>
      <section className="hero">
        <HeroAnimation />
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} style={{ position: 'relative' }}>
          <h1>
            양자컴퓨터가 깨는 암호,
            <br />
            <span style={{ background: 'linear-gradient(90deg, var(--c-pqc), var(--c-quantum))', WebkitBackgroundClip: 'text', color: 'transparent' }}>
              양자내성암호
            </span>
            가 지키는 방법
          </h1>
          <p>
            쇼어 알고리즘이 RSA를 무너뜨리는 순간부터, 격자 위에 새로 세운 자물쇠와 조직의 전환 전략까지.
            애니메이션과 시뮬레이션을 직접 만져 보며 단계별로 이해합니다.
          </p>
          <div className="hero-cta">
            <Link to="/threat/1" className="btn primary">
              처음부터 시작하기 →
            </Link>
            <a href="#toc" className="btn">
              목차 보기
            </a>
          </div>
        </motion.div>
      </section>

      <div id="toc">
        {toc.map((p, pi) => (
          <section className="part" key={p.slug} style={{ ['--accent' as string]: p.accent }}>
            <div className="part-title">
              <span className="num" style={{ background: p.accent }}>
                Part {pi + 1}
              </span>
              <h2 style={{ margin: 0 }}>{p.title}</h2>
            </div>
            <div className="cards">
              {p.content.map((c, ci) => (
                <motion.div key={c.route} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 + (pi * 3 + ci) * 0.06 }}>
                  <Link to={c.route} className="card">
                    <div className="label">
                      {pi + 1}-{ci + 1}
                    </div>
                    <h3>{c.title}</h3>
                    <p>{c.description}</p>
                  </Link>
                </motion.div>
              ))}
            </div>
          </section>
        ))}
      </div>
    </>
  )
}
