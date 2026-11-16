## What & why
<!-- What does this change and why? Link the issue. Screenshots in light and dark for visual changes. -->

## Checklist
- [ ] `npm run ci` passes, including `designConformance(vivid)`
- [ ] Colour literals only in `src/tokens.ts`; no inline `style` attributes
- [ ] Contrast still AA at every brand hue (`test/tokens.test.ts`) for any new colour pair
- [ ] Checked in a browser at 375px and 1440px, light and dark (no sideways scroll)
- [ ] DESIGN.md updated for any visual change; changeset added (`npx changeset`)
- [ ] No secrets, `.env` or Docker files committed
