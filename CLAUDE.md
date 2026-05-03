# DevHub Frontend

개발자 팀 매칭 플랫폼 프론트엔드 프로젝트.

## 기술 스택

| 영역 | 기술 |
|------|------|
| 프레임워크 | React 19 + TypeScript 5.9 |
| 라우팅 | React Router v7 |
| UI | Material-UI v7 (커스텀 래핑) |
| HTTP | Axios (전역 인터셉터) |
| 상태관리 | 외부 싱글턴 스토어 + `useSyncExternalStore` |
| 스타일 | SCSS + Emotion (MUI) |
| 날짜 | Dayjs + MUI DatePicker |
| 빌드 | Vite (`@` alias → `src/`) |

---

## 아키텍처 패턴: API → Hook → Component

새 기능은 항상 이 순서로 만든다.

1. **API 함수** (`src/api/web/api.{domain}.ts`) — `fetcher` 호출만
2. **훅** (`src/hooks/web/{domain}/`) — API 호출, 상태, 핸들러
3. **페이지/컴포넌트** — 훅 조합 + JSX만

**훅 네이밍:**
- 조회: `useSelect{Entity}` (예: `useSelectBoards`)
- 변경: `use{Action}{Entity}` (예: `useCreateBoard`)
- UI 상태: `use{State}` (예: `useModal`)

---

## 페이지 작성 원칙

페이지 컴포넌트는 훅 연결과 JSX 조합만 한다. 비즈니스 로직은 훅으로 분리한다.

```typescript
// ❌ 페이지에서 직접 API 호출
useEffect(() => { getBoards().then(res => setBoards(res.dataList)); }, []);

// ✅ 훅을 통해서만
const { res, setPage } = useSelectBoards();
const { handleDelete } = useDeleteBoard();
```

판단 기준: "다른 페이지에서도 쓸 수 있나?" → 훅으로 / "이 화면에만 해당하나?" → 페이지에

---

## 개발 규칙

- `@` 경로 alias 사용 (`src/` 절대 경로)
- 컴포넌트 폴더 PascalCase, 파일은 `index.tsx`
- 파일 명명: API `api.{domain}.ts` / Hook `use{Name}.ts` / Util `util.{name}.ts`
- 공통 코드/컴포넌트는 `_common/` 디렉토리
- 매직 스트링 금지 — `src/constants/codes.ts` 또는 메시지 상수 파일 활용
- 타입은 `src/types/`에, 런타임 상수는 `src/constants/`에
- **API는 반드시 훅을 통해서만 호출** — 페이지/컴포넌트에서 직접 `fetcher`나 api 함수 호출 금지
- `enum` 사용 금지 (`erasableSyntaxOnly`) — `as const` 객체 패턴이 표준
- 타입 import는 `import type { ... }` 강제 (`verbatimModuleSyntax: true`)

---

## 안티 패턴 (코드 리뷰 즉시 거부)

| 패턴 | 대안 |
|------|------|
| 페이지/컴포넌트에서 `axios` 또는 `src/api/...` 직접 import | 도메인 훅 경유 |
| 페이지에서 `useEffect` + `setState`로 fetch | `useSelect{Entity}` 훅 |
| mutation 후 `location.reload()` | `invalidateKeys` |
| `window.alert` / `window.confirm` | `useModal().alert/confirm` |
| React Context Provider 신규 도입 | 외부 싱글턴 + `useSyncExternalStore` |
| 토큰을 localStorage에 저장 | `sessionStorage('accessToken')` |
| 매직 코드 하드코딩 (`'4001'` 등) | `src/constants/codes.ts` enum |
| `_common/`이 도메인 모듈 import | 도메인 폴더로 이동 |
| `_design/*`를 실서비스 페이지가 import | 실 컴포넌트 폴더로 분리 |
| 새 라우트를 `/design` 트리에 추가 | `/`, `/admin`, `/auth` 트리 |
| 공통 훅 시그니처 변경 후 일부 호출처만 갱신 | 모든 호출처 동시 갱신 |
| 새 상태관리 라이브러리 도입 (zustand/redux 등) | 기존 패턴 유지 |

---

## 빌드 / 검증

```bash
npm run dev       # 개발 서버 (Vite)
npm run build     # tsc -b && vite build
npm run lint      # eslint flat config
npm run preview   # 빌드 결과 미리보기
```

> 자동 테스트 없음. 검증은 **빌드 + 린트 통과 + 수동 골든 패스** 순서.

---

## 커밋 컨벤션

- `[feat] ...` — 새 기능
- `[refactor] ...` — 구조 개선 (동작 보존)
- `[fix] ...` — 버그 수정
- 본문은 한국어, 의도 중심. PR base 브랜치는 `dev`.

---

## 에이전트 & 스킬 사용 가이드

작업 유형에 맞는 docs를 **먼저** 읽고 시작한다.

| 작업 | 에이전트 | 스킬(실행 워크플로) |
|------|----------|---------------------|
| 신규 기능 추가 | [feature-agent](docs/agents/feature-agent.md) | [implement-feature](docs/skills/implement-feature.md) |
| 리팩터 / 구조 개선 | [refactor-agent](docs/agents/refactor-agent.md) | [safe-refactor](docs/skills/safe-refactor.md) |
| PR / 브랜치 리뷰 | [review-agent](docs/agents/review-agent.md) | [perform-review](docs/skills/perform-review.md) |
| 버그 디버깅 | — | [debug-workflow](docs/skills/debug-workflow.md) |
| 테스트 작성 / 도입 | — | [generate-tests](docs/skills/generate-tests.md) |

각 에이전트/스킬은 "시작 전 반드시 읽을 파일 목록"과 "Safety Checklist"를 포함한다.

---

## 참고 문서

### 핵심 구조
- [디렉토리 구조 · 라우트 · 전역 스토어 · 타입](docs/structure.md)
- [공통 훅 레퍼런스 · Fetcher](docs/hooks.md)

### 에이전트 (역할 정의 · 책임 경계 · 예시)
- [Feature Agent](docs/agents/feature-agent.md) — 신규 기능 구현 가이드
- [Refactor Agent](docs/agents/refactor-agent.md) — 동작 보존 리팩터 가이드
- [Review Agent](docs/agents/review-agent.md) — PR 리뷰 체크리스트

### 스킬 (실행 워크플로 · 단계별 절차)
- [implement-feature](docs/skills/implement-feature.md) — 기능 추가 단계별 절차
- [safe-refactor](docs/skills/safe-refactor.md) — 리팩터 레시피
- [perform-review](docs/skills/perform-review.md) — 리뷰 보고서 형식
- [debug-workflow](docs/skills/debug-workflow.md) — 레이어별 디버깅 절차
- [generate-tests](docs/skills/generate-tests.md) — 수동 검증 체크리스트 · 테스트 도입

### 메모리 (심화 레퍼런스)
- [architecture-memory](docs/memory/architecture-memory.md) — 레이어 의존 방향 · 캐시 모델 · 폼 모델
- [style-memory](docs/memory/style-memory.md) — 네이밍 · 타입 · 공통 훅 사용 패턴
- [workflow-memory](docs/memory/workflow-memory.md) — 브랜치 · 커밋 · 검증 흐름 · 새 도메인 도입
