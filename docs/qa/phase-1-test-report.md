# RA SÂN Phase 1 QA/QC 실행 보고서

## 판정

**수정 후 자동화 품질 기준 PASS**. 최초 사이클에서 발견한 QA-001~QA-008을 모두 수정했고, 확장 E2E 80/80, 빠른 복합 필터 반복 20/20, Vitest 26/26 및 프로덕션 빌드를 통과했다. 실기기·사람·실제 배포 환경이 필요한 `BLOCKED` 항목은 출시 전 별도 승인이 필요하다.

- 대상 제품 커밋: `a4ebaa60e86a17ddbaa088145e8c1690415e1e84`
- 실행일: 2026-10-03 UTC
- 환경: Linux 6.18.44 x86_64, Node.js 24.19.0, pnpm 11.19.0
- 브라우저: Chromium 151.0.7922.173
- 실행 장비: 5 CPU, 33 GiB RAM
- 계획: `docs/qa/phase-1-test-plan.md`
- 테스트 데이터: 결정적 mock repository, 외부 DB·인증·결제 연결 없음

## 수정 후 재검증 — 2026-10-05

| 검사 | 최종 결과 | 증거 |
| --- | --- | --- |
| ESLint | PASS | 오류·경고 0 |
| TypeScript / production build | PASS | 타입 검사 및 `/vi`, `/ko`, `/en`, icon, Open Graph image, robots, sitemap 생성 |
| Vitest | PASS | 7 files, 26 tests |
| 확장 Playwright | PASS | mobile/desktop 전체 80/80 |
| 빠른 복합 필터 반복 | PASS | mobile 10/10, desktop 10/10, 합계 20/20 |
| axe serious/critical | PASS | vi/ko/en × mobile/desktop 위반 0 |
| 브라우저 콘솔 및 자산 요청 | PASS | 정상 사용자 흐름 오류 0, icon 응답 200, 미구현 상세 prefetch 제거 |
| 보안 헤더 | PASS | CSP, Referrer-Policy, nosniff, DENY, Permissions-Policy, HSTS 확인 |

| 결함 | 조치 결과 |
| --- | --- |
| QA-001 | URL parameter 업데이트를 동기화해 빠른 복합 필터 상태 유실 해소 |
| QA-002 | 마감 경기에 언어별 마감 문구 표시 |
| QA-003 | CTA·danger·success 색 대비를 WCAG AA 수준으로 수정 |
| QA-004 | 카드의 잘못된 `aria-label`을 제거해 보이는 텍스트와 접근 가능한 이름 일치 |
| QA-005 | icon 추가 및 미구현 상세 링크 prefetch 비활성화로 정상 흐름 404 제거 |
| QA-006 | 초기 client boundary와 폰트 로딩을 축소해 mobile LCP 중앙값 2.118초 달성 |
| QA-007 | 프로덕션 기본 보안 헤더 추가 및 응답 검증 |
| QA-008 | app icon과 언어 경로별 Open Graph 이미지 추가 |

### 수정 후 Lighthouse 3회 중앙값

| 프로필 | Performance | Accessibility | Best Practices | SEO | FCP | LCP | CLS | TBT |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Mobile | 96 | 100 | 100 | 100 | 1.523s | **2.118s PASS** | 0.00011 | 164ms |
| Desktop | 100 | 100 | 100 | 100 | 0.429s | 0.633s | 0.00057 | 3ms |

이하 결과는 결함 발견 당시의 최초 QA 사이클 기록이며, 수정 전 상태를 추적할 수 있도록 유지한다.

## 최초 사이클 전체 268개 정식 항목 결과

`PASS`는 자동화, 코드 검토 또는 캡처를 통한 직접 관찰 근거가 있는 항목이다. 사람·실기기가 필요한 검사는 실행하지 않고 `BLOCKED`로 남겼다.

