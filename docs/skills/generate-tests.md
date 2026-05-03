# Skill: generate-tests

> ⚠️ 현재 이 레포는 테스트 프레임워크가 설정되어 있지 않다 (`package.json` scripts에 `test` 없음, devDependencies에 vitest/jest/RTL 없음). 따라서 이 스킬은 **테스트 도입을 시작할 때**의 워크플로와 **수동 검증 체크리스트**를 함께 제공한다.

---

## A. 수동 검증 체크리스트 (자동 테스트 부재 시 표준 절차)

기능/리팩터/버그수정 PR마다 다음 절차를 PR 본문에 적는다.

### A-1. 환경
```bash
npm run dev   # http://localhost:5173 (Vite 기본)
```

### A-2. 인증 흐름
- [ ] 로그아웃 상태로 진입 — 보호 라우트 동작 확인
- [ ] 로그인(`/auth/login`) 성공 후 sessionStorage `accessToken` 저장
- [ ] 새로고침 시 `authStore.init()` → reissue → 유저 정보 복원
- [ ] 로그아웃 후 sessionStorage 비워지는지

### A-3. 도메인 골든 패스
- 게시판: 목록 → 카테고리 탭 → 검색 → 상세 → 댓글 → 좋아요 → 글쓰기 → 수정 → 삭제
- 프로젝트: 목록 → 상세 → 신청 → 생성 → 수정 → 삭제
- 프로필: 홈 → 수정 → 내 게시글/프로젝트
- 어드민: 배너/공통코드/게시판/약관 관리

### A-4. UX 인프라
- [ ] 전역 로딩 스피너가 axios 요청 동안 보임
- [ ] `useModal().alert/confirm` 모달이 정상 렌더 / esc/취소 동작
- [ ] 폼 검증 메시지가 `Validators` 결과 그대로 표시
- [ ] 페이지 이동 시 라우터 네비게이션 로딩 노출

### A-5. 에러 케이스
- [ ] 비로그인 상태에서 인증 필요 액션 시도
- [ ] 잘못된 입력 → 검증 메시지
- [ ] 네트워크 오류 (DevTools throttle Offline)

---

## B. 테스트 도입 워크플로 (도입 결정 후 사용)

본 레포 스택에 가장 잘 맞는 조합:

| 레이어 | 도구 |
|--------|------|
| Unit/Hook | Vitest (Vite 친화) + `@testing-library/react` + `@testing-library/jest-dom` |
| 모킹 | MSW (`fetcher`가 axios 인스턴스를 쓰므로 네트워크 레벨 모킹이 안전) |
| E2E (선택) | Playwright |

### B-1. 셋업 단계
1. `npm i -D vitest @testing-library/react @testing-library/jest-dom @testing-library/user-event jsdom msw`
2. `vite.config.ts`에 `test` 블록 추가 (`environment: 'jsdom'`, `setupFiles`)
3. `src/test/setup.ts` — RTL 매처 + MSW 서버 setup
4. `package.json` scripts에 `"test": "vitest"`, `"test:ui": "vitest --ui"` 추가

### B-2. 어디부터 테스트할 것인가
1. **`src/utils/util.api.ts`** — `convertDayjsToString`, `removeEmptyValues`, FormData 분기 (순수 함수)
2. **`src/utils/util._common.ts`** — `Validators` 전 케이스
3. **`src/hooks/_common/api.hook.ts`** — `useSelect`/`useMutation` 캐시 동작, `invalidateKeys`, `enabled`
4. **`src/hooks/_common/form/FormController.ts` + `useFormState`** — 검증 모드/에러/리셋
5. **`src/stores/auth.store.ts`** — init/login/logout/_tryReissue 분기
6. **도메인 훅 (예: `useSelectBoards`)** — MSW로 `/boards` 모킹 후 페이지/탭/검색 시 req 변동 확인
7. **페이지 통합** — RTL로 렌더 후 사용자 플로우 검증

### B-3. 컨벤션
- 파일명: `{원본}.test.ts(x)` — 같은 디렉토리에 위치
- 한국어 묘사 OK (`describe('useSelectBoards', () => { it('탭 변경 시 페이지가 1로 리셋된다', ...) })`)
- DOM 쿼리는 `getByRole` / `getByLabelText` 우선
- MSW 핸들러는 `src/test/handlers/{domain}.ts`로 도메인별 분리

---

## C. 엣지 케이스 카탈로그 (테스트 작성 시 반드시 포함)

| 영역 | 엣지 케이스 |
|------|------------|
| `useSelect` | `enabled: false`, `cacheKey` 히트, mutation 후 `invalidateKeys` |
| `useMutation` | `res.success === false` → `onFail` 호출, 네트워크 throw |
| `Validators.required` | `null`, `undefined`, `''`, `0`, `false`, 빈 배열 |
| `Validators.match` | 다른 필드 변경 후 재검증 |
| `fetcher` GET | `req`에 `Dayjs` 객체 포함 → `'YYYY-MM-DD'` 변환 |
| `fetcher` POST | `null/undefined/''` 키 제거 |
| `fetcher` FormData | Content-Type 비우고 그대로 전송 |
| 인증 인터셉터 | sessionStorage 토큰 주입 |
| `authStore.init` | 토큰 없음 + reissue 실패 → logout |
| `useModal.confirm` | 사용자 취소 → resolve(false) |

---

## D. 산출물

- 도입 단계라면: PR에 vitest 설정 + 첫 5개 테스트 파일 + npm scripts
- 운용 단계라면: 변경 코드의 골든 패스 + 식별된 엣지 케이스 1개 이상
