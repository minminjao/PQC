import { Chapter, Section, Key, Widget, Table, Info } from '../components/Chapter'
import Quiz from '../components/Quiz'
import SignVerify from '../widgets/SignVerify'
import RejectionSampling from '../widgets/RejectionSampling'
import MerkleTree from '../widgets/MerkleTree'
import SizeBars from '../widgets/SizeBars'

export default function Pqc3() {
  return (
    <Chapter route="/pqc/3">
      <Section title="전자서명의 기본 구조는 그대로다">
        <p>밥이 메시지 해시에 개인키로 서명하고, 앨리스는 같은 해시를 계산해 공개키로 검증합니다. 개인키는 '도장을 찍는 열쇠', 공개키는 '도장이 진짜인지 확인하는 도구'입니다.</p>
        <ol>
          <li>서명자는 문서의 해시값을 계산합니다.</li>
          <li>개인키로 전자서명을 만듭니다.</li>
          <li>문서와 서명을 검증자에게 전달합니다.</li>
          <li>검증자는 같은 문서의 해시값을 다시 계산합니다.</li>
          <li>공개키로 서명을 확인합니다.</li>
        </ol>
        <Widget title="서명하고 검증하기" caption="긴 문서를 그대로 서명하면 데이터가 너무 많으므로 짧은 해시로 요약한 뒤 서명합니다. 내용이 조금만 달라져도 해시가 크게 달라져 수정 여부도 확인됩니다.">
          <SignVerify />
        </Widget>
        <p><strong>양자 시대에 달라지는 부분</strong>: 흐름은 그대로입니다. 다만 RSA·ECDSA 대신 양자 공격에 안전한 <strong>ML-DSA, SLH-DSA</strong>(2024년 NIST 최종 표준), <strong>FN-DSA</strong>(표준화 진행 중)를 씁니다.</p>
        <Key>서명 절차는 안 바뀐다. 바뀌는 것은 도장의 재질(알고리즘)과 도장의 크기다.</Key>
      </Section>

      <Section title="ML-DSA (CRYSTALS-Dilithium) — 범용 표준">
        <p>격자 기반(Module-LWE/SIS), NIST FIPS 204. 범용 전자서명·TLS 인증서·코드 서명에 쓰이는 <strong>기본 선택지</strong>입니다. 서명과 검증이 빠르고 구현이 단순하지만, RSA·ECDSA보다 키와 서명 크기가 큽니다.</p>
        <h3>서명 시간이 매번 다른 이유 — 거부 샘플링 ("비치면 찢고 다시 찍기")</h3>
        <p>ML-DSA는 먼저 임시값으로 <strong>후보 서명</strong>을 만들고, 그 숫자들이 정해진 안전 범위 안에 있는지 검사합니다. 범위를 벗어난 후보는 버리고(abort) 새 임시값으로 다시 계산합니다. 이 과정이 최종 서명값에서 개인키 정보가 새는 것을 막습니다.</p>
        <Widget title="다시, 다시 — Fiat-Shamir with Aborts" caption="같은 크기의 메시지를 서명해도 처리 시간이 항상 같지 않습니다. 오류가 아니라 정상 동작입니다. 노트북 실측에서는 축소 파라미터 기준 서명당 평균 9.5회 재시도였습니다.">
          <RejectionSampling />
        </Widget>
      </Section>

      <Section title="FN-DSA (Falcon) — 가장 작은 서명">
        <p>NTRU 격자 기반, NIST FIPS 206으로 표준화 진행 중. 같은 미로를 보는 두 개의 지도 중, 비밀 지도(비밀키)를 가진 서명자만 짧은 경로(짧은 벡터)를 뽑아 서명으로 제출합니다. 경로가 짧을수록 서명이 작습니다.</p>
        <Table head={['알고리즘 (NIST 레벨 1)', '서명 크기']} rows={[['FN-DSA-512', '666 B'], ['ML-DSA-44', '2,420 B'], ['SLH-DSA-128f', '17,088 B']]} />
        <p>Falcon-512 서명은 ML-DSA-65(3,309 B) 대비 약 1/5입니다. 인증서 체인, 블록체인 트랜잭션, 저전력 무선처럼 <strong>바이트 단위로 값을 치르는 환경</strong>에서 결정적인 차이를 만듭니다. 대신 부동소수점 가우시안 샘플링(FFSampling)이 오차와 타이밍에 민감해 <strong>구현과 부채널 방어가 까다롭습니다</strong>. 실서비스에는 liboqs 같은 검증된 라이브러리가 필수입니다.</p>
        <ul>
          <li><strong>블록체인·원장</strong>: 거래 서명을 여러 노드가 저장하므로 작은 서명이 저장공간과 통신량을 줄임</li>
          <li><strong>금융 거래·인증서</strong>: 많은 서명을 처리해야 하므로 빠른 전송과 검증에 유리</li>
          <li><strong>임베디드·IoT</strong>: 자원이 제한된 기기에서 전송량과 배터리 사용을 줄임</li>
        </ul>
      </Section>

      <Section title="SLH-DSA (SPHINCS+) — 가장 보수적인 서명">
        <p>해시 기반, NIST FIPS 205. <strong>안전성의 근거가 해시함수 하나뿐</strong>입니다.</p>
        <h3>구조: 일회용 도장을 나무로 묶는다</h3>
        <ul>
          <li><strong>일회용 서명 키(OTS, Lamport/WOTS+)</strong> — 하나당 딱 한 번만 사용합니다. 두 번 쓰면 비밀이 드러납니다.</li>
          <li>이 일회용 키들을 머클 트리로 묶어 <strong>루트 하나를 공개키(32 B)</strong>로 삼습니다.</li>
          <li>메시지 해시로 잎을 무작위 선택하고, 그 잎에서 루트까지의 경로를 서명에 함께 담습니다.</li>
          <li>하이퍼트리(트리의 트리)와 FORS(몇 번은 써도 되는 서명)로, 상태를 기록하지 않아도(stateless) 사실상 무제한 서명을 실현합니다.</li>
        </ul>
        <Widget title="도장 나무 (머클 트리)" caption="서명할 때마다 잎 하나가 소모되고, 루트까지의 인증 경로가 서명에 실립니다. 잎이 두 배가 되어도 경로는 한 단계만 늘어납니다.">
          <MerkleTree />
        </Widget>
        <Table head={['부품', '역할']} rows={[['WOTS+', '해시 체인으로 만든 일회용 서명. 반드시 한 번만 사용'], ['XMSS', '여러 WOTS+ 공개키를 머클 트리로 묶어 루트 하나로 줄임'], ['하이퍼트리', 'XMSS 트리를 여러 층으로 쌓아 사실상 무한에 가까운 서명 개수를 감당'], ['FORS', '실제 메시지에 서명하는 층. 소수 횟수 사용을 허용해 상태 관리 없이도 안전 유지']]} />
        <ul>
          <li><strong>장점</strong>: 새로운 격자 공격이 나와도 영향을 받지 않음. 상태 관리 실수로 키가 노출되는 XMSS류의 위험도 없음</li>
          <li><strong>단점</strong>: 크고 느림. 서명 하나가 8~17 KB이고 해시를 수만 번 호출. 실시간 대량 서명에는 맞지 않음</li>
          <li><strong>적용</strong>: 계약서·공공기록처럼 장기 보존 문서, 루트 인증서, 펌웨어 서명</li>
        </ul>
      </Section>

      <Section title="셋을 한눈에">
        <Table
          head={['', 'ML-DSA', 'FN-DSA', 'SLH-DSA']}
          rows={[
            ['표준', 'FIPS 204', 'FIPS 206 (진행 중)', 'FIPS 205'],
            ['기반', '격자 (Module-LWE/SIS)', 'NTRU 격자', '해시'],
            ['공개키 / 서명', '1,312 B / 2,420 B', '897 B / 666 B', '32 B / 7,856~17,088 B'],
            ['강점', '빠르고 단순, 범용', '서명이 가장 작음', '가장 보수적 안전성'],
            ['약점', '크기가 큼', '구현·부채널 어려움', '크고 느림'],
            ['적용', 'TLS 인증서, 코드 서명', 'IoT, 블록체인, 대역폭 제한', '루트 인증서, 펌웨어, 장기 보존 문서'],
          ]}
        />
        <Widget title="크기 비교 막대 — 이 사이트의 핵심 그래프" caption="격자는 균형형, 해시는 공개키 최소·서명 최대, 코드는 공개키가 홀로 거대. 선택 기준은 '최고의 알고리즘'이 아니라 '우리 시스템의 병목'입니다.">
          <SizeBars />
        </Widget>
        <Info title="원본 자료 보완 필요">발표자료의 ML-DSA·FN-DSA·SLH-DSA 개념 그림(23, 25, 29쪽)은 이미지로만 되어 있어 이 페이지에는 노트북의 설명으로 대체했습니다.</Info>
        <Key>범용은 ML-DSA, 바이트가 비싼 곳은 FN-DSA, 오래 살아남아야 하는 신뢰 앵커는 SLH-DSA.</Key>
      </Section>

      <Quiz
        items={[
          { q: 'ML-DSA의 서명 시간이 매번 조금씩 다른 이유는?', opts: ['구현 버그', '안전 범위를 벗어난 후보를 버리고 다시 계산하는 거부 샘플링', '네트워크 지연'], a: 1, exp: '"위험하면 버리고 다시 찍는" 확률적 중단이 개인키 유출을 막는 핵심 장치입니다.' },
          { q: '루트 인증서에 SLH-DSA를 권하는 이유는?', opts: ['서명이 가장 작아서', '해시 하나에만 의존해 가장 보수적이기 때문', '가장 빨라서'], a: 1, exp: '격자 공격이 발견돼도 루트는 버팁니다. 오래 살아남아야 하는 신뢰 앵커에 맞습니다.' },
          { q: 'IoT 센서의 서명에 가장 적합한 것은?', opts: ['SLH-DSA', 'ML-DSA-87', 'FN-DSA (Falcon)'], a: 2, exp: 'Falcon-512 서명은 666 B로 가장 작습니다.' },
        ]}
      />
    </Chapter>
  )
}
