/**
 * Vivid's shell: the page frame (`Shell`), the vertical menu (`Sidebar`), the sticky top bar
 * (`TopBar`), the split sign-in layout (`AuthLayout`) and the page header (`PageHeader`).
 *
 * The behaviour (`@strutvane/ui`) hands every slot ready-made pieces: the skip link, the `<main>`
 * landmark, the menu button, the links with their `aria-current`. These slots only place and
 * style them, so keyboard, focus and ARIA wiring arrive intact. Vivid adds two things of its own:
 * - **the icon rail:** on desktop the sidebar collapses to a 76px column of icons, remembered per
 *   browser (`rail.ts`). The toggle lives inside the `<nav>` and is named after it, so it needs no
 *   text of its own (designs have no message catalog) and stays inside a landmark;
 * - **the split sign-in:** a brand panel on the accent gradient with original art beside the form,
 *   dropped below 64rem so the form is the first thing on a phone.
 *
 * Class names start with `svv-` (Vivid), so they can't clash with an app's own classes.
 *
 * @module
 */

import type {
  AuthLayoutProps,
  PageHeaderProps,
  ShellProps,
  SidebarProps,
  TopBarProps,
} from '@strutvane/ui/design'
import {
  createContext,
  type ReactElement,
  useCallback,
  useContext,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
} from 'react'
import { AuthArt, LogoMark } from './illustrations.tsx'
import { readRail, writeRail } from './rail.ts'

/** What the `Shell` shares with the `Sidebar` it frames. */
interface RailState {
  /** Whether the desktop sidebar is the icon rail. */
  readonly rail: boolean
  /** Switch between the rail and the full sidebar (and remember it). */
  readonly toggle: () => void
  /** The id of the sidebar column, for the toggle's `aria-controls`. */
  readonly columnId: string
}

/** `null` when a `Sidebar` is rendered outside Vivid's `Shell` (then it has no rail toggle). */
const RailContext = createContext<RailState | null>(null)

/**
 * The page frame around every signed-in screen: a sticky sidebar column and a content column with
 * the top bar and `<main>`. Below 64rem the sidebar is a drawer over a blurred scrim.
 *
 * @example
 * <Shell skipLink={skip} sidebar={nav} topBar={bar} main={<main>…</main>} navOpen={false} onCloseNav={close} />
 */
export function Shell(props: ShellProps): ReactElement {
  // Start expanded and read the stored choice after mount, so a server-rendered page and the
  // first client render agree (no hydration mismatch); the rail then applies one frame later.
  const [rail, setRail] = useState(false)
  const restored = useRef(false)
  const columnId = useId()
  const toggle = useCallback(() => {
    setRail((current) => !current)
  }, [])
  // Persist after a change is committed, never inside the updater (React may run updaters
  // twice). The first run only restores: writing before the read would erase the stored choice.
  useEffect(() => {
    if (!restored.current) {
      restored.current = true
      setRail(readRail())
      return
    }
    writeRail(rail)
  }, [rail])
  const value = useMemo<RailState>(() => ({ rail, toggle, columnId }), [rail, toggle, columnId])
  return (
    <RailContext.Provider value={value}>
      <div
        className="svv-shell"
        data-sv-part="shell"
        data-nav-open={props.navOpen || undefined}
        data-rail={rail || undefined}
      >
        {props.skipLink}
        {props.navOpen ? (
          // biome-ignore lint/a11y/noStaticElementInteractions: the scrim only mirrors the close button for pointer users.
          // biome-ignore lint/a11y/useKeyWithClickEvents: Escape and the close button already close the drawer.
          <div className="svv-scrim" data-sv-part="scrim" onClick={props.onCloseNav} />
        ) : null}
        <div className="svv-shell-nav" id={columnId}>
          {props.sidebar}
        </div>
        <div className="svv-shell-body">
          {props.topBar}
          {props.main}
        </div>
      </div>
    </RailContext.Provider>
  )
}

/** Splits text into user-perceived characters (grapheme clusters). */
const graphemes = new Intl.Segmenter(undefined, { granularity: 'grapheme' })

/**
 * The first character of a label as a reader sees it: a whole emoji (even a ZWJ sequence) or a
 * whole accented letter (even a decomposed one), never half of one.
 */
function monogram(label: string): string {
  const first = graphemes.segment(label.trim())[Symbol.iterator]().next()
  return first.done ? '' : first.value.segment.toUpperCase()
}

/**
 * The vertical menu: the brand, then one labelled list per group. The current page is a gradient
 * pill with an accent glow; count badges are soft pills. In the icon rail only the icons (or the
 * label's first letter, when a name has no icon) show, and each link keeps its full accessible
 * name.
 *
 * @example
 * <Sidebar label="Main" brand={<a href="/">Acme</a>} groups={groups} Link={NavLink} Icon={Icon} />
 */
