/**
 * `@strutvane/design-vivid`: Vivid, the colourful Strutvane admin design.
 *
 * `@strutvane/ui` holds the behaviour (screens, tables, forms, the palette, every convenience) and
 * has no look of its own; a design package holds the look. Vivid is the colourful one: soft-shadow
 * cards, a gradient active pill, an icon rail, roomy rows and gradient charts. Crisp
 * (`@strutvane/design-crisp`) is the quiet default. Both implement the same Design contract, so
 * switching is one line and no screen changes.
 *
 * ```tsx
 * import { DesignProvider } from '@strutvane/ui/design'
 * import { vivid } from '@strutvane/design-vivid'
 * import '@strutvane/design-vivid/fonts.css'
 *
 * <DesignProvider design={vivid}><StrutvaneApp apiUrl="/api" appName="Acme" /></DesignProvider>
 * ```
 *
 * The parts are exported too, for eject (`node strut design:eject`), for tests and for designs
 * that build on Vivid. The guide is `DESIGN.md`.
 *
 * @module
 */

export {
  createIconSkin,
  Icon,
  lookupIcon,
  VIVID_ICONS,
  type VividIconComponent,
  type VividIconSet,
} from './icons.tsx'
export { AuthArt, Empty, ErrorPicture, Forbidden, LogoMark, NotFound } from './illustrations.tsx'
export { RAIL_STORAGE_KEY, readRail, writeRail } from './rail.ts'
export { AuthLayout, PageHeader, Shell, Sidebar, TopBar } from './shell.tsx'
export {
  Alert,
  Badge,
  Button,
  Card,
  Checkbox,
  Chip,
  Dialog,
  Field,
  Input,
  MAX_SKELETON_LINES,
  Popover,
  Select,
  Skeleton,
  Table,
  Textarea,
  Toast,
} from './skins.tsx'
export { VIVID_STYLESHEET } from './styles.ts'
export { FONTS_CSS, vividStylesheet } from './stylesheet-file.ts'
export { chartPalette, dark, defaults, fonts, light, scale } from './tokens.ts'
export { vivid } from './vivid.ts'
export { withIcons } from './with-icons.ts'
