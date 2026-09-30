import { Chapter, Section, Key, Widget, Table } from '../components/Chapter'
import Quiz from '../components/Quiz'
import ShorPeriod from '../widgets/ShorPeriod'
import GroverCounter from '../widgets/GroverCounter'
import GroverAmplitude from '../widgets/GroverAmplitude'

export default function Threat2() {
  return (
    <Chapter route="/threat/2">
      <Section>
        <p>양자 컴퓨터가 암호에 위협이 되는 이유는 정확히 두 개의 알고리즘 때문입니다. 둘의 차이를 아는 것이 PQC 이해의 절반입니다.</p>
      </Section>

      <Section title="쇼어 알고리즘 — 초고속 소인수분해기">
        <p>🔒 두 소수를 곱해 잠근 자물쇠(N = p × q)를, 원래의 두 소수 p·q로 다시 되쪼개는 <strong>'초고속 소인수분해기'</strong>입니다.</p>
        <h3>무엇을 하나</h3>
        <p>두 수를 곱하는 것은 쉽습니다. 5 × 7 = 35는 암산으로도 됩니다. 그런데 거꾸로 "35는 어떤 두 수의 곱인가?"는 이것저것 나눠 보는 수밖에 없습니다. 숫자가 수백 자리로 커지면 이 "거꾸로 문제"는 슈퍼컴퓨터로도 사실상 풀 수 없습니다.</p>
        <h3>어떻게 하나</h3>
        <p>
          분해를 직접 하지 않습니다. 아무 수 a를 골라 a, a², a³… 을 N으로 나눈 나머지만 적어 보면, 그 나머지들이 <strong>일정한 간격으로 똑같이 반복</strong>됩니다. 시계 바늘이 12시간마다 제자리로 돌아오는 것과 같습니다. 이 간격이 <strong>주기(r)</strong>입니다. 주기만 알면 최대공약수(gcd) 계산만으로 소인수가 튀어나옵니다.
        </p>
        <Widget title="주기 찾기 시뮬레이터" caption="N과 a를 바꿔 가며 세 단계를 눌러 보세요. 주기가 홀수이거나 조건이 맞지 않으면 실패하며, 실제 알고리즘은 다른 a로 재시도합니다.">
          <ShorPeriod />
        </Widget>
        <h3>왜 이 단계에서만 양자를 쓰나</h3>
        <ul>
          <li>나머지 계산(gcd 등)은 고전 컴퓨터가 이미 빠릅니다.</li>
          <li>주기 찾기만 고전으로는 지수 시간이 걸립니다.</li>
          <li>양자는 중첩과 양자 푸리에 변환(QFT)으로 주기를 한 번에 찾아 다항 시간, 즉 <strong>지수 가속</strong>을 얻습니다.</li>
        </ul>
        <h3>지금은 안 되는 이유</h3>
        <p>아직 양자 컴퓨터는 RSA-2048 같은 큰 수를 풀 만큼 크지 않습니다(수천 논리 큐비트 + 오류정정 필요). 하지만 '시간 문제'이므로 지금부터 PQC 전환을 준비해야 합니다.</p>
        <Key>쇼어는 공개키 암호의 근거인 "소인수분해·이산로그는 어렵다"는 가정을 무너뜨린다. 키를 늘려도 소용없다.</Key>
      </Section>

      <Section title="그로버 알고리즘 — 제곱근만큼 빠른 탐색">
        <p>🔍 이름표 없이 뒤섞인 1억 개 상자에서 정답 하나 찾기. 고전은 평균 5천만 번 열어봐야 하지만, 그로버는 약 1만 번(√1억)이면 충분합니다.</p>
        <p>AES 같은 대칭키 암호는 구조가 튼튼해서 공격자가 할 수 있는 일은 "가능한 열쇠를 하나씩 다 넣어 보기"뿐입니다. 그로버는 이 시도 횟수를 <strong>제곱근만큼</strong> 줄입니다. 즉 시도 횟수의 지수가 b에서 b/2로, <strong>키의 유효 강도가 절반</strong>이 됩니다.</p>
        <Widget title="고전 vs 그로버 공격 비용" caption="AES-128은 안전선 아래로 떨어지고(위험), AES-256은 안전선에 도달합니다(안전). 열쇠 구멍이 절반으로 줄어드는 것일 뿐이므로 열쇠를 2배 길게 만들면 원상복구됩니다.">
          <GroverCounter />
        </Widget>
        <h3>어떻게 하나 (2큐비트 예시)</h3>
        <ol>
          <li><strong>초기화(H)</strong> — 두 큐비트에 하다마드 게이트를 걸어 모든 후보가 같은 확률로 겹쳐진 '중첩 상태'를 만듭니다.</li>
          <li><strong>오라클(CZ)</strong> — 정답 |11⟩에만 부호를 뒤집어 몰래 '표시'합니다(위상 반전).</li>
          <li><strong>확산</strong> — 평균을 기준으로 반전시켜 표시된 정답의 진폭(확률)만 키웁니다(진폭 증폭).</li>
          <li><strong>측정(M)</strong> — 관측하면 높은 확률로 정답 |11⟩.</li>
        </ol>
        <Widget title="스포트라이트 — 진폭 증폭" caption="반복 횟수 ≈ (π/4)·√N. 너무 많이 돌리면 과회전으로 다시 흐려집니다.">
          <GroverAmplitude />
        </Widget>
        <Table head={['알고리즘', '그로버 적용 후 유효 강도', '판정']} rows={[['AES-128', '64비트', <span className="badge danger">위험</span>], ['AES-256', '128비트', <span className="badge safe">안전</span>], ['SHA-256', '128비트', <span className="badge safe">안전</span>], ['SHA-384', '192비트', <span className="badge safe">안전</span>]]} />
        <Key>그로버는 대칭키·해시를 '완전히' 깨지 못하고 '절반'만 약화시킨다. 키 길이를 두 배로 늘리면 간단히 방어된다. 쇼어와 결정적으로 다른 점이다.</Key>
      </Section>

      <Section title="한눈에 비교">
        <Table
          head={['양자 알고리즘', '무엇을 빠르게 하나', '영향받는 암호', '결과', '대응']}
          rows={[
            [<strong>쇼어</strong>, '인수분해·이산로그', '공개키: RSA, ECDSA, ECDH, DSA, DH', <span className="badge danger">완전 붕괴</span>, '알고리즘 자체를 PQC로 교체'],
            [<strong>그로버</strong>, '정렬되지 않은 탐색', '대칭키: AES / 해시: SHA-2, SHA-3', <span className="badge warn">절반 약화</span>, '키 길이·해시 출력 확대'],
          ]}
        />
        <Key>대칭키·해시는 '키 길이·출력 확대'로 버티지만, 공개키(RSA·ECC)는 문제 자체가 무너지므로 양자내성암호(PQC)로 교체가 유일한 해법이다.</Key>
      </Section>

      <Quiz
        items={[
          { q: '쇼어 알고리즘이 양자 컴퓨터로 직접 푸는 단계는?', opts: ['정렬 안 된 탐색', '주기 찾기 → 소인수분해', '해시 충돌 찾기'], a: 1, exp: 'gcd 같은 나머지 계산은 고전 컴퓨터가 하고, 주기 찾기만 양자가 맡습니다.' },
          { q: 'AES-128을 양자 시대에도 안전하게 쓰려면?', opts: ['PQC로 교체', 'AES-256으로 키 길이 확대', '그대로 써도 된다'], a: 1, exp: '그로버는 강도를 절반으로 줄일 뿐이므로 키를 두 배로 늘리면 됩니다.' },
          { q: '다음 중 그로버가 아닌 쇼어의 영향을 받는 것은?', opts: ['SHA-384', 'AES-256', 'ECDSA'], a: 2, exp: 'ECDSA는 이산로그 기반 공개키 서명이라 쇼어에 완전히 깨집니다.' },
        ]}
      />
    </Chapter>
  )
}
