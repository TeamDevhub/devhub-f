# 코드 리뷰 — auth / user / admin-user 영역

**브랜치:** `feature/user` → `dev`  
**리뷰 대상 커밋:** `3fe756d` (claude user 리팩토링) ~ `ae8a465` (비밀번호 변경 API path 수정)  
**리뷰어:** Review Agent  
**날짜:** 2026-05-07  

---

## 1. 요약

### 변경 의도

| 묶음 | 내용 |
|------|------|
| 타입 정비 | `UserBasicResponse` — `email` 제거, `introduction`·`fileGuid` nullable, `lastLoginDateTime` optional화. 신규 Admin 전용 타입 군 추가. 웹 프로필 타입 복원. |
| 인증 리팩토링 | 토큰 저장을 `tokenStorage` 유틸로 추상화. `auth.store.ts`, `useLogin`, `useSignup` 등 전파. |
| Admin 회원 관리 | `userStatusCd` 기반 → `blocked`/`deleted` 불리언 기반으로 전환. 검색·목록·상세 페이지 신규 작성. |
| 메시지 상수화 | `ERROR_MESSAGES`, `SUCCESS_MESSAGES` 도입, `res.code` 직접 노출 제거. |
| OAuth 개선 | 하드코딩 URL 제거, `oauthLogin(provider)` 로 추상화. OAuth 회원가입 후 `authStore.login()` 경유 처리. |

### 전반적 평가

> **Request Changes**

아키텍처 방향성과 타입 정비 의도는 옳다. 그러나 캐시 무효화 로직에 **페이지네이션을 영구적으로 깨는 버그**와 **상세 화면 refetch 가 stale 데이터를 반환하는 버그**가 포함되어 있어 머지 전 반드시 수정이 필요하다.

---

## 2. Blocking 이슈

### B-1 🔴 `useSelectAdminUsers` — 고정 `cacheKey` 로 인해 페이지네이션이 동작하지 않음

**파일:** `src/hooks/admin/users/useSelectAdminUsers.ts:26`

```ts
const options = {
  apiFn: getAdminUsers,
  req: request,
  cacheKey: 'admin-users-list',  // ← 문제
};
```

`useSelect` 내부에서 `cacheKey` 가 존재하면 **req 내용과 무관하게** 캐시 히트 시 즉시 반환한다.

```ts
// src/hooks/_common/api.hook.ts:39
if (cacheKey && cacheStore.has(cacheKey)) {
  setData(cacheStore.get(cacheKey) as ApiResponse<TRes>);
  return;  // ← 여기서 리턴, 새 req 로 fetch 하지 않음
}
```

타임라인:
1. 최초 진입 → `GET /admin/users?page=0&size=10` → 결과 `'admin-users-list'` 에 캐시됨
2. 2페이지 클릭 → `request.page = 1` → `reqKey` 변경 → `fetchData` 재생성
3. `useEffect` 실행 → `fetchData` 내부에서 캐시 히트 → 1페이지 데이터 반환
4. **무한히 1페이지만 표시됨**

필터 검색(`userSearch`) 후에도 동일한 문제가 발생한다. 검색 직후 `'admin-users-list'` 캐시가 있으면 이전 검색 결과가 그대로 표시된다.

**비교 기준:** `useSelectAdminBoards.ts` 는 `cacheKey` 를 생략하여 req 변경마다 항상 fetch 한다.

**수정 제안:**
```ts
// 방법 A: cacheKey 제거 (boards 패턴과 동일)
const options = {
  apiFn: getAdminUsers,
  req: request,
};

// 방법 B: req 포함 동적 키 (mutation 연동 복잡도 증가하므로 A 권장)
cacheKey: `admin-users-list-${JSON.stringify(request)}`,
```

---

### B-2 🔴 `useUpdateUserStatus` — ban/unban 후 상세 화면 `refetch()` 가 stale 캐시를 반환

**파일:** `src/hooks/admin/users/useUpdateUserStatus.ts:24`  
**연관:** `src/hooks/admin/users/useSelectAdminUserDetail.ts:10`

