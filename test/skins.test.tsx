// @vitest-environment jsdom
/**
 * The component skins: each one renders the right element, spreads what the behaviour gives it
 * (handlers, ARIA, refs), places the ids it is handed, and maps variants and tones to classes.
 */
import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import { createRef } from 'react'
import { afterEach, describe, expect, it, vi } from 'vitest'
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
  MAX_SKELETON_LINES,
  Popover,
  Select,
  Skeleton,
  Table,
  Textarea,
  Toast,
} from '../src/index.ts'

afterEach(cleanup)

describe('Button', () => {
  it('is a secondary, medium, type="button" button by default', () => {
    render(<Button>Save</Button>)
    const button = screen.getByRole('button', { name: 'Save' })
    expect(button.getAttribute('type')).toBe('button')
    expect(button.className).toBe('svv-button svv-button-secondary')
  })

  it('maps variant and size, keeps an explicit type and merges the class', () => {
    render(
      <Button variant="primary" size="sm" type="submit" className="extra">
        Go
      </Button>,
    )
    const button = screen.getByRole('button', { name: 'Go' })
    expect(button.getAttribute('type')).toBe('submit')
    expect(button.className).toBe('svv-button svv-button-primary svv-sm extra')
  })

  it.each(['primary', 'secondary', 'ghost', 'danger'] as const)('has a %s look', (variant) => {
    render(<Button variant={variant}>x</Button>)
    expect(screen.getByRole('button').classList.contains(`svv-button-${variant}`)).toBe(true)
  })

  it('draws the named icon before the label, smaller on small buttons', () => {
    const { container, rerender } = render(<Button icon="plus">New</Button>)
    const svg = container.querySelector('button svg')
    expect(svg?.getAttribute('aria-hidden')).toBe('true')
    expect(svg?.getAttribute('width')).toBe('20')
    expect(container.querySelector('button')?.firstElementChild).toBe(svg)
    rerender(
      <Button icon="plus" size="sm">
        New
      </Button>,
    )
    expect(container.querySelector('button svg')?.getAttribute('width')).toBe('16')
    expect(screen.getByRole('button', { name: 'New' })).toBeDefined()
  })

  it('spreads handlers, ARIA and the ref onto the <button>', () => {
    const onClick = vi.fn()
    const ref = createRef<HTMLButtonElement>()
    render(
      <Button ref={ref} aria-label="Delete Launch notes" disabled={false} onClick={onClick}>
        Delete
      </Button>,
    )
    const button = screen.getByRole('button', { name: 'Delete Launch notes' })
    fireEvent.click(button)
    expect(onClick).toHaveBeenCalledTimes(1)
    expect(ref.current).toBe(button)
  })
})

describe('form controls', () => {
  it('spreads everything onto Input, Textarea, Select and Checkbox, refs included', () => {
    const input = createRef<HTMLInputElement>()
    const area = createRef<HTMLTextAreaElement>()
    const select = createRef<HTMLSelectElement>()
    const box = createRef<HTMLInputElement>()
    render(
      <>
        <Input ref={input} aria-label="Email" aria-invalid="true" className="x" />
        <Textarea ref={area} aria-label="Notes" />
        <Select ref={select} aria-label="Status">
          <option>Paid</option>
        </Select>
        <Checkbox ref={box} aria-label="Active" defaultChecked />
      </>,
    )
    expect(input.current).toBe(screen.getByRole('textbox', { name: 'Email' }))
    expect(input.current?.className).toBe('svv-input x')
    expect(input.current?.getAttribute('aria-invalid')).toBe('true')
    expect(area.current?.className).toBe('svv-input svv-textarea')
    expect(select.current?.className).toBe('svv-input svv-select')
    expect(box.current?.type).toBe('checkbox')
    expect(box.current?.checked).toBe(true)
    expect(box.current?.className).toBe('svv-checkbox')
  })

  it('Field ties label, help and error to their ids and marks required decoratively', () => {
    render(
      <Field
        label="Email"
        htmlFor="email"
        required
        help="We never share it."
        helpId="email-help"
        error="Enter an email."
        errorId="email-error"
        name="email"
      >
        <input id="email" aria-describedby="email-help email-error" />
      </Field>,
    )
    const input = screen.getByRole('textbox', { name: 'Email' })
    expect(input.getAttribute('aria-describedby')).toBe('email-help email-error')
    expect(document.getElementById('email-help')?.textContent).toBe('We never share it.')
    expect(document.getElementById('email-error')?.textContent).toBe('Enter an email.')
    expect(document.querySelector('.svv-required')?.getAttribute('aria-hidden')).toBe('true')
    expect(document.querySelector('[data-sv-field="email"]')).not.toBeNull()
  })

  it('Field leaves out the marker, help and error when there are none', () => {
    const { container } = render(
      <Field label="Name" htmlFor="name" required={false}>
        <input id="name" />
      </Field>,
    )
    expect(container.querySelector('.svv-required')).toBeNull()
    expect(container.querySelector('.svv-help')).toBeNull()
    expect(container.querySelector('.svv-error')).toBeNull()
  })
})

