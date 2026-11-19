# @strutvane/design-vivid

## 0.2.0-next.1

### Patch Changes

- Requires `@strutvane/ui` `^0.2.0-next.1`, the first ui version on npm (`0.2.0-next.0` was never published), and is tested against exactly that version.

## 0.2.0-next.0

### Minor Changes

- First release of Vivid, the colourful Strutvane admin design ("Colourful, modern dashboards"), built on the `@strutvane/ui` v2 Design contract and passing `designConformance()` in full.
  
  - One `defineDesign()` with every slot: the shell (sidebar with the gradient active pill and a remembered icon rail, sticky top bar, split sign-in, page header), all 16 skins and four original illustrations.
  - OKLCH tokens for light and dark. The accent follows `--brand-hue` and stays WCAG AA at every hue from 0 to 359. `--font-sans`, `--radius` and `--density` all take effect.
  - Plus Jakarta Sans, self-hosted through `@strutvane/design-vivid/fonts.css`.
  - A five-series chart palette led by the brand.
  - Tabler icons from a curated set; add more with `withIcons()`.
  - Styles come only from the nonce'd `<style>` or the static `@strutvane/design-vivid/vivid.css`, never from inline styles. `vividStylesheet()` bakes your brand into a file.
