# CLAUDE.md: Strutvane Design Vivid (`@strutvane/design-vivid`)

Project memory for Claude Code in this repository. Keep this file short, accurate and current.

## Ecosystem memory (shared by every Strutvane repo)

The file below is synced from strutvane-tooling and is identical in every repo. Read it before changing anything.

@.claude/ECOSYSTEM.md

## What this repo is

**Vivid**, the colourful first-party design of the Strutvane admin ("Colourful, modern dashboards"; hub `docs/18-v2-blueprint.md` §5.1, CONSISTENCY #129). It implements the `@strutvane/ui` v2 Design contract with one `defineDesign()` call and must pass `designConformance()`. The look comes from hub spike 17 ("Modern Pro") and is specified in `DESIGN.md`.

## Status

- **`0.2.0-next.1` (changesets pre mode `next`, core train #128), implemented and tested, not released.** Built and tested against the published `@strutvane/ui` `0.2.0-next.1` (the peer floor, pinned as a devDependency; `test/package.test.ts` keeps them equal); plain `npm ci` works from the committed lockfile.
- Gates: conformance 15/15 (9 reference screens), extra dark/rail/override screens, contrast at every hue in 1° steps, coverage ≥ 90/90/85/90, publint `--strict`, attw (`.attw.json` excludes the two CSS entrypoints, which attw can't resolve).

## Commands

```bash
npm install
npm run ci                                            # biome → tsc → vitest --coverage → tsdown → CSS files
node_modules/.bin/vitest run test/conformance.test.ts # the contract gate alone
node .github/scripts/check-code-rules.mjs && node .github/scripts/check-package.mjs
```

`node_modules` comes from the registry (`npm ci`). To try an unreleased ui change, link it through a scratch npm workspace, but never commit `file:`/`link:` specs or a lockfile written from that layout (its `"link": true` entries break `npm ci`).

## Structure

- `src/tokens.ts`: **the only file with colour literals.** Light and dark roles (OKLCH, accent from `var(--brand-hue)`, gradient end = accent turned 18°), scale, chart palette, defaults, fonts.
- `src/styles.ts`: the stylesheet string; colours only through `var(--sv-*)`; `svv-` classes and `[data-sv-design="vivid"]`-scoped hooks.
- `src/shell.tsx` (Shell with the icon-rail context, Sidebar, TopBar, AuthLayout, PageHeader), `src/skins.tsx`, `src/icons.tsx` (curated Tabler set, `createIconSkin`), `src/illustrations.tsx` (original SVG), `src/rail.ts` (rail preference storage).
- `src/vivid.ts` (`defineDesign`), `src/with-icons.ts`, `src/stylesheet-file.ts` (`vividStylesheet`, `FONTS_CSS`), `scripts/build-css.mjs` (writes `dist/vivid.css` and `dist/fonts.css` from the built design).
- `test/conformance.test.ts` (the kit), `tokens` (hue sweep), `screens` (dark, rail, overrides), unit tests per module, `types.test-d.ts`, `package.test.ts`.

## Invariants (tests guard these)

- Colour literals only in `src/tokens.ts`; no inline `style`; no `innerHTML`.
- Every contract pair and every extra pair the stylesheet draws is AA at every hue 0–359 (1° steps), both themes. Add new pairs to `VIVID_PAIRS` in `test/tokens.test.ts`.
- Dark mode puts deep ink (`accentFg`) on the gradient: white text can't meet 4.5:1 while the accent meets 3:1 on the dark surface at every hue.
- Nothing widens the page: `min-width:0` columns, tables in a positioned `overflow-x:auto` box, no fixed width over 375px outside `min()`.
- Icon lookup by own key only. Storage failures never throw.
- Slots spread the prop bags and place the ids they receive; designs never fetch or read the manifest.

## Boundaries

- Peers: `@strutvane/ui` and `react` only; no other Strutvane package. Dependencies: `@tabler/icons-react`, `@fontsource-variable/plus-jakarta-sans`.
- Contract gaps go to `@strutvane/ui` (RFC), never worked around by reaching into ui internals.
- Original assets only.

## Definition of done

Code, tests, DESIGN.md and a changeset ship together; conformance passes; the browser pass (375px and 1440px, both themes) is done for visual changes.
