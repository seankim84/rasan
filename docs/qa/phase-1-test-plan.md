# RA SÂN Phase 1 QA/QC master test plan

## 1. Purpose and scope

This plan verifies the Phase 1 foundation and localized match-discovery home page at commit `a4ebaa6`. It covers product QA, engineering QC, accessibility, localization, compatibility, performance, security, SEO, release, and operational readiness.

No finite checklist can prove that software has no defects. Completeness is managed through requirements traceability, risk-based coverage, boundary testing, exploratory testing, automated regression, and documented evidence.

### In scope

- Next.js application installation, startup, and production build
- `/` locale detection and `/vi`, `/ko`, `/en` routes
- Localized header, hero, 14-day date strip, quick filters, match cards, empty/loading/error states, and mobile navigation
- URL-persisted filters and language switching
- Deterministic mock match repository
- Responsive behavior at the specified Phase 1 breakpoints
- Metadata, robots, sitemap, environment-variable boundaries, and repository quality

### Out of scope because it is not implemented

- Supabase connectivity, migrations, database integrity, and RLS
- Match detail functionality beyond the prepared URL
- Authentication, profiles, password reset, and account deletion
- Reservation holds, cancellation, concurrency, and capacity transactions
- payOS/VietQR, onsite payments, webhooks, refunds, and reconciliation
- Admin pages, authorization, CRUD, attendance, and audit logs
- Production analytics, monitoring, rate limiting, and deployment

These items must be reported as `NOT IMPLEMENTED`, never `PASS` or `NOT TESTED` without context.

## 2. Test strategy

### Test levels

| Level | Purpose | Required result |
| --- | --- | --- |
| Static QC | Lint, types, secret patterns, dependency and repository checks | No unexplained error or high-risk finding |
| Unit | Formatters, locale catalogs, state transitions, date utilities | All tests pass |
| Component | Date strip, filters, match list/cards, empty and error states | All tests pass with meaningful assertions |
| Integration | Locale routing, URL state, mock repository, metadata | All critical flows pass |
| E2E | Real browser behavior on mobile and desktop | All P0/P1 flows pass |
| Exploratory | Unexpected sequences, usability, visual and content issues | Session notes and defects recorded |
| UAT | Product owner accepts the Phase 1 experience | Explicit acceptance recorded |

### Test types included

- Smoke, sanity, functional, negative, boundary, state-transition, regression, exploratory, usability, visual, responsive, compatibility, accessibility, localization, internationalization, performance, security, privacy, SEO, installation, configuration, recovery, maintainability, and release testing

### Status values

- `PASS`: expected result observed with evidence
- `FAIL`: expected result not observed; defect ID required
- `BLOCKED`: prerequisite or environment prevents execution
- `NOT RUN`: planned but not executed
- `NOT IMPLEMENTED`: feature is outside the current build
- `N/A`: test does not apply, with a written reason

## 3. Test environments and matrix

### Required environments

| Environment | Purpose |
| --- | --- |
| Clean local clone on macOS | User installation and local development |
| Clean Linux/cloud clone | Reproducible CI and cloud setup |
| Development server | Interaction, loading, HMR, and error behavior |
| Production build/server | Optimized output and route behavior |

### Browser and device matrix

| Class | Browser/device | Viewport | Priority |
| --- | --- | --- | --- |
| Mobile | Chrome/Android | 390×844 | P0 |
| Mobile | Safari/iPhone | 390×844 or closest physical device | P0 |
| Mobile small | Chrome responsive mode | 320×568 | P1 |
| Mobile large | Chrome/Android | 430×932 | P1 |
| Tablet | Safari/iPad | 768×1024 | P0 |
| Tablet landscape | Safari/iPad | 1024×768 | P1 |
| Desktop | Chrome | 1440×900 | P0 |
| Desktop | Safari | 1440×900 or native resolution | P0 |
| Desktop | Firefox | 1440×900 | P1 |
| Desktop minimum | Chrome | 1200×800 | P1 |
| Desktop wide | Chrome | 1920×1080 | P1 |
| Zoom | Chrome/Safari | 200% browser zoom | P0 accessibility |

### Locale matrix

Every P0 functional flow must run in `vi`, `ko`, and `en`. Vietnamese is the primary content baseline. Korean and English must be checked for expansion, truncation, fallback, and formatting.

## 4. Entry and exit criteria

### Entry criteria

