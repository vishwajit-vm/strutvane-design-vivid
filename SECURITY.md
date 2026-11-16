# Security Policy

## Reporting a vulnerability

**Please do not open public issues for security problems.**

Report vulnerabilities privately through GitHub: go to the **Security** tab of this repository and choose **Report a vulnerability** (private security advisory).

We aim to:
- acknowledge your report within **48 hours**
- give an initial assessment within **5 business days**
- release a fix for high or critical issues within **14 days** where feasible, with coordinated disclosure and credit

## Threat model (summary)

A design is presentation code that runs in every admin page, so its risks are about what reaches the DOM and the stylesheet:

| Threat | Defence | Test |
|---|---|---|
| CSS injection through brand overrides (`--brand-hue`, `--font-sans`, `--radius`, `--density`) breaking out of a declaration or the `<style>` element | Overrides are validated by `@strutvane/ui` (`safeOverrides`); invalid values are dropped, never written. Vivid's own CSS has no `</style>`. | `test/stylesheet.test.ts` (hostile overrides) |
| Inline styles that force `style-src 'unsafe-inline'` | No `style` attribute anywhere; CSS only from the nonce'd `<style>` or the static `vivid.css` | `test/stylesheet.test.ts`, `test/icons.test.tsx`, `test/illustrations.test.tsx`, `test/screens.test.tsx` |
| HTML injection through app names, labels or badges | Rendered as React text, never `innerHTML` | `test/stylesheet.test.ts` (no `innerHTML` in `src/`) |
| An icon name such as `constructor` resolving to an inherited function and being rendered | Own-key lookup only (`lookupIcon`) | `test/icons.test.tsx` |
| Third-party requests (font CDNs) leaking visitors' IPs | Fonts are self-hosted through `@fontsource-variable` | `test/stylesheet.test.ts` |
| Storage access throwing in sandboxes, breaking the page | Every storage access is wrapped; failure only means "not remembered" | `test/shell.test.tsx`, `test/rail.test.ts` |
| Unreadable UI (an accessibility failure that locks users out) | WCAG AA at every brand hue, axe on every reference screen | `test/tokens.test.ts`, `test/conformance.test.ts` |

## Supported versions

Vivid has not been released yet. It follows the core train's support policy ([blueprint §8](https://github.com/vishwajit-vm/strutvane/blob/main/docs/18-v2-blueprint.md)).
