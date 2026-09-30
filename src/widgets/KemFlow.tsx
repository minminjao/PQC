import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const steps = [
  { t: '시작', d: '앨리스와 밥은 아직 아무 비밀도 공유하지 않습니다.' },
  { t: '① KeyGen', d: '앨리스가 키쌍을 만듭니다. 여는 쪽(decaps key)은 자신이 갖고, 담는 쪽(encaps key)만 공개합니다.' },
  { t: '② Encaps', d: '밥은 공개된 encaps key로 무작위 비밀 K를 만들고, 동시에 그것을 담은 cipher를 만듭니다.' },
  { t: '전송', d: '네트워크로 보내는 것은 cipher뿐입니다. 비밀 K 자체는 절대 오가지 않습니다.' },
  { t: '③ Decaps', d: "앨리스는 decaps key로 cipher를 열어 K′를 복원합니다. K′ = K. 값이 오간 적 없지만 둘의 계산 결과는 같습니다." },
  { t: '완료', d: '이제 K를 AES 키로 씁니다. 실제 데이터 암호화는 AES가 합니다.' },
]

export default function KemFlow() {
  const [s, setS] = useState(0)
  return (
    <div>
      <div className="controls">
        <button className="btn small" onClick={() => setS((v) => Math.max(0, v - 1))} disabled={s === 0}>← 이전</button>
        <button className="btn small primary" onClick={() => setS((v) => Math.min(steps.length - 1, v + 1))} disabled={s === steps.length - 1}>다음 →</button>
        <strong>{steps[s].t}</strong>
      </div>
      <svg viewBox="0 0 420 200" style={{ width: '100%', display: 'block' }}>
        <rect x={10} y={10} width={150} height={180} rx={10} fill="#111827" stroke="#273046" />
        <rect x={260} y={10} width={150} height={180} rx={10} fill="#111827" stroke="#273046" />
        <text x={85} y={30} textAnchor="middle" fill="#a8b1c2" fontSize={11} fontWeight={700}>앨리스</text>
        <text x={335} y={30} textAnchor="middle" fill="#a8b1c2" fontSize={11} fontWeight={700}>밥</text>
        <line x1={160} x2={260} y1={100} y2={100} stroke="#273046" strokeDasharray="4 4" />
        <text x={210} y={92} textAnchor="middle" fill="#6b7484" fontSize={9}>네트워크</text>
        {/* keys */}
        <AnimatePresence>
          {s >= 1 && (
            <motion.g key="dk" initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }}>
              <Chip x={20} y={45} w={130} label="decaps key (비밀)" color="#f0575d" />
            </motion.g>
          )}
          {s >= 1 && (
            <motion.g key="ek" initial={{ x: 20, opacity: 0 }} animate={{ x: s >= 2 ? 270 : 20, opacity: 1 }} transition={{ duration: 0.8 }}>
              <Chip x={0} y={70} w={130} label="encaps key (공개)" color="#4f8cff" />
            </motion.g>
          )}
          {s >= 2 && (
            <motion.g key="K" initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }}>
              <Chip x={270} y={110} w={130} label="비밀 K (밥의 화면 안)" color="#35c98a" />
            </motion.g>
          )}
          {s >= 2 && (
            <motion.g key="c" initial={{ x: 270, opacity: 0 }} animate={{ x: s >= 3 ? 20 : 270, opacity: 1 }} transition={{ duration: 0.9 }}>
              <Chip x={0} y={135} w={130} label="cipher (K를 담은 상자)" color="#f5b544" />
            </motion.g>
          )}
          {s >= 4 && (
            <motion.g key="K2" initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }}>
              <Chip x={20} y={110} w={130} label="K′ = K (앨리스의 화면 안)" color="#35c98a" />
            </motion.g>
          )}
          {s === 3 && (
            <motion.text key="lbl" x={210} y={125} textAnchor="middle" fill="#f5b544" fontSize={10} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              cipher만 지나간다
            </motion.text>
          )}
          {s >= 5 && (
            <motion.text key="aes" x={210} y={175} textAnchor="middle" fill="#35c98a" fontSize={11} fontWeight={700} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              AES(K)로 데이터 암호화 ⇄
            </motion.text>
          )}
        </AnimatePresence>
      </svg>
      <p style={{ fontSize: '0.9rem', color: 'var(--fg-2)', margin: 0 }}>{steps[s].d}</p>
    </div>
  )
}

function Chip({ x, y, w, label, color }: { x: number; y: number; w: number; label: string; color: string }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <rect width={w} height={20} rx={10} fill={color + '22'} stroke={color} />
      <text x={w / 2} y={14} textAnchor="middle" fill={color} fontSize={9} fontWeight={700}>{label}</text>
    </g>
  )
}
