# DevHub Frontend

> 개발자 팀 매칭 플랫폼 **DevHub**의 사용자/관리자 프론트엔드 SPA.
> React 19 + TypeScript + Vite 기반.

---

## Overview

DevHub는 개발자가 프로젝트를 모집·신청하고, 게시판·댓글로 소통하며, 자신의 프로필과 활동을 관리하는 웹 서비스다.
이 레포는 그 사용자/관리자 화면을 담당하는 단일 페이지 애플리케이션이다.

**사용자가 할 수 있는 일 (코드로 확인된 도메인 기준)**

- 회원가입 / 로그인 (일반 + OAuth 분기로 추정 — `api.auth.ts`/`api.signup.ts`)
- 프로젝트 모집 글 조회/생성/수정/삭제, 신청 양식 작성
- 게시판(자유/질문/공지) 글 조회/생성/수정/삭제, 좋아요, 댓글
- 본인 프로필 조회/수정, 참여 프로젝트·작성 게시글 관리
- 알림 수신 (`api.notification.ts`)
- 약관 조회 (`api.terms.ts`)
- 파일/이미지 업로드 (`api.file.ts`, `useFileUpload`)

**관리자 영역 (`/admin`)**

- 배너 관리, 공통코드 관리, 게시판 관리 (페이지 구현 확인됨)
- 사용자/프로젝트/약관/신청양식 관리는 디자인 시안(`pages/_design/admin/*`)으로만 존재 — 실제 라우트 미연결

---

## Tech Stack

| 영역        | 기술                                                                 | 버전                                                                                |
| ----------- | -------------------------------------------------------------------- | ----------------------------------------------------------------------------------- |
| 프레임워크  | React                                                                | 19.2                                                                                |
| 언어        | TypeScript                                                           | 5.9 (strict + `verbatimModuleSyntax`)                                               |
| 빌드/번들   | Vite                                                                 | 7.2 + `@vitejs/plugin-react`                                                        |
| 라우팅      | React Router                                                         | v7 (`createBrowserRouter`)                                                          |
| UI          | Material-UI                                                          | v7 (`@mui/material`, `@mui/icons-material`, `@mui/x-charts`, `@mui/x-date-pickers`) |
| HTTP        | Axios                                                                | 1.13 (전역 인터셉터)                                                                |
| 상태 관리   | 외부 싱글턴 스토어 + `useSyncExternalStore`                          | (자체 구현, `src/stores/Store.ts`)                                                  |
| 스타일      | SCSS + Emotion (MUI)                                                 | sass 1.97 / `@emotion/*` 11.x                                                       |
| 날짜        | Dayjs + MUI DatePicker                                               | 1.11 / `@mui/x-date-pickers` 8.x                                                    |
| 슬라이더    | Swiper                                                               | 12.x                                                                                |
| 이미지 크롭 | react-easy-crop                                                      | 5.x                                                                                 |
| 린트        | ESLint flat config + typescript-eslint + react-hooks + react-refresh | 9.x                                                                                 |

> 자동 테스트 프레임워크는 도입되지 않았다 (`package.json`에 `test` 스크립트 없음).
> 검증은 빌드/린트와 수동 시나리오로 수행한다.

---

## Core Architecture

### API → Hook → Component 패턴

새 기능은 항상 다음 순서로 만든다. 이 흐름은 `CLAUDE.md`의 핵심 규칙이며 레포 전체에 일관 적용되어 있다.

