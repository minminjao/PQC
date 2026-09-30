import { Chapter, Section, Key, Widget, Table } from '../components/Chapter'
import Quiz from '../components/Quiz'
import Deadlines from '../widgets/Deadlines'
import Recommender from '../widgets/Recommender'

export default function Apply3() {
  return (
    <Chapter route="/apply/3">
      <Section title="해외 정책 — 기한이 정해졌다">
        <Widget title="세계 기한 타임라인" caption="점을 클릭하면 요구 사항이 표시됩니다.">
          <Deadlines />
        </Widget>
        <Table
          head={['국가·기관', '핵심 기한', '요구 사항', '특징']}
          rows={[
            ['미국 NSA/NIST', '2030 / 2035', 'CNSA 2.0과 NIST IR 8547에 따라 RSA·ECC는 2030년 사용 축소, 2035년 전면 금지', '정부 구매력으로 시장을 끌고 감'],
            ['프랑스 ANSSI', '2027 (인증)', '양자내성 미지원 제품은 보안 인증 제외. 현재 하이브리드 의무 구간', 'PQC 단독 사용 금지'],
            ['영국 NCSC', '2028 / 2031 / 2035', '자산 목록화 → 고위험 시스템 전환 → 전면 완료', '무엇을 먼저 하라를 단계로 명시'],
            ['독일 BSI', '2030', 'quantum-safe 전환 권고. FrodoKEM·Classic McEliece 등 보수적 알고리즘 병행 권장', '격자 일변도를 경계'],
            ['EU 집행위', '2026 / 2030', '회원국 로드맵 수립 권고, 고위험 인프라는 2030년까지', '조달 기준화'],
            ['중국·일본', '진행 중', '중국은 자체 PQC 공모 + QKD 백본, 일본 CRYPTREC은 NIST 중심 가이드', '표준 주권 경쟁'],
          ]}
        />
      </Section>

      <Section title="국내 정책 — 2035년 전환 완료">
        <Table
          head={['기관', '핵심 기한', '내용', '의미']}
          rows={[
            ['과기정통부·국정원 (범국가 로드맵)', "'23.7 마스터플랜 → '25.9 종합추진계획 → 2035 완료", '2대 전략·6개 과제·59개 추진항목의 연차별 로드맵', '국내 최상위 로드맵'],
            ['국정원·국보연 (KpqC 공모)', "'21.5 발족 → '25.1 최종 선정", '16종 → 8종 → 최종 4종', '국산 자체 표준 확보'],
            ['지식재산처·국정원·국보연', '2026 단계적, 연내 완료', '지식재산정보 분석플랫폼(IPOP) 전반에 KpqC 실증 적용', '정부부처 온라인시스템 최초 사례'],
            ['과기정통부·KISA (산업별 시범전환)', '2025 시범 → 2026 확대', '에너지·의료·행정 → 교통·국방·금융·우주·통신', '실증 데이터를 표준·가이드로 환류'],
            ['관계부처 합동 (PKI 고도화)', '2025~2029 구축 → 2030~ 안정화', '全부문 PKI 전환 얼라이언스, PQC 기반 HSM·인증서 규격화', '인증서·키관리 인프라 자체를 재설계'],
          ]}
        />
      </Section>

      <Section title="기업은 이미 움직이고 있다">
        <h3>해외 금융</h3>
        <Table
          head={['기관', '파트너', '무엇을', '결과']}
          rows={[
            ['HSBC', 'Quantinuum', '토큰화 금 거래에 PQC + QRNG', '2024.9 파일럿 성공, 은행권 최초'],
            ['JPMorgan Chase', 'Quantinuum / Argonne·ORNL', '데이터센터 간 양자보안 네트워크(Q-CAN), QKD+PQC 병행', '100Gbps 45일 연속 운영'],
            ['Mastercard', 'G+D / Thales', '양자내성 비접촉 결제카드', '2022.10 세계 최초 승인'],
            ['SWIFT', 'BIS Project Leap', 'SwiftNet 8.0 PQC 적용', '2027 목표'],
            ['BIS Project Leap 2단계', '프랑스·이탈리아·독일 중앙은행', '실운영 결제시스템 전자서명 PQC 교체', '2025.12 전 시나리오 성공'],
            ['Google Cloud / Chrome / Cloudflare', '—', 'ML-KEM 하이브리드 TLS, Cloud KMS PQC', '2027 HNDL 대응 → 2029 인프라 전체 완료'],
          ]}
        />
        <h3>국내</h3>
        <Table
          head={['구분', '기관', '무엇을', '의미']}
          rows={[
            ['통신', 'LG유플러스', '국산 SOLMAE 적용 PQC 전용회선 VPN 상용화', '국내 최초 상용 PQC 회선'],
            ['통신', 'SKT·KT', '서울–부산 양자암호통신망, QKD 백본·QRNG 단말', 'QKD는 백본, PQC는 종단'],
            ['의료', '국립암센터', '민감 의료데이터 전송 구간 양자암호 보호', '보존기간 긴 데이터부터'],
            ['보험', 'KDB생명', '디지털 채널 중심 PQC 솔루션 도입', '소프트웨어형 암호모듈 채택'],
            ['보험', '농협손해보험', '모바일 앱·가상 키패드·전자서명에 PQC', '고객 접점부터 시작'],
          ]}
        />
        <Key>보존 기간이 긴 데이터, 고객 접점, 통신 구간부터 움직인다. 이 세 가지가 공통된 시작점이다.</Key>
      </Section>

      <Section title="산업별 알고리즘 조합 가이드">
        <ol>
          <li><strong>검증된 범용 조합</strong>: ML-KEM-768 + ML-DSA-65 (Kyber-768 + Dilithium3)</li>
          <li><strong>바이트가 비싼 곳</strong>: ML-KEM-512 + FN-DSA-512 (IoT, 초고속 거래, SIM)</li>
          <li><strong>오래 살아남아야 하는 것</strong>: ML-KEM-1024 + SLH-DSA (장기 보존 문서, 루트 인증서)</li>
        </ol>
        <Widget title="조합 추천기" caption="산업·보존기간·기기·역할을 고르면 추천 조합과 이유를 보여줍니다.">
          <Recommender />
        </Widget>
        <h3>금융</h3>
        <Table head={['분야', '과제', 'KEM', '서명', '이유']} rows={[['은행', '인터넷뱅킹·대외 연계', 'Kyber-768', 'Dilithium3', '가장 검증된 표준 조합'], ['증권', '초고속 주문·체결', 'Kyber-512', 'Falcon-512', '서명이 작아 초고속 처리'], ['보험 / 장기계약', '20~30년 보관 계약서', 'Kyber-1024', 'SPHINCS+', '절대 안전성'], ['카드 / PG', '초당 수만 건 승인', 'Kyber-768', 'Falcon-512', '용량을 줄여 병목 방지'], ['공제회 / 연금', '평생 관리 회원 데이터', 'Kyber-1024', 'Dilithium5 + SPHINCS+', '2중 방어'], ['ATM / 금융 IoT', '저성능 단말', 'Kyber-512', 'Falcon-512', '경량 탑재'], ['그룹 PKI / HSM', '루트 인증서', '(HSM 내부)', 'SPHINCS+ (루트) + Dilithium (하위)', '부모 인증서는 보수적으로']]} />
        <h3>의료</h3>
        <Table head={['분야', '과제', 'KEM', '서명', '이유']} rows={[['상급종합병원 (EMR)', '10년 이상 보존 진료기록', 'Kyber-1024', 'SPHINCS+', '장기 보존 절대 안전성'], ['유전체 / 바이오뱅크', '평생 불변 — HNDL 최우선', 'Kyber-1024', 'SPHINCS+', '유출 시 폐기 불가능'], ['원격의료', '실시간 영상·문진', 'Kyber-768', 'Dilithium3', '실시간성'], ['의료기기 IoT', '저전력 생체신호', 'Kyber-512', 'Falcon-512', '배터리·성능 제약'], ['제약 / 임상', '20년 이상 신약 데이터', 'Kyber-1024', 'Dilithium5 + SPHINCS+', '지식재산 2중 방어'], ['병원 PKI / 전자처방전', '법적 효력', '(HSM 내부)', 'SPHINCS+ (루트) + Dilithium (하위)', '신뢰 앵커']]} />
        <h3>통신</h3>
        <Table head={['분야', '과제', 'KEM', '서명', '이유']} rows={[['통신 백본', '기간망 대용량', 'QKD 백본 + PQC 종단', 'Dilithium3', '상호 보완'], ['전용회선 / 기업 VPN', '기업 간 구간', 'Kyber + 국산 SOLMAE', 'HAETAE', '국산 상용화 선례'], ['5G SIM / eSIM', '원격 발급·로밍 인증', 'Kyber-512', 'Falcon-512', 'SIM 칩 자원 제약'], ['웹 TLS / CDN', '대규모 HTTPS', 'X25519 + ML-KEM 하이브리드', 'Dilithium3', '크롬에서 검증된 경로'], ['서버 원격 관리 (SSH)', '가장 먼저 전환되는 구간', 'sntrup761 + X25519 (OpenSSH 9.x 기본)', 'Ed25519 (PQC 서명 전환 예정)', '기본값으로 즉시 전환'], ['메신저 / 협업', '종단간 키 합의', 'Kyber 하이브리드 (PQXDH)', 'Dilithium3', '시그널·iMessage에서 검증']]} />
      </Section>

      <Section title="더 공부하기">
        <ul>
          <li><a href="https://dreamhack.io/lecture/paths/post-quantum-cryptography" target="_blank" rel="noreferrer">드림핵 PQC 강의</a></li>
          <li><a href="https://seed.kisa.or.kr/kisa/ngc/pqc.do" target="_blank" rel="noreferrer">KISA 암호이용활성화 — PQC</a></li>
          <li><a href="https://pqcmp.kr/" target="_blank" rel="noreferrer">양자내성암호 마이그레이션 포털</a></li>
          <li><a href="https://ksp.etri.re.kr/ksp/article/read?id=72879" target="_blank" rel="noreferrer">ETRI 기술 동향</a></li>
        </ul>
      </Section>

      <Quiz
        items={[
          { q: '미국이 RSA·ECC 사용을 전면 금지하는 해는?', opts: ['2030년', '2035년', '2040년'], a: 1, exp: '2030년부터 사용 축소, 2035년 전면 금지입니다.' },
          { q: '유전체 데이터에 SLH-DSA + ML-KEM-1024를 권하는 이유는?', opts: ['가장 빨라서', '평생 불변하는 정보라 HNDL 위험이 가장 크기 때문', '키가 가장 작아서'], a: 1, exp: '유출 시 폐기가 불가능한 정보이므로 가장 보수적인 조합을 씁니다.' },
          { q: '국내 최초 상용 PQC 회선을 구축한 곳은?', opts: ['SKT', 'LG유플러스', 'KT'], a: 1, exp: '국산 SOLMAE 알고리즘을 적용한 PQC 전용회선 VPN입니다.' },
        ]}
      />
    </Chapter>
  )
}
