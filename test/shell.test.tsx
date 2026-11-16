// @vitest-environment jsdom
/**
 * The shell slots on their own: placement of the behaviour's pieces, the drawer scrim, the icon
 * rail (toggle, memory, storage failures), sidebar groups, badges and monograms, the split
 * sign-in and the page header.
 */

import type { NavLinkProps, SidebarProps } from '@strutvane/ui/design'
import { cleanup, fireEvent, render, screen, within } from '@testing-library/react'
import type { ReactElement } from 'react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import {
  AuthLayout,
  Icon,
  PageHeader,
  RAIL_STORAGE_KEY,
  Shell,
  Sidebar,
  TopBar,
} from '../src/index.ts'

afterEach(() => {
  cleanup()
  localStorage.clear()
})

/** A link like the behaviour's: it sets `aria-current` itself. */
function NavLink({ to, current, ...rest }: NavLinkProps): ReactElement {
  return <a href={to} aria-current={current ? 'page' : undefined} {...rest} />
}

const groups: SidebarProps['groups'] = [
  {
    label: undefined,
    links: [
      {
        entry: {
          name: 'home',
          label: 'Home',
          path: '/',
          icon: 'home',
          group: undefined,
          order: 0,
          permission: 'home',
        },
        current: false,
        accessibleName: 'Home',
      },
    ],
  },
  {
    label: 'Billing',
    links: [
      {
        entry: {
          name: 'invoices',
          label: 'Invoices',
          path: '/invoices',
          icon: 'file-invoice',
          group: 'Billing',
          order: 1,
          badge: 12,
          permission: 'invoices.list',
        },
        current: true,
        accessibleName: 'Invoices, 12',
      },
      {
        entry: {
          name: 'quirks',
          label: 'éclair orders',
          path: '/quirks',
          icon: 'no-such-icon',
          group: 'Billing',
          order: 2,
          permission: 'quirks.list',
        },
        current: false,
        accessibleName: 'éclair orders',
      },
    ],
  },
]

function sidebar(): ReactElement {
  return (
    <Sidebar
      label="Main navigation"
      brand={<a href="/">Acme</a>}
      groups={groups}
      Link={NavLink}
      Icon={Icon}
    />
  )
}

function shell(navOpen = false, onCloseNav = () => undefined): ReactElement {
  return (
    <Shell
      skipLink={<a href="#main">Skip to content</a>}
      sidebar={sidebar()}
      topBar={<header>bar</header>}
      main={<main id="main">page</main>}
      navOpen={navOpen}
      onCloseNav={onCloseNav}
    />
  )
}

describe('Shell', () => {
  it('places the skip link first, then the sidebar column, the top bar and main', () => {
    const { container } = render(shell())
    const frame = container.querySelector('[data-sv-part="shell"]')
    expect(frame?.firstElementChild?.textContent).toBe('Skip to content')
    expect(frame?.querySelector('.svv-shell-nav nav')).not.toBeNull()
    const body = frame?.querySelector('.svv-shell-body')
    expect(body?.children[0]?.tagName).toBe('HEADER')
    expect(body?.children[1]?.tagName).toBe('MAIN')
    expect(frame?.hasAttribute('data-nav-open')).toBe(false)
    expect(container.querySelector('[data-sv-part="scrim"]')).toBeNull()
  })

  it('shows a scrim while the drawer is open, and a click on it closes the drawer', () => {
    const close = vi.fn()
    const { container } = render(shell(true, close))
    expect(container.querySelector('[data-sv-part="shell"]')?.hasAttribute('data-nav-open')).toBe(
      true,
    )
    const scrim = container.querySelector('[data-sv-part="scrim"]')
    expect(scrim).not.toBeNull()
    if (scrim) fireEvent.click(scrim)
    expect(close).toHaveBeenCalledTimes(1)
  })
})

describe('icon rail', () => {
  beforeEach(() => localStorage.clear())

  it('toggles the rail from a button named after the navigation, and remembers it', () => {
    const { container, unmount } = render(shell())
    const frame = () => container.querySelector('[data-sv-part="shell"]')
    const toggle = screen.getByRole('button', { name: 'Main navigation' })
    expect(toggle.getAttribute('aria-expanded')).toBe('true')
    expect(toggle.getAttribute('aria-controls')).toBe(container.querySelector('.svv-shell-nav')?.id)
    expect(frame()?.hasAttribute('data-rail')).toBe(false)

    fireEvent.click(toggle)
    expect(frame()?.hasAttribute('data-rail')).toBe(true)
    expect(toggle.getAttribute('aria-expanded')).toBe('false')
    expect(localStorage.getItem(RAIL_STORAGE_KEY)).toBe('rail')
    unmount()

    // A new page starts as the viewer left it.
    const again = render(shell())
    expect(again.container.querySelector('[data-sv-part="shell"]')?.hasAttribute('data-rail')).toBe(
      true,
    )
    fireEvent.click(screen.getByRole('button', { name: 'Main navigation' }))
    expect(localStorage.getItem(RAIL_STORAGE_KEY)).toBe('full')
  })

  it('still works when storage throws on read and write (private mode, sandboxes)', () => {
    vi.spyOn(Storage.prototype, 'getItem').mockImplementation(() => {
      throw new Error('blocked')
    })
    vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
      throw new Error('quota')
    })
    const { container } = render(shell())
    const frame = container.querySelector('[data-sv-part="shell"]')
    expect(frame?.hasAttribute('data-rail')).toBe(false)
    fireEvent.click(screen.getByRole('button', { name: 'Main navigation' }))
    expect(frame?.hasAttribute('data-rail')).toBe(true)
  })

  it('draws no toggle when a Sidebar is rendered outside the Vivid Shell', () => {
    render(sidebar())
    expect(screen.queryByRole('button')).toBeNull()
  })

  it('swaps the toggle icon between collapse and expand', () => {
    const { container } = render(shell())
    const icon = () =>
      container.querySelector('[data-sv-part="rail-toggle"] svg')?.getAttribute('class') ?? ''
    expect(icon()).toContain('tabler-icon-layout-sidebar-left-collapse')
    fireEvent.click(screen.getByRole('button', { name: 'Main navigation' }))
    expect(icon()).toContain('tabler-icon-layout-sidebar-left-expand')
  })
})

