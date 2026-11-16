import { defineConfig, mergeConfig } from 'vitest/config'
import { sharedConfig } from './vitest.shared.ts'

// Repo-specific overrides. Shared defaults come from strutvane-tooling.
// - Tests that render React declare `// @vitest-environment jsdom` at the top; the token and
//   stylesheet tests stay in the default `node` environment.
// - jsdom (not happy-dom): axe-core, which the conformance kit runs on every reference screen,
//   relies on DOM accessibility APIs that jsdom implements more completely.
// - The conformance kit renders the real `<StrutvaneApp>` eight times; 30 s per test leaves room
//   for a loaded machine (the gate runs three times in a row under load).
export default mergeConfig(
  sharedConfig,
  defineConfig({
    test: {
      include: ['test/**/*.test.{ts,tsx}'],
      testTimeout: 30_000,
      coverage: {
        include: ['src/**/*.{ts,tsx}'],
        exclude: ['src/**/index.ts'],
      },
    },
  }),
)
