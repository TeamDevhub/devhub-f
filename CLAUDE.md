# DevHub Frontend

개발자 팀 매칭 플랫폼 프론트엔드 프로젝트.

## 기술 스택

| 영역 | 기술 |
|------|------|
| 프레임워크 | React 19 + TypeScript 5.9 |
| 라우팅 | React Router v7 |
| UI | Material-UI v7 (커스텀 래핑) |
| HTTP | Axios (전역 인터셉터) |
| 상태관리 | React Context API |
| 스타일 | SCSS + Emotion (MUI) |
| 날짜 | Dayjs + MUI DatePicker |
| 빌드 | Vite (`@` alias → `src/`) |

---

## 디렉토리 구조

```
src/
├── api/            # API 함수 (도메인별 분류)
├── components/     # UI 컴포넌트 (도메인별 분류)
├── contexts/       # 전역 상태 (Auth, Loading, Modal, CommonCode)
├── hooks/          # 커스텀 훅 (도메인별 분류)
├── layout/         # 페이지 레이아웃 래퍼
├── pages/          # 페이지 컴포넌트
│   ├── web/        # 실제 구현 페이지
│   ├── design/     # 디자인 시안 페이지 (참고용)
│   └── admin/      # 어드민 페이지
├── router/         # Router.tsx (전체 라우트 정의)
├── styles/         # 전역 스타일 + MUI 테마
├── types/          # 타입 정의 + 상수/에러메시지
└── utils/          # 공통 유틸리티
```

`_common` 접두사 디렉토리는 해당 레이어에서 도메인에 종속되지 않는 공통 코드를 의미한다.

---

## 핵심 아키텍처: API → Hook → Component

새 기능을 추가할 때 항상 이 순서를 따른다.

### 1단계 — API 함수 (`src/api/{도메인}/{도메인}.api.ts`)

```typescript
// fetcher<응답타입, 요청타입>(url, data, config)
export const getBoards = (req: BoardSearchRequest) =>
  fetcher<BoardSummary>(`/boards?${params}`, undefined, { method: 'get' });

export const createBoard = (req: BoardCreateRequest) =>
  fetcher<BoardDetail>('/boards', req);  // POST가 기본
```

### 2단계 — 훅 (`src/hooks/{도메인}/`)

**조회:** `useSelect` 기반

```typescript
export default function useSelectBoards() {
  const options = useMemo(() => ({ apiFn: getBoards, req }), [req]);
  const { res, loading, refetch } = useSelect(options);
  return { res, refetch, /* UI 상태들 */ };
}
```

**변경:** `useMutation` 기반

```typescript
export default function useCreateBoard() {
  const { mutate, loading } = useMutation(createBoard, onSuccess, onFail);
  return { mutate, loading };
}
```

**훅 네이밍 규칙:**
- 조회: `useSelect{Entity}` (예: `useSelectBoards`, `useSelectBoardDetail`)
- 변경: `use{Action}{Entity}` (예: `useCreateBoard`, `useUpdateProfile`)
- UI 상태: `use{State}` (예: `useModal`, `useFormState`)

### 3단계 — 페이지/컴포넌트

```typescript
export default function BoardListPage() {
  const { res, setPage } = useSelectBoards();
  return <BoardList data={res?.dataList} />;
}
```

---

## 공통 훅 (`src/hooks/_common/`)

| 훅 | 용도 |
|----|------|
| `useSelect` | API GET 요청, 캐시(`cacheKey`) 옵션 포함 |
| `useMutation` | API POST/PUT/DELETE, `onSuccess`/`onFail` 콜백 |
| `useFormState` | 폼 상태 + 유효성 검사 |
| `useFileUpload` | 파일 업로드 |
| `useModal` | 모달 open/close 상태 |
| `useMenu` | MUI Menu anchor 상태 |
| `useDisclosure` | boolean 토글 상태 |

---

## Fetcher (`src/utils/util.api.ts`)

모든 API 호출의 진입점. 직접 axios를 쓰지 말고 항상 `fetcher`를 사용한다.

**자동 처리 목록:**
- `Authorization: Bearer {token}` 헤더 주입 (sessionStorage)
- 요청 시작/종료 시 전역 로딩 상태 제어
- Dayjs 객체 → `'YYYY-MM-DD'` 문자열 변환
- null/undefined/빈 문자열 값 제거
- FormData는 JSON 직렬화 없이 그대로 전송
- GET 요청은 data를 query params으로, 나머지는 body로 전송
- 401 에러 코드별 분기 처리 (`ERROR_CODE` 상수 참조)

```typescript
// GET
fetcher<ResponseType>('/endpoint', requestData, { method: 'get' });
// POST (기본)
fetcher<ResponseType>('/endpoint', requestData);
// skipErrorHandling: 401 에러를 호출부에서 직접 처리할 때
fetcher('/endpoint', data, { skipErrorHandling: true });
```

