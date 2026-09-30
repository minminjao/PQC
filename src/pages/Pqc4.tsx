import { Chapter, Section, Key, Widget, Table } from '../components/Chapter'
import Quiz from '../components/Quiz'
import Bimodal from '../widgets/Bimodal'
import FiveDoors from '../widgets/FiveDoors'

export default function Pqc4() {
  return (
    <Chapter route="/pqc/4">
      <Section title="KpqC 공모전">
        <p>국가정보원과 국가보안기술연구소가 주관한 한국형 양자내성암호(KpqC) 공모전은 NIST와 별도로 <strong>국산 알고리즘 자체 표준</strong>을 확보한 독자 트랙입니다. 2021년 11월 공모 개시 후 16종 접수 → 1라운드 8종 → 2라운드 정밀 검증 → <strong>2025년 1월 최종 4종</strong> 선정.</p>
        <Table
          head={['용도', 'NIST 표준', 'KpqC 선정']}
          rows={[
            ['공개키 암호 / 키 교환 (KEM)', 'ML-KEM', <><strong>NTRU+</strong>, <strong>SMAUG-T</strong></>],
            ['전자서명 (격자)', 'ML-DSA, FN-DSA', <strong>HAETAE</strong>],
            ['전자서명 (격자 외)', 'SLH-DSA (해시)', <><strong>AIMer</strong> (영지식·일방향함수)</>],
          ]}
        />
        <p>공공 조달의 기준선이 되므로, 국내 공공·금융 시스템을 다룬다면 NIST 표준과 함께 알아 둘 필요가 있습니다. 통신 구간에서는 LG유플러스가 KpqC 1라운드 알고리즘 SOLMAE로 상용 PQC 회선을 구축한 선례가 있습니다.</p>
      </Section>

      <Section title="NTRU+ — 1998년 원조를 재설계한 격자 KEM">
        <p>1998년의 원조 NTRU를 재설계해 <strong>NTT 고속화와 CCA 안전성을 동시에</strong> 확보했습니다. 재암호화 없는 FO⊥ 변환으로 복호화 시 검증 과정을 단순화해 속도를 높였습니다.</p>
        <Table head={['(n≈768급, AVX2)', '암호문', 'Encaps 비용']} rows={[['NTRU+768', '1,152 B', '80K cycles'], ['Kyber-768', '1,088 B', '256K cycles'], ['SMAUG-T192', '992 B', '205K cycles']]} />
        <p>암호문은 조금 크지만 <strong>Encaps 속도는 최대 3배 이상 빠릅니다.</strong> 처음부터 NTT 도메인을 유지해 트렁케이션이 불필요하기 때문입니다.</p>
      </Section>

      <Section title="SMAUG-T — 경량 디바이스용 격자 KEM">
        <p>1라운드의 SMAUG와 TiGER를 통합했습니다. 비밀키 s는 Module-LWE로, 공유키(암호문)는 Module-LWR로 보호하는 <strong>이중 보호</strong> 구조이며, FO 변환으로 최상위 보안성(IND-CCA2)을 확보합니다.</p>
        <Table head={['파라미터', '공개키']} rows={[['TiMER (IoT)', '672 B'], ['SMAUG-T128', '672 B'], ['SMAUG-T192', '1,088 B'], ['SMAUG-T256', '1,792 B']]} />
        <p><strong>부채널 대응</strong>: 1라운드에서 상수시간 가우시안 샘플러에 전력·전자기 부채널 취약점이 발견돼 Fisher-Yates 계수 셔플로 방어했습니다. 오버헤드(+77~112%)는 키 생성에서만 발생하며 암·복호화는 영향이 없습니다.</p>
      </Section>

      <Section title="HAETAE — 크기를 줄인 격자 서명">
        <p>Dilithium과 같은 Fiat-Shamir with Aborts 계열이지만, 고유의 <strong>바이모달 하이퍼볼 거부 샘플링</strong>으로 크기를 줄였습니다.</p>
        <Widget title="쌍봉에서 구로" caption="기존 방식은 불필요하게 넓은 쌍봉 공간에서 샘플을 뽑아 서명이 비대해집니다. HAETAE는 더 작은 균등 하이퍼볼 안으로 압축합니다.">
          <Bimodal />
        </Widget>
        <p><strong>엔지니어링</strong>: 부동소수점은 연산 시간에 편차가 생겨 부채널로 비밀키를 유추당할 수 있습니다. HAETAE는 고정소수점 상수시간 구현으로 이를 원천 차단하고, 복잡한 지수함수 없이 벡터 크기 비교만으로 거부 여부를 판정해 구현이 단순합니다.</p>
        <Table head={['파라미터', '서명', '공개키', 'Dilithium 대비']} rows={[['HAETAE120 (Lv.2)', '1,474 B', '992 B', '서명 최대 39% ↓'], ['HAETAE180 (Lv.3)', '2,349 B', '1,472 B', '공개키 최대 25% ↓'], ['HAETAE260 (Lv.5)', '2,948 B', '2,080 B', '']]} />
      </Section>

      <Section title="AIMer — 격자를 쓰지 않는 영지식 서명">
        <p>MPC-in-the-Head 패러다임과 전용 일방향함수 AIM을 결합했습니다. <strong>트랩도어가 필요 없는</strong> 접근입니다.</p>
        <Widget title="다섯 개의 방 — 머릿속의 다자간 계산" caption="서명자가 비밀을 5조각으로 나눠 가상 파티에게 나눠 주고, 검증자는 무작위 4개 방만 열어 확인합니다.">
          <FiveDoors />
        </Widget>
        <p><strong>전용 일방향함수 AIM</strong>: 평문이 병렬 S-box(Mersenne)를 거쳐 선형결합 후 마지막 S-box·평문과 XOR로 가역성을 제거합니다. v2.0(AIM2)은 역 Mersenne S-box와 라운드 앞 상수 덧셈으로 v1.0의 무차별대입·선형화 공격을 원천 차단했습니다.</p>
        <Table head={['파라미터', '공개키', '비밀키', '서명']} rows={[['AIMer-I', '32 B', '16 B', '5.9 KB'], ['AIMer-III', '48 B', '24 B', '13.1 KB'], ['AIMer-V', '64 B', '32 B', '25.2 KB']]} />
        <p>공개키·비밀키는 4종 중 가장 작지만 서명은 가장 큽니다. 저메모리 모드(씨앗 하나에서 실시간 재생성)와 비트 슬라이싱(테이블 참조 배제)으로 타이밍 부채널을 막습니다.</p>
        <Key>KpqC 4종은 NIST와 같은 격자 중심이지만, AIMer가 격자 없는 대안을 제공한다. 공공 조달 기준선이므로 국내 시스템은 두 표준을 함께 고려해야 한다.</Key>
      </Section>

      <Quiz
        items={[
          { q: 'KpqC 최종 4종 중 격자를 쓰지 않는 것은?', opts: ['NTRU+', 'HAETAE', 'AIMer'], a: 2, exp: 'AIMer는 MPC-in-the-Head와 해시 기반 일방향함수를 씁니다.' },
          { q: 'NTRU+가 Kyber보다 Encaps가 빠른 이유는?', opts: ['키가 작아서', '처음부터 NTT 도메인을 유지해 트렁케이션이 불필요해서', '해시를 안 써서'], a: 1, exp: '암호문은 조금 크지만 속도는 최대 3배 이상 빠릅니다.' },
        ]}
      />
    </Chapter>
  )
}