```ts
// useUpdateUserStatus.ts
{ invalidateKeys: ['admin-users-list'] },  // ← 목록 캐시만 무효화
```

```ts
// useSelectAdminUserDetail.ts
cacheKey: userGuid ? `admin-user-detail-${userGuid}` : undefined,
```

`useUpdateUserStatus` 가 정지·해제 성공 후 `onUpdated?.()` → `refetch()` 를 호출하지만, `fetchData` 내부는 `'admin-user-detail-{guid}'` 캐시를 먼저 확인한다. 해당 키는 무효화되지 않았으므로 **정지 처리 직후에도 상세 화면이 이전 상태(blocked=false)를 유지**한다.

**수정 제안:**

```ts
// useUpdateUserStatus.ts
export default function useUpdateUserStatus(userGuid: string | undefined, onUpdated?: () => void) {
  ...
  const invalidateKeys = [
    'admin-users-list',
    ...(userGuid ? [`admin-user-detail-${userGuid}`] : []),
  ];

  const { mutate: ban, loading: banLoading } = useMutation<BanRequest, void>(
    ({ userGuid, ...req }) => banAdminUser(userGuid, req),
    onSuccess,
    onFail,
    { invalidateKeys },
  );
  // unban 동일 처리
```

호출처(`UserDetail/index.tsx`)도 `userGuid` 를 인자로 전달하도록 수정:

```ts
const { handleSuspend, handleActivate, loading } = useUpdateUserStatus(userGuid, () => refetch());
```

---

### B-3 🟠 `useSignup` — `async` `onSuccess` 가 `useMutation` 에서 await 되지 않아 로그인 완료 전 로딩이 종료됨

**파일:** `src/hooks/web/signup/useSignup.ts:64`

```ts
const handleSuccessOauthSignup = async (res: ApiResponse<TokenResponseDto>) => {
  alert(SUCCESS_MESSAGES.OAUTH_SIGNUP_COMPLETE);
  await _login(res.data?.accessToken);  // ← authStore.login() — fetch user profile 포함
  navigate('/');
};
```

`useMutation` 의 `onSuccess` 타입은 `(res) => void` 이며 내부에서 await 하지 않는다.

```ts
// api.hook.ts:90
onSuccess?.(res);  // Promise 반환되지만 await 없음 → fire-and-forget
// finally에서 setLoading(false) 실행
```

결과:
1. OAuth 회원가입 API 성공
2. `handleSuccessOauthSignup` 비동기 실행 시작
3. `setLoading(false)` 먼저 실행 (스피너 사라짐)
4. `_login()` 실행 중 (`/user/profile` fetch 진행 중)
5. `navigate('/')` 실행 — **인증 상태가 미완성인 채로 홈 이동**

실제 동작은 `alert` 모달이 사용자 인터랙션을 차단하므로 `navigate` 가 늦게 불려 대부분 정상처럼 보이지만, 구조적 버그다.

**수정 제안 1 (단기):** `useMutation.onSuccess` 를 `(res: ApiResponse<TRes>) => void | Promise<void>` 로 확장하고 내부에서 `await`:

```ts
// api.hook.ts
onSuccess?: (res: ApiResponse<TRes>) => void | Promise<void>;
// ...
if (res.success) {
  options?.invalidateKeys?.forEach((key) => cacheStore.delete(key));
  await onSuccess?.(res);  // ← await 추가
}
```

**수정 제안 2 (단기, api.hook.ts 비수정):** `handleSuccessOauthSignup` 을 동기로 유지하고 `navigate` 를 `login` 완료 콜백으로 전달:

```ts
const handleSuccessOauthSignup = (res: ApiResponse<TokenResponseDto>) => {
  alert(SUCCESS_MESSAGES.OAUTH_SIGNUP_COMPLETE);
  _login(res.data?.accessToken).then(() => navigate('/'));
};
```

---

### B-4 🟠 `AdminUpdateUserRequest.introduction` — nullable 불일치

