import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

async function sha256(s: string) {
  const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(s))
  return Array.from(new Uint8Array(buf)).map((b) => b.toString(16).padStart(2, '0')).join('')
}

export default function SignVerify() {
  const [text, setText] = useState('2026년 10월 1일, 계약금 1,000만 원을 지급한다.')
  const [hash, setHash] = useState('')
  const [signedHash, setSignedHash] = useState<string | null>(null)
  const [verify, setVerify] = useState<null | boolean>(null)
  useEffect(() => { sha256(text).then(setHash); setVerify(null) }, [text])
  return (
    <div>
      <div className="controls" style={{ alignItems: 'stretch' }}>
        <input type="text" value={text} onChange={(e) => setText(e.target.value)} style={{ flex: 1, minWidth: 220 }} />
        <button className="btn small primary" onClick={() => { setSignedHash(hash); setVerify(null) }}>✍️ 개인키로 서명</button>
        <button className="btn small" onClick={() => setVerify(signedHash === hash)} disabled={!signedHash}>🔍 공개키로 검증</button>
      </div>
      <div className="stat-row" style={{ gridTemplateColumns: '1fr' }}>
        <div className="stat"><div className="k">문서의 해시 (SHA-256)</div><motion.div key={hash} className="v" style={{ fontSize: '0.8rem', wordBreak: 'break-all' }} initial={{ color: '#f5b544' }} animate={{ color: '#e6eaf2' }} transition={{ duration: 1 }}>{hash}</motion.div></div>
        {signedHash && <div className="stat"><div className="k">서명에 담긴 해시 (서명 시점)</div><div className="v" style={{ fontSize: '0.8rem', wordBreak: 'break-all' }}>{signedHash}</div></div>}
      </div>
      {verify !== null && (
        <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className={'badge ' + (verify ? 'safe' : 'danger')} style={{ fontSize: '0.95rem', padding: '6px 14px' }}>
          {verify ? '✅ 검증 성공 — 문서가 서명 이후 바뀌지 않았습니다' : '❌ 검증 실패 — 문서가 변조되었습니다 (해시가 다름)'}
        </motion.div>
      )}
      <p style={{ fontSize: '0.85rem', color: 'var(--fg-2)', margin: '10px 0 0' }}>서명한 뒤 문장을 한 글자만 바꿔 보세요. 해시가 완전히 달라지고 검증이 실패합니다. (여기서는 원리를 보여주기 위해 해시만 비교합니다.)</p>
    </div>
  )
}
