/**
 * The Vivid design object: tokens, fonts, shell, skins, chart palette, illustrations and
 * stylesheet, checked by `defineDesign()` and frozen.
 *
 * @module
 */
import { type Design, defineDesign } from '@strutvane/ui/design'
import { Icon } from './icons.tsx'
import { Empty, ErrorPicture, Forbidden, NotFound } from './illustrations.tsx'
import { AuthLayout, PageHeader, Shell, Sidebar, TopBar } from './shell.tsx'
import {
  Alert,
  Badge,
  Button,
  Card,
  Checkbox,
  Chip,
  Dialog,
  Field,
  Input,
  Popover,
  Select,
  Skeleton,
  Table,
  Textarea,
  Toast,
} from './skins.tsx'
import { VIVID_STYLESHEET } from './styles.ts'
import { chartPalette, dark, defaults, fonts, light, scale } from './tokens.ts'

/**
 * Vivid: colourful, modern dashboards. Soft-shadow cards on a faintly tinted canvas, a gradient
 * active pill in a sidebar that folds into an icon rail, gradient primary buttons, roomy rows, a
 * split sign-in with original art, and a five-colour chart palette led by the brand.
 *
 * Pass it to `<DesignProvider>` (or set `design: 'vivid'` in `config/ui.ts`). It passes
 * `designConformance()`: every slot, WCAG AA in light and dark at every brand hue, no hard-coded
 * colours, 0 axe violations on the reference screens and no overflow at 375px.
 *
 * @example
 * import { DesignProvider } from '@strutvane/ui/design'
 * import { vivid } from '@strutvane/design-vivid'
 *
 * <DesignProvider design={vivid} overrides={{ brandHue: 150 }} nonce={cspNonce}>
 *   <StrutvaneApp apiUrl="/api" appName="Acme" />
 * </DesignProvider>
 */
export const vivid: Design = defineDesign({
  name: 'vivid',
  description:
    'Colourful, modern dashboards: soft-shadow cards, a gradient active pill and gradient charts.',
  tokens: { light, dark },
  scale,
  defaults,
  fonts,
  shell: { Shell, Sidebar, TopBar, AuthLayout, PageHeader },
  skins: {
    Button,
    Input,
    Textarea,
    Select,
    Checkbox,
    Field,
    Card,
    Badge,
    Alert,
    Table,
    Dialog,
    Popover,
    Toast,
    Chip,
    Skeleton,
    Icon,
  },
  chartPalette,
  illustrations: { Empty, NotFound, Forbidden, Error: ErrorPicture },
  stylesheet: VIVID_STYLESHEET,
})