```
┌────────────────────────────────────────────────────────────────┐
│ Page / Component   src/pages/{web|admin}/...                   │
│   - 훅 호출 + JSX 조합                                         │
│   - 비즈니스 로직 / API 호출 금지                              │
└────────────────────────────────────────────────────────────────┘
                ↓ 훅 호출
┌────────────────────────────────────────────────────────────────┐
│ Domain Hook        src/hooks/{web|admin}/{domain}/             │
│   - 도메인 로직 (페이징, 검색, 폼, 검증, 모달 흐름)            │
│   - 내부에서 _common 훅(useSelect/useMutation/useFormState/...)│
└────────────────────────────────────────────────────────────────┘
                ↓ apiFn 전달
┌────────────────────────────────────────────────────────────────┐
│ Common Hooks       src/hooks/_common/api.hook.ts               │
│   - useSelect / useMutation                                    │
│   - 모듈 레벨 cacheStore (Map) + invalidateKeys                │
└────────────────────────────────────────────────────────────────┘
                ↓ apiFn 호출
┌────────────────────────────────────────────────────────────────┐
│ API Layer          src/api/{web|admin}/api.{domain}.ts         │
│   - fetcher 한 번 호출 (1 함수 = 1 엔드포인트)                 │
└────────────────────────────────────────────────────────────────┘
                ↓
┌────────────────────────────────────────────────────────────────┐
│ Fetcher            src/utils/util.api.ts                        │
│   - axios 인스턴스 + 인터셉터                                  │
│   - 토큰 헤더 자동 주입 (sessionStorage accessToken)           │
│   - 전역 로딩 카운터 (loadingHandler)                          │
│   - Dayjs → 'YYYY-MM-DD' / null·undefined·'' 키 제거           │
│   - FormData 분기 (Content-Type 자동)                          │
└────────────────────────────────────────────────────────────────┘
```

**왜 이 구조인가**

- **테스트 가능성**: 훅 단위로 비즈니스 로직 격리 → UI와 무관하게 검증 가능 (테스트 도입 시)
- **재사용**: 같은 데이터를 여러 페이지에서 쓰면 훅만 호출
- **일관성**: 페이지가 단순해지므로 도메인이 늘어도 인지부하 일정
- **인터셉터 의존**: 모든 호출이 `fetcher`를 거쳐야 토큰/로딩/날짜 변환이 보장됨

### 상태 관리 — Provider 중첩 없는 싱글턴 스토어

React Context로 Provider를 쌓지 않는다. 대신 `src/stores/Store.ts`의 베이스 클래스를 상속한 싱글턴 인스턴스를 만들고, React는 `useSyncExternalStore`로 구독한다.

| 스토어             | 훅             | 역할                                              |
| ------------------ | -------------- | ------------------------------------------------- |
| `auth.store.ts`    | `useAuth()`    | 로그인 상태, 유저 정보, init/login/logout/reissue |
| `loading.store.ts` | `useLoading()` | 전역 로딩 스피너 (axios 자동 연동)                |
| `codes.store.ts`   | `useCodes()`   | 공통 코드(enum) 캐싱                              |
| `modal.store.ts`   | `useModal()`   | 확인/알림 팝업                                    |

`src/contexts/`는 **하위 호환 re-export 전용**이다. 새 코드는 `@/hooks/_common/use*`에서 직접 import.

### 인증 흐름

1. `App.tsx` mount → `authStore.init()` 1회 실행
2. `sessionStorage.accessToken`이 없으면 쿠키 기반 `reissue()` 시도
3. 성공 시 토큰 저장 → 유저 프로필 조회 → `isLoggedIn = true`
4. 이후 모든 요청에 인터셉터가 `Authorization: Bearer ...` 자동 주입
5. 401 처리는 `responseErrorInterceptor`에서 에러 코드별 분기 (`EXPIRE_ACCESS_TOKEN`, `DUP_LOGIN`, `SIGNATURE_ERROR_ACCESS_TOKEN` — 일부 분기 TODO)

---

## Project Structure

