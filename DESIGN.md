# Vivid: the design

> The human-readable spec of `@strutvane/design-vivid`. It grew out of design direction A, "Modern Pro" (hub `spikes/17-design-a-modern-pro`, `DESIGN-A.md`), mapped onto the `@strutvane/ui` Design contract. The source of truth for every value is the code: colours, sizes and fonts in [`src/tokens.ts`](src/tokens.ts), shape and motion in [`src/styles.ts`](src/styles.ts). If this file and the code disagree, the code wins and this file is stale.

## 1. Mood

**Colourful, modern dashboards.** The feel of a polished commercial admin: a white sidebar with a brand-gradient active pill, a calm top bar, and content in soft, rounded cards floating on a faintly tinted page. It should look *finished* at first sight (gradients, glows, illustrations, a five-colour chart palette) and stay *calm* after an eight-hour day (one accent, quiet cool greys, disciplined spacing).

Three words: **layered** (cards, shadows, tints, glows), **vivid** (one strong indigo-violet accent that an app can turn to any hue), **orderly** (one spacing scale, one radius scale, one alignment rule).

Good for analytics, customer-facing dashboards and product consoles. For dense back-office work, Crisp (`@strutvane/design-crisp`, the default) is the quieter choice. Both implement the same contract, so switching is one line.

Everything is original: our own tokens (OKLCH), our own mark and illustrations (hand-written SVG), and open-licence parts only (Tabler Icons MIT, Plus Jakarta Sans OFL via `@fontsource-variable`). No commercial template's CSS, markup, images or colours were used.

## 2. Palette

Every colour is an OKLCH value in `src/tokens.ts`, mapped onto the contract's 28 colour roles. The accent family is built from `var(--brand-hue)` (default **274**, indigo-violet); the far end of the brand gradient (`accentHover`) is the same family turned **18°** further, which gives the active pill and primary buttons their two-tone sheen. Neutrals carry a faint cool tint (hue 274) that stays put when an app rebrands.

**Safe hue range: the whole circle.** Every required pair, and every extra pair Vivid's stylesheet draws, meets WCAG AA at every `--brand-hue` from 0 to 359 in **1° steps**, in both themes (`test/tokens.test.ts`; the conformance kit samples 15° steps). An app can pick any brand hue.

### Light

| Role | Value | Use |
|---|---|---|
| `bg` | `oklch(0.972 0.006 274)` | Page: cool off-white, so white cards float |
| `surface` | `oklch(1 0 0)` | Cards, sidebar, menus, dialogs |
| `surfaceSubtle` / `surfaceMuted` | `0.958 0.008 274` / `0.94 0.012 274` | Table headers, row hover / menu hover, skeletons, badges |
| `fg` / `fgMuted` | `0.29 0.03 274` / `0.5 0.025 274` | Deep ink (never black) / labels, captions |
| `border` / `input` | `0.915 0.01 274` / `0.62 0.02 274` | Hairlines / control borders (≥ 3:1 on surface) |
| `accent` | `oklch(0.5 0.2 var(--brand-hue))` | Main action, active states, gradient start |
| `accentHover` | `oklch(0.46 0.19 calc(var(--brand-hue) + 18))` | Gradient end, hover |
| `accentFg` | `oklch(1 0 0)` | Text on the gradient |
| `accentSubtle` / `accentText` | `0.948 0.03 hue` / `0.47 0.19 hue` | Soft pills, chips / links, accent text |
| `ring` | `oklch(0.55 0.2 var(--brand-hue))` | Focus outline |
| danger | solid `0.54 0.2 25`, text `0.5 0.19 25`, soft `0.955 0.03 20` | Errors, destructive actions |
| success | solid `0.55 0.14 155`, text `0.47 0.12 155`, soft `0.95 0.045 155` | Paid, positive |
| warning | solid `0.66 0.15 65`, text `0.5 0.12 60`, soft `0.955 0.055 80` | Due soon |
| `mark` / `markFg` | `0.93 0.1 95` / ink | Search highlights |

### Dark

| Role | Value | Note |
|---|---|---|
| `bg` / `surface` | `oklch(0.19 0.02 274)` / `0.225 0.024 274` | Deep indigo-navy, cards one step lighter with a visible hairline |
| `fg` / `fgMuted` | `0.93 0.012 274` / `0.75 0.02 274` | Soft white |
| `accent` / `accentHover` | `0.66 0.18 hue` / `0.63 0.18 hue+18` | A brighter gradient… |
| `accentFg` | `oklch(0.16 0.02 274)` | …with deep-ink text on it |
| `accentText` | `0.83 0.1 hue` | Accent text is *lighter* in dark |
| status text | danger `0.8 0.11 22`, success `0.82 0.12 155`, warning `0.85 0.11 80` | Flips light-on-dark |

