# Foundation architecture

RA SÂN uses locale-prefixed Next.js App Router pages. UI messages live in feature-shaped namespaces, while locale-neutral match types and state transitions live under `src/domain` so a future Expo client can share them.

The home page reads matches through `MatchRepository`. Phase 1 binds it to `MockMatchRepository`; Phase 2 will add a Supabase implementation without changing presentation components. TanStack Query is installed and provided at the application boundary for authenticated and mutable flows introduced later.

Browser-safe and server-only environment schemas are split into separate modules. Payment and Supabase secrets must only be imported from server routes or server actions. The default `PAYMENTS_MODE=mock` keeps local development independent of external credentials.