```
src/
├── api/
│   ├── web/                 # 사용자 API (api.{domain}.ts)
│   ├── admin/               # 어드민 API
│   └── api.common.ts
├── assets/                  # 정적 파일
├── components/
│   ├── _common/             # 도메인 무관 공용 컴포넌트 (customMUI/popup/layout/button)
│   ├── web/                 # 사용자 도메인 UI
│   ├── admin/               # 어드민 UI
│   └── _design/             # 디자인 시안 참고용 (실서비스 격리)
├── constants/               # 런타임 상수 (codes, errorMessages, successMessages, projectCreate)
├── contexts/                # 하위 호환 re-export만 (deprecated)
├── stores/                  # 외부 싱글턴 스토어 (Store.ts 베이스 클래스)
├── hooks/
│   ├── _common/             # useSelect, useMutation, useFormState, useModal, useFileUpload 등
│   ├── web/                 # 사용자 도메인 훅 (boards, projects, profile, signup, ...)
│   └── admin/               # 어드민 훅 (banner, boards, codes, form)
├── layout/                  # MainLayout / AdminLayout / AuthLayout / ProfileLayout
├── pages/
│   ├── web/                 # 사용자 페이지 (실제 구현)
│   ├── admin/               # 어드민 페이지
│   └── _design/             # 디자인 시안 페이지 (개발 참고용)
├── router/Router.tsx        # 전체 라우트 트리
├── styles/                  # 전역 스타일 + MUI 테마
├── types/                   # type.{domain}.ts 인터페이스/타입만
├── utils/                   # util.api(=fetcher), util._common(Validators 외), util.date
├── App.tsx
└── main.tsx
```

**`_common`** — 해당 레이어에서 도메인에 종속되지 않는 공통 코드
**`_design`** — 개발 참고용 디자인 시안. 실서비스 컴포넌트가 import 하면 안 됨

### 라우트 트리

```
/        (MainLayout)   사용자 페이지: 메인, 프로젝트, 게시판, 프로필
/admin   (AdminLayout)  관리자: 배너, 게시판 (구현됨), 그 외는 디자인 시안만
/auth    (AuthLayout)   로그인/회원가입
/design  (none/Layout별) 디자인 시안 — 개발 전용
```

라우트 정의는 `src/router/Router.tsx` 단일 파일에서 관리한다.

### 타입 vs 상수 분리 (엄격)

| 위치                                                    | 내용                                                                         |
| ------------------------------------------------------- | ---------------------------------------------------------------------------- |
| `src/types/type.{domain}.ts`                            | `interface`, `type` — 컴파일 타임 정의만                                     |
| `src/constants/codes.ts`                                | `as const` 객체 (`BOARD_CATEGORY`, `COMMON_CODE`, `ERROR_CODE`, `PROJECT_*`) |
| `src/constants/errorMessages.ts` / `successMessages.ts` | 사용자 노출 한국어 문구                                                      |

> `tsconfig`의 `erasableSyntaxOnly: true` 때문에 `enum` 키워드는 사용 불가 — `as const` 객체 패턴이 표준.

---

## Development Rules

`CLAUDE.md`에 정의된 규칙 요약. 새 코드/리뷰 모두 이 기준을 따른다.

1. **API → Hook → Component 흐름 준수.** 페이지/컴포넌트가 API 함수나 `axios`를 직접 import하지 않는다.
2. **모든 HTTP 호출은 `fetcher`를 경유.** 인터셉터(토큰/로딩/Dayjs/null 제거/FormData)를 우회하지 않기 위함.
3. **페이지는 훅 조합 + JSX만.** `useEffect`로 fetch 금지. 비즈니스 로직은 훅으로 분리.
4. **훅 네이밍 규칙**
   - 조회: `useSelect{Entity}` (`useSelectBoards`, `useSelectProjectDetail`)
   - 변경: `use{Action}{Entity}` (`useCreateBoard`, `useDeleteProject`)
   - UI 상태: `use{State}` (`useModal`, `useDisclosure`)
5. **파일/폴더 명명**
   - 컴포넌트 폴더 PascalCase, 진입은 `index.tsx`
   - API: `api.{domain}.ts`, Hook: `use{Name}.ts`, Util: `util.{name}.ts`, Type: `type.{domain}.ts`, Store: `{name}.store.ts`
6. **Alias 사용.** 상대경로 `../../` 대신 `@/` (= `src/`).
7. **공통 코드/컴포넌트는 `_common/`** — `_common`이 도메인 모듈을 import 하면 안 됨.
8. **매직 스트링 금지.** 백엔드 코드는 `src/constants/codes.ts`의 `as const` 객체 사용 (`BOARD_CATEGORY.FREE.CODE`).
9. **타입은 `src/types/`, 런타임 값은 `src/constants/`.** 두 폴더의 책임을 섞지 않는다.
10. **사용자 알림은 `useModal`.** `window.alert`/`window.confirm` 사용 금지.
11. **`_design/*`은 실서비스 페이지가 import 하지 않는다.**
12. **Provider 중첩 금지.** 새 전역 상태는 `Store` 상속 + `useSyncExternalStore` 훅 패턴으로 추가.