---

## Context 구조

`MainLayout`에서 아래 순서로 중첩된다.

```
LoadingProvider
└── CommonCodeProvider
    └── AuthProvider
        └── ModalProvider
```

| Context | 역할 | 주요 API |
|---------|------|---------|
| `AuthContext` | 로그인 상태, 유저 정보 | `login(token)`, `logout()`, `refreshUser()` |
| `LoadingContext` | 전역 로딩 스피너 | `injectLoadingHandler()` via util.api |
| `CommonCodeContext` | 공통 코드(enum) 캐싱 | `useCodes().getCodesByGroup(code)` |
| `ModalContext` | 확인/알림 팝업 | `useModal()` |

**인증 흐름:**
1. 앱 로드 → `AuthProvider` 마운트 → `reissue()` 호출 (쿠키 기반 refresh token)
2. 성공 시 `accessToken`을 `sessionStorage`에 저장, `isLoggedIn = true`
3. 이후 모든 API 요청에 인터셉터가 자동으로 토큰 주입

---

## 타입 정의 (`src/types/`)

| 파일 | 내용 |
|------|------|
| `type.api.ts` | `ApiResponse<T>`, `Pagination` (모든 API 응답 기반) |
| `const.ts` | 도메인 enum (`BOARD_CATEGORY`, `PROJECT_RECRUIT_TYPE` 등) |
| `const.errorMessages.ts` / `const.successMessages.ts` | 메시지 상수 |
| `type.{domain}.ts` | 도메인별 요청/응답 타입 |

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

---

## 폼 유효성 검사 (`useFormState`)

```typescript
const form = useFormState(initialState, {
  validations: {
    email: Validators.email(),
    password: [Validators.required(), Validators.minLength(8)],
  },
  mode: 'onChange', // 또는 'onBlur'
});

// form.state, form.errors, form.handleChange, form.checkError, form.reset
```

---

## 라우트 구조

```
/ (MainLayout)        → 일반 사용자 페이지
/admin (AdminLayout)  → 관리자 페이지
/auth (AuthLayout)    → 로그인/회원가입
/design/*             → 디자인 시안 참고용 (개발 전용)
```

---

## 페이지 컴포넌트 작성 원칙

페이지 컴포넌트는 **UI 조합과 훅 연결만** 담당한다. 데이터를 가져오고 조작하는 비즈니스 로직은 반드시 훅으로 분리한다.

### 페이지에 있으면 안 되는 것

```typescript
// ❌ 페이지 안에서 직접 API 호출
export default function BoardListPage() {
  const [boards, setBoards] = useState([]);

  useEffect(() => {
    getBoards({ page: 1 }).then(res => setBoards(res.dataList));
  }, []);

  const handleDelete = async (id: string) => {
    await deleteBoard({ boardGuid: id });  // 직접 호출 금지
    setBoards(prev => prev.filter(b => b.id !== id));
  };
}
```

### 페이지에 있어야 하는 것

```typescript
// ✅ 훅을 조합하고 JSX만 반환
export default function BoardListPage() {
  const { res, setPage } = useSelectBoards();
  const { handleDelete } = useDeleteBoard();

  return (
    <BoardList
      data={res?.dataList}
      onDelete={handleDelete}
      onPageChange={setPage}
    />
  );
}
```

### 훅에 있어야 하는 것

- API 호출 (`useSelect`, `useMutation` 기반)
- 파생 상태 계산 (필터링, 정렬, 가공)
- 사용자 인터랙션 핸들러 (`handleSubmit`, `handleDelete` 등)
- 로딩/에러 상태 관리
- 페이지네이션/검색 파라미터 상태

```typescript
// ✅ 비즈니스 로직은 훅에
export default function useDeleteBoard() {
  const { open } = useModal();

  const { mutate } = useMutation(deleteBoard, () => {
    open({ title: '삭제 완료', content: SUCCESS_MESSAGES.DELETE });
  });

  const handleDelete = (boardGuid: string) => mutate({ boardGuid });

  return { handleDelete };
}
```

### 판단 기준

> "이 코드가 다른 페이지에서도 재사용될 수 있는가?" → 훅으로
> "이 코드는 이 화면 구성에만 해당하는가?" → 페이지에

---

## 개발 규칙

- `@` 경로 alias 사용 (`src/` 절대 경로)
- 컴포넌트 폴더는 PascalCase, 파일은 `index.tsx`
- API/Hook/Util 파일은 `{name}.api.ts`, `use{Name}.ts`, `util.{name}.ts` 형식
- 공통 코드/컴포넌트는 `_common/` 디렉토리에 위치
- 매직 스트링 금지 — `src/types/const.ts` 또는 메시지 상수 파일 활용
- **API는 반드시 훅을 통해서만 호출** — 페이지/컴포넌트에서 직접 `fetcher`나 `api` 함수 호출 금지
