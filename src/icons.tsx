/**
 * Vivid's icons: the `Icon` skin, drawn with Tabler Icons (MIT; the ecosystem's icon set,
 * decision #57).
 *
 * Why a curated set instead of all ~6,000 Tabler icons: an icon name arrives at runtime (from the
 * manifest, the sidebar or the behaviour), so a design that could draw any name would have to
 * ship every icon in the app's bundle. Vivid ships the ~110 icons an admin needs (navigation,
 * CRUD actions, common resource kinds) and lets an app add its own with {@link withIcons}. An
 * unknown name draws nothing, as the contract says; the sidebar then shows the label's first
 * letter instead, so an item never disappears in the icon rail.
 *
 * @module
 */

import type { IconProps } from '@strutvane/ui/design'
import {
  IconActivity,
  IconAdjustments,
  IconAlertCircle,
  IconAlertTriangle,
  IconApps,
  IconArchive,
  IconArrowBackUp,
  IconArrowLeft,
  IconArrowRight,
  IconArrowsSort,
  IconBell,
  IconBook,
  IconBox,
  IconBriefcase,
  IconBuilding,
  IconBuildingBank,
  IconBuildingStore,
  IconCalendar,
  IconCalendarEvent,
  IconCash,
  IconChartBar,
  IconChartPie,
  IconCheck,
  IconChecklist,
  IconChevronDown,
  IconChevronLeft,
  IconChevronRight,
  IconChevronUp,
  IconCircleCheck,
  IconClipboardList,
  IconClock,
  IconCloud,
  IconCode,
  IconCoin,
  IconColumns,
  IconCommand,
  IconCopy,
  IconCreditCard,
  IconDatabase,
  IconDeviceDesktop,
  IconDots,
  IconDotsVertical,
  IconDownload,
  IconEdit,
  IconExternalLink,
  IconEye,
  IconFile,
  IconFileDescription,
  IconFileInvoice,
  IconFileText,
  IconFilter,
  IconFlag,
  IconFolder,
  IconHeart,
  IconHelp,
  IconHistory,
  IconHome,
  IconInbox,
  IconInfoCircle,
  IconKey,
  IconKeyboard,
  IconLayoutDashboard,
  IconLayoutSidebarLeftCollapse,
  IconLayoutSidebarLeftExpand,
  IconLink,
  IconList,
  IconListDetails,
  IconLock,
  IconLogin,
  IconLogout,
  IconMail,
  IconMapPin,
  IconMenu2,
  IconMessage,
  IconMinus,
  IconMoon,
  IconNews,
  IconPackage,
  IconPaperclip,
  IconPencil,
  IconPhoto,
  IconPlug,
  IconPlus,
  IconReceipt,
  IconRefresh,
  IconRocket,
  IconSearch,
  IconSelector,
  IconSend,
  IconServer,
  IconSettings,
  IconShield,
  IconShoppingCart,
  IconSortAscending,
  IconSortDescending,
  IconSparkles,
  IconStar,
  IconSun,
  IconTable,
  IconTag,
  IconTags,
  IconTerminal,
  IconTicket,
  IconTools,
  IconTrash,
  IconTrendingDown,
  IconTrendingUp,
  IconTruck,
  IconUpload,
  IconUser,
  IconUserCircle,
  IconUsers,
  IconUsersGroup,
  IconWallet,
  IconWorld,
  IconX,
  type TablerIcon,
} from '@tabler/icons-react'
import type { ComponentType, ReactElement } from 'react'

/** A drawable icon: any Tabler icon component (or one built the same way). */
export type VividIconComponent = TablerIcon

/** Icons by Tabler name, such as `{ 'file-invoice': IconFileInvoice }`. */
export type VividIconSet = Readonly<Record<string, VividIconComponent>>

/**
 * The icons Vivid can draw, by Tabler name. Frozen; extend it with {@link withIcons}.
 *
 * @example
 * Object.hasOwn(VIVID_ICONS, 'users') // true
 */