| 상태 | 수 | 의미 |
| --- | ---: | --- |
| PASS | 188 | 기대 결과 확인 |
| FAIL | 14 | 제품 또는 출시 기준 미충족 |
| BLOCKED | 27 | 실기기, 사람, 배포 환경 또는 도구 전제 없음 |
| NOT RUN | 31 | 이번 사이클에서 미실행 |
| NOT IMPLEMENTED | 2 | Phase 1 범위 밖 기능 |
| N/A | 6 | 현재 설계 또는 테스트 환경에 적용되지 않음 |
| 합계 | **268** | 모든 정식 항목에 상태 부여 |

| 영역 | PASS | FAIL | BLOCKED | NOT RUN | NOT IMPLEMENTED | N/A | 합계 |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| ENV | 12 | 0 | 1 | 2 | 0 | 1 | 16 |
| ROUTE | 14 | 0 | 0 | 0 | 0 | 1 | 15 |
| HOME | 14 | 0 | 0 | 0 | 0 | 0 | 14 |
| DATE | 14 | 0 | 0 | 0 | 0 | 0 | 14 |
| FILTER | 17 | 2 | 0 | 0 | 0 | 1 | 20 |
| MATCH | 16 | 1 | 0 | 3 | 1 | 0 | 21 |
| STATE | 5 | 0 | 0 | 5 | 0 | 0 | 10 |
| NAV | 7 | 0 | 0 | 0 | 1 | 0 | 8 |
| L10N | 12 | 0 | 2 | 2 | 0 | 0 | 16 |
| VIS | 10 | 1 | 3 | 4 | 0 | 0 | 18 |
| A11Y | 13 | 3 | 2 | 2 | 0 | 0 | 20 |
| COMPAT | 2 | 0 | 5 | 3 | 0 | 0 | 10 |
| PERF | 8 | 1 | 0 | 2 | 0 | 1 | 12 |
| SEC | 15 | 2 | 1 | 0 | 0 | 0 | 18 |
| SEO | 8 | 2 | 1 | 0 | 0 | 0 | 11 |
| QC | 14 | 1 | 0 | 4 | 0 | 1 | 20 |
| REG | 3 | 0 | 0 | 1 | 0 | 0 | 4 |
| EXP | 2 | 0 | 0 | 3 | 0 | 0 | 5 |
| USE | 0 | 0 | 4 | 0 | 0 | 0 | 4 |
| UAT | 0 | 0 | 2 | 0 | 0 | 0 | 2 |
| REL | 2 | 1 | 6 | 0 | 0 | 1 | 10 |

정식 항목 중 아래 목록만 PASS가 아니다. 따라서 각 영역에서 아래에 없는 ID는 PASS로 판정했다.

| 상태 | 항목 ID |
| --- | --- |
| FAIL | `FILTER-008`, `FILTER-012`, `MATCH-008`, `VIS-011`, `A11Y-001`, `A11Y-008`, `A11Y-011`, `PERF-002`, `SEC-011`, `SEC-016`, `SEO-010`, `SEO-011`, `QC-005`, `REL-003` |
| BLOCKED | `ENV-006`, `L10N-014`, `L10N-015`, `VIS-015`, `VIS-016`, `VIS-018`, `A11Y-017`, `A11Y-018`, `COMPAT-002`, `COMPAT-003`, `COMPAT-004`, `COMPAT-005`, `COMPAT-006`, `SEC-014`, `SEO-009`, `USE-001`–`USE-004`, `UAT-001`–`UAT-002`, `REL-002`, `REL-005`–`REL-009` |
| NOT RUN | `ENV-004`, `ENV-011`, `MATCH-016`–`MATCH-018`, `STATE-005`, `STATE-006`, `STATE-008`–`STATE-010`, `L10N-010`, `L10N-013`, `VIS-006`–`VIS-008`, `VIS-014`, `A11Y-019`, `A11Y-020`, `COMPAT-008`–`COMPAT-010`, `PERF-004`, `PERF-010`, `QC-007`–`QC-010`, `REG-004`, `EXP-001`, `EXP-004`, `EXP-005` |
| NOT IMPLEMENTED | `MATCH-015`, `NAV-007` |
| N/A | `ENV-014`(해당 URL을 사용하는 기능 없음), `ROUTE-013`·`FILTER-013`(필터 라우팅이 의도적으로 `replace` 사용), `PERF-005`(합의된 번들 예산 없음), `QC-019`(QA 파일이 의도적으로 미커밋 상태), `REL-010`(결함 수정 전) |

