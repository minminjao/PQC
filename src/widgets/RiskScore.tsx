import { useState } from 'react'

const algos: { n: string; score: number; grade: string; due: string; cls: string }[] = [
  { n: 'AES-256', score: 2, grade: '안전', due: '전환 불필요', cls: 'safe' },
  { n: 'SHA-256 / SHA-3', score: 2, grade: '안전', due: '전환 불필요', cls: 'safe' },
  { n: 'ChaCha20', score: 2, grade: '안전', due: '전환 불필요', cls: 'safe' },
  { n: 'AES-128', score: 5, grade: '주의', due: '2035년까지', cls: 'warn' },
  { n: 'DH-4096', score: 6, grade: '주의', due: '2035년까지', cls: 'warn' },
  { n: 'ECC-521', score: 5, grade: '주의', due: '2035년까지', cls: 'warn' },
  { n: 'RSA-2048', score: 9, grade: '경고', due: '2030년까지', cls: 'warn' },
  { n: 'ECC P-256', score: 9, grade: '경고', due: '2030년까지', cls: 'warn' },
  { n: 'DH-2048', score: 9, grade: '경고', due: '2030년까지', cls: 'warn' },
  { n: 'RSA-1024', score: 15, grade: '위험', due: '즉시 전환', cls: 'danger' },
  { n: 'SHA-1 / MD5', score: 15, grade: '위험', due: '즉시 전환', cls: 'danger' },
  { n: 'DES / 3DES', score: 15, grade: '위험', due: '즉시 전환', cls: 'danger' },
]
export default function RiskScore() {
  const [sel, setSel] = useState(algos[6])
  const [S, setS] = useState(10)
  const long = S >= 10 && sel.score >= 4
  return (
    <div>
      <div className="controls">
        <label>
          알고리즘
          <select value={sel.n} onChange={(e) => setSel(algos.find((a) => a.n === e.target.value)!)}>
            {algos.map((a) => <option key={a.n}>{a.n}</option>)}
          </select>
        </label>
        <label>
          데이터 기밀 수명
          <input type="range" min={1} max={30} value={S} onChange={(e) => setS(+e.target.value)} />
          <span className="mono">{S}년</span>
        </label>
      </div>
      <div className="stat-row">
        <div className="stat"><div className="k">위험도 점수</div><div className="v">{sel.score}점</div></div>
        <div className={'stat ' + sel.cls}><div className="k">등급</div><div className="v">{sel.grade}</div></div>
        <div className={'stat ' + sel.cls}><div className="k">전환 기한</div><div className="v">{long && sel.score < 15 ? '앞당김 → 지금' : sel.due}</div></div>
      </div>
      <p style={{ fontSize: '0.88rem', color: 'var(--fg-2)', margin: 0 }}>
        {sel.score === 2 && '대칭키·해시는 그로버의 영향만 받으므로 충분한 길이라면 전환이 필요 없습니다.'}
        {sel.score >= 4 && sel.score < 15 && (long ? `기밀 수명 ${S}년이 길어 HNDL 위험이 큽니다. 규제 기한보다 앞당겨 지금 전환을 시작해야 합니다.` : '쇼어에 직접 깨지는 공개키 계열 또는 유효 강도가 부족한 대칭키입니다. 규제 기한 안에 교체하세요.')}
        {sel.score === 15 && '양자 컴퓨터와 무관하게 이미 고전 공격에 취약합니다. 즉시 교체 대상입니다.'}
      </p>
    </div>
  )
}