export const VIVID_ICONS: VividIconSet = Object.freeze({
  activity: IconActivity,
  adjustments: IconAdjustments,
  'alert-circle': IconAlertCircle,
  'alert-triangle': IconAlertTriangle,
  apps: IconApps,
  archive: IconArchive,
  'arrow-back-up': IconArrowBackUp,
  'arrow-left': IconArrowLeft,
  'arrow-right': IconArrowRight,
  'arrows-sort': IconArrowsSort,
  bell: IconBell,
  book: IconBook,
  box: IconBox,
  briefcase: IconBriefcase,
  building: IconBuilding,
  'building-bank': IconBuildingBank,
  'building-store': IconBuildingStore,
  calendar: IconCalendar,
  'calendar-event': IconCalendarEvent,
  cash: IconCash,
  'chart-bar': IconChartBar,
  'chart-pie': IconChartPie,
  check: IconCheck,
  checklist: IconChecklist,
  'chevron-down': IconChevronDown,
  'chevron-left': IconChevronLeft,
  'chevron-right': IconChevronRight,
  'chevron-up': IconChevronUp,
  'circle-check': IconCircleCheck,
  'clipboard-list': IconClipboardList,
  clock: IconClock,
  close: IconX,
  cloud: IconCloud,
  code: IconCode,
  coin: IconCoin,
  columns: IconColumns,
  command: IconCommand,
  copy: IconCopy,
  'credit-card': IconCreditCard,
  dashboard: IconLayoutDashboard,
  database: IconDatabase,
  delete: IconTrash,
  'device-desktop': IconDeviceDesktop,
  dots: IconDots,
  'dots-vertical': IconDotsVertical,
  download: IconDownload,
  edit: IconEdit,
  'external-link': IconExternalLink,
  eye: IconEye,
  file: IconFile,
  'file-description': IconFileDescription,
  'file-invoice': IconFileInvoice,
  'file-text': IconFileText,
  filter: IconFilter,
  flag: IconFlag,
  folder: IconFolder,
  heart: IconHeart,
  help: IconHelp,
  history: IconHistory,
  home: IconHome,
  inbox: IconInbox,
  'info-circle': IconInfoCircle,
  key: IconKey,
  keyboard: IconKeyboard,
  'layout-dashboard': IconLayoutDashboard,
  'layout-sidebar-left-collapse': IconLayoutSidebarLeftCollapse,
  'layout-sidebar-left-expand': IconLayoutSidebarLeftExpand,
  link: IconLink,
  list: IconList,
  'list-details': IconListDetails,
  lock: IconLock,
  login: IconLogin,
  logout: IconLogout,
  mail: IconMail,
  'map-pin': IconMapPin,
  menu: IconMenu2,
  'menu-2': IconMenu2,
  message: IconMessage,
  minus: IconMinus,
  moon: IconMoon,
  news: IconNews,
  package: IconPackage,
  paperclip: IconPaperclip,
  pencil: IconPencil,
  photo: IconPhoto,
  plug: IconPlug,
  plus: IconPlus,
  receipt: IconReceipt,
  refresh: IconRefresh,
  rocket: IconRocket,
  search: IconSearch,
  selector: IconSelector,
  send: IconSend,
  server: IconServer,
  settings: IconSettings,
  shield: IconShield,
  'shopping-cart': IconShoppingCart,
  'sort-ascending': IconSortAscending,
  'sort-descending': IconSortDescending,
  sparkles: IconSparkles,
  star: IconStar,
  sun: IconSun,
  table: IconTable,
  tag: IconTag,
  tags: IconTags,
  terminal: IconTerminal,
  ticket: IconTicket,
  tools: IconTools,
  trash: IconTrash,
  'trending-down': IconTrendingDown,
  'trending-up': IconTrendingUp,
  truck: IconTruck,
  upload: IconUpload,
  user: IconUser,
  'user-circle': IconUserCircle,
  users: IconUsers,
  'users-group': IconUsersGroup,
  wallet: IconWallet,
  world: IconWorld,
  x: IconX,
})

/**
 * The icon for `name` in `icons`, or `undefined`. Only the set's own keys count, so a hostile or
 * accidental name such as `constructor` or `__proto__` can never pick up an inherited function
 * and render it as a component.
 *
 * @example
 * lookupIcon(VIVID_ICONS, 'home') // IconHome
 * lookupIcon(VIVID_ICONS, 'constructor') // undefined
 */
export function lookupIcon(icons: VividIconSet, name: string): VividIconComponent | undefined {
  return Object.hasOwn(icons, name) ? icons[name] : undefined
}

/** Pixel sizes of the two icon sizes the contract knows. */
const SIZES = { sm: 16, md: 20 } as const

/**
 * Build an `Icon` skin that draws from `icons`. Decorative by contract: `aria-hidden`, never
 * focusable, coloured with `currentColor` so it always matches the text beside it.
 *
 * @example
 * const Icon = createIconSkin({ ...VIVID_ICONS, truck: IconTruck })
 * <Icon name="truck" size="sm" />
 */
export function createIconSkin(icons: VividIconSet): ComponentType<IconProps> {
  // biome-ignore lint/correctness/noComponentHookFactories: a design is built once at module scope (or once per withIcons call), never during render, so the component identity is stable.
  function Icon({ name, size = 'md' }: IconProps): ReactElement | null {
    const Glyph = lookupIcon(icons, name)
    if (!Glyph) return null
    return (
      <Glyph
        aria-hidden="true"
        focusable="false"
        className={`svv-icon svv-icon-${size}`}
        size={SIZES[size]}
        stroke={1.75}
      />
    )
  }
  return Icon
}

/**
 * Vivid's `Icon` skin, drawing from {@link VIVID_ICONS}.
 *
 * @example
 * <Icon name="users" />
 */
export const Icon: ComponentType<IconProps> = createIconSkin(VIVID_ICONS)