**Why dark mode puts ink, not white, on the gradient.** The contract also requires the accent to reach 3:1 against the dark surface (it marks the current page, checkboxes and focus). No lightness lets white text reach 4.5:1 on the accent *and* the accent reach 3:1 on a dark card at every hue (we searched the whole space). A brighter gradient with deep-ink text passes both at every hue, and still reads as vivid.

**Pairing rule.** Every tone has a *text* role and a *soft* role: `successText` on `successSubtle`, `accentText` on `accentSubtle`. Components never invent pairs.

### Charts

Five series, the brand first: `brand`, cyan `195`, amber `75`, pink `350`, green `155`; lifted in dark mode. Series 1 reaches 3:1 on the surface at every hue. Use gradient area fills for the lead series, dashed gridlines only, and pair every colour with a label or legend.

## 3. Typography

**Plus Jakarta Sans Variable** (OFL), self-hosted through `@strutvane/design-vivid/fonts.css`; the system UI font is the fallback. Tables, details and KPI numbers use tabular figures.

| Role | Size | Weight |
|---|---|---|
| Page title (h1) | 24px (`fontSizeLg`), tight tracking | 700 |
| Sign-in headline | 28px | 700 |
| Card / dialog title | 16–18px | 600–700 |
| Body | 14px (`fontSize`) | 400–600 |
| Label, caption | 13px (`fontSizeSm`) | 500–600 |
| Overline (sidebar sections, table headers, detail labels) | 11px, +0.08em, uppercase | 600 |

Hierarchy comes from **weight and colour first, size second**.

## 4. Spacing, radius, shadow, motion

- **Density:** 38px controls, 52px table rows and a 4px spacing step at `--density: 1` (roomier than Crisp). Compact tables shrink to 0.8×.
- **Radius** from `--radius` (default 8px): 6px badges and chips (`radiusSm`), 8px controls (`radiusMd`), 10px nav pills and menu items, 14px cards and the table box (`radiusLg`), 18px dialogs.
- **Shadow:** `shadow.sm` (cards, controls at rest), `shadow.pop` (menus, dialogs, toasts, the drawer), and an accent glow under the active pill and primary buttons (the accent itself with a negative spread, so no extra colour is needed).
- **Motion:** 150–220ms ease-out. Nav items nudge 2px on hover, menus and dialogs pop in, the drawer slides, skeletons shimmer. All motion stops under `prefers-reduced-motion`.

## 5. Components

- **Sidebar** (260px): mark + app name; uppercase overline group headings; 42px items with 22px icons; **current page = brand-gradient pill with an accent glow**; count badges as soft pills (outlined on the pill). On desktop it **collapses to a 76px icon rail** (the toggle sits beside the mark and is remembered per browser); an item whose icon Vivid doesn't have shows its first letter, so nothing vanishes in the rail. Below 1024px it becomes a drawer over a blurred scrim.
- **Top bar** (64px, sticky): the search / command palette trigger styled as a search field with its `Ctrl K` hint, then theme, workspace and account on the right.
- **Page header:** breadcrumbs above one row with Back, the title, its count pill and the actions, vertically centred; on phones the actions wrap below and share the width.
- **Cards and record details:** white on the tinted page, 14px corners, `shadow.sm`, hairline border; detail labels are overlines.
- **Buttons:** primary on the gradient with a glow (one per view), secondary outlined, ghost bare, danger solid (confirmations only). 38px, 32px small.
- **Inputs:** 38px, a 3:1 border, an accent border plus a soft 3px halo and the focus ring on focus, a danger border and halo when `aria-invalid`.
- **Badges:** a soft tint, a dot and the word (never colour alone).
- **Tables:** inside their own positioned scroll box (the page never scrolls sideways), overline headers on `surfaceSubtle`, sticky, tabular numbers, a row tint on hover.
- **Overlays:** menus 10px corners + `shadow.pop`; dialogs 18px corners over a blurred scrim; toasts top-right below the top bar (never over a form's actions), with a tinted icon chip.
- **Illustrations:** original token-coloured SVGs for empty, not found, forbidden and error states, the sign-in brand panel and the mark. Always decorative.
- **Sign-in:** split: a brand panel on the gradient with the app name and original "glass dashboard" art, beside a calm form column. Below 1024px only the form shows, with the mark on top.

## 6. Do / don't

**Do**
- Use one primary button per view; everything else is secondary or ghost.
- Pair every status colour with a word and a dot.
- Keep numbers tabular and right-aligned; put the unit in the header.
- Let wide content scroll **inside** its box.
- Give every icon-only control an accessible name.

**Don't**
- Don't write a literal colour anywhere but `src/tokens.ts` (the conformance kit fails).
- Don't put the gradient on more than one element per region (the active pill, the primary action, the sign-in panel).
- Don't use red for anything but errors, overdue and destructive actions.
- Don't put essential information in illustrations, tooltips, hover states or charts only.
- Don't add inline `style` attributes: styles come only from the nonce'd `<style>` or the CSS file.
