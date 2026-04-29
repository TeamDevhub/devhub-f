# Skill: perform-review

PR/브랜치 변경에 대한 깊이 있는 리뷰 워크플로.
DevHub 프론트엔드의 아키텍처/공통 인프라/타입 안전성/사용자 영향/유지보수성을 본다.

---

## 0) 사전 준비

```bash
git fetch origin
git diff origin/dev...HEAD --stat                # 파일 단위 변경 규모
git diff origin/dev...HEAD                       # 실제 diff
git log origin/dev..HEAD --oneline               # 커밋 메시지 의도
```

PR이면 `gh pr view <num>` / `gh pr diff <num>`.

---

## 1) Bug Detection

다음을 우선 본다.

| 패턴 | 위험 |
|------|------|
| `useSelect`에 inline `req` 전달 | 잠재적 무한 루프 (deep compare로 막혀 있지만 컨벤션 위반) |
| `useMutation`의 `onSuccess`가 `res.success` 분기 가정과 안 맞음 | 실패 케이스에 성공 알림 |
| 같은 `cacheKey`에 `invalidateKeys` 없음 | mutation 후 stale UI |
| `useEffect` 안에서 직접 `apiFn().then` | 로딩/토큰 인터셉터 우회 (fetcher 미경유면) |
| `useFormState`의 `mode: 'onChange'`인데 제출 직전 `checkError()` 안 부름 | manual에서 검증 누락 |
| 모달 confirm 결과 무시 | 취소 후에도 mutation 진행 |
| sessionStorage 키 오타 | 로그인 상태 깨짐 (`'accessToken'` 외 사용 X) |

---

## 2) Security Scan

| 체크 | 어떻게 |
|------|--------|
| `dangerouslySetInnerHTML` 사용 | Grep — 발견 시 입력 출처 확인 |
| 사용자 입력으로 URL 빌드 후 fetch/redirect | `navigate(${userInput})` 패턴 검사 |
| 토큰을 localStorage에 저장 | 본 레포 정책은 sessionStorage. localStorage에 토큰 저장 X |
| `withCredentials: true`가 불필요한 곳에 켜져 있음 | reissue/oauth 같은 쿠키 기반 호출에만 |
| `skipErrorHandling: true`로 401 우회 | 의도가 분명한가 |
| 외부 origin으로 form action / 링크 | 화이트리스트 |

---

## 3) Performance Scan

- `useSelect` `req` 메모이즈 누락 → 매 렌더 fetch 트리거 위험
- 큰 리스트에 `key={index}` (정렬/필터 시 잘못된 reuse)
- 폼이 큰데 부모에서 `useFormState`로 전체 구독 → `useFormController` + `useFormField`로 부모 리렌더 제거 가능한지
- 무거운 계산이 매 렌더 (`useMemo` 누락)
- 이미지/파일 업로드 — `useFileUpload`의 `maxSize` 설정 누락

---

## 4) Architecture Consistency

- 페이지가 API 함수/axios 직접 import? → 거부
- 도메인 코드가 `_common`에 들어감? → 도메인 폴더로 이동 요청
- 사용자 코드가 `admin` 트리(또는 그 반대)에 위치? → 이동
- `_design/*`이 실서비스 페이지에서 import? → 거부
- 라우트가 `Router.tsx`의 적절한 트리(`/`, `/admin`, `/auth`)에 들어가 있는가
- 새 훅 네이밍이 `useSelect{Entity}` / `use{Action}{Entity}` 컨벤션을 따르는가
- `import type` 분리가 빠진 타입 import 있는가 (`verbatimModuleSyntax: true`)

---

## 5) Readability / Maintainability

- 매직 스트링 → `src/constants/codes.ts` enum
- 사용자 노출 문구 → 한국어 톤 일관, 가능하면 `errorMessages`/`successMessages`
- 함수/변수명이 형제 훅과 일관 (`res`, `request`, `setPage`, `handleDetail`)
- 주석 처리된 큰 블록은 제거 또는 사유 명시
- 사용 안 되는 import/변수 (`noUnusedLocals`, `noUnusedParameters`)

---

## 6) Build / Lint

```bash
npm run build    # tsc -b && vite build
npm run lint     # eslint .
```

둘 다 통과해야 머지 가능. 자동 테스트 없음.

---

## 7) 보고서 형식

```markdown
## 요약
{변경 의도 + 평가: Approve / Request Changes / Comment}

## Blocking
- {file:line} — {문제} → {제안}

## Non-blocking
- {file:line} — {제안}

## 회귀 위험
- {공통 모듈/스토어 변경이 영향을 주는 영역}

## 수동 검증 시나리오
1. {step}
2. {step}

## Nit
- {style/주석}
```
