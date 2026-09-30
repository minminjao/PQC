export type TocItem = { title: string; description: string; route: string }
export type TocPart = { title: string; slug: string; accent: string; content: TocItem[] }

export const toc: TocPart[] = [
  {
    title: '양자 위협의 이해',
    slug: 'threat',
    accent: 'var(--c-threat)',
    content: [
      {
        title: '양자 컴퓨터와 오늘의 암호',
        description:
          '고전 비트와 큐비트는 무엇이 다를까? 오늘 인터넷을 지키는 대칭키·공개키 암호는 어떤 원리로 동작할까? PQC를 이해하기 위한 최소한의 배경을 알아봅니다.',
        route: '/threat/1',
      },
      {
        title: '쇼어와 그로버',
        description:
          '양자 컴퓨터가 암호를 위협하는 이유는 두 개의 알고리즘 때문입니다. 무엇이 완전히 깨지고, 무엇은 키를 늘리면 버틸 수 있는지 구분해 봅니다.',
        route: '/threat/2',
      },
      {
        title: 'Q-Day와 지금 당장의 위협',
        description:
          '큰 양자 컴퓨터는 아직 없습니다. 그런데 왜 "지금부터" 준비해야 할까요? 정보의 수명, 모스카 부등식, 그리고 "지금 수집, 나중에 해독" 공격을 알아봅니다.',
        route: '/threat/3',
      },
    ],
  },
  {
    title: '양자내성암호의 원리',
    slug: 'pqc',
    accent: 'var(--c-pqc)',
    content: [
      {
        title: 'PQC란 무엇인가',
        description:
          '양자 컴퓨터로도 풀기 어려운 수학 문제는 무엇일까? 격자·해시·코드·다변수, 네 가지 계열을 비유와 시뮬레이션으로 이해합니다.',
        route: '/pqc/1',
      },
      {
        title: '키를 나눠 갖는 법 — ML-KEM',
        description:
          '비밀을 한 번도 보내지 않고 같은 열쇠를 나눠 갖는 절차, 키 캡슐화 메커니즘을 앨리스와 밥의 3단계로 따라가 봅니다.',
        route: '/pqc/2',
      },
      {
        title: '양자 시대의 전자서명',
        description:
          '서명의 흐름은 그대로, 알고리즘만 바뀝니다. ML-DSA, FN-DSA, SLH-DSA 세 가지가 각각 어떤 상황에 맞는지 크기와 속도로 비교합니다.',
        route: '/pqc/3',
      },
      {
        title: '국산 알고리즘 KpqC',
        description:
          'NIST 표준과 별도로 우리나라가 선정한 네 가지 알고리즘 NTRU+, SMAUG-T, HAETAE, AIMer의 특징을 알아봅니다.',
        route: '/pqc/4',
      },
    ],
  },
  {
    title: '전환과 적용',
    slug: 'apply',
    accent: 'var(--c-apply)',
    content: [
      {
        title: 'PQC vs QKD',
        description:
          '양자 시대의 두 가지 답, 소프트웨어인 PQC와 하드웨어인 양자 키 분배(QKD)는 어떻게 다르고 각각 어디에 쓰일까요? BB84를 직접 시뮬레이션해 봅니다.',
        route: '/apply/1',
      },
      {
        title: '마이그레이션 4단계와 하이브리드',
        description:
          '탐색·계획·실행·운영, 그리고 기존 암호와 PQC를 함께 쓰는 하이브리드 구조. 조직이 실제로 밟아야 할 순서를 정리합니다.',
        route: '/apply/2',
      },
      {
        title: '국내외 동향과 산업별 적용',
        description:
          '미국·EU·한국의 전환 기한, 금융·의료·통신 기업의 실제 사례, 그리고 산업별로 어떤 알고리즘 조합이 맞는지 살펴봅니다.',
        route: '/apply/3',
      },
    ],
  },
  {
    title: '퍼져있는 오해들',
    slug: 'myth',
    accent: 'var(--c-myth)',
    content: [
      {
        title: 'PQC에 대한 오해',
        description:
          '"양자 컴퓨터가 모든 암호를 깬다", "QKD면 해결된다", "Q-Day가 오면 그때 바꾸면 된다". 흔한 오해를 하나씩 짚어 봅니다.',
        route: '/myth/1',
      },
    ],
  },
]

export const flatToc = toc.flatMap((p, pi) =>
  p.content.map((c, ci) => ({ ...c, part: p, partIndex: pi, index: ci, label: `${pi + 1}-${ci + 1}` })),
)

export function findEntry(route: string) {
  const i = flatToc.findIndex((e) => e.route === route)
  return { entry: flatToc[i], prev: flatToc[i - 1], next: flatToc[i + 1] }
}
