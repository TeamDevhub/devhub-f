# 공통 훅 & Fetcher 레퍼런스

모두 `src/hooks/_common/`에 위치한다.

## 훅 목록

| 훅 | 파일 | 반환값 |
|----|------|--------|
| `useSelect` | `api.hook.ts` | `res, setRes, loading, error, refetch` |
| `useMutation` | `api.hook.ts` | `mutate, loading, error` |
| `useFormState` | `useFormState.ts` | `state, errors, setState, handleChange, createHandler, createToggle, checkError, reset, controller` |
| `useFormController` | `form/useFormController.ts` | `FormController 인스턴스` (구독 없음) |
| `useFormField` | `form/useFormField.ts` | `value, error, onChange` |
| `useFileUpload` | `useFileUpload.ts` | `register, inputRefs, fileStates, upload, errors, clear, clearAll` |
| `useModal` | `useModal.ts` | `alert(msg), confirm(msg) → Promise<boolean>, closeModal` |
| `useMenu` | `useMenu.ts` | `open, anchorEl, handleClick, handleClose` |
| `useDisclosure` | `useDisclosure.ts` | `isOpen, open, close, toggle` |

---

## useSelect

```typescript
const { res, loading, refetch } = useSelect({
  apiFn: getBoards,
  req,             // useMemo로 감싸야 무한 루프 방지
  cacheKey: 'boards-list',  // 생략 시 캐시 없음
  enabled: true,   // false면 자동 fetch 생략
});
```

- `req`는 내부에서 `JSON.stringify`로 deep compare하므로 inline 객체를 넘겨도 무한 루프 없음
- `apiFn`도 ref로 접근하므로 매 렌더마다 새 함수 참조가 와도 안전
- `cacheKey`는 모듈 레벨 Map에 저장 → mutation 후 stale 방지는 `useMutation`의 `invalidateKeys` 사용

---

## useMutation

```typescript
const { mutate, loading } = useMutation(
  createBoard,
  (res) => { /* onSuccess: res.success === true */ },
  (res) => { /* onFail: res.success === false */ },
  { invalidateKeys: ['boards-list'] }  // 성공 시 해당 캐시 키 삭제
);
```

- `res.success` 기준으로 onSuccess / onFail 자동 분기
- `invalidateKeys`: 성공 시 삭제할 `cacheKey` 목록 — 이후 같은 키로 `useSelect` 호출 시 fresh fetch
- 네트워크 에러는 throw → 호출부에서 try/catch 필요 시 직접 처리

---

## 폼 상태 관리

내부적으로 `FormController` 클래스가 상태를 소유하고, React는 `useSyncExternalStore`로 구독한다.

| 사용 시점 | 방식 |
|-----------|------|
| 폼이 단순하거나 컴포넌트 분리 불필요 | `useFormState` |
| 특정 자식 컴포넌트만 최적화 | `useFormState` + `useFormField` |
| 부모까지 리렌더 없애고 싶을 때 | `useFormController` + `useFormField` |

### useFormState

기존과 동일한 API. 내부적으로 FormController 기반으로 동작한다.

```typescript
const form = useFormState(initialState, {
  validations: {
    email: [Validators.required(), Validators.email()],
    password: [Validators.minLength(8)],
  },
  mode: 'onChange',  // 또는 'manual' (checkError() 호출 시점에 검사)
});

form.state                      // 현재 폼 상태 (전체 구독)
form.errors                     // 필드별 에러 메시지
form.handleChange(key, value)   // 직접 값 변경
form.createHandler(key)         // (value) => handleChange(key, value) 단축
form.createToggle(key)          // 배열 필드 toggle 핸들러 (다중 선택 등)
form.checkError()               // 유효성 검사 실행 후 에러 유무 반환 (boolean)
form.reset()                    // initialState로 초기화
form.controller                 // FormController 인스턴스 (useFormField에 전달용)
```

### useFormState + useFormField

부모는 전체 구독을 유지하되, 특정 자식 컴포넌트만 해당 필드 변경 시만 리렌더.

```typescript
// 부모
const form = useFormState(initialState, options)
<EmailField controller={form.controller} />

// 자식 — email 바뀔 때만 리렌더
function EmailField({ controller }) {
  const { value, error, onChange } = useFormField(controller, 'email')
  return <TextField value={value} helperText={error} onChange={onChange} />
}
```

### useFormController + useFormField

부모는 구독 없음 — 어떤 필드가 바뀌어도 부모 리렌더 없음.

```typescript
// 부모 — 리렌더 없음
const controller = useFormController(initialState, options)

const handleSubmit = () => {
  if (controller.checkError()) return   // 에러 시 자식들만 리렌더
  mutate(controller.getState())         // 값은 그냥 읽기
}
<EmailField controller={controller} />

// 자식 — email 바뀔 때만 리렌더
function EmailField({ controller }) {
  const { value, error, onChange } = useFormField(controller, 'email')
  return <TextField value={value} helperText={error} onChange={onChange} />
}
```

---

## useModal

```typescript
const { alert, confirm, closeModal } = useModal();

alert('저장되었습니다.');

const ok = await confirm('정말 삭제하시겠습니까?');
if (ok) { /* confirmed */ }
```

---

## useFileUpload

```typescript
const { register, fileStates, upload, errors, clear } = useFileUpload();

// input에 ref 등록 (accept, maxSize MB 단위)
<input ref={register('avatar', { accept: 'image/*', maxSize: 2 })} type="file" />

const res = await upload('avatar');           // 등록된 파일 업로드
const res = await upload(undefined, file);   // File 객체 직접 전달
```

---

## Fetcher (`src/utils/util.api.ts`)

모든 API 호출의 진입점. 직접 axios를 쓰지 않고 항상 `fetcher`를 사용한다.

**자동 처리:**
- `Authorization: Bearer {token}` 헤더 주입 (sessionStorage)
- 요청 시작/종료 시 전역 로딩 상태 제어
- Dayjs 객체 → `'YYYY-MM-DD'` 문자열 변환
- null/undefined/빈 문자열 값 제거
- FormData는 JSON 직렬화 없이 그대로 전송
- GET → query params, 나머지 → body

```typescript
// GET
fetcher<ResponseType>('/endpoint', requestData, { method: 'get' });
// POST (기본)
fetcher<ResponseType>('/endpoint', requestData);
// skipErrorHandling: 401 에러를 호출부에서 직접 처리할 때
fetcher('/endpoint', data, { skipErrorHandling: true });
```