describe('surfaces and status', () => {
  it('Card is a section with its heading first, and spreads the rest', () => {
    render(
      <Card heading={<h2>Totals</h2>} aria-label="Totals card" className="wide">
        <p>body</p>
      </Card>,
    )
    const card = screen.getByRole('region', { name: 'Totals card' })
    expect(card.className).toBe('svv-card wide')
    expect(card.firstElementChild?.tagName).toBe('H2')
  })

  it('Card works without a heading', () => {
    const { container } = render(<Card>plain</Card>)
    expect(container.querySelector('section')?.textContent).toBe('plain')
  })

  it.each(['neutral', 'accent', 'success', 'warning', 'danger'] as const)(
    'Badge carries the %s tone as a class and keeps its text',
    (tone) => {
      render(<Badge tone={tone}>Paid</Badge>)
      expect(screen.getByText('Paid').className).toBe(`svv-badge svv-tone-${tone}`)
    },
  )

  it('Alert spreads role, tabIndex and ref, with its tone', () => {
    const ref = createRef<HTMLDivElement>()
    render(
      <Alert tone="danger" role="alert" tabIndex={-1} ref={ref}>
        Couldn't save.
      </Alert>,
    )
    const alert = screen.getByRole('alert')
    expect(alert).toBe(ref.current)
    expect(alert.className).toBe('svv-alert svv-tone-danger')
    expect(alert.getAttribute('tabindex')).toBe('-1')
  })
})

describe('Table', () => {
  it('wraps the table in the labelled scroll region and passes density and table props', () => {
    const ref = createRef<HTMLDivElement>()
    render(
      <Table
        regionProps={{ ref, role: 'region', 'aria-label': 'Invoices', tabIndex: 0 }}
        tableProps={{ 'aria-rowcount': 3 }}
        density="compact"
      >
        <tbody>
          <tr>
            <td>1</td>
          </tr>
        </tbody>
      </Table>,
    )
    const region = screen.getByRole('region', { name: 'Invoices' })
    expect(region).toBe(ref.current)
    expect(region.className).toBe('svv-table-scroll')
    const table = screen.getByRole('table')
    expect(table.getAttribute('data-sv-density')).toBe('compact')
    expect(table.getAttribute('aria-rowcount')).toBe('3')
  })
})

describe('overlays', () => {
  it('Dialog places title and description ids, children and footer, and spreads the bags', () => {
    const onScrim = vi.fn()
    render(
      <Dialog
        overlayProps={{ onClick: onScrim }}
        panelProps={{
          role: 'alertdialog',
          'aria-modal': true,
          'aria-labelledby': 'dt',
          'aria-describedby': 'dd',
        }}
        title="Delete invoice?"
        titleId="dt"
        description="This can't be undone."
        descriptionId="dd"
        footer={<button type="button">Delete</button>}
        size="sm"
      >
        <p>body</p>
      </Dialog>,
    )
    const dialog = screen.getByRole('alertdialog', { name: 'Delete invoice?' })
    expect(dialog.getAttribute('aria-describedby')).toBe('dd')
    expect(document.getElementById('dd')?.textContent).toBe("This can't be undone.")
    expect(dialog.className).toBe('svv-dialog svv-dialog-sm')
    expect(dialog.querySelector('.svv-dialog-footer')?.textContent).toBe('Delete')
    const overlay = document.querySelector('[data-sv-part="overlay"]')
    if (overlay) fireEvent.click(overlay)
    expect(onScrim).toHaveBeenCalledTimes(1)
  })

  it('Dialog defaults to medium and leaves out an absent description and footer', () => {
    render(<Dialog overlayProps={{}} panelProps={{ role: 'dialog' }} title="Help" titleId="h" />)
    const dialog = screen.getByRole('dialog')
    expect(dialog.className).toBe('svv-dialog svv-dialog-md')
    expect(dialog.querySelector('.svv-dialog-description')).toBeNull()
    expect(dialog.querySelector('.svv-dialog-footer')).toBeNull()
  })

  it('Popover spreads its panel props', () => {
    render(
      <Popover panelProps={{ role: 'menu', 'aria-label': 'Columns' }}>
        <span>items</span>
      </Popover>,
    )
    expect(screen.getByRole('menu', { name: 'Columns' }).className).toBe('svv-popover')
  })

  it.each([
    ['info', 'tabler-icon-info-circle'],
    ['success', 'tabler-icon-circle-check'],
    ['danger', 'tabler-icon-alert-triangle'],
  ] as const)('Toast %s shows its icon chip, message, action and dismiss', (tone, icon) => {
    const { container } = render(
      <Toast
        tone={tone}
        action={<button type="button">Undo</button>}
        dismiss={<button type="button">Dismiss</button>}
      >
        Saved.
      </Toast>,
    )
    const toast = container.querySelector('[data-sv-part="toast"]')
    expect(toast?.className).toBe(`svv-toast svv-tone-${tone}`)
    expect(toast?.querySelector('.svv-toast-icon')?.getAttribute('aria-hidden')).toBe('true')
    expect(String(toast?.querySelector('svg')?.className.baseVal)).toContain(icon)
    expect(toast?.textContent).toBe('Saved.UndoDismiss')
  })

  it('Chip shows the filter and its remove button', () => {
    render(<Chip remove={<button type="button">Remove Status</button>}>Status: Paid</Chip>)
    expect(screen.getByText('Status: Paid').className).toBe('svv-chip-text')
    expect(screen.getByRole('button', { name: 'Remove Status' })).toBeDefined()
  })
})

describe('Skeleton', () => {
  it.each([
    [3, 3],
    [0, 1],
    [-5, 1],
    [2.7, 2],
    [10_000, MAX_SKELETON_LINES],
    [Number.NaN, 1],
    [Number.POSITIVE_INFINITY, 1],
  ])('asked for %s lines, draws %s, hidden from assistive tech', (asked, drawn) => {
    const { container } = render(<Skeleton lines={asked} />)
    const box = container.querySelector('.svv-skeleton')
    expect(box?.getAttribute('aria-hidden')).toBe('true')
    expect(box?.children).toHaveLength(drawn)
  })
})
