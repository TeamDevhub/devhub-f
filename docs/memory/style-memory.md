# Style Memory

DevHub 프론트엔드의 코딩 스타일/네이밍/포맷 컨벤션. 새 코드는 여기 기준을 따른다.

---

## 언어/문서

- 사용자 노출 문구는 **한국어**.
- 도메인 코드/주석도 한국어 OK (`//벨리데이션`, `// 페이지`, `// 카테고리 코드`).
- 커밋 메시지: `[feat] ...`, `[refactor] ...`, `[fix] ...`. 본문은 한국어.
- 브랜치: `feature/{name}`, `dev`가 통합 브랜치.

---

## 네이밍

### 파일/폴더
- 컴포넌트 폴더: **PascalCase** (`BoardList`, `ProjectCreate`, `Banner`)
- 컴포넌트 진입 파일: **`index.tsx`**
- 일반 컴포넌트 파일: **PascalCase.tsx** (`BoardCard.tsx`, `CustomTextfield.tsx`)
- 훅 파일: **`use{Name}.ts`** (`useSelectBoards.ts`, `useCreateBoard.ts`)
- API 파일: **`api.{domain}.ts`** (`api.boards.ts`)
- 타입 파일: **`type.{domain}.ts`** (`type.boards.ts`)
- 유틸 파일: **`util.{name}.ts`** (`util.api.ts`, `util._common.ts`)
- 스토어 파일: **`{name}.store.ts`** (`auth.store.ts`)

### 디렉토리 prefix
- `_common/` — 도메인 무관 공통 (모든 레이어에서 동일)
- `_design/` — 디자인 시안 참고용. 실서비스 격리

### 훅 네이밍 (도메인 훅)
- 조회: `useSelect{Entity}` — `useSelectBoards`, `useSelectProjectDetail`
- 생성: `useCreate{Entity}` — `useCreateBoard`
- 수정: `useUpdate{Entity}` — `useUpdateProject`
- 삭제: `useDelete{Entity}` — `useDeleteBoard`
- 다목적 mutation: `useMutation{Entity}s` — `useMutationBoards` (좋아요 등 단순 액션 묶음)

### 변수 네이밍
- API 응답 컨테이너: `res` (`const { res } = useSelect(...)`) — `data` 아님
- 요청 객체: `req` 또는 `request`
- 핸들러: `handle{Action}` (`handleDelete`, `handleSearchClick`, `handleDetail`)
- 폼 onChange 단축: `createHandler(key)`

### 상수
- enum 객체: `UPPER_SNAKE` 키 + `as const`
  ```typescript
  export const BOARD_CATEGORY = {
    FREE: { CODE: '4001', NAME: '자유게시판' },
    QNA:  { CODE: '4002', NAME: '질문게시판' },
  } as const;
  ```
- 그룹 키 enum: `COMMON_CODE.BOARD_CATEGORY` 같은 문자열 키 모음

---

## 타입 컨벤션

- `tsconfig` strict + `verbatimModuleSyntax: true` — 타입 import는 반드시 `import type { ... }`
- 응답 컨테이너는 항상 `ApiResponse<T>` (`success`, `code`, `data`, `dataList`, `pagination`, `error`)
- 페이지네이션이면 응답을 단일 엔티티 타입으로 두고 컨테이너는 `ApiResponse`/`dataList`로 받음
- 날짜 필드는 `DateType = Dayjs | null | undefined`
- 도메인 타입 파일에 인터페이스만 두고, 런타임 값은 `src/constants/`로 분리

---

## React/컴포넌트

- 함수형 컴포넌트만. `default export` 사용.
- 페이지 컴포넌트: 훅 호출 + 분해 + JSX. 비즈니스 로직 X.
- props는 인라인 타입 또는 `interface {Name}Props`.
- 이벤트 핸들러는 훅에서 만들고 페이지에 주입 — 페이지 내 로직 최소화.
- MUI 컴포넌트 prop과 함께 SCSS 클래스 혼용 (`<Paper className='search-box align-center' elevation={4}>`).
- 키 prop: 가능하면 안정적인 ID(`item.code`, `item.boardGuid`). 정렬 변동 가능한 리스트에서 `index` 지양.

---

## 스타일

- Emotion(MUI) + SCSS 혼용
- 유틸 클래스 패턴: `flex-col`, `flex-center`, `align-center`, `justify-end`, `w-100`, `mt-14` 등 (전역 SCSS에 정의됨)
- inline `sx={{...}}`는 일회성 미세조정에 한정
- 테마는 `src/styles/`에서 관리

---

## 공통 훅 사용 패턴

### useSelect
```typescript
const options = useMemo(() => ({
  apiFn: getBoards,
  req: { categoryCd, page: page - 1, title },
  cacheKey: 'boards-list',
}), [categoryCd, page, title]);
const { res, loading, refetch } = useSelect(options);
```

### useMutation
```typescript
const { mutate } = useMutation<BoardCreate, void>(
  createBoard,
  () => { alert(SUCCESS_MESSAGES.X); navigate('/boards'); },
  () => { alert(ERROR_MESSAGES.X); },
  { invalidateKeys: ['boards-list'] }
);
```

### useFormState
```typescript
const validations = { title: [Validators.required()], content: [Validators.required()] };
const { state, errors, handleChange, checkError } = useFormState(initData, { validations, mode: 'manual' });
const onSubmit = async () => { if (checkError()) return; await mutate(state); };
```

### useModal
```typescript
const { alert, confirm } = useModal();
const ok = await confirm('정말 삭제하시겠습니까?');
if (!ok) return;
```

---

## API 함수 작성 스타일

- 한 함수 = 한 엔드포인트. 분기 없음.
- GET 쿼리는 `URLSearchParams` 또는 객체로 fetcher params에 위임.
- 경로 파라미터: 템플릿 리터럴.
- DELETE는 도메인별 컨벤션 다양 — `POST /{x}/delete` 패턴이 게시판에 있음. 새 도메인은 백엔드 스펙 따라.

```typescript
export const getBoards = (req: BoardSearchRequest) => {
  const params = new URLSearchParams();
  if (req.title) params.set('title', String(req.title));
  if (req.categoryCd) params.set('categoryCd', String(req.categoryCd));
  params.set('page', String(req.page));
  return fetcher<BoardSummary>(`/boards?${params.toString()}`, undefined, { method: 'get' });
};
```

---

## Validators

`src/utils/util._common.ts`의 `Validators` 사용. 새 검증이 필요하면 같은 파일에 추가.

| 사용처 | 표현 |
|--------|------|
| 필수값 | `Validators.required()` |
| 최소 길이 | `Validators.minLength(8)` |
| 이메일 | `Validators.email()` |
| 비밀번호 확인 | `Validators.match<FormType>('password', '비밀번호가 일치하지 않습니다.')` |

---

## DTO/엔티티 명명 (백엔드 응답 매핑)

- 백엔드 응답이 `xxxBasicResponseDto`/`xxxSummaryResponseDto` 등 DTO 네이밍을 그대로 노출 — 프론트 타입도 동일하게 받는다 (`BoardSummary.boardBasicResponseDto`).
- 변환 layer는 두지 않고 그대로 사용 — 매핑 코드 추가 시 일관성 깨짐 주의.

---

## 사용자 식별자

- `boardGuid`, `projectGuid`, `userGuid` — GUID 컨벤션 (string).
- 라우트 파라미터: `:projectGuid`, `:boardGuid` 등.
- state 전달로 ID 넘기는 경우도 있음 (`navigate('/boards/detail', { state: { boardGuid } })`).