- The target commit is recorded.
- `pnpm-lock.yaml` exists and a clean install is possible.
- Test environment versions are recorded: OS, Node, pnpm, browser.
- Known Phase 1 limitations are documented.
- Mock data and current date/time zone are recorded.

### Exit criteria

- 100% of P0 and P1 cases executed.
- No open blocker or critical defect.
- No open high defect without product-owner acceptance and a documented workaround.
- Lint, typecheck, unit/component tests, production build, and E2E tests pass.
- WCAG 2.2 AA automated scan has no serious or critical issue, and manual keyboard checks pass.
- Mobile and desktop visual baselines are accepted for all three locales.
- Performance budgets pass or an exception is recorded.
- Test evidence and residual risks are attached to the release record.

## 5. Detailed test checklist

### A. Repository, installation, and development environment

- [ ] `ENV-001 P0` Clone a clean repository and confirm `package.json`, lockfile, source, tests, and README are present.
- [ ] `ENV-002 P0` Verify the prompt source file remains unchanged.
- [ ] `ENV-003 P0` Run `pnpm install --frozen-lockfile` on a clean machine; expect exit code 0 and no lockfile change.
- [ ] `ENV-004 P1` Repeat frozen installation; expect idempotent success.
- [ ] `ENV-005 P0` Run with the documented supported Node and pnpm versions.
- [ ] `ENV-006 P1` Run on the minimum Node version supported by the chosen Next.js release.
- [ ] `ENV-007 P0` Run `pnpm dev`; expect a ready server and `/vi` HTTP 200.
- [ ] `ENV-008 P0` Run `pnpm build`; expect a successful optimized build.
- [ ] `ENV-009 P0` Run `pnpm start` after build; expect locale pages HTTP 200.
- [ ] `ENV-010 P1` Stop and restart the server; expect no stale-state failure.
- [ ] `ENV-011 P1` Start when port 3000 is occupied; expect a clear error or deliberate alternate-port behavior.
- [ ] `ENV-012 P1` Verify the app runs without Supabase or payOS credentials in mock mode.
- [ ] `ENV-013 P1` Copy `.env.example` to `.env.local`; expect no real credential or secret in the example.
- [ ] `ENV-014 P1` Set an invalid public URL; expect environment validation to fail clearly where used.
- [ ] `ENV-015 P1` Verify generated files and caches do not dirty the Git worktree unexpectedly.
- [ ] `ENV-016 P1` Verify README commands exactly match working commands and directories.

### B. Smoke and route availability

- [ ] `ROUTE-001 P0` Open `/`; expect a single redirect to a supported locale.
- [ ] `ROUTE-002 P0` Send `Accept-Language: vi`; expect redirect to `/vi`.
- [ ] `ROUTE-003 P0` Send `Accept-Language: ko-KR`; expect redirect to `/ko`.
- [ ] `ROUTE-004 P0` Send `Accept-Language: en-US`; expect redirect to `/en`.
- [ ] `ROUTE-005 P0` Send an unsupported language; expect fallback to `/vi`.
- [ ] `ROUTE-006 P0` Set the locale cookie to `ko`; expect it to override browser language.
- [ ] `ROUTE-007 P0` Set the locale cookie to `en`; expect it to override browser language.
- [ ] `ROUTE-008 P1` Set an invalid locale cookie; expect safe fallback, no server error.
- [ ] `ROUTE-009 P0` Open `/vi`, `/ko`, and `/en`; expect HTTP 200.
- [ ] `ROUTE-010 P0` Verify `<html lang>` is `vi`, `ko`, or `en` respectively.
- [ ] `ROUTE-011 P1` Open an unsupported locale path; expect a controlled 404 or locale redirect according to routing policy.
- [ ] `ROUTE-012 P1` Refresh every locale page with query parameters; expect the same route and state.
- [ ] `ROUTE-013 P1` Use browser Back and Forward after filter and locale changes; expect consistent state.
- [ ] `ROUTE-014 P1` Open a copied filtered URL in a fresh private window; expect the same filters.
- [ ] `ROUTE-015 P1` Verify no redirect loop with cookies disabled.

### C. Header and hero

