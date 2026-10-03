# Phase 2 backlog — Match discovery

The next smallest delivery replaces the mock match repository with the first Supabase-backed read path.

1. Add timestamped migrations for profiles, venues, pitches, matches, reservations, and payment tables.
2. Enable RLS and add public read policies for published venues and bookable matches.
3. Add deterministic Hồ Chí Minh City seed data for 14 days.
4. Implement the Supabase server client and `SupabaseMatchRepository` behind the existing `MatchRepository` interface.
5. Add `/[locale]/matches/[matchId]` with loading, missing, closed, and cancelled states.
6. Add integration tests for public visibility and private-row isolation.

Before starting Phase 3, validate the list and detail pages against a local Supabase instance and preserve the current mock repository for UI tests.