## 최초 사이클 자동화 및 빌드 결과

| 검사 | 결과 | 증거 |
| --- | --- | --- |
| 원격 main clean clone | PASS | SHA 일치, 필수 파일 확인 |
| `pnpm install --frozen-lockfile` | PASS | 종료 코드 0, lockfile 변경 없음 |
| ESLint | PASS | 오류·경고 0 |
| TypeScript | PASS | `tsc --noEmit` 종료 코드 0 |
| Vitest | PASS | 7 files, 25 tests |
| Next.js production build | PASS | `/vi`, `/ko`, `/en`, robots, sitemap 생성 |
| 기존 Playwright smoke | PASS | mobile/desktop 4/4 |
| 확장 Playwright 최종 실행 | FAIL | 80건 중 raw 67 PASS/13 FAIL; 선택자 오탐 3건 수정 후 targeted 4/4 PASS, 제품 결과 환산 70 PASS/10 FAIL |
| 빠른 복합 필터 반복 | FAIL | mobile 10/10, desktop 10/10 실패, 총 재현율 20/20 |
| 악성·비정상 query | PASS | mobile/desktop 4/4 |
| `pnpm audit --prod` | PASS | 123 dependencies, 취약점 0 |
| Git diff/whitespace/conflict marker | PASS | 문제 없음 |

확장 E2E의 10개 제품 실패는 독립 결함 4종이 모바일·데스크톱 또는 세 언어에서 중복 검출된 결과다. axe 6건은 같은 대비 결함을 vi/ko/en × mobile/desktop에서 재현한 것이다.

## 최초 사이클 결함 목록

| ID | 심각도 | 현상 | 재현/영향 | 권장 수정 |
| --- | --- | --- | --- | --- |
| QA-001 | High | 빠르게 district, evening, available, format을 바꾸면 앞선 query가 사라진다. | mobile/desktop 각 10회, 20/20 재현. `replaceParams()`가 렌더 시점의 오래된 `useSearchParams`에서 다음 값을 만든다. | 하나의 로컬 상태/functional update로 원자적으로 URL을 만들고, 연속 입력 회귀 테스트를 유지한다. |
| QA-002 | High | `status=closed` 경기에도 “Còn 4 chỗ”처럼 예약 가능한 잔여석이 표시된다. | 2026-10-10 Phú Nhuận 카드에서 mobile/desktop 재현. | `availabilityLabel()`이 `closed`를 먼저 처리하고 번역된 마감 문구를 표시한다. |
| QA-003 | High | WCAG 2.2 AA 색상 대비가 부족하다. | CTA 흰색/#FF5A36 3.1:1, danger #D94242/white 4.36:1, success #168A55/white 4.37:1. 기준 4.5:1. 글로벌 `a { color: inherit; }`가 CTA의 의도한 어두운 글자를 덮는다. | 앵커 전역 규칙의 우선순위를 제거/조정하고 danger/success 색을 더 진하게 한다. |
| QA-004 | Medium | 경기 카드의 `aria-label`이 카드 안의 보이는 시간·가격·상태 문구를 포함하지 않는다. | Lighthouse `label-content-name-mismatch`, 세 카드 모두 검출. | `aria-label`을 제거해 전체 카드 텍스트를 이름으로 쓰거나, 보이는 핵심 텍스트가 모두 포함된 이름을 제공한다. |
| QA-005 | Medium | 정상 홈 탐색 중 404가 콘솔에 기록된다. | `/favicon.ico`와 미구현 `/matches/...?_rsc=` 자동 프리페치 요청. Lighthouse Best Practices 96. | favicon을 추가하고 상세 기능 전까지 카드 링크의 prefetch를 끄거나 실제 상세 경로를 구현한다. |
| QA-006 | Medium | 모바일 LCP가 목표를 넘는다. | 3회 중앙값 3.069초, 목표 2.5초. | 렌더 차단 CSS/폰트와 초기 JS를 줄이고 모바일 프로필에서 재측정한다. |
| QA-007 | Medium | 프로덕션 응답에 기본 보안 헤더가 없다. | CSP/frame-ancestors, nosniff, Referrer-Policy, Permissions-Policy 미검출. `X-Powered-By`는 정상 비활성화. | Next 설정 또는 배포 프록시에서 정책을 정의하고 배포 환경에서 재검증한다. |
| QA-008 | Low | favicon/app icon과 공유 이미지가 없다. | favicon 404, SEO 출시 체크 미충족. | Next metadata icon 및 Open Graph 이미지를 추가한다. |

