# DevHub Frontend

> 개발자 팀 매칭 플랫폼 **DevHub**의 사용자/관리자 프론트엔드 SPA.
> React 19 + TypeScript + Vite 기반.

---

## Overview

DevHub는 개발자가 프로젝트를 모집하고, 게시판과 댓글로 소통하며, 자신의 프로필과 활동을 관리하는 팀 매칭 웹 서비스다.
이 레포는 그 사용자/관리자 화면을 담당하는 단일 페이지 애플리케이션이며, 회원가입부터 프로젝트·게시판 CRUD, 관리자 운영 콘솔까지 실제 라우트에 연결되어 동작한다.

| 항목        | 내용                                                    |
| ----------- | ------------------------------------------------------- |
| 서비스 성격 | 개발자 팀 매칭 플랫폼 (프로젝트 모집 · 게시판 · 프로필) |
| 담당 범위   | 사용자 화면 + 관리자 콘솔을 포함하는 프론트엔드 SPA     |
| 아키텍처    | API → Hook → Component 3계층, 예외 없이 전 도메인 적용  |
| 상태        | 실서비스 라우트 대부분 연결 완료, 일부 기능은 준비 중   |

---

## Highlights

이 프로젝트를 다른 사이드 프로젝트나 과제성 SPA와 구분 짓는 지점들이다.

- **일관된 3계층 아키텍처(API → Hook → Component)를 예외 없이 강제한다.** 모든 도메인(게시판/프로젝트/프로필/어드민)이 동일한 패턴을 따르기 때문에, 도메인이 늘어나도 온보딩·리뷰 비용이 거의 늘지 않는다. `axios`나 API 함수를 페이지가 직접 import하는 코드는 레포 전체에 0건이다.
- **Provider 지옥 없는 전역 상태 관리.** Context Provider를 겹겹이 쌓는 대신 `useSyncExternalStore` 기반의 경량 싱글턴 스토어(`Store.ts`)를 직접 구현해, 불필요한 리렌더링과 Provider 중첩 없이 인증/로딩/공통코드/모달 상태를 관리한다.
- **끊김 없는 인증 경험.** 401 발생 시 여러 요청이 동시에 몰려도 토큰 재발급(reissue)은 단 한 번만 호출되도록 Promise 큐로 중복을 제거하고, 재발급 성공 시 원 요청을 자동 재시도한다. 인증 전용 엔드포인트는 재발급 대상에서 제외해 리다이렉트 루프도 방지한다. 로그인 전용 라우트는 `RequireAuthRoute` 가드로 일괄 보호한다.
- **좋아요(Like) UX의 아키텍처 정합성.** 게시판·프로젝트 좋아요 버튼은 서버가 내려준 상태를 단일 진실 공급원으로 삼아 재동기화하고, 응답 대기 중 버튼을 잠가 중복 요청을 원천 차단하며, 미로그인 사용자는 낙관적 토글 자체를 막는 공유 훅을 사용한다. 두 도메인이 같은 컴포넌트와 패턴을 재사용해 UX가 어긋나지 않는다.
- **삭제 안전성.** 게시글 삭제 시 댓글·좋아요 등 자식 레코드를 트랜잭션 안에서 함께 정리해 고아 데이터나 FK 오류 없이 삭제가 항상 성공한다. 수정·마감 같은 변경 작업은 백엔드에서 소유자(또는 관리자) 검증을 거치므로, 프론트가 버튼을 숨기는 것에만 의존하지 않는다.
- **디자인 시스템 일관성.** 404/네트워크 오류/서버 오류 페이지가 서비스 톤앤매너(브랜드 컬러·카드 스타일)를 그대로 따르고, 이미지가 없는 프로젝트 카드도 전용 플레이스홀더로 카드 크기와 레이아웃이 항상 동일하게 유지된다. 이미지 유무에 따라 UI가 흔들리는 흔한 실수가 없다.
- **매직 스트링 제로 정책.** 카테고리 코드·상태 코드·에러 코드가 전부 `as const` 상수(`src/constants/codes.ts`)로 강제되어 있어, 오타로 인한 런타임 버그 여지가 구조적으로 차단된다.
- **`_design/` 트리로 분리된 디자인 시안.** 실서비스 컴포넌트와 시안 단계 컴포넌트를 폴더 레벨에서 완전히 격리해, 미완성 UI가 실사용 화면에 실수로 섞여 들어갈 여지를 없앴다.

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
| 상태 관리   | 외부 싱글턴 스토어 + `useSyncExternalStore`                          | 자체 구현, `src/stores/Store.ts`                                                    |
| 스타일      | SCSS + Emotion (MUI)                                                 | sass 1.97 / `@emotion/*` 11.x                                                       |
| 날짜        | Dayjs + MUI DatePicker                                               | 1.11 / `@mui/x-date-pickers` 8.x                                                    |
| 슬라이더    | Swiper                                                               | 12.x                                                                                |
| 이미지 크롭 | react-easy-crop                                                      | 5.x                                                                                 |
| 린트        | ESLint flat config + typescript-eslint + react-hooks + react-refresh | 9.x                                                                                 |

