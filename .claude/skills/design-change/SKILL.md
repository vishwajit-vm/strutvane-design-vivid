---
name: design-change
description: Change Vivid's look safely (a colour, a size, a slot's markup or a stylesheet rule) without breaking the Design contract. Use for any visual change in this repo.
---

# design-change

1. Read `DESIGN.md` and find the rule you are changing. Update it first if the change alters the spec.
2. **A colour:** change it only in `src/tokens.ts`, in both themes. If a component now draws a new text/background pair, add it to `VIVID_PAIRS` in `test/tokens.test.ts`. Run `node_modules/.bin/vitest run test/tokens.test.ts`: every pair must pass at every hue 0–359.
3. **A size or radius:** build it from `--radius` / `--density` (scale tokens) so the public overrides keep working.
4. **A slot's markup:** keep spreading every prop bag (`panelProps`, `regionProps`, `overlayProps`, the rest props) and placing every id (`titleId`, `helpId`, `errorId`, `descriptionId`). Never add a `style` attribute.
5. **A stylesheet rule:** `var(--sv-*)` colours only, scope to `[data-sv-design="vivid"]` or an `svv-` class, no fixed width above 375px outside `min()`, motion covered by the reduced-motion rule.
6. Run `npm run ci`. Then check in a browser at 375px and 1440px, light and dark.
7. Add a changeset (`npx changeset`, `minor` for anything visible, never `major` before 1.0).
