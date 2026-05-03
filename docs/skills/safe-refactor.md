# Skill: safe-refactor

동작 보존을 전제로 일관성/가독성/응집도를 끌어올리는 실행 워크플로.
이 레포는 자동 테스트가 없으므로 "작은 단위로, 형제 파일과 같이, 빌드/린트로 검증"이 핵심.

---

## 1) Smell 감지

다음 중 하나 이상이면 리팩터 후보.

| 카테고리 | 신호 |
|----------|------|
| 잘못된 레이어 | `src/pages/**`에서 `axios` 또는 `src/api/**` import |
| 데이터 페칭 안티패턴 | `useEffect` + `setState` + API 함수 호출 조합 |
| Context 직접 import | `from '@/contexts/`(deprecated re-export) |
| 매직 스트링 | `'4001'`, `'3001'` 등 백엔드 코드 하드코딩 |
| 폼 분해됨 | `useState` 다수 + 수동 validation |
| Stale UI | mutation 후 화면 갱신을 `location.reload()`로 처리 |
| 도메인 누수 | `_common/`에 도메인 import |
| 상대 경로 | `../../` 사용 (alias `@/` 미사용) |
| 죽은 코드 | 큰 주석 블록, 사용처 없는 export |

---

## 2) 동작 보존 전략

- **변경 단위 한 가지**: 이름 / 시그니처 / 위치 / 추출 / 매직제거 — 한 커밋 한 카테고리
- **형제 파일 동시 변경**: 도메인 단위(`boards` 전체) 또는 패턴 단위(모든 `useSelect*`) 묶어서
- **공통 훅/스토어/유틸 시그니처 변경 시**: 모든 호출처를 같은 PR에서 갱신 (특히 `api.hook.ts`, `useFormState.ts`, `Store.ts`, `util.api.ts`)
- **fetcher 행위(Dayjs 변환, null 제거, FormData 분기)는 호환성 핵심** — 이 동작 변경은 단독 PR로

---

## 3) 점진적 편집 절차

1. **Grep으로 사용처 수집**
   ```
   grep -rn "from '@/contexts/" src
   grep -rn "from 'axios'" src --exclude=src/utils/util.api.ts
   grep -rn "useEffect" src/pages
   grep -rn "'\\d{4}'" src --include=*.tsx
   ```
2. **타입 시그니처 우선** — TS strict가 컴파일 단계에서 회귀를 잡는다
3. **각 파일 변경 후 즉시 빌드**
   ```
   npm run build
   ```
4. **린트**
   ```
   npm run lint
   ```
5. **수동 시나리오** — 변경 도메인의 핵심 화면 진입/액션 확인

---

## 4) 회귀 점검

- 폼 흐름을 바꿨다면: 입력 → 검증 → 제출 → 성공 모달 → 리다이렉트까지 끝까지
- 데이터 페칭을 바꿨다면: 첫 진입 / 페이지 변경 / 검색 / mutation 후 / 로그아웃 후 재진입
- 외부 스토어 변경(`auth`, `codes`, `modal`, `loading`)이면: 새로고침/로그아웃/로그인 흐름
- 라우트 정리면: 전체 라우트 클릭 진입 점검

---

## 5) 산출물 보고

- 변경 카테고리 (이름/분리/이동/시그니처/매직제거)
- 영향 받은 도메인 / 파일 수
- 회귀 위험 노트
- 수동 검증 결과

---

## 프로젝트 특화 리팩터 레시피

### A. `_design` 의존 제거
실서비스 페이지에서 `_design/*` 컴포넌트를 import하면, 디자인 시안이 실 화면에 흘러들어옴.
→ 실 컴포넌트 폴더(`src/components/{web|admin}/{domain}/`)로 이동 또는 의존 끊기.

### B. Context 마이그레이션
```diff
- import { useAuth } from '@/contexts/AuthContext';
+ import { useAuth } from '@/hooks/_common/useAuth';

- import { useCodes } from '@/contexts/CommonCodeContext';
+ import { useCodes } from '@/hooks/_common/useCodes';
```
호환 re-export는 남겨둔다. 새 코드만 직접 import로 정리.

### C. inline req → useMemo
```diff
- const { res } = useSelect({ apiFn: getBoards, req: { page, categoryCd } });
+ const options = useMemo(() => ({ apiFn: getBoards, req: { page, categoryCd } }), [page, categoryCd]);
+ const { res } = useSelect(options);
```

### D. `location.reload()` → `invalidateKeys`
```diff
- const onSuccess = () => location.reload();
+ // useSelect 쪽에 cacheKey: 'boards-list' 부여
+ const { mutate } = useMutation(deleteBoard, onSuccess, onFail, { invalidateKeys: ['boards-list'] });
```

### E. window.alert → useModal
```diff
- alert('생성이 완료되었습니다.');
+ const { alert } = useModal();
+ alert('생성이 완료되었습니다.');
```
(현재 일부 훅에서 native `alert()`를 쓰는 곳이 있음 — `useCreateBoard.ts` 등. 점진적 통일 대상.)