> 자동 테스트 프레임워크는 아직 도입되지 않았다(`package.json`에 `test` 스크립트 없음). 검증은 빌드/린트와 수동 시나리오로 수행한다.

---

## Core Architecture

### API → Hook → Component 패턴

새 기능은 항상 다음 순서로 만든다. 이 흐름은 `CLAUDE.md`의 핵심 규칙이며 레포 전체에 일관 적용되어 있다.

```
┌────────────────────────────────────────────────────────────────┐
│ Page / Component   src/pages/{web|admin}/...                   │
│   - 훅 호출 + JSX 조합                                          │
│   - 비즈니스 로직 / API 호출 금지                                │
└────────────────────────────────────────────────────────────────┘
                ↓ 훅 호출
┌────────────────────────────────────────────────────────────────┐
│ Domain Hook        src/hooks/{web|admin}/{domain}/             │
│   - 도메인 로직 (페이징, 검색, 폼, 검증, 모달 흐름)               │
│   - 내부에서 _common 훅(useSelect/useMutation/useFormState/...) │
└────────────────────────────────────────────────────────────────┘
                ↓ apiFn 전달
┌────────────────────────────────────────────────────────────────┐
│ Common Hooks       src/hooks/_common/api.hook.ts               │
│   - useSelect / useMutation                                    │
│   - 모듈 레벨 cacheStore (Map) + invalidateKeys                 │
└────────────────────────────────────────────────────────────────┘
                ↓ apiFn 호출
┌────────────────────────────────────────────────────────────────┐
│ API Layer          src/api/{web|admin}/api.{domain}.ts         │
│   - fetcher 한 번 호출 (1 함수 = 1 엔드포인트)                   │
└────────────────────────────────────────────────────────────────┘
                ↓
┌────────────────────────────────────────────────────────────────┐
│ Fetcher            src/utils/util.api.ts                       │
│   - axios 인스턴스 + 인터셉터                                    │
│   - 토큰 헤더 자동 주입 (sessionStorage accessToken)             │
│   - 전역 로딩 카운터 (loadingHandler)                            │
│   - Dayjs → 'YYYY-MM-DD' / null·undefined·'' 키 제거            │
│   - FormData 분기 (Content-Type 자동)                           │
└────────────────────────────────────────────────────────────────┘
```

**왜 이 구조인가**

- **테스트 가능성**: 훅 단위로 비즈니스 로직 격리 → UI와 무관하게 검증 가능(테스트 도입 시)
- **재사용**: 같은 데이터를 여러 페이지에서 쓰면 훅만 호출
- **일관성**: 페이지가 단순해지므로 도메인이 늘어도 인지부하 일정
- **인터셉터 의존**: 모든 호출이 `fetcher`를 거쳐야 토큰/로딩/날짜 변환이 보장됨

### 상태 관리 — Provider 중첩 없는 싱글턴 스토어