- [ ] `HOME-001 P0` Verify the `RA SÂN` wordmark is visible and returns to the current locale home.
- [ ] `HOME-002 P0` Verify the selected city is Hồ Chí Minh and is localized where intended.
- [ ] `HOME-003 P1` Verify desktop search/find-match control scrolls to the match section.
- [ ] `HOME-004 P1` Verify mobile header retains only essential controls without overlap.
- [ ] `HOME-005 P0` Verify language selector is keyboard and pointer operable.
- [ ] `HOME-006 P0` Change language; expect the same route context and query string to remain.
- [ ] `HOME-007 P1` Refresh after language change; expect the selected locale to persist via cookie.
- [ ] `HOME-008 P0` Verify Vietnamese hero title, description, badge, and CTA copy.
- [ ] `HOME-009 P0` Verify Korean hero copy contains no Vietnamese raw translation key.
- [ ] `HOME-010 P0` Verify English hero copy contains no Vietnamese raw translation key.
- [ ] `HOME-011 P1` Verify the hero height stays within the specified mobile and desktop range.
- [ ] `HOME-012 P1` Verify decorative court graphics do not obscure text or receive focus.
- [ ] `HOME-013 P1` Verify the hero CTA reaches the match list and does not alter filters.
- [ ] `HOME-014 P1` Verify the visual treatment does not copy PLAB branding, lime palette, logo, copy, or proprietary imagery.

### D. Date strip

- [ ] `DATE-001 P0` Verify exactly 14 consecutive dates beginning with the current Vietnam date.
- [ ] `DATE-002 P0` Verify the first date is marked Today in each locale.
- [ ] `DATE-003 P0` Verify dates use `Asia/Ho_Chi_Minh`, independent of the device time zone.
- [ ] `DATE-004 P0` Select each date; expect selected styling and `date=YYYY-MM-DD` in the URL.
- [ ] `DATE-005 P0` Reload after date selection; expect the selected date to persist.
- [ ] `DATE-006 P1` Open a valid date query directly; expect the matching date selected.
- [ ] `DATE-007 P1` Open an invalid date format; expect safe fallback to the first date.
- [ ] `DATE-008 P1` Open a date outside the 14-day window; expect safe fallback.
- [ ] `DATE-009 P0` Operate all date buttons with Tab, Shift+Tab, Enter, and Space.
- [ ] `DATE-010 P0` Verify the selected date exposes `aria-selected=true`.
- [ ] `DATE-011 P1` Verify horizontal swipe/scroll on mobile without page-level horizontal overflow.
- [ ] `DATE-012 P1` Verify month-end, year-end, leap day, and daylight-independent date generation.
- [ ] `DATE-013 P1` Verify weekday names are correct in vi, ko, and en.
- [ ] `DATE-014 P1` Verify Vietnamese diacritics and long localized weekday labels are not clipped.

### E. Quick filters and URL state

- [ ] `FILTER-001 P0` Verify district options: all, Quận 2, Bình Thạnh, Phú Nhuận.
- [ ] `FILTER-002 P0` Select each district; expect only matching cards and the correct URL parameter.
- [ ] `FILTER-003 P0` Toggle Evening; expect `time=evening` and only matches at or after the defined threshold.
- [ ] `FILTER-004 P0` Toggle Available; expect only open matches with remaining capacity.
- [ ] `FILTER-005 P0` Open all filters and select 5v5; expect only 5v5 matches and `format=5v5`.
- [ ] `FILTER-006 P0` Select 6v6; expect only 6v6 matches and `format=6v6`.
- [ ] `FILTER-007 P0` Toggle a selected format off; expect the parameter removed.
- [ ] `FILTER-008 P0` Combine date, district, evening, availability, and format; expect logical AND behavior.
- [ ] `FILTER-009 P0` Reset filters; expect district, time, availability, and format removed while the selected date remains.
- [ ] `FILTER-010 P0` Refresh with combined filters; expect identical visible results.
- [ ] `FILTER-011 P0` Share a combined-filter URL; expect identical results in a clean session.
- [ ] `FILTER-012 P1` Change filters rapidly; expect no lost or duplicated query parameter.
- [ ] `FILTER-013 P1` Use Back and Forward through several filter states; expect UI and cards to follow history behavior.
- [ ] `FILTER-014 P1` Supply unknown query parameters; expect them preserved or deliberately ignored without failure.
- [ ] `FILTER-015 P1` Supply invalid district, time, availability, and format values; expect safe behavior and no crash.
- [ ] `FILTER-016 P0` Verify filter buttons expose pressed or expanded state to assistive technology.
- [ ] `FILTER-017 P0` Verify all controls have at least a 44×44 CSS-pixel touch target.
- [ ] `FILTER-018 P1` Verify filter chips swipe horizontally on small screens without trapping vertical scrolling.
- [ ] `FILTER-019 P1` Verify resetting from the empty state produces visible matches.
- [ ] `FILTER-020 P1` Verify count badge updates after every filter change.

