# DevHub 프로젝트 구조

## 디렉토리 구조

```
src/
├── api/
│   ├── web/        # 사용자 API (api.{domain}.ts)
│   ├── admin/      # 어드민 API (api.{domain}.ts)
│   └── api.common.ts
├── assets/         # 정적 파일 (이미지 등)
├── components/
│   ├── _common/    # 도메인 무관 공통 컴포넌트
│   ├── web/        # 사용자 화면 컴포넌트 (도메인별 하위 폴더)
│   ├── admin/      # 어드민 컴포넌트
│   └── _design/    # 디자인 시안 참고용
├── constants/      # 런타임 상수 (enum, 메시지)
│   ├── codes.ts           # COMMON_CODE, ERROR_CODE, 도메인 enum
│   ├── errorMessages.ts
│   ├── successMessages.ts
│   └── projectCreate.ts
├── contexts/       # 하위 호환 re-export만 (실제 구현은 stores/로 이동)
├── stores/         # 외부 싱글턴 스토어 (React 밖 상태 소유)
│   ├── Store.ts           # subscribe/getSnapshot 베이스 클래스
│   ├── auth.store.ts
│   ├── loading.store.ts
│   ├── modal.store.ts
│   └── codes.store.ts
├── hooks/
│   ├── _common/    # 공통 훅 (useSelect, useMutation, useFormState 등)
│   ├── web/        # 사용자 도메인 훅
│   └── admin/      # 어드민 훅
├── layout/         # 페이지 레이아웃 래퍼
├── pages/
│   ├── web/        # 사용자 페이지 (실제 구현)
│   ├── admin/      # 어드민 페이지
│   └── _design/    # 디자인 시안 페이지 (개발 참고용)
├── router/         # Router.tsx (전체 라우트 정의)
├── styles/         # 전역 스타일 + MUI 테마
├── types/          # TypeScript 타입 정의만 (type.{domain}.ts)
└── utils/          # 공통 유틸리티
```

`_common` — 해당 레이어에서 도메인에 종속되지 않는 공통 코드  
`_design` — 개발 참고용 디자인 시안, 실제 서비스에 노출되지 않음

---

## 라우트 구조

```
/ (MainLayout)        → 일반 사용자 페이지
/admin (AdminLayout)  → 관리자 페이지
/auth (AuthLayout)    → 로그인/회원가입
/design/*             → 디자인 시안 참고용 (개발 전용)
```

---

## 전역 상태 구조 (스토어)

Provider 중첩 없이 싱글턴 외부 스토어로 관리한다. React는 `useSyncExternalStore`로 구독만 한다.

| 스토어 | 훅 | 역할 |
|--------|-----|------|
| `auth.store.ts` | `useAuth()` | 로그인 상태, 유저 정보 |
| `loading.store.ts` | `useLoading()` | 전역 로딩 스피너 (axios 자동 연동) |
| `codes.store.ts` | `useCodes()` | 공통 코드(enum) 캐싱 |
| `modal.store.ts` | `useModal()` | 확인/알림 팝업 |

**MainLayout 구조** (Provider 중첩 제거됨)
```
<LoadingBridge />   ← 라우터 네비게이션 → loadingStore 연결
<Header />
<Outlet />
<ModalRenderer />   ← modalStore 구독 → WebPopup 렌더링
<LoadingRenderer /> ← loadingStore 구독 → Loading 렌더링
```

**인증 흐름:**
1. `App.tsx` 마운트 → `authStore.init()` 1회 호출
2. sessionStorage 토큰 없으면 `reissue()` 시도 (쿠키 기반 refresh token)
3. 성공 시 `accessToken` sessionStorage 저장, `isLoggedIn = true`
4. 이후 모든 API 요청에 인터셉터가 자동으로 토큰 주입

**기존 Context 파일** (`src/contexts/`)은 하위 호환 re-export만 유지한다. 새 코드는 훅을 직접 import한다.
```typescript
// 기존 (동작은 하지만 비권장)
import { useAuth } from '@/contexts/AuthContext'
// 권장
import { useAuth } from '@/hooks/_common/useAuth'
```

---

## 타입 (`src/types/`) & 상수 (`src/constants/`)

**`src/types/`** — TypeScript 타입/인터페이스만

| 파일 | 내용 |
|------|------|
| `type.api.ts` | `ApiResponse<T>`, `Pagination`, `UploadResponse` |
| `type.{domain}.ts` | 도메인별 요청/응답 타입 |
| `type._common.ts` | 공통 타입 |

**`src/constants/`** — 런타임에 사용되는 상수값만

| 파일 | 내용 |
|------|------|
| `codes.ts` | `COMMON_CODE`, `ERROR_CODE`, `BOARD_CATEGORY`, `PROJECT_RECRUIT_TYPE` 등 |
| `errorMessages.ts` | `ERROR_MESSAGES` 객체 |
| `successMessages.ts` | `SUCCESS_MESSAGES` 객체 |
| `projectCreate.ts` | 프로젝트 생성 관련 상수 |

> `type.ts`에는 `interface`/`type`만, `constants/`에는 값(`const`, `enum`)만.

**`ApiResponse<T>` 구조:**
```typescript
interface ApiResponse<T> {
  success: boolean;
  code: string;
  data?: T;
  dataList?: T[];
  pagination?: Pagination | null;
  error?: { code: string; message: string } | null;
}
```
