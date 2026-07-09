# Architecture Memory

DevHub 프론트엔드의 레이어 책임/의존 방향/금지 패턴.

---

## 레이어

```
┌─────────────────────────────────────────────────────────────┐
│  pages/{web|admin}/{Domain}/{Page}/index.tsx                │
│   - 훅 호출 + JSX 조합. 비즈니스 로직 X. API 직접 호출 X.   │
└─────────────────────────────────────────────────────────────┘
                          │ 훅 호출
                          ▼
┌─────────────────────────────────────────────────────────────┐
│  hooks/{web|admin}/{domain}/use*.ts                         │
│   - 도메인 비즈니스 로직 (페이징, 검색, 폼, 검증, 모달)     │
│   - 내부에서 _common 훅(useSelect/useMutation/...) 사용     │
└─────────────────────────────────────────────────────────────┘
                          │ apiFn 전달
                          ▼
┌─────────────────────────────────────────────────────────────┐
│  hooks/_common/api.hook.ts                                   │
│   - useSelect / useMutation                                  │
│   - 모듈 레벨 cacheStore (Map)                               │
│   - JSON.stringify 기반 deep compare                         │
└─────────────────────────────────────────────────────────────┘
                          │ apiFn 호출
                          ▼
┌─────────────────────────────────────────────────────────────┐
│  api/{web|admin}/api.{domain}.ts                            │
│   - fetcher 한 번만 호출 (1 함수 = 1 엔드포인트)            │
└─────────────────────────────────────────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────────────┐
│  utils/util.api.ts (fetcher)                                 │
│   - axios 인스턴스 + 인터셉터                                │
│   - 토큰 헤더 주입 (sessionStorage accessToken)              │
│   - 전역 로딩 카운터 (loadingHandler)                        │
│   - Dayjs → 'YYYY-MM-DD'                                     │
│   - null/undefined/'' 키 제거                                │
│   - FormData 분기 (JSON 직렬화 X)                            │
└─────────────────────────────────────────────────────────────┘
```

---

## 의존 방향

- `pages → hooks(domain) → hooks(_common) → api → utils → stores`
- `stores`는 어디서든 직접 import 가능하지만, **R/W는 가능한 `useAuth`/`useCodes`/`useModal`/`useLoading` 훅으로 감싸서** 사용한다.
- `contexts/`는 deprecated 호환 layer — 새 코드는 직접 훅 import.
- `_common/`은 도메인 모듈을 import 하지 않는다 (역방향 금지).
- `_design/*`는 어디에서도 실서비스 코드(`pages/{web|admin}`, `components/{web|admin}`)로 import 되지 않는다.

---

## 모듈 경계

| 모듈 | 책임 | 의존 가능 |
|------|------|-----------|
| `api/` | HTTP 호출 (fetcher 경유) | `utils`, `types`, `constants` |
| `hooks/_common/` | 도메인 무관 일반 훅 | `api` (간접), `utils`, `stores`, `types`, `constants` |
| `hooks/{web|admin}/` | 도메인 훅 | `_common` 훅, `api/{web|admin}`, `types`, `constants`, `stores`(읽기 권장은 훅 경유) |
| `pages/` | 화면 + 훅 조합 | `hooks/{...}/{domain}`, `components`, `types`, `constants` |
| `components/_common/` | 공용 UI | MUI, `utils`, `types`, `_common` 훅 |
| `components/{web|admin}/{domain}/` | 도메인 UI | `_common` 컴포넌트, 도메인 훅(가급적 props로 주입) |
| `stores/` | 외부 싱글턴 상태 | `api` (init 시 1회 호출), `utils`, `types` |
| `types/` | 타입 정의만 | 다른 `types` 모듈만 |
| `constants/` | 런타임 상수만 | 없음 |
| `router/` | 라우트 트리 | `pages`, `layout` |
| `layout/` | 페이지 외곽 (Header/Footer/Outlet/모달/로딩 렌더러) | `_common` 컴포넌트, 훅 |