### F. Match list and cards

- [ ] `MATCH-001 P0` Verify matches are ordered by start time.
- [ ] `MATCH-002 P0` Verify each card displays time, venue, district, format, duration, price, and availability.
- [ ] `MATCH-003 P0` Verify VND contains no decimal fraction and uses locale-appropriate separators.
- [ ] `MATCH-004 P0` Verify all times display in `Asia/Ho_Chi_Minh`.
- [ ] `MATCH-005 P0` Verify remaining-spots text matches the mock record.
- [ ] `MATCH-006 P0` Verify almost-full state uses text plus color.
- [ ] `MATCH-007 P0` Verify full state uses text plus color and is not presented as available.
- [ ] `MATCH-008 P1` Verify closed state presentation is distinct and accurate.
- [ ] `MATCH-009 P1` Verify onsite-payment availability is shown in text.
- [ ] `MATCH-010 P1` Verify at most two facility tags are displayed.
- [ ] `MATCH-011 P1` Verify missing imagery is represented by the intended court placeholder without broken-image UI.
- [ ] `MATCH-012 P0` Verify the entire card has a descriptive accessible link name.
- [ ] `MATCH-013 P0` Verify card links retain the active locale.
- [ ] `MATCH-014 P0` Verify card targets use a locale-independent stable match ID.
- [ ] `MATCH-015 P0` Record that card targets currently lead to an unimplemented detail route; classify as a known Phase 1 limitation, not a passed detail flow.
- [ ] `MATCH-016 P1` Verify long venue and district names truncate or wrap without hiding price or time.
- [ ] `MATCH-017 P1` Verify large fee values do not overlap other content.
- [ ] `MATCH-018 P1` Verify zero, one, two, and many remaining spots produce correct text and state.
- [ ] `MATCH-019 P1` Verify duplicate match IDs would be detected during development/testing.
- [ ] `MATCH-020 P1` Verify the same deterministic mock data appears after reload for the same date.
- [ ] `MATCH-021 P1` Verify no personal data appears in mock match records.

### G. Loading, empty, error, and recovery states

- [ ] `STATE-001 P0` Throttle network/CPU and verify a layout-shaped skeleton appears without a full-screen spinner.
- [ ] `STATE-002 P1` Verify skeleton dimensions minimize layout shift.
- [ ] `STATE-003 P0` Apply a no-result filter combination; expect localized empty title, guidance, and reset action.
- [ ] `STATE-004 P0` Use the empty-state reset action; expect matches to return.
- [ ] `STATE-005 P0` Inject a repository/render error; expect the localized error boundary.
- [ ] `STATE-006 P0` Activate Retry after a transient error; expect recovery without a full browser restart.
- [ ] `STATE-007 P1` Verify error UI does not expose stack traces, paths, environment data, or secrets.
- [ ] `STATE-008 P1` Reload during a transient development error; expect a controlled response.
- [ ] `STATE-009 P1` Disable JavaScript; document server-rendered content and the expected loss of interactive filtering.
- [ ] `STATE-010 P1` Simulate offline navigation; expect browser-level failure without corrupting persisted locale state.

### H. Mobile bottom navigation

- [ ] `NAV-001 P0` Verify the bottom navigation is visible below 768px and hidden at or above 768px.
- [ ] `NAV-002 P0` Verify four items are visible, localized, and have outline icons.
- [ ] `NAV-003 P0` Verify Home is marked as the active destination using color and another cue.
- [ ] `NAV-004 P0` Verify the nav respects iPhone/Android safe-area inset.
- [ ] `NAV-005 P0` Verify fixed navigation does not permanently cover the last card or actionable control.
- [ ] `NAV-006 P0` Verify every item has a 44×44 minimum target and visible keyboard focus.
- [ ] `NAV-007 P1` Verify current placeholder destinations do not imply completed booking/profile functionality; record as Phase 1 limitation.
- [ ] `NAV-008 P1` Verify screen readers announce the navigation landmark and item names.

### I. Localization and internationalization

