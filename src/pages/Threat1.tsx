import { Chapter, Section, Key, Widget, Table } from '../components/Chapter'
import Quiz from '../components/Quiz'
import BitVsQubit from '../widgets/BitVsQubit'
import KeyLocks from '../widgets/KeyLocks'

export default function Threat1() {
  return (
    <Chapter route="/threat/1">
      <Section>
        <p>
          양자내성암호(PQC, Post-Quantum Cryptography)를 이해하려면 두 가지만 알면 됩니다. 양자 컴퓨터가 <strong>무엇을 다르게 계산하는지</strong>, 그리고 오늘의 암호가{' '}
          <strong>무엇에 기대어 안전한지</strong>입니다.
        </p>
      </Section>

      <Section title="고전 비트와 큐비트">
        <p>고전 컴퓨터는 경우의 수를 하나씩 확인합니다. 3비트 자물쇠라면 000, 001, 010… 최대 8번을 시도해야 정답을 찾습니다.</p>
        <p>양자 컴퓨터의 큐비트는 여러 경우를 <strong>겹쳐서(중첩)</strong> 계산합니다. 같은 문제를 단 2회 계산으로 정답에 근접할 수 있습니다.</p>
        <Widget title="자물쇠 비교" caption="비트 수를 늘려 보세요. 고전 쪽 계산 횟수는 폭발적으로 늘지만 큐비트 쪽은 그대로입니다.">
          <BitVsQubit />
        </Widget>
        <Key>고전은 경우의 수를 하나씩, 양자는 여러 경우를 겹쳐서 계산한다. 이 차이가 쇼어 알고리즘이 암호를 빠르게 푸는 힘이다.</Key>
      </Section>

      <Section title="오늘의 암호 ①: 대칭키 암호">
        <p>잠글 때와 열 때 <strong>같은 열쇠</strong>를 씁니다. 대표적으로 AES가 있습니다.</p>
        <ul>
          <li>빠르고 가볍습니다. 실제 데이터 암호화는 거의 전부 대칭키가 담당합니다.</li>
          <li>숙제가 하나 있습니다. 그 열쇠를 상대에게 <strong>어떻게 안전하게 건네느냐</strong>입니다.</li>
        </ul>
      </Section>

      <Section title="오늘의 암호 ②: 공개키 암호">
        <p>잠그는 열쇠와 여는 열쇠가 <strong>다릅니다</strong>.</p>
        <ul>
          <li><strong>공개키</strong>: 누구나 가질 수 있고, 잠그는 데만 쓴다.</li>
          <li><strong>개인키</strong>: 본인만 갖고, 여는 데 쓴다.</li>
        </ul>
        <p>덕분에 처음 만난 상대와도 사전 약속 없이 통신할 수 있습니다. HTTPS, VPN, 전자서명 등 오늘날 인터넷 전체가 여기에 기대고 있습니다. 대표적으로 RSA와 타원곡선암호(ECC)가 있습니다.</p>
        <Widget title="두 종류의 열쇠" caption="대칭키/공개키를 전환하고 '다음 단계'를 눌러 열쇠가 어떻게 움직이는지 보세요.">
          <KeyLocks />
        </Widget>
      </Section>

      <Section title="공개키 암호는 무엇에 기대어 안전한가">
        <p>공개키 암호의 안전성은 <strong>"이 수학 문제는 풀기 어렵다"</strong>는 가정 위에 서 있습니다.</p>
        <Table head={['암호', '기대고 있는 어려운 문제']} rows={[['RSA', '큰 수의 소인수분해 (N = p × q에서 p, q 찾기)'], ['ECC, Diffie-Hellman', '이산로그 문제']]} />
        <p>고전 컴퓨터로는 RSA-2048 크기의 수를 소인수분해하는 데 수천 년이 걸립니다. 그래서 안전합니다.</p>
        <Key>공개키 암호는 "소인수분해와 이산로그는 어렵다"는 가정에 기대고 있다. 이 가정이 무너지면 암호도 무너진다.</Key>
      </Section>

      <Section title="그리고 양자 컴퓨터가 등장하면">
        <Table
          head={['', '양자 시대의 영향']}
          rows={[
            [<strong>공개키 암호</strong>, <>구조 자체가 무너집니다. 쇼어 알고리즘이 소인수분해와 이산로그를 직접 풀어 버리므로, <strong>키를 아무리 늘려도 소용이 없습니다.</strong></>],
            [<strong>대칭키 암호</strong>, <>구조가 깨지지는 않습니다. 그로버 알고리즘이 탐색을 빠르게 할 뿐이라, 키 길이를 두 배로 늘리면(AES-128 → AES-256) 안전 수준이 회복됩니다.</>],
          ]}
        />
        <p>다음 페이지에서 이 두 알고리즘, 쇼어와 그로버를 직접 돌려 봅니다.</p>
      </Section>

      <Quiz
        items={[
          { q: '대칭키 암호의 가장 큰 숙제는 무엇인가요?', opts: ['속도가 느리다', '열쇠를 안전하게 전달해야 한다', '양자 컴퓨터에 완전히 깨진다'], a: 1, exp: '대칭키는 빠르지만 같은 열쇠를 양쪽이 가져야 하므로 전달이 문제입니다. 그 답이 공개키 암호이고, 양자 시대에는 KEM입니다.' },
          { q: 'RSA가 안전하다고 여겨지는 근거는?', opts: ['키가 길어서', '소인수분해가 고전 컴퓨터로 매우 오래 걸려서', '비밀 알고리즘이라서'], a: 1, exp: '"어려운 수학 문제"라는 가정이 근거입니다. 쇼어 알고리즘은 바로 이 가정을 무너뜨립니다.' },
        ]}
      />
    </Chapter>
  )
}
