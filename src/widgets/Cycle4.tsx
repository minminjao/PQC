import { useState } from 'react'
import { motion } from 'framer-motion'

const st = [
  { n: '탐색 Discover', d: '암호자산 탐색(수동+자동), CBOM 수립, 취약성 평가', o: 'CBOM, 양자 취약성 평가 보고서', c: '#4f8cff' },
  { n: '계획 Plan', d: '전환 우선순위 및 로드맵 수립', o: 'PQC 전환 로드맵, 우선순위 매트릭스', c: '#b57cff' },
  { n: '실행 Execute', d: '파일럿 적용, 연동 검증, 단계적 전환', o: '전환 완료 보고서, 성능 테스트 결과', c: '#f5b544' },
  { n: '운영 Operate', d: 'CBOM 지속 갱신, 모니터링, 암호민첩성 유지', o: '정기 CBOM 갱신 보고서, 운영 현황', c: '#35c98a' },
]
export default function Cycle4() {
  const [i, setI] = useState(0)
  const pos = (k: number) => { const a = (-Math.PI / 2) + k * (Math.PI / 2); return { x: 150 + 90 * Math.cos(a), y: 100 + 70 * Math.sin(a) } }
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, alignItems: 'center' }}>
      <svg viewBox="0 0 300 200" style={{ width: '100%' }}>
        <ellipse cx={150} cy={100} rx={90} ry={70} fill="none" stroke="#273046" />
        <motion.path initial={false} d="M 240 100 A 90 70 0 0 0 150 30" fill="none" stroke="#f0575d" strokeDasharray="4 3" animate={{ opacity: i === 2 ? 1 : 0.25 }} />
        <text x={215} y={50} fill="#f0575d" fontSize={8}>새 자산 발견 시 회귀</text>
        {st.map((s, k) => { const p = pos(k); return (
          <g key={k} onClick={() => setI(k)} style={{ cursor: 'pointer' }}>
            <motion.circle initial={false} cx={p.x} cy={p.y} r={22} fill={i === k ? s.c : '#1a2236'} stroke={s.c} strokeWidth={2} animate={{ scale: i === k ? 1.1 : 1 }} />
            <text x={p.x} y={p.y + 4} textAnchor="middle" fontSize={10} fontWeight={700} fill={i === k ? '#000' : s.c}>{k + 1}</text>
          </g>
        ) })}
      </svg>
      <div>
        <div className="badge info" style={{ background: st[i].c + '33', color: st[i].c }}>{i + 1}단계 · {st[i].n}</div>
        <p style={{ margin: '8px 0 4px' }}><strong>핵심 활동</strong><br />{st[i].d}</p>
        <p style={{ margin: 0, color: 'var(--fg-2)' }}><strong>산출물</strong><br />{st[i].o}</p>
        <button className="btn small" style={{ marginTop: 8 }} onClick={() => setI((i + 1) % 4)}>다음 단계 →</button>
      </div>
    </div>
  )
}