- [ ] `L10N-001 P0` Compare translation key sets for vi, ko, and en; expect exact parity.
- [ ] `L10N-002 P0` Scan all three pages for raw translation keys, `undefined`, empty labels, and fallback artifacts.
- [ ] `L10N-003 P0` Verify every visible home string is translated except intentional Vietnamese proper names and addresses.
- [ ] `L10N-004 P0` Verify Vietnamese tone marks render correctly and are not clipped.
- [ ] `L10N-005 P0` Verify Korean text does not overlap or truncate critical information.
- [ ] `L10N-006 P0` Verify long English labels do not break controls.
- [ ] `L10N-007 P0` Verify VND formatting for vi-VN, ko-KR, and en.
- [ ] `L10N-008 P0` Verify date and weekday formatting for all locales.
- [ ] `L10N-009 P0` Verify time remains Vietnam time when the device is set to Korea, UTC, US, and Vietnam time zones.
- [ ] `L10N-010 P1` Verify language selection persists after refresh and a new tab.
- [ ] `L10N-011 P1` Verify locale cookie scope, lifetime, SameSite value, and absence of sensitive data.
- [ ] `L10N-012 P1` Verify language change preserves query parameters and page context.
- [ ] `L10N-013 P1` Verify browser translation tools do not destroy layout or controls.
- [ ] `L10N-014 P1` Review Vietnamese copy with a native speaker for natural terminology and cultural fit.
- [ ] `L10N-015 P1` Review Korean and English copy for meaning parity, not just literal translation.
- [ ] `L10N-016 P1` Verify venue proper names remain in their source form.

### J. Responsive, visual, and usability QA

- [ ] `VIS-001 P0` At 390×844, verify there is no document-level horizontal overflow.
- [ ] `VIS-002 P0` At 768×1024, verify layout, filters, cards, and navigation follow tablet rules.
- [ ] `VIS-003 P0` At 1440×900, verify content does not exceed the 1180px maximum.
- [ ] `VIS-004 P1` At 320px width, verify essential content and controls remain usable.
- [ ] `VIS-005 P1` At 1920px width, verify content remains centered and does not become excessively wide.
- [ ] `VIS-006 P1` Rotate mobile and tablet; expect stable layout and no lost state.
- [ ] `VIS-007 P0` At 200% zoom, verify no critical clipping, overlap, or inaccessible control.
- [ ] `VIS-008 P1` Increase OS text size; verify critical information remains readable.
- [ ] `VIS-009 P0` Verify time, venue, district, format, price, and availability are scannable within three seconds.
- [ ] `VIS-010 P1` Verify border, spacing, radius, and shadow usage is consistent with tokens.
- [ ] `VIS-011 P1` Verify orange-background text meets contrast and uses the specified dark color.
- [ ] `VIS-012 P1` Verify icons use a consistent outline style and are not overused.
- [ ] `VIS-013 P1` Verify sticky header does not cover anchored content.
- [ ] `VIS-014 P1` Verify horizontal lists provide enough visual affordance that more content exists.
- [ ] `VIS-015 P1` Compare against approved mobile, tablet, and desktop screenshots for unintended visual regression.
- [ ] `VIS-016 P1` Verify light mode on standard and wide-gamut displays; document color variance.
- [ ] `VIS-017 P1` Verify reduced-motion preference disables or shortens nonessential motion.
- [ ] `VIS-018 P1` Conduct a five-user usability check for finding an evening 5v5 match in a chosen district.

### K. Accessibility — WCAG 2.2 AA

- [ ] `A11Y-001 P0` Run axe or an equivalent scanner on `/vi`, `/ko`, and `/en` at mobile and desktop widths.
- [ ] `A11Y-002 P0` Complete the entire home flow using keyboard only.
- [ ] `A11Y-003 P0` Verify logical focus order from header through filters, cards, and mobile nav.
- [ ] `A11Y-004 P0` Verify a visible focus indicator on every interactive element.
- [ ] `A11Y-005 P0` Verify no keyboard trap in selects, horizontal lists, or expanded filters.
- [ ] `A11Y-006 P0` Verify headings form a logical hierarchy with one meaningful H1.
- [ ] `A11Y-007 P0` Verify landmarks: header, main, sections, and navigation are announced correctly.
- [ ] `A11Y-008 P0` Verify links have meaningful names without relying on surrounding visual context.
- [ ] `A11Y-009 P0` Verify buttons use button semantics and links navigate.
- [ ] `A11Y-010 P0` Verify state is communicated through text/semantics as well as color.
- [ ] `A11Y-011 P0` Measure text and UI-component contrast against AA requirements.
- [ ] `A11Y-012 P0` Verify 44×44 minimum target size and adequate spacing.
- [ ] `A11Y-013 P1` Verify horizontal content is operable without precise dragging.
- [ ] `A11Y-014 P1` Verify decorative SVGs and graphics are hidden from assistive technology.
- [ ] `A11Y-015 P1` Verify skeleton and loading state uses appropriate busy/live semantics without noisy announcements.
- [ ] `A11Y-016 P1` Verify empty and error state changes are announced when caused by user action.
- [ ] `A11Y-017 P0` Test VoiceOver on Safari for header, locale selector, dates, filters, cards, and navigation.
- [ ] `A11Y-018 P1` Test TalkBack on Android Chrome for the same flow.
- [ ] `A11Y-019 P1` Verify 400% zoom/reflow for core content where practical.
- [ ] `A11Y-020 P1` Verify forced-colors/high-contrast mode retains state and focus visibility.

