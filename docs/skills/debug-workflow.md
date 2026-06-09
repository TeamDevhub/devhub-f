# Skill: debug-workflow

DevHub 프론트엔드 이슈 디버깅 표준 절차.
React 19 / Vite / 외부 싱글턴 스토어 / axios 인터셉터 / 공통 훅 캐시 — 어느 레이어 문제인지 빠르게 좁힌다.

---

## 1) Reproduce

- 입력: 사용자 시나리오, 화면 경로, 에러 메시지/스크린샷, 네트워크 요청
- 환경: 로그인 여부, 브라우저, 캐시 상태
- 재현 단계 작성: `npm run dev` → 경로 → 입력 → 액션 → 관찰

> 자동 테스트가 없으므로 **재현 시나리오를 PR/이슈에 기록**하는 것 자체가 회귀 방지 자산.

---

## 2) Isolate the Layer

이 순서로 좁힌다.

### Layer 1 — 네트워크
- DevTools Network 탭 확인
- 요청 URL이 의도한 엔드포인트인가?
- `Authorization: Bearer ...` 헤더가 붙어 있는가? (붙어 있지 않다면 sessionStorage `accessToken` 확인)
- 응답 status / `success` / `error.code`
- 백엔드 에러면 프런트 코드는 손대지 않는다 — 백엔드/스펙 확인

### Layer 2 — fetcher / 인터셉터
파일: `src/utils/util.api.ts`
- 요청 데이터에 Dayjs 객체가 있다면 `convertDayjsToString`이 `'YYYY-MM-DD'`로 변환했는지
- `null/undefined/''` 키가 의도치 않게 제거되었는지 (`removeEmptyValues`)
- FormData인데 JSON으로 직렬화되어 보내졌다면 `Content-Type` 처리 확인
- 401 처리: `responseErrorInterceptor`의 `EXPIRE_ACCESS_TOKEN`/`DUP_LOGIN`/`SIGNATURE_ERROR_ACCESS_TOKEN` 분기

### Layer 3 — 공통 훅
파일: `src/hooks/_common/api.hook.ts`
- `useSelect` 무한 루프? `req`가 매 렌더 새 참조인가? (`useMemo` 누락)
- 데이터가 stale? 같은 `cacheKey`에 `invalidateKeys` 짝이 있는가?
- `enabled: false`로 인해 fetch가 스킵된 건 아닌가?
- `useMutation` `onSuccess` 미호출 → `res.success === false`인지 확인

### Layer 4 — 스토어
파일: `src/stores/*.store.ts`
- `authStore.getSnapshot()` 직접 콘솔에서 호출해 상태 확인
- `loadingStore`가 멈춰서 스피너가 안 사라짐 → `activeRequests` 카운트 미스매치 (요청 중 throw 처리 경로 확인)
- `modalStore`가 안 닫힘 → confirm/alert의 `closeModal()` 누락 또는 `onSubmit` 분기 문제
- `codesStore.init()`이 호출 안 됐으면 `useCodes()` 결과가 빔 — `App.tsx`에서 init 보장

### Layer 5 — 폼
파일: `src/hooks/_common/form/FormController.ts`, `useFormState.ts`
- 검증이 통과하면 안 되는데 통과? `Validators` 규칙 또는 `mode` 확인
- 제출 시 검증 안 도는 듯하면 `mode: 'manual'`인지 확인 — `manual`은 `checkError()` 호출이 필수
- 자식 컴포넌트가 안 갱신되면 `useFormField(controller, 'key')`의 키 오타 확인

### Layer 6 — 페이지/컴포넌트
- 훅 반환값이 페이지에서 잘못 분해되어 있는가?
- `useEffect` 의존성 누락으로 effect가 한 번만 도는가?
- MUI 컴포넌트 prop이 의도와 다른가? (`value`/`defaultValue` 혼동)
- 라우트 진입 자체가 안 되면 `Router.tsx`에서 path/element 확인. `_design` 트리에 잘못 들어가지 않았는지.

---

## 3) Inspect — 자주 쓰는 한 줄들

```bash
# 특정 도메인의 모든 fetch 호출 위치
grep -rn "fetcher<" src/api

# 특정 cacheKey 사용처
grep -rn "'boards-list'" src

# Dayjs 사용처 (fetcher 변환 영향)
grep -rn "dayjs(" src --include='*.tsx'

# 사용자 노출 alert/confirm — useModal 미사용 의심
grep -rn "window\\.alert\\|window\\.confirm\\|^[^/]*\\balert(" src
```

브라우저 콘솔:
```js
// 인증 상태
authStore.getSnapshot()
// 모달 상태
modalStore.getSnapshot()
// 캐시된 select 결과 (모듈 내부 cacheStore — 직접 접근은 어려우므로 React DevTools에서 useSelect 훅 상태로 확인)
```

---

## 4) Minimal Fix First

- **로컬 수정으로 끝나는가, 공통 인프라까지 가야 하는가** 결정
- 로컬: 해당 훅 또는 페이지만 수정
- 공통(`api.hook.ts`, `Store.ts`, `util.api.ts`): 영향이 큰 만큼 단독 PR + 영향 분석 보고
- 임시방편(예: `location.reload()`)은 **반드시 후속 cleanup 항목으로 남긴다**

---

## 5) Verify

- 빌드/린트
  ```
  npm run build
  npm run lint
  ```
- 수동 시나리오로 동일 재현 단계 다시 실행 — 증상 사라짐 확인
- 회귀 가능성 있는 형제 흐름(같은 도메인의 다른 mutation/select) 1개 이상 추가 확인

---

## 6) 보고

```markdown
## 증상
...

## 재현 단계
1. ...
2. ...

## 원인 (어느 레이어)
- {Layer 1~6 중 어디 + 파일:라인}

## 수정 내용
- {파일 + 변경 요지}

## 회귀 점검
- {함께 확인한 형제 흐름}
```