자세한 패턴은 `docs/structure.md`, `docs/hooks.md`, `docs/agents/*`, `docs/memory/*` 참조.

---

## Getting Started

### Requirements

- Node.js 20+ (Vite 7 / @types/node 24 권장)
- npm

### Install

```bash
npm install
```

### Environment Variables

루트에 `.env` 파일을 만든다. 키는 모두 `VITE_` prefix(브라우저에 노출되는 Vite 규칙).

```env
VITE_API_URL=http://localhost:8080
VITE_FILE_API_URL=http://localhost:8080/files/
```

`.env`는 `.gitignore`에 포함되어 있다.

### Scripts

| 명령              | 설명                                               |
| ----------------- | -------------------------------------------------- |
| `npm run dev`     | Vite 개발 서버 (기본 `http://localhost:5173`)      |
| `npm run build`   | `tsc -b && vite build` — 타입 체크 + 프로덕션 번들 |
| `npm run preview` | 빌드 결과 로컬 미리보기                            |
| `npm run lint`    | ESLint flat config 실행                            |

> `npm test`는 정의되어 있지 않다. 자동 테스트 도입 전이며, 검증은 빌드/린트 + 수동 시나리오로 수행한다.

---

## Example Feature Flow

게시판에 "신고하기" 기능을 추가한다고 가정한 표준 흐름.

### 1) 타입 추가 — `src/types/type.boards.ts`

```typescript
export interface BoardReportRequest {
  boardGuid: string;
  reasonCd: string;
}
```

### 2) API 함수 — `src/api/web/api.boards.ts`

```typescript
import fetcher from "@/utils/util.api";
import type { BoardReportRequest } from "@/types/type.boards";

export const reportBoard = (req: BoardReportRequest) =>
  fetcher<void, BoardReportRequest>(`/boards/${req.boardGuid}/report`, req, {
    method: "post",
  });
```

### 3) 도메인 훅 — `src/hooks/web/boards/useReportBoard.ts`

```typescript
import { reportBoard } from "@/api/web/api.boards";
import { useMutation } from "@/hooks/_common/api.hook";
import { useModal } from "@/hooks/_common/useModal";
import type { BoardReportRequest } from "@/types/type.boards";

export default function useReportBoard() {
  const { alert, confirm } = useModal();
  const onSuccess = () => alert("신고가 접수되었습니다.");
  const onFail = () => alert("신고에 실패했습니다.");

  const { mutate } = useMutation<BoardReportRequest, void>(
    reportBoard,
    onSuccess,
    onFail,
    { invalidateKeys: ["board-detail"] },
  );

  const handleReport = async (req: BoardReportRequest) => {
    if (!(await confirm("이 게시글을 신고하시겠습니까?"))) return;
    await mutate(req);
  };

  return { handleReport };
}
```

### 4) 페이지에서 호출 — `src/pages/web/boards/BoardDetail/index.tsx`

```typescript
const { handleReport } = useReportBoard();
// ...
<Button onClick={() => handleReport({ boardGuid, reasonCd })}>신고</Button>
```

### 5) 필요 시 라우트/상수 추가

- 신규 페이지면 `src/router/Router.tsx`에 등록
- 신고 사유 코드는 `COMMON_CODE.REPORT_TYPE` 재사용

> `useSelect` 사용 시 `req`는 항상 `useMemo`로 감싼다. 동일 `cacheKey`에는 mutation의 `invalidateKeys`로 짝을 맞춘다 (예: `'boards-list'` ↔ `useDeleteBoard`).

---

## Current Status (Inferred)

코드 존재로 확인된 진척도. 백엔드 연동 상태는 별도 확인 필요.