### L. Browser and platform compatibility

- [ ] `COMPAT-001 P0` Run smoke and core filter flow on latest Chrome desktop.
- [ ] `COMPAT-002 P0` Run smoke and core filter flow on latest Safari desktop.
- [ ] `COMPAT-003 P1` Run smoke and core filter flow on latest Firefox desktop.
- [ ] `COMPAT-004 P0` Run smoke and core filter flow on iOS Safari.
- [ ] `COMPAT-005 P0` Run smoke and core filter flow on Android Chrome.
- [ ] `COMPAT-006 P1` Verify touch, mouse, trackpad, and keyboard input.
- [ ] `COMPAT-007 P1` Verify font fallback when Be Vietnam Pro fails to load.
- [ ] `COMPAT-008 P1` Verify private browsing with restricted cookie persistence.
- [ ] `COMPAT-009 P1` Verify slow 3G and high-latency behavior.
- [ ] `COMPAT-010 P1` Verify low-end mobile CPU does not make filter interaction unusable.

### M. Performance and stability

- [ ] `PERF-001 P0` Run Lighthouse mobile and desktop three times; record median results.
- [ ] `PERF-002 P0` Verify LCP ≤ 2.5s at the 75th-percentile target profile.
- [ ] `PERF-003 P0` Verify CLS ≤ 0.1.
- [ ] `PERF-004 P0` Verify INP ≤ 200ms for filter interactions.
- [ ] `PERF-005 P1` Verify initial JS and CSS bundles against an agreed size budget.
- [ ] `PERF-006 P1` Verify font files are self-hosted, cached, and do not block indefinitely.
- [ ] `PERF-007 P1` Verify no unnecessary external network request on the mock home page.
- [ ] `PERF-008 P1` Verify no repeated render/request loop when filters change rapidly.
- [ ] `PERF-009 P1` Run 50 repeated filter/date interactions; expect stable memory and response time.
- [ ] `PERF-010 P1` Navigate between locales repeatedly; expect no progressive slowdown or duplicated handlers.
- [ ] `PERF-011 P1` Verify production caching headers for static assets.
- [ ] `PERF-012 P1` Verify server startup and first response stay within the agreed development budget.

### N. Security, privacy, and dependency QC

- [ ] `SEC-001 P0` Scan tracked files and Git history for API keys, tokens, passwords, private URLs, and personal data.
- [ ] `SEC-002 P0` Verify `.env`, `.env.local`, build output, traces, and test artifacts are ignored.
- [ ] `SEC-003 P0` Verify service-role and payOS secrets are only referenced by server-only modules.
- [ ] `SEC-004 P0` Confirm no server secret uses a `NEXT_PUBLIC_` prefix.
- [ ] `SEC-005 P0` Inject HTML/script-like values into every query parameter; expect no execution or unsafe HTML.
- [ ] `SEC-006 P1` Test very long query values; expect controlled behavior without crash or reflected markup.
- [ ] `SEC-007 P1` Test malformed percent encoding and duplicate query parameters.
- [ ] `SEC-008 P1` Verify locale redirects cannot become an open redirect.
- [ ] `SEC-009 P1` Verify the locale cookie contains only an allowed locale and uses appropriate attributes.
- [ ] `SEC-010 P1` Verify production responses do not expose framework-powered headers where disabled.
- [ ] `SEC-011 P1` Review security headers: CSP, frame-ancestors/X-Frame-Options, nosniff, referrer policy, permissions policy, and HSTS at deployment.
- [ ] `SEC-012 P1` Run dependency vulnerability scanning and triage direct and transitive findings.
- [ ] `SEC-013 P1` Verify lockfile integrity and deterministic installation.
- [ ] `SEC-014 P1` Review third-party package licenses for commercial compatibility.
- [ ] `SEC-015 P1` Verify mock data contains no copied production or personal data.
- [ ] `SEC-016 P1` Verify console logs and error pages contain no tokens, environment data, or full user data.
- [ ] `SEC-017 P1` Verify there is no hidden admin, payment, or excluded-feature UI exposed in Phase 1.
- [ ] `SEC-018 P1` Document threat-model updates required before auth, database, and payment phases.

