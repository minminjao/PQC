import { useState } from 'react'

export default function Recommender() {
  const [ind, setInd] = useState('금융')
  const [life, setLife] = useState<'short' | 'mid' | 'long'>('mid')
  const [dev, setDev] = useState<'server' | 'mobile' | 'iot'>('server')
  const [role, setRole] = useState<'general' | 'root'>('general')

  let kem = 'ML-KEM-768 (Kyber-768)', sig = 'ML-DSA-65 (Dilithium3)', why = '가장 검증된 글로벌 표준 조합'
  if (role === 'root') { kem = '(HSM 내부 전용)'; sig = 'SLH-DSA (루트) + ML-DSA (하위)'; why = '신뢰 앵커는 보수적·안전하게. 격자 공격이 나와도 루트는 버틴다' }
  else if (dev === 'iot') { kem = 'ML-KEM-512'; sig = 'FN-DSA-512 (Falcon)'; why = '자원 제약 기기에 맞춘 경량 조합. 서명 666 B' }
  else if (life === 'long') { kem = 'ML-KEM-1024'; sig = life === 'long' && ind === '의료' ? 'SLH-DSA' : 'ML-DSA-87 + SLH-DSA'; why = '장기 보존 데이터의 절대 안전성 — HNDL 최우선 대상' }
  else if (life === 'short' && ind === '금융') { kem = 'ML-KEM-512'; sig = 'FN-DSA-512 (Falcon)'; why = '초고속 처리, 작은 서명으로 병목 방지' }
  else if (dev === 'mobile') { kem = 'X25519 + ML-KEM-768 하이브리드'; sig = 'ML-DSA-65'; why = '크롬·시그널에서 검증된 하이브리드 경로' }

  return (
    <div>
      <div className="controls">
        <label>산업<select value={ind} onChange={(e) => setInd(e.target.value)}>{['금융', '의료', '통신', '공공'].map((i) => <option key={i}>{i}</option>)}</select></label>
        <label>데이터 보존기간<select value={life} onChange={(e) => setLife(e.target.value as never)}><option value="short">수 분~수 일 (거래·세션)</option><option value="mid">수 년 (일반 업무)</option><option value="long">10년 이상 (계약·진료·유전체)</option></select></label>
        <label>기기<select value={dev} onChange={(e) => setDev(e.target.value as never)}><option value="server">서버·PC</option><option value="mobile">모바일·웹</option><option value="iot">IoT·SIM·카드</option></select></label>
        <label>역할<select value={role} onChange={(e) => setRole(e.target.value as never)}><option value="general">일반 통신·서명</option><option value="root">루트 인증서·HSM</option></select></label>
      </div>
      <div className="stat-row">
        <div className="stat"><div className="k">키 교환 (KEM)</div><div className="v" style={{ fontSize: '1rem' }}>{kem}</div></div>
        <div className="stat"><div className="k">서명</div><div className="v" style={{ fontSize: '1rem' }}>{sig}</div></div>
      </div>
      <p style={{ fontSize: '0.9rem', color: 'var(--fg-2)', margin: 0 }}>이유: {why}</p>
    </div>
  )
}