describe('Sidebar', () => {
  it('labels each group list by its heading and leaves the top group unlabelled', () => {
    render(sidebar())
    const nav = screen.getByRole('navigation', { name: 'Main navigation' })
    const lists = within(nav).getAllByRole('list')
    expect(lists).toHaveLength(2)
    expect(lists[0]?.hasAttribute('aria-labelledby')).toBe(false)
    expect(within(nav).getByRole('list', { name: 'Billing' })).toBe(lists[1])
  })

  it("keeps each link's full accessible name, marks the current page and hides the badge from AT", () => {
    render(sidebar())
    const current = screen.getByRole('link', { name: 'Invoices, 12' })
    expect(current.getAttribute('aria-current')).toBe('page')
    expect(current.className).toContain('svv-nav-link')
    const badge = current.querySelector('.svv-nav-badge')
    expect(badge?.textContent).toBe('12')
    expect(badge?.getAttribute('aria-hidden')).toBe('true')
    expect(screen.getByRole('link', { name: 'Home' }).hasAttribute('aria-current')).toBe(false)
  })

  it('draws the icon when Vivid has it, and the first letter (whole character) as the fallback', () => {
    render(sidebar())
    const invoices = screen.getByRole('link', { name: 'Invoices, 12' })
    expect(invoices.querySelector('.svv-nav-glyph svg')).not.toBeNull()
    const quirks = screen.getByRole('link', { name: 'éclair orders' })
    expect(quirks.querySelector('.svv-nav-glyph svg')).toBeNull()
    expect(quirks.querySelector('.svv-nav-monogram')?.textContent).toBe('É')
    expect(quirks.querySelector('.svv-nav-glyph')?.getAttribute('aria-hidden')).toBe('true')
  })

  it('renders the brand next to the mark', () => {
    const { container } = render(sidebar())
    expect(container.querySelector('.svv-brand .svv-logo')).not.toBeNull()
    expect(container.querySelector('.svv-brand-name')?.textContent).toBe('Acme')
  })

  it('draws an empty monogram for a blank label instead of failing', () => {
    const blank: SidebarProps['groups'] = [
      {
        label: undefined,
        links: [
          {
            entry: {
              name: 'x',
              label: '   ',
              path: '/x',
              icon: 'nope',
              group: undefined,
              order: 0,
              permission: 'x',
            },
            current: false,
            accessibleName: 'X',
          },
        ],
      },
    ]
    render(<Sidebar label="Nav" brand="A" groups={blank} Link={NavLink} Icon={Icon} />)
    expect(
      screen.getByRole('link', { name: 'X' }).querySelector('.svv-nav-monogram')?.textContent,
    ).toBe('')
  })
})

describe('TopBar', () => {
  it('places the menu button, the search trigger and the actions in a banner', () => {
    render(
      <TopBar
        menuButton={<button type="button">menu</button>}
        search={<button type="button">search</button>}
        actions={<button type="button">account</button>}
      />,
    )
    const banner = screen.getByRole('banner')
    const buttons = within(banner).getAllByRole('button')
    expect(buttons.map((b) => b.textContent)).toEqual(['menu', 'search', 'account'])
    expect(banner.querySelector('.svv-topbar-search')?.textContent).toBe('search')
    expect(banner.querySelector('.svv-topbar-actions')?.textContent).toBe('account')
  })
})

describe('AuthLayout', () => {
  it('splits a decorative brand panel from the form column', () => {
    const { container } = render(
      <AuthLayout appName="Acme">
        <h1>Sign in to Acme</h1>
      </AuthLayout>,
    )
    const panel = container.querySelector('.svv-auth-panel')
    expect(panel?.getAttribute('aria-hidden')).toBe('true')
    expect(panel?.textContent).toContain('Acme')
    expect(panel?.querySelector('[data-sv-illustration="auth"]')).not.toBeNull()
    expect(container.querySelector('.svv-auth-card h1')?.textContent).toBe('Sign in to Acme')
    expect(container.querySelector('.svv-auth-brand')?.textContent).toBe('Acme')
  })
})

describe('PageHeader', () => {
  it('puts the id on the h1 and shows breadcrumbs, back, meta and actions in order', () => {
    const { container } = render(
      <PageHeader
        title="Invoices"
        titleId="page-title"
        breadcrumbs={<nav aria-label="Breadcrumbs">crumbs</nav>}
        back={<button type="button">Back</button>}
        actions={<button type="button">New</button>}
        meta="64"
      />,
    )
    const heading = screen.getByRole('heading', { level: 1, name: 'Invoices' })
    expect(heading.id).toBe('page-title')
    const row = container.querySelector('.svv-page-header-row')
    expect([...(row?.children ?? [])].map((c) => c.textContent)).toEqual([
      'Back',
      'Invoices',
      '64',
      'New',
    ])
    expect(screen.getByRole('navigation', { name: 'Breadcrumbs' })).toBeDefined()
  })

  it('leaves out meta and actions when there are none', () => {
    const { container } = render(
      <PageHeader title="Home" titleId="t" breadcrumbs={null} back={null} actions={null} />,
    )
    expect(container.querySelector('.svv-page-meta')).toBeNull()
    expect(container.querySelector('.svv-page-actions')).toBeNull()
  })
})
