import { Chapter, Section, Key, Widget, Table } from '../components/Chapter'
import Quiz from '../components/Quiz'
import KemFlow from '../widgets/KemFlow'
import SizeBars from '../widgets/SizeBars'

export default function Pqc2() {
  return (
    <Chapter route="/pqc/2">
      <Section>
        <p>첫 페이지에서 본 대칭키 암호의 숙제, "열쇠를 어떻게 안전하게 건네나"에 대한 양자 시대의 답입니다.</p>
      </Section>
      <Section title="KEM은 암호화가 아니다">
        <p>ML-KEM은 데이터를 암호화하는 알고리즘이 아니라 <strong>'같은 대칭키를 나눠 갖는 절차'</strong>입니다. 이것을 키 캡슐화 메커니즘(KEM, Key Encapsulation Mechanism)이라고 부릅니다.</p>
        <ul>
          <li>KEM으로 나눠 가진 비밀 K를 AES 키로 씁니다. 실제 데이터는 <strong>AES가 암호화</strong>합니다.</li>
          <li>ML-KEM은 NIST FIPS 203 표준이며, 격자 기반(Module-LWE 문제)입니다. TLS에서 기존 Diffie-Hellman 키교환의 자리를 대체합니다.</li>
        </ul>
        <Key>ML-KEM = 열쇠 나눠 갖기. 데이터 암호화는 여전히 AES가 한다.</Key>
      </Section>
      <Section title="3단계로 따라가기">
        <Widget title="앨리스와 밥" caption="네트워크 선 위로 지나가는 것은 encaps key와 cipher뿐입니다. 비밀 K는 양쪽 화면 안에서만 만들어집니다.">
          <KemFlow />
        </Widget>
        <p>도청자가 cipher를 저장해도, 격자 문제(Module-LWE)를 풀지 않는 한 K를 얻을 수 없습니다.</p>
      </Section>
      <Section title="Regev에서 Kyber로 — 왜 다항식인가">
        <p>LWE를 그대로 쓴 Regev 암호는 <strong>1비트당 큰 소포 하나</strong>가 필요해 비효율적입니다(장난감 설정에서 암호문 1비트당 약 65 B). Kyber는 숫자를 낱개 대신 <strong>묶음(다항식)</strong>으로 처리하는 Module-LWE 구조로 비트당 암호문을 1/3 이하로 줄였습니다. 이것이 격자 암호 실용화의 핵심입니다.</p>
        <p>실제 표준은 여기에 Fujisaki-Okamoto 변환(상자를 다시 잠가 비교하는 안전장치)을 더해 부채널·키 재사용 공격까지 방어합니다.</p>
      </Section>
      <Section title="파라미터 셋과 크기">
        <Table head={['파라미터 셋', 'NIST 보안 레벨', '공개키', '개인키', '암호문']} rows={[['ML-KEM-512', '1', '800 B', '1,632 B', '768 B'], ['ML-KEM-768', '3', '1,184 B', '2,400 B', '1,088 B'], ['ML-KEM-1024', '5', '1,568 B', '3,168 B', '1,568 B']]} />
        <Widget title="크기 비교" caption="ECC P-256 공개키는 64 B, RSA-2048은 256 B. PQC는 키와 암호문이 수 배에서 수십 배 커지며, 이것이 시스템 설계에서 중요합니다.">
          <SizeBars only={['ECC', 'RSA', 'ML-KEM']} />
        </Widget>
      </Section>
      <Section title="안에서는 무슨 일이 일어나나 (심화)">
        <Table
          head={['부품', '역할']}
          rows={[
            [<strong>SHA-3 / SHAKE</strong>, '필요한 숫자를 만드는 부분. 32바이트 씨앗만 보내고 받는 쪽이 같은 방법으로 큰 행렬 A를 키워 낸다 — 공개키가 작아지는 비결.'],
            [<strong>Parser · Sampler</strong>, 'SHAKE가 만든 긴 데이터를 작은 숫자들로 변환. 한쪽으로 치우치지 않게 고르게 만드는 것이 중요.'],
            [<strong>NTT 데이터패스</strong>, '다항식 곱셈을 O(n²)에서 O(n log n)으로 줄이는 핵심 계산 장치. Kyber와 Dilithium이 같은 n=256 NTT 코어를 공유한다.'],
            [<strong>멀티포트 RAM</strong>, '해시·샘플러·NTT의 중간 데이터를 저장·전달. 여러 장치가 같은 메모리를 공유해 하드웨어 크기를 줄임.'],
          ]}
        />
      </Section>
      <Section title="어디에 쓰이나">
        <ul>
          <li>TLS·VPN 키 교환. 크롬·클라우드플레어는 이미 <strong>X25519 + ML-KEM 하이브리드</strong>를 기본 적용</li>
          <li>메신저 종단간 암호화(시그널의 PQXDH 등)</li>
          <li>서명 기능은 없으므로 <strong>별도 서명 알고리즘이 반드시 필요</strong>합니다 → 다음 페이지</li>
        </ul>
      </Section>
      <Quiz
        items={[
          { q: 'ML-KEM에서 네트워크를 지나가는 것은?', opts: ['비밀 K', 'cipher', 'decaps key'], a: 1, exp: 'K는 양쪽이 각자 계산합니다. 네트워크에는 cipher(와 공개 encaps key)만 흐릅니다.' },
          { q: 'ML-KEM으로 나눠 가진 K는 이후 무엇에 쓰이나?', opts: ['전자서명', 'AES 같은 대칭키 암호의 키', '인증서 발급'], a: 1, exp: 'KEM은 열쇠 나눠 갖기이고, 데이터 암호화는 AES가 합니다.' },
          { q: 'ML-KEM으로 문서에 전자서명을 할 수 있다?', opts: ['예', '아니오'], a: 1, exp: 'KEM은 키 교환 전용입니다. 서명은 ML-DSA 등 별도 알고리즘이 필요합니다.' },
        ]}
      />
    </Chapter>
  )
}
