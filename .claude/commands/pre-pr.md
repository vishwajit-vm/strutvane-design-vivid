---
description: Run the pre-PR checklist for this repo
---

Run the pre-PR checklist for Vivid:
1. `git status` and `git diff`: summarise the change.
2. Run `npm run ci`, `node .github/scripts/check-code-rules.mjs` and `node .github/scripts/check-package.mjs`. Report the exact results, including the conformance test count.
3. Confirm there is a changeset, and that DESIGN.md is updated for any visual change.
4. Confirm no `.env`, secrets or Docker files are staged.
5. Invoke the `design-reviewer` subagent on the diff and include its findings.
End with: ready / not ready, and why.