### ✅ 구현됨 (실서비스 라우트 연결)

- **인증**: 로그인, 회원가입, sessionStorage 기반 토큰 + 쿠키 기반 reissue 흐름
- **게시판**: 목록(검색/카테고리 탭/페이지네이션), 상세, 작성, 수정, 삭제, 좋아요
- **댓글**: 게시판 상세 내 댓글 (`api.comments.ts`, `hooks/web/comments/`)
- **프로젝트**: 목록, 상세, 생성, 수정, 삭제, 좋아요, 신청 양식 조회
- **프로필**: 홈, 수정, 내 프로젝트, 내 게시글
- **어드민**: 배너 관리, 게시판 관리, 공통코드 관리
- **공용 인프라**: `useSelect`/`useMutation` + 캐시, `useFormState`/`useFormController`, `useModal`, `useFileUpload`, 전역 로딩, MUI 커스텀 래퍼

### 🟡 부분/진행 중

- **OAuth 분기**: `[refactor] 사용자 인증 관련 기존 소스 변경 및 Oauth 사용자 비밀번호 입력 제거` 커밋 흔적 — 흐름은 들어왔으나 검증 단계로 추정
- **401 자동 재발급**: `util.api.ts`의 `responseErrorInterceptor`에 `EXPIRE_ACCESS_TOKEN` 분기 비어 있음(`// 리프레쉬토큰 발급` TODO). 현재는 인터셉터에서 자동 reissue가 동작하지 않음 — `authStore.init()` 시점에서만 reissue 시도
- **알림(Notification)**: API/타입은 있으나 (`api.notification.ts`, `NotificationItem.tsx`) 전용 페이지 라우트는 미확인
- **약관(Terms)**: API/훅 존재, 사용자/관리자 페이지는 디자인 시안 단계
- **MyPage 일부 라우트**: `Router.tsx`에 주석 처리된 항목 존재 (`mypage/projects` 등)
- **모달 통일**: 일부 도메인 훅에서 `window.alert`이 남아 있음 (예: `useCreateBoard.ts` — `useModal`로 마이그레이션 필요)
- **Stale UI 처리**: `useDeleteBoard`가 `location.reload()` 사용 — `invalidateKeys` + `cacheKey` 패턴으로 정리 가능

### 🟥 디자인 시안만 존재 (실서비스 미연결)

- 어드민의 사용자/신고/약관/신청양식/프로젝트 관리 페이지 (`pages/_design/admin/*`)
- 스킬 트렌드 페이지 (`pages/_design/web/skilltrends/*`)
- MyHomePage 등 일부 마이페이지 시안

---

## Recommended Next Tasks

우선순위가 높은 후속 작업.

1. **401 자동 재발급 인터셉터 마무리** — `util.api.ts`의 `EXPIRE_ACCESS_TOKEN` 분기에 `reissue()` + 원 요청 재시도 구현. 단일 진실의 출처가 되어야 다른 화면들의 강제 새로고침 의존을 줄일 수 있음
2. **공용 모달 마이그레이션 마무리** — 남은 `window.alert`/`window.confirm`을 `useModal`로 일괄 정리
3. **Stale UI 패턴 정리** — `location.reload()` 사용처를 `cacheKey` + `invalidateKeys` 짝으로 교체
4. **라우트 가드** — 비로그인 시 보호 라우트(`/profile`, mutation 페이지) 자동 리다이렉트 컴포넌트 도입
5. **테스트 도입** — Vitest + React Testing Library + MSW. 우선순위는 `util.api.ts` (순수 변환) → `api.hook.ts`(캐시/invalidate) → `FormController`/`Validators` → 도메인 훅 → 페이지 통합 (`docs/skills/generate-tests.md` 참조)
6. **어드민 영역 실연결** — `_design/admin/*`의 페이지를 실제 컴포넌트로 옮기고 라우트 연결 (사용자/약관/신청양식/프로젝트 관리)
7. **알림 화면 연결** — `api.notification.ts`/`NotificationItem.tsx`를 사용하는 사용자 페이지 또는 헤더 패널 구성
8. **번들 최적화** — Router에서 페이지 컴포넌트 lazy import + `vite-bundle-visualizer`로 무거운 의존성(MUI x-charts, swiper 등) 분석
9. **ESLint 강화** — type-aware 룰(`recommendedTypeChecked` 또는 `strictTypeChecked`)로 격상 검토 (`README` 원본의 권장 사항)
10. **`_design`/`contexts/` 점진적 정리** — 마이그레이션 완료 영역부터 호환 re-export 제거 (단, 팀 합의 필요)
11. **CI 도입** — GitHub Actions로 PR마다 `npm run build` + `npm run lint` 자동 실행

