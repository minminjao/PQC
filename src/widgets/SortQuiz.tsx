import { useState } from 'react'

const items: { n: string; broken: boolean; why: string }[] = [
  { n: 'RSA-2048', broken: true, why: '쇼어가 소인수분해를 푼다' },
  { n: 'AES-256', broken: false, why: '그로버로 유효 128비트 — 안전' },
  { n: 'ECDSA (P-256)', broken: true, why: '쇼어가 이산로그를 푼다' },
  { n: 'SHA-384', broken: false, why: '해시는 출력 길이로 버틴다' },
  { n: 'Diffie-Hellman', broken: true, why: '이산로그 기반 → 쇼어' },
  { n: 'ML-KEM', broken: false, why: '격자 기반 PQC' },
  { n: 'AES-128', broken: true, why: '유효 64비트 — 교체(AES-256) 권장' },
  { n: 'SLH-DSA', broken: false, why: '해시 기반 PQC 서명' },
  { n: 'HTTPS (RSA 인증서)', broken: true, why: '인증서·키교환이 공개키 기반' },
  { n: 'QKD (BB84)', broken: false, why: '물리 법칙 기반' },
]
export default function SortQuiz() {
  const [ans, setAns] = useState<Record<string, boolean>>({})
  const put = (n: string, b: boolean) => setAns((a) => ({ ...a, [n]: b }))
  const left = items.filter((i) => ans[i.n] === undefined)
  const score = items.filter((i) => ans[i.n] === i.broken).length
  return (
    <div>
      <div style={{ marginBottom: 10 }}>
        {left.map((i) => (
          <span key={i.n} className="chip">
            {i.n}
            <button className="btn small" style={{ padding: '2px 8px' }} onClick={() => put(i.n, true)}>깨진다</button>
            <button className="btn small" style={{ padding: '2px 8px' }} onClick={() => put(i.n, false)}>버틴다</button>
          </span>
        ))}
        {left.length === 0 && <span className="badge info">모두 분류했습니다 — {score} / {items.length} 정답</span>}
      </div>
      <div className="bins">
        <div className="bin broken">
          <strong style={{ color: 'var(--c-threat)' }}>깨진다 (양자 취약)</strong>
          <div>{items.filter((i) => ans[i.n] === true).map((i) => <Chip key={i.n} i={i} ok={i.broken} />)}</div>
        </div>
        <div className="bin safe">
          <strong style={{ color: 'var(--c-apply)' }}>버틴다 (양자 내성)</strong>
          <div>{items.filter((i) => ans[i.n] === false).map((i) => <Chip key={i.n} i={i} ok={!i.broken} />)}</div>
        </div>
      </div>
      <button className="btn small" style={{ marginTop: 10 }} onClick={() => setAns({})}>다시</button>
    </div>
  )
}
function Chip({ i, ok }: { i: { n: string; why: string }; ok: boolean }) {
  return <span className={'chip ' + (ok ? 'ok' : 'no')} title={i.why}>{ok ? '✓' : '✗'} {i.n} <span style={{ color: 'var(--fg-3)', fontSize: 11 }}>— {i.why}</span></span>
}
