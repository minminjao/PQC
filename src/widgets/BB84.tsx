import { useState } from 'react'
import { motion } from 'framer-motion'

type Photon = { bit: number; aBase: '+' | '×'; bBase: '+' | '×'; eve: boolean; eBase: '+' | '×'; measured: number }
const rb = (): '+' | '×' => (Math.random() < 0.5 ? '+' : '×')
const arrow = (bit: number, base: '+' | '×') => (base === '+' ? (bit ? '↑' : '→') : bit ? '↖' : '↗')

export default function BB84() {
  const [ps, setPs] = useState<Photon[]>([])
  const [eve, setEve] = useState(false)
  const [revealed, setRevealed] = useState(false)
  const send = (n = 1) => {
    const arr: Photon[] = Array.from({ length: n }, () => {
      const bit = Math.random() < 0.5 ? 1 : 0
      const aBase = rb(), bBase = rb(), eBase = rb()
      let stateBit = bit, stateBase = aBase
      if (eve) { // intercept-resend
        const eb = eBase === aBase ? bit : Math.random() < 0.5 ? 1 : 0
        stateBit = eb; stateBase = eBase
      }
      const measured = bBase === stateBase ? stateBit : Math.random() < 0.5 ? 1 : 0
      return { bit, aBase, bBase, eve, eBase, measured }
    })
    setPs((p) => [...p, ...arr].slice(-16)); setRevealed(false)
  }
  const sifted = ps.filter((p) => p.aBase === p.bBase)
  const errors = sifted.filter((p) => p.bit !== p.measured).length
  const qber = sifted.length ? errors / sifted.length : 0
  return (
    <div>
      <div className="controls">
        <button className="btn small primary" onClick={() => send(1)}>📡 광자 1개 보내기</button>
        <button className="btn small" onClick={() => send(8)}>8개 보내기</button>
        <button className="btn small" onClick={() => setRevealed(true)} disabled={!ps.length}>기저 공개 (sifting)</button>
        <label style={{ gap: 6 }}><input type="checkbox" checked={eve} onChange={(e) => setEve(e.target.checked)} /> 도청자 이브</label>
        <button className="btn small" onClick={() => { setPs([]); setRevealed(false) }}>초기화</button>
      </div>
      <div className="table-wrap">
        <table style={{ fontSize: '0.85rem' }}>
          <tbody>
            <Row label="앨리스 비트" cells={ps.map((p) => p.bit)} />
            <Row label="앨리스 기저" cells={ps.map((p) => p.aBase)} />
            <Row label="광자 편광" cells={ps.map((p) => arrow(p.bit, p.aBase))} big />
            {eve && <Row label="이브 측정 기저" cells={ps.map((p) => (p.eve ? p.eBase : '·'))} color="#f0575d" />}
            <Row label="밥 기저" cells={ps.map((p) => p.bBase)} />
            <Row label="밥 측정값" cells={ps.map((p) => p.measured)} />
            <Row label="기저 일치" cells={ps.map((p) => (revealed ? (p.aBase === p.bBase ? '✓' : '✗') : '?'))} />
            <Row label="공유 키" cells={ps.map((p) => (revealed ? (p.aBase === p.bBase ? p.bit : '–') : '?'))} color="#35c98a" bold />
          </tbody>
        </table>
      </div>
      {revealed && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="stat-row">
          <div className="stat"><div className="k">걸러진 비트</div><div className="v">{sifted.length} / {ps.length}</div></div>
          <div className={'stat ' + (qber > 0.11 ? 'danger' : 'safe')}><div className="k">오류율 QBER (앨리스 vs 밥)</div><div className="v">{(qber * 100).toFixed(0)}%</div></div>
          <div className={'stat ' + (qber > 0.11 ? 'danger' : 'safe')}><div className="k">판정 (기준 11%)</div><div className="v">{qber > 0.11 ? '도청 탐지 → 키 폐기' : '키 사용'}</div></div>
        </motion.div>
      )}
      <p style={{ fontSize: '0.85rem', color: 'var(--fg-2)', margin: 0 }}>이브를 켜고 16개쯤 보낸 뒤 기저를 공개해 보세요. 이브가 잘못된 기저로 측정한 광자는 상태가 바뀌어, 걸러진 키에 약 25%의 오류를 남깁니다.</p>
    </div>
  )
}
function Row({ label, cells, big, color, bold }: { label: string; cells: (string | number)[]; big?: boolean; color?: string; bold?: boolean }) {
  return (
    <tr>
      <th style={{ whiteSpace: 'nowrap' }}>{label}</th>
      {cells.map((c, i) => (
        <td key={i} className="mono" style={{ textAlign: 'center', fontSize: big ? '1.1rem' : undefined, color, fontWeight: bold ? 700 : undefined, padding: '4px 6px' }}>
          <motion.span initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }}>{c}</motion.span>
        </td>
      ))}
      {cells.length === 0 && <td style={{ color: 'var(--fg-3)' }}>광자를 보내면 채워집니다</td>}
    </tr>
  )
}