**파일:** `src/types/type.user.ts:68`

```ts
// AdminUpdateUserRequest
export interface AdminUpdateUserRequest {
  username: string;
  introduction: string;  // ← non-nullable
}

// UserBasicResponse (서버 실제 반환값)
export interface UserBasicResponse {
  introduction: string | null;  // ← nullable
}
```

어드민이 현재 사용자 정보를 상세 조회한 후 그 값으로 수정 요청을 보낼 때, `introduction` 이 `null` 이면 타입 불일치가 발생한다. `updateAdminUser` 가 아직 페이지에 연결되지 않아 런타임 오류는 없지만, 향후 Admin 수정 폼 구현 시 바로 발생한다.

**수정 제안:**

```ts
export interface AdminUpdateUserRequest {
  username: string;
  introduction: string | null;
}
```

---

## 3. Non-blocking 제안

### N-1 `useSelectAdminUsers` — `options` 객체 메모이즈 불일치

**파일:** `src/hooks/admin/users/useSelectAdminUsers.ts:24`

```ts
// ❌ 현재: inline 객체 (매 렌더 새 참조)
const options = {
  apiFn: getAdminUsers,
  req: request,
  cacheKey: 'admin-users-list',
};
```

```ts
// ✅ 형제 파일 useSelectAdminUserDetail 패턴 (useMemo 사용)
const options = useMemo(() => ({
  apiFn: getAdminUsers,
  req: request,
}), [request]);
```

`useSelect` 내부에서 `reqKey = JSON.stringify(req)` 로 deep compare 하므로 기능 오류는 없으나, **레포 컨벤션이 `useMemo` 명시** 이고 형제 훅(`useSelectAdminUserDetail`)과 불일치한다.

---

### N-2 `type.user.ts` — `import type` 위치가 파일 하단

**파일:** `src/types/type.user.ts:82`

```ts
// 인터페이스 정의 이후 하단에 import 위치
import type { DateType } from './type.api';
```

TypeScript 는 hoisting 으로 동작하지만, ESLint `import/first` 또는 `@typescript-eslint/consistent-type-imports` 규칙에 위배될 수 있고 가독성이 떨어진다. 파일 최상단으로 이동 권장.

---

### N-3 `useSignup` — OAuth 흐름에서 불필요한 비밀번호 일치 검사

**파일:** `src/hooks/web/signup/useSignup.ts:91`

```ts
const applySignup = async () => {
  if (checkError()) return;

  if (userInfo.password !== userInfo.passwordConfirm) {  // ← OAuth 흐름에서도 실행됨
    alert(ERROR_MESSAGES.PASSWORD_MISMATCH);
    return;
  }

  if (tempToken) {  // OAuth 분기
    ...
  }
```

OAuth 흐름(`tempToken` 있음)에서 `password`/`passwordConfirm` 은 모두 빈 문자열이므로 비교는 통과하지만, validation 스키마에도 해당 필드가 제외되어 있어 혼란스럽다.

```ts
// 수정 제안: 비밀번호 검사 가드 추가
if (!tempToken && userInfo.password !== userInfo.passwordConfirm) {
  alert(ERROR_MESSAGES.PASSWORD_MISMATCH);
  return;
}
```

---

### N-4 `tokenStorage.clear()` — 유틸 래퍼 불일치

**파일:** `src/utils/auth.token.ts:8`

```ts
export const tokenStorage = {
  get: () => getSessionStorage<string>(ACCESS_TOKEN_KEY),      // ← 유틸 래퍼 사용
  set: (token: string) => setSessionStorage(ACCESS_TOKEN_KEY, token),  // ← 유틸 래퍼 사용
  clear: () => {
    if (typeof window === 'undefined') return;
    sessionStorage.removeItem(ACCESS_TOKEN_KEY);  // ← 날 sessionStorage 직접 호출
  },
};
```

