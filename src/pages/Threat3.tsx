import { Chapter, Section, Key, Widget, Table } from '../components/Chapter'
import Quiz from '../components/Quiz'
import QubitRequirement from '../widgets/QubitRequirement'
import HNDL from '../widgets/HNDL'
import Mosca from '../widgets/Mosca'

export default function Threat3() {
  return (
    <Chapter route="/threat/3">
      <Section>
        <p>"RSA를 깰 만한 양자 컴퓨터는 아직 없다. 그러니 나중에 준비해도 된다." 이 생각이 왜 틀렸는지가 이 페이지의 주제입니다.</p>
      </Section>

      <Section title="Q-Day는 얼마나 가까운가">
        <p>Q-Day란 공개키 암호를 실제로 깨는 양자 컴퓨터(CRQC, Cryptographically Relevant Quantum Computer)가 등장하는 날을 말합니다. 정확한 날짜는 아무도 모르지만, <strong>필요한 하드웨어 규모 추정치가 빠르게 줄어들고 있다</strong>는 것은 분명합니다.</p>
        <Widget title="줄어드는 요구치" caption="6년 만에 필요한 하드웨어 규모가 약 200분의 1로 줄었습니다. 양자 컴퓨터가 커지는 속도뿐 아니라, 알고리즘이 똑똑해지는 속도도 Q-Day를 앞당깁니다.">
          <QubitRequirement />
        </Widget>
        <h3>이미 실증된 사례</h3>
        <p>양자 시뮬레이터(IBM Quantum simulator_mps)에서 쇼어 알고리즘으로 RSA-14(14비트 키)를 소인수분해한 실험이 있습니다. 입력이 커질수록 시뮬레이션 비용이 급격히 늘지만, <strong>작은 키 길이의 RSA는 양자 소인수분해가 실제로 가능</strong>함을 보여줍니다. 본질은 "가능한가"가 아니라 "확장 가능한 양자 자원을 언제 확보하는가"입니다.</p>
      </Section>

      <Section title="지금 당장의 위협: 수집 후 해독(HNDL)">
        <p>Harvest Now, Decrypt Later. <strong>지금 수집하고, 나중에 해독한다.</strong></p>
        <ol>
          <li>앨리스와 밥이 TLS나 VPN으로 암호화된 통신을 합니다. 지금은 아무도 열 수 없습니다.</li>
          <li>도청자 이브는 열지 못하는 암호문을 <strong>통째로 저장</strong>해 둡니다.</li>
          <li>Q-Day 이후, 저장해 둔 과거 암호문을 한꺼번에 해독합니다.</li>
        </ol>
        <Widget title="도청자의 창고" caption="타임라인을 Q-Day 너머로 옮기면 창고에 쌓인 자물쇠가 한꺼번에 열립니다.">
          <HNDL />
        </Widget>
      </Section>

      <Section title="모스카 부등식 — '이미 늦었는가'를 계산하는 공식">
        <p>이사에 비유하면 쉽습니다. 집을 비워 줘야 하는 날까지 남은 시간보다, 짐 싸는 데 걸리는 시간과 그 짐을 지켜야 하는 기간의 합이 더 길면 계획은 이미 파탄입니다.</p>
        <Table head={['변수', '의미']} rows={[['S', '데이터 기밀 수명 — 이 데이터가 몇 년 동안 비밀이어야 하는가'], ['M', '마이그레이션 기간 — PQC로 갈아타는 데 걸리는 시간'], ['T', 'CRQC(Q-Day) 등장까지 남은 기간']]} />
        <p style={{ textAlign: 'center', fontSize: '1.4rem' }} className="mono"><strong>S + M &gt; T</strong> → 이미 늦었다</p>
        <Widget title="정보 수명 계산기 (모스카 부등식)" caption="프리셋을 눌러 보세요. 기밀 수명이 긴 데이터는 Q-Day가 2035년이라도 지금 이 순간부터 위험합니다.">
          <Mosca />
        </Widget>
        <Key>Q-Day가 언제인지는 몰라도, 정보의 수명이 긴 데이터는 지금 이 순간부터 위험하다. 이것이 "지금부터"의 이유다. 기밀 수명을 기준으로 전환 우선순위를 매겨라.</Key>
      </Section>

      <Quiz
        items={[
          { q: 'HNDL 공격에서 공격자가 지금 하는 일은?', opts: ['암호를 즉시 해독', '암호문을 저장', '키를 훔침'], a: 1, exp: '지금은 못 열지만 저장해 두었다가 Q-Day 이후에 한꺼번에 해독합니다.' },
          { q: '다음 중 HNDL 위험이 가장 큰 데이터는?', opts: ['1회용 결제 승인', '오늘의 날씨 조회', '유전체 정보'], a: 2, exp: '유전체 정보는 평생 불변하므로 기밀 수명 S가 가장 깁니다.' },
          { q: 'S=10, M=7, Q-Day가 9년 뒤일 때 판정은?', opts: ['아직 여유', '이미 위험', '알 수 없다'], a: 1, exp: 'S + M = 17 > T = 9 이므로 모스카 부등식이 성립합니다.' },
        ]}
      />
    </Chapter>
  )
}