### O. SEO, metadata, and discoverability

- [ ] `SEO-001 P0` Verify unique localized title and description on vi, ko, and en pages.
- [ ] `SEO-002 P1` Verify Open Graph title, description, type, and locale.
- [ ] `SEO-003 P1` Verify canonical URL points to the correct locale page.
- [ ] `SEO-004 P1` Verify `hreflang` alternatives include vi, ko, and en with correct URLs.
- [ ] `SEO-005 P1` Verify `/robots.txt` is valid and references the sitemap.
- [ ] `SEO-006 P1` Verify `/sitemap.xml` is valid and contains all locale home URLs.
- [ ] `SEO-007 P1` Verify unsupported and missing pages return correct status codes and are not soft 404s.
- [ ] `SEO-008 P1` Verify essential localized content exists in server-rendered HTML.
- [ ] `SEO-009 P1` Verify no staging or localhost URL appears in production metadata after deployment configuration.
- [ ] `SEO-010 P2` Add and verify favicon/app icons before public release.
- [ ] `SEO-011 P2` Add and verify a share image before public release.

### P. Engineering quality control

- [ ] `QC-001 P0` Run `pnpm lint`; expect zero errors and warnings.
- [ ] `QC-002 P0` Run `pnpm typecheck`; expect zero errors.
- [ ] `QC-003 P0` Run `pnpm test`; expect all tests and a nonzero test count.
- [ ] `QC-004 P0` Run `pnpm build`; expect successful route generation.
- [ ] `QC-005 P0` Run `pnpm test:e2e`; expect all mobile and desktop cases to pass.
- [ ] `QC-006 P1` Review automated assertions to ensure they test behavior, not implementation details only.
- [ ] `QC-007 P1` Verify translation-parity test fails when a key is intentionally removed.
- [ ] `QC-008 P1` Verify empty-state test fails when reset behavior is intentionally broken.
- [ ] `QC-009 P1` Verify E2E URL test fails when filter URL synchronization is intentionally broken.
- [ ] `QC-010 P1` Generate a coverage report and review untested domain and interaction branches; do not use percentage alone as acceptance.
- [ ] `QC-011 P1` Review component boundaries for a future Supabase repository replacement.
- [ ] `QC-012 P1` Verify locale-neutral domain types do not import React or browser-only code.
- [ ] `QC-013 P1` Verify browser-safe code cannot import the server environment module.
- [ ] `QC-014 P1` Review use of semantic HTML, stable keys, and error boundaries.
- [ ] `QC-015 P1` Review for dead code, unused dependencies, duplicate translations, and copied constants.
- [ ] `QC-016 P1` Review the dependency build allowlist and justify each package with an install script.
- [ ] `QC-017 P1` Verify generated `AGENTS.md` guidance is followed for the installed Next.js version.
- [ ] `QC-018 P1` Run `git diff --check` and scan for conflict markers and trailing whitespace.
- [ ] `QC-019 P1` Verify a clean Git status after all documented checks.
- [ ] `QC-020 P1` Conduct peer code review focused on defects, security, and missing tests rather than style preference.

### Q. Regression, exploratory, usability, and UAT

