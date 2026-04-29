# Workflow Memory

DevHub 프론트엔드의 개발/검증/협업 흐름.

---

## 명령어

| 목적 | 명령 |
|------|------|
| 개발 서버 | `npm run dev` (Vite) |
| 빌드 | `npm run build` (= `tsc -b && vite build`) |
| 린트 | `npm run lint` (eslint flat config) |
| 미리보기 | `npm run preview` |

> `test` 스크립트 없음 — 자동 테스트 미도입. 검증은 빌드/린트 + 수동 시나리오.

---

## 환경 변수

- `.env`에 `VITE_API_URL` 등 Vite 환경 변수.
- `import.meta.env.VITE_API_URL`이 fetcher의 baseURL.
- 새 환경 변수는 `VITE_` prefix 필수 (Vite 노출 규칙).

---

## 브랜치 / 커밋 / PR

- 통합 브랜치: `dev` (PR 머지 대상)
- 기능 브랜치: `feature/{name}` (예: `feature/user`, `feature/board`, `feature/project`, `feature/profile`)
- 릴리스/메인 브랜치: 별도 (커밋 히스토리상 `dev`가 활성 통합)
- 커밋 메시지 컨벤션 (한국어 + 영문 prefix):
  - `[feat] ...` — 새 기능
  - `[refactor] ...` — 리팩터/구조 개선
  - `[fix] ...` — 버그 수정
  - 본문은 한국어, 의도 중심. 예: `[refactor] hooks/components 구조를 web/admin 패턴으로 통일`

PR:
- 베이스 브랜치 `dev`
- 본문에 변경 의도 + 수동 검증 시나리오 포함
- 자동 테스트가 없으므로 PR 본문의 시나리오가 회귀 방지의 1차 자료

---

## 검증 흐름 (테스트 부재 환경 표준)

1. **빌드** — `npm run build` 통과해야 함 (TS strict)
2. **린트** — `npm run lint` 통과
3. **개발 서버에서 골든 패스** — 변경 도메인의 핵심 흐름을 직접 클릭/입력으로 확인
4. **에러 케이스 1개 이상** — 비로그인/잘못된 입력/네트워크 오류 중 적합한 1개
5. **회귀 점검** — 공통 훅/스토어/유틸을 건드렸으면 인접 도메인 1개 추가 확인

---

## TypeScript 빌드 모드

- `tsconfig.app.json`: target ES2022, jsx react-jsx, `strict: true`,
  `noUnusedLocals: true`, `noUnusedParameters: true`,
  `verbatimModuleSyntax: true`, `erasableSyntaxOnly: true`.
- alias: `@/*` → `./src/*` (vite + tsconfig 동일 설정).
- 타입 import는 `import type { ... }` 강제 (`verbatimModuleSyntax`).
- `enum` 사용 금지된 환경 (`erasableSyntaxOnly`) — 그래서 `as const` 객체 패턴이 표준.

---

## ESLint

- flat config (`eslint.config.js`)
- 적용: `js.recommended`, `tseslint.recommended`, `react-hooks` flat recommended, `react-refresh/vite`
- `react-hooks/exhaustive-deps` 위배는 의도된 곳에 한해 한 줄 단위로 disable
  (`api.hook.ts`에서 `reqKey`로 deep compare하는 부분 등)

---

## 디렉토리 추가/이동 시 주의

이 레포는 최근 다수의 구조 정비 커밋이 있었다.
```
[refactor] hooks/components 구조를 web/admin 패턴으로 통일
[refactor] pages/web/ 복원으로 레이어 간 구조 통일
[refactor] api 디렉토리 구조 개선
[refactor] pages 디렉토리 구조 개선
```
새 폴더를 추가할 때는 항상 다음 분기:
- `_common` (공통) / `web` (사용자) / `admin` (관리자) / `_design` (시안)
- 잘못 분류하면 다음 통일 작업에서 다시 옮겨야 함

---

## 새 도메인 도입 절차

게시판/프로젝트와 같은 새 도메인이 생길 때:

1. `src/types/type.{domain}.ts`
2. `src/api/web/api.{domain}.ts` (또는 `admin/`)
3. `src/hooks/web/{domain}/` 폴더
4. `src/pages/web/{Domain}/` 폴더
5. `src/components/web/{domain}/` 폴더 (도메인 UI 조각이 있으면)
6. `src/router/Router.tsx`에 라우트 등록
7. (필요 시) `src/constants/codes.ts`에 도메인 enum 추가
8. (필요 시) `src/constants/errorMessages.ts` / `successMessages.ts`에 알림 문구 추가

---

## 디자인 시안(`_design`) 다루는 법

- `src/pages/_design/*` 하위는 디자이너/개발자 시안 참고용
- `Router.tsx`의 `/design` 트리 외에는 진입 X
- 실서비스 컴포넌트는 절대 `_design`에서 import 하지 않는다
- 기능 마이그레이션이 끝나면 해당 시안 파일은 후속 정리 대상이 될 수 있으나, **임의 삭제 금지** — 팀 합의 필요

---

## 한국어 커뮤니케이션

- 사용자 노출 문구: 한국어
- 코드 주석: 한국어/영문 혼용 OK, 다만 의도가 비자명할 때만
- 메시지 상수 키는 영문(`VALIDATE_REQUIRED`), 값은 한국어
- 모달 알림은 `useModal().alert('생성이 완료되었습니다.')` 형태
