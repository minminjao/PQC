import { Chapter, Section, Key, Widget, Table, Info } from '../components/Chapter'
import Quiz from '../components/Quiz'
import Cycle4 from '../widgets/Cycle4'
import RiskScore from '../widgets/RiskScore'
import HybridLocks from '../widgets/HybridLocks'

export default function Apply2() {
  return (
    <Chapter route="/apply/2">
      <Section>
        <p>앞에서 "무엇을"을 배웠다면, 이 페이지는 "어떤 순서로"입니다.</p>
      </Section>
      <Section title="4단계 공정">
        <Widget title="4단계 순환도" caption="실행 중 새 암호자산을 발견하거나 연동 제약을 확인하면 탐색/계획 단계로 되돌아가는 반복 구조입니다.">
          <Cycle4 />
        </Widget>
        <h3>CBOM이란</h3>
        <p>암호 자재 명세서(CBOM, Cryptographic Bill of Materials)는 SBOM의 암호 특화 버전입니다. 시스템이 사용하는 <strong>모든 암호 알고리즘·키 길이·사용 위치·용도를 목록화한 JSON 문서</strong>로, 자동 탐색의 핵심 산출물이자 전환 설계의 기초 자료입니다. 한 번 만들고 끝이 아니라 4단계(운영)에서 지속 갱신하는 '살아있는 문서'입니다.</p>
        <Key>1단계(탐색)에서 암호자산 가시성을 얼마나 완전하게 확보하느냐가 이후 모든 단계의 품질을 결정한다. PoC의 출발점이다.</Key>
      </Section>

      <Section title="1단계 탐색 — 암호자산은 어디에 숨어 있나">
        <p><strong>탐색 영역</strong>: 로컬 스토리지, DB, 소스 코드, 네트워크 / <strong>탐색 대상</strong>: 알고리즘, 인증서, 토큰, 개인키, 암호문, 키</p>
        <Table head={['방법', '내용']} rows={[['자동 탐색', '수집 → 분석·정규화(알고리즘, 키 길이, 용도) → CBOM(JSON)'], ['수동 탐색', '문서 검토·담당자 인터뷰. 자동 도구가 못 보는 자산을 보완'], ['취약성 평가', 'CBOM 기반으로 알고리즘별 양자 취약성을 정책 기준과 대조해 도식화']]} />
      </Section>

      <Section title="2단계 계획 — 무엇을 먼저 바꾸나">
        <Table head={['점수', '등급', '전환 기한', '주요 해당 알고리즘']} rows={[['2', <span className="badge safe">안전</span>, '전환 불필요', 'AES-256, SHA-256/3, ChaCha20'], ['4~6', <span className="badge warn">주의</span>, '2035년까지', 'DH-4096, ECC-521, AES-128'], ['8~10', <span className="badge warn">경고</span>, '2030년까지', 'RSA-2048, ECC-256(P-256), DH-2048'], ['15', <span className="badge danger">위험</span>, '즉시 전환', 'MD5, SHA-1, DES, 3DES, RSA-1024']]} />
        <Widget title="위험도 계산기" caption="판별 원칙: 쇼어에 직접 깨지는 공개키 계열(RSA·ECC·DH)이 우선 대상이고, 대칭키·해시는 키 길이 확대로 완화. 기밀 수명이 길면 기한이 앞당겨집니다.">
          <RiskScore />
        </Widget>
        <h3>시스템 수용성 — 크기가 커진다</h3>
        <Table head={['(bytes)', 'ECC P-256', 'RSA-2048', 'ML-DSA', 'ML-KEM']} rows={[['개인키', '32', '256', '2,560~4,896', '1,632~3,168'], ['공개키', '64', '256', '1,312~2,592', '800~1,568'], ['암호문/서명', '64', '256', '2,420~4,627', '768~1,568']]} />
        <p>PQC는 키·서명이 기존 대비 <strong>수십 배</strong> 커집니다. 인증서 체인, 프로토콜 패킷 크기, HSM·DB 스키마 등 시스템 수용성 검증이 계획 단계의 필수 항목입니다. 위험도 스코어링과 수용성 분석을 결합해 '무엇을 언제 전환할지' 우선순위 매트릭스와 로드맵을 도출합니다.</p>
      </Section>

      <Section title="하이브리드 구조 — 둘 다 쓴다">
        <p>PQC는 상대적으로 신생이라 "격자에 예상치 못한 고전 공격이 나오면?"이라는 걱정이 남습니다. 그래서 전환기에는 <strong>기존 암호와 PQC를 함께</strong> 씁니다. 최종 키 = KDF(고전 공유비밀 ∥ PQC 공유비밀). 둘 중 하나만 안전해도 전체가 안전합니다.</p>
        <Widget title="두 개의 자물쇠" caption="크롬·클라우드플레어의 TLS(X25519 + ML-KEM), OpenSSH 9.x 기본값(sntrup761 + X25519), 시그널의 PQXDH가 모두 이 방식입니다. 프랑스 ANSSI는 PQC 단독 사용을 금지하고 하이브리드를 의무화했습니다.">
          <HybridLocks />
        </Widget>
        <ul>
          <li><strong>키 교환 하이브리드</strong>: 두 비밀을 합쳐 최종 키를 만든다.</li>
          <li><strong>서명 하이브리드</strong>: 기존 서명 + PQC 서명을 함께 붙인다(듀얼 서명 인증서 등).</li>
        </ul>
        <Info title="원본 자료 보완 필요">발표자료 53~54쪽 "하이브리드 구조"는 이미지 슬라이드입니다. 프로토콜 흐름 그림을 추가하면 이 절이 완성됩니다.</Info>
      </Section>

      <Section title="암호민첩성 — 다음 교체를 쉽게">
        <p>운영 단계의 목표는 암호민첩성(Crypto-agility)입니다. 알고리즘을 설정으로 바꿀 수 있게 설계해, 앞으로 또 다른 알고리즘 교체가 와도 코드를 다시 짜지 않도록 합니다.</p>
        <Key>탐색 없이는 계획이 없고, 계획 없이는 실행이 없다. 실행은 하이브리드로 시작하고, 운영은 CBOM을 살아있게 유지한다.</Key>
      </Section>

      <Quiz
        items={[
          { q: 'CBOM을 만드는 단계와 갱신하는 단계는?', opts: ['계획 / 실행', '탐색 / 운영', '실행 / 운영'], a: 1, exp: '1단계 탐색에서 만들고 4단계 운영에서 지속 갱신합니다.' },
          { q: 'RSA-2048의 전환 기한 등급은?', opts: ['주의 (2035년까지)', '경고 (2030년까지)', '위험 (즉시)'], a: 1, exp: '8~10점 경고 등급입니다. 기밀 수명이 길면 더 앞당겨야 합니다.' },
          { q: '하이브리드 키 교환에서 X25519가 깨지면 전체 키가 노출된다?', opts: ['예', '아니오'], a: 1, exp: 'ML-KEM 쪽 비밀이 남아 있어 최종 키는 안전합니다.' },
        ]}
      />
    </Chapter>
  )
}