---

## Docs Reference

| 문서                                                             | 용도                                                             |
| ---------------------------------------------------------------- | ---------------------------------------------------------------- |
| [`CLAUDE.md`](CLAUDE.md)                                         | 프로젝트 규칙(모든 룰의 단일 출처)                               |
| [`docs/structure.md`](docs/structure.md)                         | 디렉토리·라우트·전역 스토어·타입 구조 상세                       |
| [`docs/hooks.md`](docs/hooks.md)                                 | 공통 훅 카탈로그 + Fetcher 사용법                                |
| [`docs/agents/feature-agent.md`](docs/agents/feature-agent.md)   | 새 기능을 추가할 때의 표준 절차                                  |
| [`docs/agents/refactor-agent.md`](docs/agents/refactor-agent.md) | 동작 보존 리팩터의 Smell 카탈로그/체크리스트                     |
| [`docs/agents/review-agent.md`](docs/agents/review-agent.md)     | PR 리뷰 5축 + 11개 체크리스트                                    |
| [`docs/skills/*`](docs/skills)                                   | 기능 구현 / 안전한 리팩터 / 리뷰 / 테스트 도입 / 디버깅 워크플로 |
| [`docs/memory/*`](docs/memory)                                   | 스타일·아키텍처·워크플로 메모리                                  |

---

## Contribution Guide

### 브랜치 / 커밋

- 통합 브랜치: `dev`
- 기능 브랜치: `feature/{name}` (예: `feature/board`, `feature/profile`)
- 커밋 메시지: `[feat] ...`, `[refactor] ...`, `[fix] ...` (한국어 본문)

### PR 체크리스트

- [ ] `API → Hook → Component` 흐름 준수
- [ ] `axios` 직접 import 0건 (`fetcher`만 사용)
- [ ] 페이지가 API 함수 직접 import 0건
- [ ] `useSelect`의 `req`가 `useMemo`로 메모이즈
- [ ] mutation 후 stale 가능성 있는 `cacheKey`에 `invalidateKeys` 짝
- [ ] 매직 스트링 0건 (도메인 enum 사용)
- [ ] `import type` 분리 (`verbatimModuleSyntax`)
- [ ] 신규 라우트는 `/`, `/admin`, `/auth` 중 적절한 트리에 등록 (`/design` X)
- [ ] `_common/`이 도메인 모듈 import 하지 않음
- [ ] `npm run build` 통과
- [ ] `npm run lint` 통과
- [ ] PR 본문에 수동 검증 시나리오 명시

### 새 도메인을 추가할 때

1. `src/types/type.{domain}.ts`
2. `src/api/{web|admin}/api.{domain}.ts`
3. `src/hooks/{web|admin}/{domain}/`
4. `src/pages/{web|admin}/{Domain}/{PageName}/index.tsx`
5. (선택) `src/components/{web|admin}/{domain}/`
6. `src/router/Router.tsx`에 라우트 등록
7. (필요 시) `src/constants/codes.ts`에 enum, `errorMessages`/`successMessages`에 문구 추가

### 어디에 두지 말 것

- 페이지 안에 `useState` + `useEffect` + `apiFn().then(...)` 조합
- `_common/` 또는 `utils/`에 도메인 의존 코드
- 새로운 React Context Provider (외부 싱글턴 + `useSyncExternalStore` 패턴 유지)
- localStorage에 인증 토큰 (정책: sessionStorage)
- 실서비스 페이지에서 `_design/*` import

---
