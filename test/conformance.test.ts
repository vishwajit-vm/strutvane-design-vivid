// @vitest-environment jsdom
/**
 * The gate every Strutvane design must pass before it is listed (blueprint §5.1): every slot, WCAG
 * AA in light and dark at every brand hue, no hard-coded colours anywhere in `src/` but the token
 * file, every public override token taking effect (and injected with the nonce), no fixed width
 * wider than a phone, and axe with 0 violations plus no overflow on all eight reference screens.
 */
import { designConformance } from '@strutvane/ui/testing'
import { vivid } from '../src/index.ts'

designConformance(vivid, { sources: ['src'], tokenFiles: ['src/tokens.ts'] })