---

## 상태 관리

- React Context로 Provider 중첩하지 않는다. **외부 싱글턴 + `useSyncExternalStore`** 패턴.
- 베이스 클래스: `src/stores/Store.ts` — `subscribe`/`getSnapshot`/`_setState`.
- 새 전역 상태는 다음 단계로 추가:
  1. `class FooStore extends Store<FooState>` 작성
  2. 인스턴스 1개 export (`export const fooStore = new FooStore()`)
  3. `src/hooks/_common/useFoo.ts`로 `useSyncExternalStore(fooStore.subscribe, fooStore.getSnapshot)` 래핑
  4. `App.tsx`에서 init이 필요하면 mount 시 `fooStore.init()` 호출
- React Query / Redux / Zustand 도입 X — 캐시는 `api.hook.ts` 내부 `cacheStore` Map.

---

## 인증 흐름

1. `App.tsx` mount → `authStore.init()` 한 번 실행
2. `sessionStorage.accessToken`이 없으면 `reissue()`(쿠키 기반 refresh) 시도
3. 성공 시 토큰을 sessionStorage에 저장, 유저 프로필 조회 후 `isLoggedIn = true`
4. 모든 후속 요청에 인터셉터가 `Authorization: Bearer ...` 자동 주입
5. 401 + `EXPIRE_ACCESS_TOKEN`이면 인터셉터에서 reissue 자리(현재 TODO)

---

## 데이터 페칭 캐싱 모델

- `useSelect({ apiFn, req, cacheKey })` — `cacheKey` 있으면 모듈 레벨 Map에 첫 응답 저장
- 동일 키로 다시 호출 시 캐시 즉시 반환, fetch는 안 함
- mutation 후 stale 방지: `useMutation(fn, ok, fail, { invalidateKeys: ['key1', 'key2'] })`로 키 삭제
- TTL/시간기반 만료 없음 — 명시적 invalidate만
- 새로고침 시 캐시 비워짐 (메모리 only)

이 단순함이 의도된 선택. 더 정교한 캐싱이 필요해지면 별도 결정 후 진행 (현재 X).

---

## 폼 모델

3가지 사용 시점:

| 상황 | 패턴 |
|------|------|
| 단순 폼, 자식 분리 불필요 | `useFormState` |
| 특정 자식만 리렌더 최적화 | `useFormState` + `useFormField` |
| 부모까지 리렌더 0 | `useFormController` + `useFormField` |

내부적으로 `FormController` 클래스가 상태를 소유하고 `useSyncExternalStore`로 구독.
검증은 `Validators` (`src/utils/util._common.ts`).

---

## 라우트 트리 구조

- `/` — 사용자 (`MainLayout`)
- `/admin` — 관리자 (`AdminLayout`)
- `/auth` — 로그인/회원가입 (`AuthLayout`)
- `/design/*` — 디자인 시안 (개발 참고용, 실 트래픽 X)

신규 페이지는 의미에 맞는 트리에 children으로 추가. 트리를 섞지 않는다.

---

## 안티 패턴 (코드 리뷰에서 거부)

- 페이지/컴포넌트가 `axios` 또는 `src/api/...` 직접 import
- 페이지에서 `useEffect` + `setState`로 fetch
- mutation 후 `location.reload()` 사용 (대신 `invalidateKeys`)
- `window.alert` / `window.confirm` 사용 (대신 `useModal`)
- React Context Provider 신규 도입
- 토큰을 localStorage에 저장
- 매직 코드 하드코딩 (`'4001'` 같은 백엔드 코드)
- `_common/`이 도메인 모듈 import
- `_design/*`을 실서비스 페이지가 import
- 새 라우트를 `/design` 트리에 추가
- 공통 훅 시그니처 변경 후 호출처 일부만 갱신
