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

---

## 참고 문서

- [디렉토리 구조 · 라우트 · 전역 스토어 · 타입](docs/structure.md)
- [공통 훅 레퍼런스 · Fetcher](docs/hooks.md)