React Context로 Provider를 쌓지 않는다. 대신 `src/stores/Store.ts`의 베이스 클래스를 상속한 싱글턴 인스턴스를 만들고, React는 `useSyncExternalStore`로 구독한다.

| 스토어             | 훅             | 역할                                              |
| ------------------ | -------------- | ------------------------------------------------- |
| `auth.store.ts`    | `useAuth()`    | 로그인 상태, 유저 정보, init/login/logout/reissue |
| `loading.store.ts` | `useLoading()` | 전역 로딩 스피너(axios 자동 연동)                 |
| `codes.store.ts`   | `useCodes()`   | 공통 코드(enum) 캐싱                              |
| `modal.store.ts`   | `useModal()`   | 확인/알림 팝업                                    |

`src/contexts/`는 하위 호환 re-export 전용이다. 새 코드는 `@/hooks/_common/use*`에서 직접 import한다.

### 인증 흐름

1. `App.tsx` mount 시 `authStore.init()`이 1회 실행된다.
2. `sessionStorage.accessToken`이 없으면 쿠키 기반 `reissue()`를 시도한다.
3. 성공하면 토큰을 저장하고 유저 프로필을 조회해 `isLoggedIn = true`가 된다.
4. 이후 모든 요청에 인터셉터가 `Authorization: Bearer ...`를 자동 주입한다.
5. 401 발생 시 `responseErrorInterceptor`가(인증 엔드포인트 자체의 401이 아닌 한) 백엔드 에러 코드와 무관하게 `reissue()`를 시도한다. 동시에 여러 요청이 401을 맞아도 Promise 큐로 재발급은 한 번만 호출되고, 성공하면 원 요청들을 새 토큰으로 재시도한다. 재발급이 끝내 실패하면 토큰을 정리하고 `/auth/login`으로 이동한다.

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
│   └── _design/             # 디자인 시안 참고용 (실서비스와 격리)
├── constants/                # 런타임 상수 (codes, errorMessages, successMessages, projectCreate)
├── contexts/                 # 하위 호환 re-export만 (deprecated)
├── stores/                   # 외부 싱글턴 스토어 (Store.ts 베이스 클래스)
├── hooks/
│   ├── _common/             # useSelect, useMutation, useFormState, useModal, useFileUpload 등
│   ├── web/                 # 사용자 도메인 훅 (boards, projects, profile, signup, ...)
│   └── admin/               # 어드민 훅 (banner, boards, codes, form)
├── layout/                   # MainLayout / AdminLayout / AuthLayout / ProfileLayout
├── pages/
│   ├── web/                 # 사용자 페이지 (실제 구현)
│   ├── admin/                # 어드민 페이지
│   └── _design/               # 디자인 시안 페이지 (개발 참고용)
├── router/Router.tsx         # 전체 라우트 트리
├── styles/                    # 전역 스타일 + MUI 테마
├── types/                     # type.{domain}.ts 인터페이스/타입만
├── utils/                     # util.api(=fetcher), util._common(Validators 외), util.date
├── App.tsx
└── main.tsx
```

`_common`은 해당 레이어에서 도메인에 종속되지 않는 공통 코드이며, `_design`은 개발 참고용 디자인 시안으로 실서비스 컴포넌트가 import하면 안 된다.

### 라우트 트리

```
/        (MainLayout)   사용자 페이지: 메인, 스킬 트렌드, 프로젝트, 게시판, 프로필
/admin   (AdminLayout)  관리자: 배너·게시판·유저·신고·공통코드·신청양식·프로젝트
/auth    (AuthLayout)   로그인/회원가입
/design  (개발 전용)     디자인 시안
```

라우트 정의는 `src/router/Router.tsx` 단일 파일에서 관리한다.

### 타입 vs 상수 분리(엄격)

| 위치                                                    | 내용                                                                         |
| ------------------------------------------------------- | ---------------------------------------------------------------------------- |
| `src/types/type.{domain}.ts`                            | `interface`, `type` — 컴파일 타임 정의만                                     |
| `src/constants/codes.ts`                                | `as const` 객체 (`BOARD_CATEGORY`, `COMMON_CODE`, `ERROR_CODE`, `PROJECT_*`) |
| `src/constants/errorMessages.ts` / `successMessages.ts` | 사용자 노출 한국어 문구                                                      |

> `tsconfig`의 `erasableSyntaxOnly: true` 때문에 `enum` 키워드는 사용할 수 없다 — `as const` 객체 패턴이 표준이다.

---

## Development Rules

`CLAUDE.md`에 정의된 규칙 요약이다. 새 코드와 리뷰 모두 이 기준을 따른다.

1. **API → Hook → Component 흐름 준수.** 페이지/컴포넌트가 API 함수나 `axios`를 직접 import하지 않는다.
2. **모든 HTTP 호출은 `fetcher`를 경유한다.** 인터셉터(토큰/로딩/Dayjs/null 제거/FormData)를 우회하지 않기 위함이다.
3. **페이지는 훅 조합 + JSX만 담당한다.** `useEffect`로 fetch하지 않는다. 비즈니스 로직은 훅으로 분리한다.
4. **훅 네이밍 규칙**
   - 조회: `useSelect{Entity}` (`useSelectBoards`, `useSelectProjectDetail`)
   - 변경: `use{Action}{Entity}` (`useCreateBoard`, `useDeleteProject`)
   - UI 상태: `use{State}` (`useModal`, `useDisclosure`)
5. **파일/폴더 명명**
   - 컴포넌트 폴더는 PascalCase, 진입은 `index.tsx`
   - API: `api.{domain}.ts`, Hook: `use{Name}.ts`, Util: `util.{name}.ts`, Type: `type.{domain}.ts`, Store: `{name}.store.ts`
6. **Alias를 사용한다.** 상대경로 `../../` 대신 `@/`(= `src/`)를 쓴다.
7. **공통 코드/컴포넌트는 `_common/`에 둔다.** `_common`이 도메인 모듈을 import하면 안 된다.
8. **매직 스트링을 금지한다.** 백엔드 코드는 `src/constants/codes.ts`의 `as const` 객체를 사용한다(`BOARD_CATEGORY.FREE.CODE`).
9. **타입은 `src/types/`, 런타임 값은 `src/constants/`에 둔다.** 두 폴더의 책임을 섞지 않는다.
10. **사용자 알림은 `useModal`을 사용한다.** `window.alert`/`window.confirm`은 금지한다.
11. **`_design/*`은 실서비스 페이지가 import하지 않는다.**
12. **Provider 중첩을 금지한다.** 새 전역 상태는 `Store` 상속 + `useSyncExternalStore` 훅 패턴으로 추가한다.

자세한 패턴은 `docs/structure.md`, `docs/hooks.md`, `docs/agents/*`, `docs/memory/*`를 참조한다.

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

루트에 `.env` 파일을 만든다. 키는 모두 `VITE_` prefix(브라우저에 노출되는 Vite 규칙)를 사용한다.

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

게시판에 "신고하기" 기능을 추가한다고 가정한 표준 흐름이다.

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

- 신규 페이지면 `src/router/Router.tsx`에 등록한다.
- 신고 사유 코드는 `COMMON_CODE.REPORT_TYPE`을 재사용한다.

> `useSelect` 사용 시 `req`는 항상 `useMemo`로 감싼다. 동일 `cacheKey`에는 mutation의 `invalidateKeys`로 짝을 맞춘다(예: `'boards-list'` ↔ `useDeleteBoard`).

---

## Current Status

### 구현됨 (실서비스 라우트 연결)

- **인증**: 이메일 로그인/회원가입, OAuth 로그인(Google/GitHub/Kakao), sessionStorage 기반 토큰 저장, 쿠키 기반 조용한 재로그인(`authStore.init()`), 401 발생 시 자동 토큰 재발급 + 원 요청 재시도(동시 요청 dedup 포함), 로그인 전용 라우트 가드(`RequireAuthRoute`)
- **게시판**: 목록(검색/카테고리 탭/페이지네이션), 상세, 작성/수정/삭제, 좋아요, 댓글 작성/수정/삭제 — 게시글 삭제 시 댓글·좋아요까지 함께 정리되는 안전한 cascade 삭제
- **프로젝트**: 목록/상세/생성/수정/삭제/모집 마감, 좋아요, 신청 양식 조회 — 수정·삭제·마감 모두 작성자 또는 관리자만 가능하도록 서버 측에서 검증
- **프로젝트 지원(신청)**: 지원 제출(포지션 선택 + 커스텀 양식 응답), 지원자 목록 조회·승인/거절·상세 답변 확인(프로젝트 리더 전용), 본인 지원 취소 — 자기 프로젝트 지원 금지·모집중 상태 아닐 시 차단 등 선제적 UI 가드 포함
- **프로필**: 홈, 정보 수정, 내가 등록한 프로젝트, 내가 쓴 게시글
- **스킬 트렌드**: 실데이터 기반 차트 페이지(`/skilltrend`, MUI x-charts)
- **관리자 콘솔(`/admin`)**: 배너, 게시판, 유저(목록/상세), 신고, 공통코드, 신청 양식, 프로젝트(목록/상세) — 전 영역이 role 기반으로 보호되는 실제 운영 화면
- **에러 페이지**: 404 / 네트워크 오류 / 서버 오류 전용 페이지, 서비스 디자인 톤과 통일된 스타일
- **공용 인프라**: `useSelect`/`useMutation` 캐시 + `invalidateKeys` 무효화, `useFormState`/`Validators`, `useModal`(alert/confirm), `useFileUpload`, 전역 로딩 인디케이터, MUI 커스텀 래퍼 컴포넌트

### 미구현 / 제한된 기능

- **알림 UI**: API·훅·컴포넌트는 존재하나 헤더에서 임시로 비활성화 상태(주석 처리)
- **약관(Terms) 페이지**: 관리자/사용자 화면 모두 디자인 시안 단계, 실 라우트 미연결
- **비밀번호 찾기**: 진입 링크만 있고 대상 화면 미구현
- **자동 테스트**: 아직 미도입 — 검증은 빌드 + 린트 + 수동 시나리오로 수행
- **번들 코드 스플리팅**: 라우트 단위 lazy import 미적용

---

## Recommended Next Tasks

우선순위가 높은 후속 작업이다.

1. **알림 UI 재활성화** — `UserInfo.tsx`에 주석 처리된 알림 드롭다운을 실데이터로 복원
2. **약관 페이지 실연결** — `_design/admin/terms`, 사용자용 약관 조회 화면을 실제 라우트로 승격
3. **테스트 도입** — Vitest + React Testing Library + MSW. 우선순위는 `util.api.ts`(순수 변환) → `api.hook.ts`(캐시/invalidate) → `FormController`/`Validators` → 도메인 훅 → 페이지 통합 순서 (`docs/skills/generate-tests.md` 참조)
4. **번들 최적화** — Router에서 페이지 컴포넌트 lazy import + `vite-bundle-visualizer`로 무거운 의존성(MUI x-charts, swiper 등) 분석
5. **ESLint 강화** — type-aware 룰(`recommendedTypeChecked` 또는 `strictTypeChecked`)로 격상 검토
6. **`_design`/`contexts/` 점진적 정리** — 마이그레이션 완료 영역부터 호환 re-export 제거 (단, 팀 합의 필요)
7. **CI 도입** — GitHub Actions로 PR마다 `npm run build` + `npm run lint` 자동 실행

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
- [ ] 신규 라우트는 `/`, `/admin`, `/auth` 중 적절한 트리에 등록 (`/design` 제외)
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

### 비고

- 페이지 안에 `useState` + `useEffect` + `apiFn().then(...)` 조합
- `_common/` 또는 `utils/`에 도메인 의존 코드
- 새로운 React Context Provider (외부 싱글턴 + `useSyncExternalStore` 패턴 유지)
- localStorage에 인증 토큰 (정책: sessionStorage)
- 실서비스 페이지에서 `_design/*` import

---