- [ ] `REG-001 P0` Run the smoke suite on every pull request.
- [ ] `REG-002 P0` Run unit/component tests on every pull request.
- [ ] `REG-003 P0` Run production build and critical browser tests before merging to main.
- [ ] `REG-004 P1` Compare mobile/tablet/desktop visual baselines for all locales before release.
- [ ] `EXP-001 P1` Freely combine date, locale, and filters for 30 minutes; record unexpected state or confusing behavior.
- [ ] `EXP-002 P1` Stress browser Back, Forward, refresh, duplicate tab, and direct URL entry.
- [ ] `EXP-003 P1` Try rapid clicking, double clicking, long pressing, swiping, and resizing during interaction.
- [ ] `EXP-004 P1` Explore at midnight Vietnam time and around a date rollover.
- [ ] `EXP-005 P1` Explore with cookies disabled, storage cleared, and strict privacy settings.
- [ ] `USE-001 P0` Ask a new user to find an available evening 5v5 match in Phú Nhuận without guidance.
- [ ] `USE-002 P0` Measure whether the user identifies time, venue, area, price, and spots within three seconds.
- [ ] `USE-003 P1` Ask the user to switch language and confirm their selected filters remain.
- [ ] `USE-004 P1` Record task completion, time, errors, backtracking, and qualitative confusion.
- [ ] `UAT-001 P0` Product owner confirms the visual direction, copy, and Phase 1 scope.
- [ ] `UAT-002 P0` Product owner explicitly accepts known limitations: mock data, inactive auth, and missing detail/admin flows.

### R. Release and post-release validation

- [ ] `REL-001 P0` Record commit SHA, build timestamp, environment, and test report.
- [ ] `REL-002 P0` Confirm only reviewed files are included in the release diff.
- [ ] `REL-003 P0` Confirm required checks are green on the exact release commit.
- [ ] `REL-004 P0` Verify installation from the exact remote commit on a clean machine.
- [ ] `REL-005 P1` Verify environment variables and public URL are correct for the target environment.
- [ ] `REL-006 P1` Run a production smoke test immediately after deployment.
- [ ] `REL-007 P1` Verify no localhost URL, source map, test endpoint, or development banner is publicly exposed.
- [ ] `REL-008 P1` Confirm rollback procedure and previous deploy artifact are available.
- [ ] `REL-009 P1` Monitor client/server errors and Core Web Vitals after release.
- [ ] `REL-010 P1` Re-test the reported defect before closing it and run impacted regression cases.

## 6. Existing automated coverage

| Automated suite | Current coverage |
| --- | --- |
| Unit | VND formatting, Vietnam time display, three-locale date formatting, translation-key parity, CTA state |
| Component | Date selection semantics, match-card facts and link, empty-state reset |
| E2E | Vietnamese home content, URL-backed evening/district filters, Korean mobile content, 390px overflow |
| Build QC | ESLint, TypeScript, Vitest, Next.js production build |

Existing automation is a regression baseline, not full acceptance of the manual cases above.

## 7. Required additional automation before Phase 2

- [ ] Add direct tests for all quick-filter combinations and reset behavior.
- [ ] Add browser tests for language switching with query preservation and cookie persistence.
- [ ] Add root locale-detection tests for vi, ko, en, unsupported language, and invalid cookie.
- [ ] Add tests for valid, invalid, and out-of-range date query values.
- [ ] Add full/closed match-card state tests.
- [ ] Add controlled error-boundary and loading-skeleton tests.
- [ ] Add axe accessibility checks for every locale.
- [ ] Add tablet viewport and Safari/WebKit coverage.
- [ ] Add visual snapshots for 390×844, 768×1024, and 1440×900 in every locale.
- [ ] Add Lighthouse CI budgets for LCP, CLS, INP, accessibility, and SEO.
- [ ] Add secret scanning, dependency audit, and license review to CI.
- [ ] Add a clean-clone installation smoke job.

## 8. Defect handling

### Severity

| Severity | Definition | Example |
| --- | --- | --- |
| Blocker | Testing or release cannot continue | App does not install or start |
| Critical | Security/data loss or primary flow unavailable to most users | Script injection, locale home crashes |
| High | Major flow broken without reasonable workaround | Filters do not persist or mobile overflow blocks controls |
| Medium | Feature works incorrectly with a workaround | One filter label/state is wrong |
| Low | Minor visual/content issue with negligible task impact | Small spacing inconsistency |

### Defect record fields

- ID, title, build/commit, environment, locale, browser/device, preconditions, exact steps, actual result, expected result, frequency, severity, screenshots/video/logs, suspected regression range, owner, resolution, and retest evidence

## 9. Test evidence package

For each formal test cycle retain:

- Test run summary and exact commit SHA
- Environment/browser/device matrix
- Passed, failed, blocked, not-run, and not-implemented counts
- Automated command outputs and reports
- Mobile/tablet/desktop screenshots for vi, ko, and en
- Accessibility and Lighthouse reports
- Defect list with severity and disposition
- UAT decision and accepted residual risks