`set`/`get` 은 `util._common` 래퍼를 경유하지만 `clear` 는 직접 호출한다. `util._common` 에 `removeSessionStorage` 유틸이 없다면 현 방식도 무방하나, SSR 안전성 체크(`typeof window`) 가 다른 두 함수에는 없어 일관성이 없다. `getSessionStorage`/`setSessionStorage` 도 내부에서 동일하게 guard 한다면 생략 가능.

---

### N-5 `handleFailLogin` — `console.error` 에 API 에러 코드 노출

**파일:** `src/hooks/web/login/useLogin.ts:41`

```ts
const handleFailLogin = (res: ApiResponse<TokenResponseDto>) => {
  console.error('login failed', res.code);  // ← 프로덕션 로그에 에러 코드 노출
  alert(ERROR_MESSAGES.LOGIN_FAILED);
  changePassword('');
};
```

동일 패턴이 `useSendVerificationCode`, `useConfirmVerificationCode`, `useSignup` 에도 있다. 프로덕션 번들에서 `console.error` 가 노출되는 것은 정보 유출(error code enumeration) 위험이 있다. 개발 빌드에서만 출력되도록 `import.meta.env.DEV && console.error(...)` 처리 권장.

---

### N-6 `UserDetail` — loading 상태 표시 없이 버튼 노출

**파일:** `src/pages/admin/Users/UserDetail/index.tsx:23`

```ts
const detail = res?.data;
const isSuspended = detail?.blocked === true;
```

`detail` 이 `undefined` 인 초기 로딩 중에 `isSuspended = false` → "회원 정지" 버튼이 보인다. `userGuid` 가 항상 존재하므로 잘못된 API 호출은 없지만, 데이터 로딩 중인 상태에서 액션 버튼을 노출하는 것은 UX 상 권장하지 않는다.

```tsx
// 수정 제안: loading 상태에서 버튼 숨김 또는 disabled
const { res, loading: detailLoading, refetch } = useSelectAdminUserDetail(userGuid);
// ...
<Button
  disabled={!userGuid || loading || detailLoading || !detail}
  ...
>
```

---

## 4. 회귀 위험

| 영역 | 위험 내용 | 심각도 |
|------|-----------|--------|
| `auth.store.ts` | `tokenStorage` 로 일원화. 기존 `setSessionStorage('accessToken', ...)` 직접 호출처가 `util._common.ts` 에 남아 있으면 이중 저장 발생 → grep 확인 필요 | 중 |
| `TokenResponseDto.accessToken` | 기존 `accessToken?: string; tempToken?: string;` → `accessToken: string` 으로 변경. `tempToken` 이 응답에 포함되던 OAuth 최초 진입 플로우에서 `data.tempToken` 접근 코드가 있다면 런타임 오류 | 중 |
| `signup` API 응답 타입 | `fetcher<TokenResponseDto, ...>` → `fetcher<void, ...>` 로 변경. 현재 `handleSuccessSignup` 에서 `res.data` 를 사용하지 않아 문제없음. 하지만 다른 호출처가 있다면 확인 필요 | 낮음 |
| `OauthSignupRequest.password` 제거 | `password` 필드 삭제. 서버가 아직 해당 필드를 require 하는 경우 OAuth 회원가입이 서버 validation 에서 실패 | 높음 |
| `UserStatusChip` 인터페이스 변경 | `statusCd: string` → `{ blocked, deleted }`. `Boards/index.tsx` 는 수정됐으나, 다른 컴포넌트나 `_design` 파일에 `statusCd` 호출처가 잔존하는지 확인 필요 | 낮음 |
| `UserBasicResponse.email` 제거 | `email` 필드 삭제. 기존 코드에서 `user.email` 참조가 있는 경우 `undefined` 로 폴백 → UI 에서 `-` 로 표시되거나 TS 에러 발생. `MyInfoBox._design.tsx` 에 `user?.email` 이 남아 있음 (수정 불필요 영역이지만 참조) | 낮음 |

---

## 5. 수동 검증 시나리오

### [AUTH-1] 일반 로그인 → 세션 유지

