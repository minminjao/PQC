# PQC — 양자내성암호 이해하기

[qubit.donghwi.dev](https://qubit.donghwi.dev)처럼 스크롤하며 단계별로 읽는 양자내성암호(PQC) 학습 사이트입니다.
양자 컴퓨팅이 만든 위협(쇼어·그로버·HNDL)에서 시작해 PQC 원리, 전환 전략, 오해까지 4부 11페이지로 구성되며, 각 페이지에 애니메이션·시뮬레이터가 들어 있습니다.

## 실행

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # dist/ 생성 (정적 파일, 어디에나 배포 가능)
npm run preview
```

`main` 브랜치에 푸시하면 `.github/workflows/deploy.yml`이 GitHub Pages로 자동 배포합니다. (저장소 Settings → Pages → Source를 "GitHub Actions"로 설정)

## 구성

| 부 | 라우트 | 페이지 | 인터랙티브 위젯 |
|---|---|---|---|
| 1. 양자 위협의 이해 | `/threat/1` | 양자 컴퓨터와 오늘의 암호 | 비트 vs 큐비트 탐색 애니메이션, 대칭키/공개키 열쇠 |
| | `/threat/2` | 쇼어와 그로버 | 쇼어 주기 찾기 시뮬레이터(a^k mod N → gcd), 그로버 비용 비교, 2큐비트 진폭 증폭 |
| | `/threat/3` | Q-Day와 지금 당장의 위협 | 큐비트 요구치 추세, HNDL 도청자 창고 타임라인, 모스카 부등식 계산기 |
| 2. 양자내성암호의 원리 | `/pqc/1` | PQC란 무엇인가 | 표준화 타임라인, 4계열 플립 카드, 격자 좋은/나쁜 기저 체험, 코드 노이즈 복원 |
| | `/pqc/2` | 키를 나눠 갖는 법 — ML-KEM | KeyGen→Encaps→Decaps 3단계 애니메이션, 키 크기 비교 |
| | `/pqc/3` | 양자 시대의 전자서명 | SHA-256 서명/검증 데모, 거부 샘플링 재시도 분포, 머클 트리 서명, 전체 크기 비교 막대 |
| | `/pqc/4` | 국산 알고리즘 KpqC | HAETAE 쌍봉→하이퍼볼, AIMer 다섯 개의 방 |
| 3. 전환과 적용 | `/apply/1` | PQC vs QKD | BB84 시뮬레이터(도청자 토글, QBER), 깨진다/버틴다 분류 퀴즈 |
| | `/apply/2` | 마이그레이션 4단계와 하이브리드 | 4단계 순환도, 위험도 계산기, 하이브리드 두 자물쇠 |
| | `/apply/3` | 국내외 동향과 산업별 적용 | 세계 기한 타임라인, 산업별 조합 추천기 |
| 4. 퍼져있는 오해들 | `/myth/1` | PQC에 대한 오해 | 오해 10가지 펼치기 |

## 저장소 구조

- `src/toc.ts` — 목차(참고 사이트의 `toc.json`에 대응). 페이지 순서·이전/다음 이동을 결정
- `src/pages/` — 페이지별 컴포넌트 (본문 + 위젯 배치 + 퀴즈)
- `src/widgets/` — 인터랙티브 위젯 (SVG + framer-motion)
- `src/components/` — 헤더, 챕터 레이아웃, 콜아웃, 퀴즈, 스크롤 리빌 훅
- `content/` — 페이지 본문 원고(MD). 사이트 텍스트의 출처
- `docs/site-proposal.md` — 구성 제안서

## 기술 스택

Vite · React 18 · TypeScript · react-router (HashRouter) · framer-motion. 3D 라이브러리 없이 SVG 애니메이션으로 구성했습니다.

원본 자료: 『양자내성암호 기초』 발표자료 및 쉬운설명본 노트북 00~10 (MegazoneCloud, 2026)