## 최초 사이클 Lighthouse 3회 결과

| 프로필 | Performance | Accessibility | Best Practices | SEO | FCP | LCP | CLS | TBT |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Mobile 중앙값 | 90 | 96 | 96 | 100 | 1.678s | **3.069s FAIL** | 0.00037 | 192ms |
| Desktop 중앙값 | 100 | 96 | 96 | 100 | 0.431s | 0.746s | 0.00057 | 8ms |

모바일 세 번의 Performance 점수는 90/92/90, LCP는 3.108/2.958/3.069초였다. INP는 이 단일 사용자 lab 실행으로 유효하게 측정할 수 없어 NOT RUN으로 남겼다. 50회 evening 필터 토글은 평균 79.9ms, 최대 310.8ms였고 서버 응답은 7.9ms였다. 강제 GC 없는 단일 샘플의 heap 증가는 누수 판정 근거로 사용하지 않았다.

## 시각·반응형·네트워크 검토

- 320, 390, 430, 768, 1024, 1200, 1440, 1920px에서 문서 가로 넘침이 없었다.
- 1440px 화면에서 main 폭은 1180px, 좌우 130px로 중앙 정렬됐다.
- vi 390px, ko 768px, en 1440px 전체 페이지를 캡처해 겹침·잘림·내비게이션을 확인했다.
- 모바일 하단 내비게이션은 마지막 카드의 접근을 막지 않았다.
- reduced-motion 설정에서 transition duration이 0.01ms 이하로 줄었다.
- 홈 페이지 요청 origin은 자체 서버 하나뿐이었다.
- 정적 CSS/JS/폰트 합계는 약 1.4 MiB이며 정적 자산에 `public, max-age=31536000, immutable`이 적용됐다. 합의된 bundle budget이 없어 크기 합격 판정은 하지 않았다.

## 보안·구성 검토

- 추적 파일과 Git 이력에서 고신뢰 API key/private key 패턴을 찾지 못했다. `.env.example`과 설계 프롬프트의 secret **변수명**은 실제 값이 아니었다.
- `.env`, `.env.local`, `.next`, `test-results`는 ignore된다.
- server-only 환경 변수와 `NEXT_PUBLIC_` 변수가 분리돼 있다.
- 모든 필터에 HTML/script형 값을 넣어도 실행되거나 DOM에 삽입되지 않았다.
- 8,000자 값, 중복 parameter, 잘못된 percent encoding은 5xx 없이 처리됐다.
- production dependency audit는 low/moderate/high/critical 모두 0이다.
- 라이선스 목록 명령은 현재 pnpm store의 SQLite 파일 접근 제한으로 실행되지 않아 `SEC-014 BLOCKED`로 남겼다.

## 범위와 남은 승인

Supabase DB, 인증, 예약, 결제, 관리자 페이지, 배포 모니터링은 구현되지 않아 기능 합격으로 보지 않았다. 계획의 추가 자동화 12개 중 필터·언어·라우팅·날짜·카드 상태·axe 검사는 추가했다. controlled error/loading, Safari/WebKit, 9개 조합 visual baseline, Lighthouse CI budget, CI secret/license 검사, clean-clone CI job은 후속 작업이다.

실제 Safari/iPhone/iPad, Firefox, Android 실기기, VoiceOver, TalkBack, 네이티브 번역 검수, 5인 사용성 검사, 제품 책임자 UAT와 배포 후 검사는 이 환경에서 수행할 수 없다. 이 항목은 출시 전에 별도 증거와 승인이 필요하다.