1. `npm run dev`
2. `/auth/login` 진입 → 이메일 + 비밀번호 입력 → 로그인
3. 홈(`/`) 진입 확인, DevTools > Application > sessionStorage > `accessToken` 값 존재 확인
4. 새로고침 후에도 로그인 유지 확인 (reissue 흐름)
5. 로그아웃 → `accessToken` 삭제 확인

### [AUTH-2] OAuth 회원가입 (B-3 검증)

1. `/auth/login` → Google 로그인 버튼 클릭 → OAuth 진행
2. 신규 사용자: OAuth 회원가입 화면에서 닉네임/스킬/관심분야 입력 → 완료
3. 홈 이동 후 `useAuth().user` 값이 설정됐는지 확인 (헤더에 닉네임 표시)
4. sessionStorage 에 `accessToken` 존재 확인

### [AUTH-3] 이메일 회원가입 → 로그인 화면 이동

1. `/auth/signup` → 이메일 인증 → 닉네임/비밀번호/스킬 입력 → 완료
2. `/auth/login` 으로 이동하는지 확인 (회원가입 성공 모달 닫힌 후)
3. 방금 가입한 이메일로 로그인 성공 확인

### [ADMIN-USER-1] 회원 목록 페이지네이션 (B-1 검증)

1. `/admin/users` 진입 → 1페이지 데이터 확인
2. 2페이지 클릭 → **2페이지 데이터가 표시되는지** 확인 (현재 버그: 1페이지가 그대로 표시됨)
3. 닉네임 검색 후 조회 → 필터 적용된 결과가 표시되는지 확인
4. 초기화 클릭 → 전체 목록으로 복귀 확인 (주의: 초기화 후 "조회" 버튼 클릭 필요)

### [ADMIN-USER-2] 회원 차단·해제 후 상세 화면 갱신 (B-2 검증)

1. `/admin/users` → 특정 회원 클릭
2. "회원 정지" 클릭 → 확인 → 성공 모달 닫기
3. **계정 상태가 "차단됨" 으로 변경됐는지** 즉시 확인 (현재 버그: "정상" 으로 유지됨)
4. "정지 해제" 클릭 → 동일 검증

### [ADMIN-USER-3] 차단 여부 필터

1. `/admin/users` → "차단 여부" 드롭다운에서 "차단됨" 선택 → 조회
2. 목록에 "정상" 상태 사용자가 없는지 확인
3. "삭제 여부" 드롭다운에서 "삭제됨" 선택 → 조회 → 삭제된 사용자만 표시 확인

### [ADMIN-USER-4] 회원 상세 로딩 중 UI

1. 느린 네트워크 조건(DevTools > Network > Slow 3G) 에서 회원 상세 진입
2. 데이터 로딩 중 버튼 상태 확인 (disabled 여부)

---

## 6. Nit

- `src/pages/admin/Users/UserDetail/index.tsx` — `import { useCodes } from '@/contexts/CommonCodeContext'` 가 `@/hooks/_common/useCodes` 와 중복 경로. `docs/structure.md` 에서는 새 코드가 직접 훅을 import 하도록 권장.
- `src/hooks/admin/users/useSelectAdminUsers.ts` — 반환 객체 키 순서가 `useSelectAdminBoards` 와 상이하다 (`state`, `request` 순서 등). 강제는 아니나 일관성 권장.
- `src/pages/admin/Users/UserList/index.tsx` — `<Select label="차단 여부">` 는 MUI `Select` 의 `label` prop 이 단독으로는 동작하지 않는다 (`<InputLabel>` 또는 `FormControl` 래핑 필요). 현재는 `displayEmpty` 로 대체되어 보이지만 레이아웃 의도와 다를 수 있음.
- `src/api/admin/api.users.ts` — `AdminUsersListRequest` 타입이 파일 내부 local type 으로 선언됨. 훅에도 동일 로컬 타입이 존재해 두 곳에서 각자 정의. 한쪽에서만 정의하고 공유하거나, `AdminUserSearchRequest` 에 `page`/`size` 추가를 고려.
