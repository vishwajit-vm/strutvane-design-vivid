# Release readiness

<!--
  Created once by strutvane-tooling (canonical/RELEASE-READINESS.md). This repo owns this file:
  sync never overwrites it. Gates and rules: hub docs/19-production-readiness.md
  (https://github.com/vishwajit-vm/strutvane/blob/main/docs/19-production-readiness.md).

  A version reaches npm `latest` only when every gate below is "pass" with evidence. One row per
  gate: the status (pass / fail / not checked), a link to the evidence (CI run, report or test
  file; never "trust me"), and the date it was checked (YYYY-MM-DD). The coordinator re-runs the
  checks before a gate is accepted; the project lead approves the staged release.
-->

Package: `@strutvane/design-vivid` · Version: `0.2.0-next.0` · Last reviewed: 2026-11-16

Local evidence only so far: the repo has no GitHub remote and no CI run yet, and `@strutvane/ui` 0.2.0-next.0 is not on npm, so there is no `package-lock.json` (CI's `npm ci` can't run until it is published). Nothing below is "pass" on CI evidence yet.

| Gate | What must be true (summary; docs/19 is the source) | Checked by | Status | Evidence | Date |
|---|---|---|---|---|---|
| R1 Code | Strict TS, ESM, lint clean, no `console.` in `src/`, no TODO/FIXME without an issue, TSDoc on every export | CI `verify` (`npm run ci`, `check-code-rules.mjs`) | pass (local) | `npm run ci` (biome, `tsc`) and `check-code-rules.mjs` green on Windows, Node 24.21; ecosystem-guardian review of 905fb05 found no R1 issue | 2026-11-16 |
| R2 Tests | Green on Node 24 and 26 × Linux, Windows, macOS; coverage ≥ 90/90/85/90; type-level tests; 3 green runs in a row; no unhandled rejections or open handles | CI `verify` matrix and `repeat` job | partial | Local: full gate 3× in a row under CPU load (Windows, Node 24), 233 tests, coverage 100/100/100/100, `test/types.test-d.ts`. Matrix (Node 26, Linux, macOS) not run: needs CI | 2026-11-16 |
| R3 Security | Threat model; attack-style tests; parsers fuzzed; review with 0 open critical/high; `npm audit --omit=dev` 0 high/critical; secrets scan clean | `security-reviewer` report; CI `security` job | partial | Threat model in `SECURITY.md`; attack tests: hostile overrides (`test/stylesheet.test.ts`), inherited icon names (`test/icons.test.tsx`), no inline style / innerHTML, storage failures. No parser in this package. `npm audit` and TruffleHog need the lockfile and CI | 2026-11-16 |
| R4 Resilience | Failure scenarios named and tested; fails closed; idempotent retries; soak test with no growth | Resilience suites; `npm run test:soak` | partial | Named: blocked/throwing/absent storage, unknown icons, invalid overrides, SSR first render (`test/shell.test.tsx`, `test/rail.test.ts`). No I/O or retries in a design; soak not applicable | 2026-11-16 |
| R5 Packaging | publint and attw clean; tarball has no tests, fixtures, secrets or local map paths; exports resolve; `engines.node` ≥ 24.3; one framework copy; LICENSE, README, CHANGELOG; a changeset | CI `package-check` job | pass (local) | `check-package.mjs` green; `publint --strict` "All good"; `attw --profile esm-only` clean (`.attw.json` excludes the two CSS entrypoints); `test/package.test.ts` | 2026-11-16 |
| R6 Integration | Installs alone and with every package, in any order, identically; re-install is a no-op; complete `.env.example`; boot fails closed; only the six connections; Northwind Ops green | Hub nightly ecosystem job; installer e2e | not checked | Needs the installer (`--design vivid`, `node strut design:use vivid`) and Northwind Ops | |
| R7 Docs | Every public feature documented with tested examples; upgrade guide; packages data, what's-new, versioning table and deprecations updated in the same change | Docs site tests | partial | README, DESIGN.md, CHANGELOG; docs-site pages not written | 2026-11-16 |
| R8 Release | Version per ADR-0020; staged by CI with provenance, approved with 2FA (ADR-0018); right dist-tag; release notes; rollback plan; `versions.json` updated | Release workflow; owner approval | not checked | `0.2.0-next.0` in changesets pre mode `next` (#128) | |
| R9 Operations | Logs only through the framework Logger with redaction (ADR-0022); health and readiness checks; no debug tool reachable in production | Tests; `security:check` | pass (by design) | No logging, no network, no debug tooling in the package (`check-code-rules.mjs`: no console) | 2026-11-16 |
