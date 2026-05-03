# Skill: implement-feature

DevHub 프론트엔드에 새 기능을 안전하게 추가하는 실행 워크플로.
모든 단계는 `API → Hook → Page/Component` 흐름과 `web`/`admin` 분리를 따른다.

---

## 1) 요구사항 디제스천

- 도메인 결정: `auth` | `boards` | `comments` | `projects` | `profile` | `signup` | `terms` | `notification` | `file` | `banner`(admin) | `codes`(admin) 중 어디?
- 화면 영역: 사용자(`web`) / 관리자(`admin`)
- 기능 종류: 조회 / 생성 / 수정 / 삭제 / 상태변경 / 파일업로드 / 폼
- 인증 필요 여부 (필요하면 `useAuth().isLoggedIn` 분기, 토큰은 fetcher가 자동 주입)
- 백엔드 엔드포인트 가용성 가정 가능 — 가정한 스펙은 PR 본문에 명시

---

## 2) 영향 분석

다음을 Grep으로 확인한 뒤 진행한다.

```bash
# 동일 도메인 기존 흐름
ls src/api/web/api.{domain}.ts
ls src/hooks/web/{domain}
ls src/pages/web/{domain}
ls src/types/type.{domain}.ts

# 신규 enum/메시지가 필요하면 기존 키 충돌 확인
grep -n "{NEW_ENUM_NAME}" src/constants
```

**판단:**
- 기존 도메인 폴더가 있으면 그 폴더 안에 추가 (새 폴더 만들지 말 것)
- 동일 패턴 형제 훅 1개를 골라 **그대로 모방**

---

## 3) 구현 시퀀스 (반드시 이 순서)

### Step A — 타입
파일: `src/types/type.{domain}.ts`
- 요청/응답 인터페이스
- 날짜는 `DateType` 사용 (`type.api.ts`에서 `import type`)
- 페이지네이션 응답은 `ApiResponse<T>`의 `dataList` + `pagination`을 활용

### Step B — API 함수
파일: `src/api/{web|admin}/api.{domain}.ts`
- `fetcher` 직접 호출, 메서드 명시
- GET — 쿼리스트링 또는 `params` 객체
- POST/PUT — 본문
- DELETE — 본 레포는 `POST /{domain}/delete` 패턴(예: `deleteBoard`)을 사용하기도 함 — 도메인별 기존 컨벤션 확인 후 모방
- 함수 1개 = 엔드포인트 1개

### Step C — 도메인 훅
파일: `src/hooks/{web|admin}/{domain}/use{Name}.ts`

조회:
```typescript
export default function useSelect{Entity}(initialReq?) {
  const [request, setRequest] = useState({...defaults, ...initialReq});
  const options = useMemo(() => ({ apiFn: get{Entity}s, req: request, cacheKey: '{entity}-list' }), [request]);
  const { res, loading, refetch } = useSelect(options);
  // 페이지/검색/탭 setter들
  return { res, request, setPage, ..., refetch };
}
```

변경:
```typescript
export default function use{Action}{Entity}(onDone?) {
  const { alert, confirm, closeModal } = useModal();
  const navigate = useNavigate();
  const onSuccess = () => { alert(SUCCESS_MESSAGES.X); onDone?.() ?? navigate('/{path}'); };
  const onFail = () => { alert(ERROR_MESSAGES.X); };
  const { mutate } = useMutation({action}{Entity}, onSuccess, onFail, { invalidateKeys: ['{entity}-list'] });
  return { handle: async (payload) => { if (!(await confirm('...'))) return; await mutate(payload); } };
}
```

폼:
```typescript
const validations = { fieldA: [Validators.required()], ... };
const { state, errors, handleChange, checkError } = useFormState(initData, { validations, mode: 'manual' });
```

### Step D — 페이지/컴포넌트
파일: `src/pages/{web|admin}/{Domain}/{PageName}/index.tsx`
- 폴더 PascalCase, 진입은 `index.tsx`
- 훅 분해 + JSX. `useEffect`로 API 호출 금지
- MUI는 `_common/customMUI/*` 우선
- 한국어 라벨/문구 그대로 사용 (도메인 톤 유지)

### Step E — 라우트
파일: `src/router/Router.tsx`
- 사용자: `/` 트리에 children 추가
- 관리자: `/admin` 트리
- 인증: `/auth` 트리
- `_design`/`/design`은 절대 손대지 않음

### Step F — 상수/메시지
- enum 추가가 필요하면 `src/constants/codes.ts`에 `{ KEY: { CODE, NAME } }` 패턴
- 알림 문구는 `errorMessages.ts`/`successMessages.ts` 참고 후 추가

---

## 4) Validation Checklist

- [ ] API 함수가 `fetcher` 한 줄만 가지는가
- [ ] 페이지가 `useEffect`/`axios`/`api.{domain}` import 없이 훅만 호출
- [ ] `useSelect`에 넘기는 `req`가 `useMemo`
- [ ] 같은 `cacheKey`가 select와 mutation의 `invalidateKeys`로 짝지어짐
- [ ] 매직 스트링 0건 (도메인 enum 사용)
- [ ] 라우트 `Router.tsx`에 등록
- [ ] `npm run build` 통과
- [ ] `npm run lint` 통과
- [ ] `npm run dev`로 화면을 띄워 골든 패스 + 에러 케이스 1개 이상 직접 확인

---

## 5) 산출물 보고

- 추가/수정 파일 목록 (디렉토리별)
- 데이터 흐름 한 줄 (`api.X → useSelectX → XListPage`)
- 라우트/상수 추가 여부
- 수동 검증 시나리오 단계
