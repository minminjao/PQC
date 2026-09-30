import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Chapter, Section, Key, Table } from '../components/Chapter'

const myths: { m: string; f: React.ReactNode; link: string }[] = [
  { m: '"양자 컴퓨터가 나오면 모든 암호가 깨진다"', f: <>깨지는 것은 <strong>공개키 암호(RSA·ECC·DH)</strong>입니다. 대칭키(AES)와 해시(SHA-2/3)는 그로버로 강도가 절반이 될 뿐이며, 키 길이를 두 배로 늘리면(AES-256, SHA-384) 그대로 안전합니다.</>, link: '/threat/2' },
  { m: '"PQC를 쓰려면 양자 컴퓨터가 필요하다"', f: <>PQC는 <strong>일반 컴퓨터에서 돌아가는 소프트웨어</strong>입니다. 양자 컴퓨터로도 풀기 어려운 다른 수학 문제(격자·해시·코드)를 쓸 뿐입니다. 양자 장비가 필요한 것은 QKD입니다.</>, link: '/pqc/1' },
  { m: '"QKD를 도입하면 양자 위협은 끝난다"', f: <>QKD는 <strong>키 분배만</strong> 합니다. 전자서명·인증서·코드 서명은 할 수 없고, 채널 인증은 여전히 고전 또는 PQC 암호에 의존합니다. 거리 100 km 제약과 전용 장비 비용 때문에 백본 구간에 한정됩니다.</>, link: '/apply/1' },
  { m: '"Q-Day가 오면 그때 바꾸면 된다"', f: <>도청자는 지금 암호문을 저장했다가 나중에 해독합니다(HNDL). 모스카 부등식 S + M &gt; T가 성립하는 데이터는 <strong>지금 전송하는 순간 이미 위험</strong>합니다. 미국은 2035년 RSA·ECC 전면 금지를 확정했습니다.</>, link: '/threat/3' },
  { m: '"키 길이만 늘리면 RSA도 버틸 수 있다"', f: <>쇼어 알고리즘은 소인수분해 문제 자체를 다항 시간에 풉니다. RSA-4096으로 늘려도 양자 컴퓨터 입장에서는 약간 더 큰 문제일 뿐입니다. 키 길이 확대가 통하는 것은 <strong>대칭키·해시뿐</strong>입니다.</>, link: '/threat/2' },
  { m: '"PQC는 검증이 안 됐으니 아직 쓰면 안 된다"', f: <>NIST가 2016년부터 8년간 전 세계 공개 검증을 거쳐 2024년 FIPS 203/204/205를 확정했습니다. 크롬·클라우드플레어·시그널·OpenSSH가 이미 기본값으로 씁니다. 신생성 걱정은 <strong>하이브리드</strong>로 해결하는 것이 표준 관행입니다.</>, link: '/apply/2' },
  { m: '"ML-KEM으로 데이터를 암호화한다"', f: <>ML-KEM은 <strong>대칭키를 나눠 갖는 절차</strong>이고, 실제 데이터 암호화는 AES가 합니다. KEM에는 서명 기능이 없으므로 ML-DSA 같은 서명 알고리즘을 별도로 써야 합니다.</>, link: '/pqc/2' },
  { m: '"알고리즘만 바꾸면 되니 전환은 간단하다"', f: <>PQC의 키와 서명은 기존 대비 수십 배 큽니다. 인증서 체인, 패킷 크기, HSM, DB 스키마가 이를 수용하는지 검증해야 하고, 그 전에 <strong>어떤 암호가 어디에 쓰이는지(CBOM)</strong>부터 파악해야 합니다.</>, link: '/apply/2' },
  { m: '"ML-DSA 서명 시간이 매번 달라지는 건 버그다"', f: <>안전 범위를 벗어난 후보 서명을 버리고 다시 계산하는 <strong>거부 샘플링</strong>이 설계의 일부입니다. 이 반복이 개인키 정보 유출을 막습니다.</>, link: '/pqc/3' },
  { m: '"격자가 깨지면 PQC 전체가 무너진다"', f: <>그래서 NIST는 해시 기반 SLH-DSA를 함께 표준화했고, 코드 기반 HQC를 추가 선정했으며, 독일 BSI는 계열 분산을 권고합니다. 루트 인증서처럼 오래 살아남아야 하는 신뢰 앵커에 SLH-DSA를 쓰는 이유입니다.</>, link: '/pqc/3' },
]

export default function Myth1() {
  const [open, setOpen] = useState<Record<number, boolean>>({})
  const n = Object.values(open).filter(Boolean).length
  return (
    <Chapter route="/myth/1">
      <Section>
        <p>앞의 열 페이지를 읽었다면 이제 아래 오해들이 왜 틀렸는지 스스로 설명할 수 있어야 합니다. "사실은…"을 누르기 전에 먼저 답해 보세요.</p>
        <div className="badge info" style={{ marginBottom: 12 }}>확인한 오해 {n} / {myths.length}</div>
        {myths.map((it, i) => (
          <div className="myth-card" key={i}>
            <button className="head" onClick={() => setOpen((o) => ({ ...o, [i]: !o[i] }))}>
              <span className="num">{String(i + 1).padStart(2, '0')}</span>
              <span style={{ flex: 1 }}>{it.m}</span>
              <span style={{ color: 'var(--fg-3)', fontWeight: 400, fontSize: '0.85rem' }}>{open[i] ? '접기' : '사실은…'}</span>
            </button>
            <AnimatePresence initial={false}>
              {open[i] && (
                <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }} style={{ overflow: 'hidden' }}>
                  <div className="body">
                    <p style={{ margin: 0 }}>{it.f}</p>
                    <Link to={it.link} style={{ fontSize: '0.85rem', color: 'var(--c-pqc)' }}>→ 관련 페이지 {it.link}</Link>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
        <Key>무엇이 깨지는지 정확히 알면, 무엇을 언제 바꿔야 하는지도 정확해진다.</Key>
      </Section>
      <Section title="마무리 — 한 장 요약">
        <Table
          head={['질문', '답']}
          rows={[
            ['무엇이 깨지나', '공개키 암호(RSA·ECC·DH). 대칭키·해시는 키 확대로 방어'],
            ['왜 지금인가', 'HNDL + 정보 수명(모스카 부등식) + 2030/2035 규제 기한'],
            ['무엇으로 바꾸나', 'ML-KEM(키 교환), ML-DSA·FN-DSA·SLH-DSA(서명), 국내는 KpqC 병행'],
            ['어떻게 바꾸나', '탐색(CBOM) → 계획(우선순위) → 실행(하이브리드) → 운영(암호민첩성)'],
            ['QKD는', '백본 키 분배 보완재. 종단과 서명은 PQC'],
          ]}
        />
      </Section>
    </Chapter>
  )
}
