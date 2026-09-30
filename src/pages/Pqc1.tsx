import { Chapter, Section, Key, Widget, Table } from '../components/Chapter'
import Quiz from '../components/Quiz'
import Timeline from '../widgets/Timeline'
import FlipCards from '../widgets/FlipCards'
import Lattice from '../widgets/Lattice'
import NoiseRecover from '../widgets/NoiseRecover'

export default function Pqc1() {
  return (
    <Chapter route="/pqc/1">
      <Section title="정의">
        <p><strong>양자내성암호(PQC, Post-Quantum Cryptography)</strong>는 양자 컴퓨팅 환경에서도 안전하게 쓸 수 있도록 설계된 <strong>새로운 공개키 암호</strong>입니다.</p>
        <ul>
          <li>쇼어 알고리즘이 푸는 소인수분해·이산로그가 아니라, <strong>양자 컴퓨터로도 다항 시간 내에 풀리지 않을 것으로 기대되는 다른 수학 문제</strong>에 기반합니다.</li>
          <li>양자 컴퓨터가 아니라 <strong>일반 컴퓨터에서 소프트웨어로 동작</strong>합니다. 라이브러리를 교체하면 기존 인터넷·TLS를 그대로 쓸 수 있습니다.</li>
          <li>대칭키(AES)나 해시(SHA)를 대체하는 것이 아닙니다. PQC가 대체하는 것은 <strong>RSA·ECC 같은 공개키 암호</strong>입니다.</li>
        </ul>
        <Key>PQC = 양자 컴퓨터로도 풀기 어려운 "다른 수학 문제"로 만든 공개키 암호. 양자 장비가 아니라 소프트웨어다.</Key>
      </Section>

      <Section title="표준화는 어디까지 왔나">
        <Timeline
          items={[
            { y: '2016', t: '미국 국립표준기술연구소(NIST), PQC 공모(RFP) 공개' },
            { y: '2020.7', t: '3라운드 최종 후보 발표' },
            { y: '2022.7', t: '선정 알고리즘 발표, 4라운드 시작' },
            { y: '2024.8', t: 'FIPS 203 (ML-KEM), FIPS 204 (ML-DSA), FIPS 205 (SLH-DSA) 최종 표준 확정', hi: true },
            { y: '2025.1', t: '한국 KpqC 최종 4종 선정 (NTRU+, SMAUG-T, HAETAE, AIMer)', hi: true },
            { y: '2025.3', t: '코드 기반 KEM인 HQC를 5번째 표준 후보로 추가 선정' },
            { y: '진행 중', t: 'FIPS 206 (FN-DSA, Falcon)' },
          ]}
        />
      </Section>

      <Section title="네 가지 계열, 네 가지 비유">
        <p>PQC는 어떤 수학 문제에 기대는지에 따라 네 계열로 나뉩니다. 카드를 뒤집어 보세요.</p>
        <Widget title="계열 카드">
          <FlipCards
            cards={[
              { icon: '🧭', title: '① 격자 기반', sub: '초고차원 미로 속 보물 찾기', back: <><strong>원리</strong> 격자 공간에서 가장 짧은 벡터·가장 가까운 점 찾기가 매우 어렵다.<br /><strong>장점</strong> 빠르고 효율적, 키·서명 크기 균형. 가장 널리 채택.<br /><strong>대표</strong> ML-KEM(Kyber), ML-DSA(Dilithium), FN-DSA(Falcon)</> },
              { icon: '🔥', title: '② 해시 기반', sub: '되돌릴 수 없는 용광로', back: <><strong>원리</strong> 해시함수의 일방향성에만 기반.<br /><strong>장점</strong> 안전성이 가장 확실. 격자 공격이 나와도 영향 없음.<br /><strong>단점</strong> 서명이 큼. 전자서명 전용.<br /><strong>대표</strong> SLH-DSA(SPHINCS+)</> },
              { icon: '🧩', title: '③ 코드 기반', sub: '파쇄된 종이 뭉치 복구하기', back: <><strong>원리</strong> 일부러 오류를 넣고, 오류정정 코드를 아는 사람만 복원.<br /><strong>장점</strong> 빠름, 1978년부터 검증.<br /><strong>단점</strong> 공개키가 매우 큼(수백 KB).<br /><strong>대표</strong> Classic McEliece, HQC</> },
              { icon: '🧮', title: '④ 다변수 기반', sub: '뒤엉킨 연립방정식 풀기', back: <><strong>원리</strong> 수백 개의 얽힌 이차 방정식의 해를 거꾸로 찾기는 극히 어렵다.<br /><strong>장점</strong> 연산이 단순해 부채널 공격에 강함.<br /><strong>단점</strong> 키가 큼. 주로 서명용.</> },
            ]}
          />
        </Widget>
      </Section>

      <Section title="① 격자 — 좋은 기저와 나쁜 기저">
        <p>격자란 규칙적으로 찍힌 점들의 공간입니다. 두 기준 벡터(기저)를 정수배해서 더하면 모든 점을 만들 수 있습니다. 같은 격자를 만드는 기저는 여러 개인데, 짧고 직교에 가까운 <strong>좋은 기저(비밀키)</strong>로는 가까운 점을 쉽게 찾지만, 길고 비뚤어진 <strong>나쁜 기저(공개키)</strong>로는 거의 불가능합니다.</p>
        <Widget title="좋은 기저, 나쁜 기저" caption="같은 별(목표)을 두 기저로 맞춰 보세요. 나쁜 기저에서 좋은 기저를 유도하는 것이 불가능에 가깝다는 비대칭이 Kyber·Dilithium·Falcon의 안전성 근거입니다.">
          <Lattice />
        </Widget>
        <p>실제 격자 암호의 뿌리는 <strong>LWE(Learning With Errors, 오차 학습)</strong> 문제입니다. 연립방정식 <code>b = A·s + e (mod q)</code>에서 문제지 A와 잡음 낀 정답지 b를 공개해도, 일부러 섞은 작은 잡음 e 때문에 보통의 소거법으로는 비밀 s가 나오지 않습니다. 양자 컴퓨터로도 빠른 풀이가 알려져 있지 않습니다.</p>
      </Section>

      <Section title="③ 코드 — 노이즈 넣고 빼기">
        <Widget title="노이즈 넣고 빼기" caption="복구키(오류정정 코드의 비밀 구조)가 있어야만 정확히 원본으로 돌아옵니다.">
          <NoiseRecover />
        </Widget>
      </Section>

      <Section title="한눈에 비교">
        <Table
          head={['계열', '어려운 문제', '강점', '약점', '대표 알고리즘', '용도']}
          rows={[
            ['격자', '최단 벡터·최근접 점', '빠르고 균형 잡힘', '비교적 신생', 'ML-KEM, ML-DSA, FN-DSA', '키 교환, 서명'],
            ['해시', '해시 역상', '가장 보수적·확실', '서명이 큼', 'SLH-DSA', '서명'],
            ['코드', '오류정정 복호', '오랜 검증, 빠름', '공개키가 매우 큼', 'Classic McEliece, HQC', '키 교환'],
            ['다변수', '다변수 이차방정식', '부채널에 강함', '키가 큼', '(연구 단계, AIMer가 유사 계열)', '서명'],
          ]}
        />
        <Key>오늘 실무에서 쓰는 PQC의 대부분은 격자 기반이다. 해시 기반은 "격자에 문제가 생겨도 살아남는 보험" 역할을 한다.</Key>
      </Section>

      <Quiz
        items={[
          { q: 'PQC를 쓰려면 양자 컴퓨터가 필요하다?', opts: ['예', '아니오'], a: 1, exp: 'PQC는 일반 컴퓨터의 소프트웨어로 동작합니다. 양자 장비가 필요한 것은 QKD입니다.' },
          { q: '격자 기반 암호에서 비밀키에 해당하는 것은?', opts: ['나쁜 기저', '좋은 기저', '격자점 자체'], a: 1, exp: '좋은 기저로는 가까운 점을 쉽게 찾고, 나쁜 기저(공개키)로는 못 찾습니다.' },
          { q: '새로운 격자 공격이 발견돼도 영향을 받지 않는 계열은?', opts: ['ML-KEM', 'ML-DSA', 'SLH-DSA'], a: 2, exp: 'SLH-DSA는 해시함수 하나에만 의존합니다.' },
        ]}
      />
    </Chapter>
  )
}