export function Sidebar({ label, brand, groups, Link, Icon }: SidebarProps): ReactElement {
  const rail = useContext(RailContext)
  const baseId = useId()
  return (
    <nav aria-label={label} className="svv-sidebar" data-sv-part="sidebar">
      <div className="svv-sidebar-top">
        <div className="svv-brand">
          <LogoMark />
          <span className="svv-brand-name">{brand}</span>
        </div>
        {rail ? (
          <button
            type="button"
            className="svv-rail-toggle"
            data-sv-part="rail-toggle"
            aria-label={label}
            aria-expanded={!rail.rail}
            aria-controls={rail.columnId}
            onClick={rail.toggle}
          >
            <Icon
              name={rail.rail ? 'layout-sidebar-left-expand' : 'layout-sidebar-left-collapse'}
            />
          </button>
        ) : null}
      </div>
      {groups.map((group, index) => {
        const headingId = `${baseId}-group-${index}`
        return (
          // Index in the key: two groups may share a label (or both have none). Groups hold no
          // state and come in display order, so their position is their identity.
          // biome-ignore lint/suspicious/noArrayIndexKey: see above; a label alone can collide.
          <div key={`${index}:${group.label ?? ''}`} className="svv-nav-group">
            {group.label ? (
              <p id={headingId} className="svv-nav-heading">
                {group.label}
              </p>
            ) : null}
            <ul className="svv-nav-list" aria-labelledby={group.label ? headingId : undefined}>
              {group.links.map((link) => (
                <li key={link.entry.path}>
                  <Link
                    to={link.entry.path}
                    current={link.current}
                    aria-label={link.accessibleName}
                    className="svv-nav-link"
                  >
                    <span className="svv-nav-glyph" aria-hidden="true">
                      <Icon name={link.entry.icon} />
                      <span className="svv-nav-monogram">{monogram(link.entry.label)}</span>
                    </span>
                    <span className="svv-nav-label">{link.entry.label}</span>
                    {link.entry.badge !== undefined ? (
                      <span className="svv-nav-badge" aria-hidden="true">
                        {link.entry.badge}
                      </span>
                    ) : null}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )
      })}
    </nav>
  )
}

/**
 * The sticky top bar: the drawer button (phones), the search / command palette trigger styled as
 * a search field, and the actions (theme, workspace, account) on the right.
 *
 * @example
 * <TopBar menuButton={menu} search={search} actions={actions} />
 */
export function TopBar(props: TopBarProps): ReactElement {
  return (
    <header className="svv-topbar" data-sv-part="topbar">
      {props.menuButton}
      <div className="svv-topbar-search">{props.search}</div>
      <div className="svv-topbar-actions">{props.actions}</div>
    </header>
  )
}

/**
 * The signed-out frame, split in two: a brand panel (the app name and original art on the accent
 * gradient) beside a calm form column. The panel is decorative and hidden from assistive tech (the
 * form's heading names the app); below 64rem it is dropped and the form column shows the mark and
 * name on top.
 *
 * @example
 * <AuthLayout appName="Acme"><h1>Sign in to Acme</h1><form>…</form></AuthLayout>
 */
export function AuthLayout({ appName, children }: AuthLayoutProps): ReactElement {
  return (
    <div className="svv-auth" data-sv-part="auth">
      <div className="svv-auth-panel" aria-hidden="true">
        <p className="svv-auth-panel-brand">
          <LogoMark />
          <span>{appName}</span>
        </p>
        <AuthArt />
      </div>
      <div className="svv-auth-column">
        <p className="svv-auth-brand">
          <LogoMark />
          <span>{appName}</span>
        </p>
        <div className="svv-auth-card">{children}</div>
      </div>
    </div>
  )
}

/**
 * The page header: breadcrumbs above one row holding Back, the title, its count and the actions,
 * vertically centred. On phones the actions wrap below and share the width.
 *
 * @example
 * <PageHeader title="Invoices" titleId="h" breadcrumbs={null} back={null} actions={<New />} meta="64" />
 */
export function PageHeader(props: PageHeaderProps): ReactElement {
  return (
    <div className="svv-page-header" data-sv-part="page-header">
      {props.breadcrumbs}
      <div className="svv-page-header-row">
        {props.back}
        <h1 id={props.titleId}>{props.title}</h1>
        {props.meta ? <span className="svv-page-meta">{props.meta}</span> : null}
        {props.actions ? <div className="svv-page-actions">{props.actions}</div> : null}
      </div>
    </div>
  )
}
