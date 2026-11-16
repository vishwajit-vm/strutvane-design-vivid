# Contributing to Strutvane Design: Vivid

Thanks for your interest! Vivid is one design of [Strutvane](https://github.com/vishwajit-vm/strutvane)'s admin UI. It implements the `@strutvane/ui` Design contract (`docs/design-contract.md` in [strutvane-ui](https://github.com/vishwajit-vm/strutvane-ui)).

## Ground rules
- Be kind and constructive. We follow the [Contributor Covenant](https://www.contributor-covenant.org/version/2/1/code_of_conduct/).
- The look is specified in [DESIGN.md](DESIGN.md). Change it there and in the code together.
- Colours live only in `src/tokens.ts`. Every new text/background pair gets a contrast test at every brand hue.
- Original assets only: no art, CSS or markup copied from templates or other products.
- Contract changes (new slots, roles or tokens) belong to `@strutvane/ui` and go through an RFC there.
- Every change ships with tests, docs and a changeset. Sign off your commits (DCO): `git commit -s`.

## Development
Requirements: Node 24.3+ and npm 11.19+.

```bash
npm install
npm run ci        # biome → tsc → vitest --coverage (conformance included) → tsdown → CSS files
```

Before `@strutvane/ui` `0.2.0-next.0` is on npm, link a local build through a scratch npm workspace (an umbrella folder with `ui` as a workspace whose `node_modules` this repo uses). Never commit `file:` or `link:` specs: CI refuses them.

**Browser pass** (what jsdom can't check), before every release: both themes, 375×812 and 1440×900, every reference screen (see the contract guide §9); `document.documentElement.scrollWidth <= innerWidth` must be `true`, and Lighthouse contrast must pass.
