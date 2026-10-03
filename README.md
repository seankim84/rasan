# RA SÂN web

Mobile-first futsal match discovery and booking for Hồ Chí Minh City. The current Phase 1 foundation includes a responsive, localized match list backed by deterministic mock data.

## Requirements

- Node.js 24
- pnpm 11

## Start locally

```bash
pnpm install --frozen-lockfile
cp .env.example .env.local
pnpm dev
```

Open `http://localhost:3000`. The root detects `vi`, `ko`, or `en` and redirects to an explicit locale URL. You can also open `/vi`, `/ko`, or `/en` directly. External Supabase and payOS credentials are not required in mock mode.

## Checks

```bash
pnpm lint
pnpm typecheck
pnpm test
pnpm build
pnpm test:e2e
```

Playwright browser binaries may need a one-time `pnpm exec playwright install chromium` on a fresh machine.

## Project boundaries

- `src/app`: routes, metadata, and app-level providers
- `src/features`: feature UI and repository adapters
- `src/domain`: reusable domain types and transitions
- `src/lib/i18n`: complete Vietnamese, Korean, and English message catalogs and formatters
- `src/lib/env`: separated browser-safe and server-only environment validation
- `tests`: unit, component, and browser tests
- `docs`: architecture notes and the next delivery backlog

The production data and payment integrations are intentionally deferred. See [Phase 2 backlog](docs/product/phase-2-backlog.md) for the next implementation slice.
