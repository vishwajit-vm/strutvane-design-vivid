/**
 * Vivid's component skins: buttons, form controls, cards, badges, alerts, the table box, dialogs,
 * popovers, toasts, filter chips and skeletons.
 *
 * Each skin renders the smallest correct element and spreads every prop it receives onto it, so
 * the behaviour's ARIA wiring, refs and handlers arrive intact; the look lives in `styles.ts`.
 * Vivid's touches: primary buttons on the brand gradient with a soft glow, 38px controls with a
 * 3:1 border, status badges as a soft tint plus a dot (tone is never colour alone: the text says
 * it), tinted toasts with an icon chip, and dialogs over a blurred backdrop.
 *
 * @module
 */

import type {
  AlertProps,
  BadgeProps,
  ButtonProps,
  CardProps,
  CheckboxProps,
  ChipProps,
  DialogProps,
  FieldProps,
  InputProps,
  PopoverProps,
  SelectProps,
  SkeletonProps,
  TableProps,
  TextareaProps,
  ToastProps,
} from '@strutvane/ui/design'
import type { ReactElement } from 'react'
import { Icon } from './icons.tsx'

const cx = (...names: (string | false | undefined)[]): string => names.filter(Boolean).join(' ')

/** The most skeleton lines drawn, however many are asked for (a cheap guard against huge DOMs). */
export const MAX_SKELETON_LINES = 20

/**
 * A button; `type="button"` unless told otherwise, so it never submits a form by accident.
 * `primary` sits on the brand gradient, `secondary` is outlined, `ghost` is bare and `danger` is a
 * solid danger fill (destructive confirmations only).
 *
 * @example
 * <Button variant="primary" icon="plus">New invoice</Button>
 */
export function Button({
  variant = 'secondary',
  size = 'md',
  icon,
  className,
  type = 'button',
  children,
  ...rest
}: ButtonProps): ReactElement {
  return (
    <button
      type={type}
      className={cx('svv-button', `svv-button-${variant}`, size === 'sm' && 'svv-sm', className)}
      {...rest}
    >
      {icon ? <Icon name={icon} size={size === 'sm' ? 'sm' : 'md'} /> : null}
      {children}
    </button>
  )
}

/**
 * A text-like input with a 3:1 border and an accent focus ring.
 *
 * @example
 * <Input id="email" type="email" />
 */
export function Input({ className, ...rest }: InputProps): ReactElement {
  return <input className={cx('svv-input', className)} {...rest} />
}

/**
 * A multi-line input.
 *
 * @example
 * <Textarea id="notes" rows={4} />
 */
export function Textarea({ className, ...rest }: TextareaProps): ReactElement {
  return <textarea className={cx('svv-input', 'svv-textarea', className)} {...rest} />
}

/**
 * A native select (it keeps the platform's keyboard and screen-reader behaviour).
 *
 * @example
 * <Select id="status"><option>Paid</option></Select>
 */
export function Select({ className, ...rest }: SelectProps): ReactElement {
  return <select className={cx('svv-input', 'svv-select', className)} {...rest} />
}

/**
 * A native checkbox in the accent colour.
 *
 * @example
 * <Checkbox id="active" checked onChange={toggle} />
 */
export function Checkbox({ className, ...rest }: CheckboxProps): ReactElement {
  return <input type="checkbox" className={cx('svv-checkbox', className)} {...rest} />
}

/**
 * Label, control, help and error of one form field. The required marker is decorative (the
 * control already says `aria-required`).
 *
 * @example
 * <Field label="Email" htmlFor="email" required><Input id="email" /></Field>
 */
export function Field(props: FieldProps): ReactElement {
  return (
    <div className="svv-field" data-sv-field={props.name}>
      <label htmlFor={props.htmlFor} className="svv-label">
        {props.label}
        {props.required ? (
          <span className="svv-required" aria-hidden="true">
            {' *'}
          </span>
        ) : null}
      </label>
      {props.children}
      {props.help ? (
        <p id={props.helpId} className="svv-help">
          {props.help}
        </p>
      ) : null}
      {props.error ? (
        <p id={props.errorId} className="svv-error">
          {props.error}
        </p>
      ) : null}
    </div>
  )
}

/**
 * A white (or one-step-lighter, in dark mode) card with a hairline, a soft shadow and 14px corners.
 *
 * @example
 * <Card heading={<h2>Totals</h2>}>…</Card>
 */
export function Card({ heading, className, children, ...rest }: CardProps): ReactElement {
  return (
    <section className={cx('svv-card', className)} {...rest}>
      {heading}
      {children}
    </section>
  )
}

/**
 * A status label: a soft tint of the tone, a dot and the text (never colour alone).
 *
 * @example
 * <Badge tone="success">Paid</Badge>
 */
export function Badge({ tone, children }: BadgeProps): ReactElement {
  return <span className={cx('svv-badge', `svv-tone-${tone}`)}>{children}</span>
}

/**
 * A message block: tinted with its tone, with an accent bar on the leading edge.
 *
 * @example
 * <Alert tone="danger" role="alert">Couldn't save.</Alert>
 */
export function Alert({ tone, className, ...rest }: AlertProps): ReactElement {
  return <div className={cx('svv-alert', `svv-tone-${tone}`, className)} {...rest} />
}

/*
 * The prop bags below are spread first and the design's class merged in last: a class the
 * behaviour ever passes is kept, and it can never replace the class that makes the table box
 * positioned and scrollable (losing it would make the page scroll sideways at 375px).
 */

/**
 * A table inside its own positioned scroll box: wide tables scroll sideways inside the card, and
 * the page never does (at 375px or at 1440px).
 *
 * @example
 * <Table regionProps={region} tableProps={table} density="default">{rows}</Table>
 */
export function Table({ regionProps, tableProps, density, children }: TableProps): ReactElement {
  return (
    <div
      data-sv-part="table-scroll"
      {...regionProps}
      className={cx('svv-table-scroll', regionProps.className)}
    >
      <table
        data-sv-density={density}
        {...tableProps}
        className={cx('svv-table', tableProps.className)}
      >
        {children}
      </table>
    </div>
  )
}

/**
 * A modal dialog: 18px corners and a deep shadow over a blurred scrim. Focus and Escape are the
 * behaviour's; this places the title, description, body and footer.
 *
 * @example
 * <Dialog overlayProps={o} panelProps={p} title="Delete?" titleId="t" footer={buttons} />
 */
export function Dialog(props: DialogProps): ReactElement {
  return (
    <div
      data-sv-part="overlay"
      {...props.overlayProps}
      className={cx('svv-overlay', props.overlayProps.className)}
    >
      <div
        data-sv-part="dialog"
        {...props.panelProps}
        className={cx('svv-dialog', `svv-dialog-${props.size ?? 'md'}`, props.panelProps.className)}
      >
        <h2 id={props.titleId} className="svv-dialog-title">
          {props.title}
        </h2>
        {props.description ? (
          <p id={props.descriptionId} className="svv-dialog-description">
            {props.description}
          </p>
        ) : null}
        {props.children}
        {props.footer ? <div className="svv-dialog-footer">{props.footer}</div> : null}
      </div>
    </div>
  )
}

/**
 * A floating panel for menus and the column picker.
 *
 * @example
 * <Popover panelProps={panel}>{items}</Popover>
 */
export function Popover({ panelProps, children }: PopoverProps): ReactElement {
  return (
    <div data-sv-part="popover" {...panelProps} className={cx('svv-popover', panelProps.className)}>
      {children}
    </div>
  )
}

/** The icon drawn in each toast tone's chip. */
const TOAST_ICONS = {
  info: 'info-circle',
  success: 'circle-check',
  danger: 'alert-triangle',
} as const

/**
 * One notification: a tinted icon chip, the message, an optional action (Undo) and the dismiss
 * button. The live region around it is the behaviour's.
 *
 * @example
 * <Toast tone="success" action={undo} dismiss={close}>Invoice deleted.</Toast>
 */
export function Toast({ tone, children, action, dismiss }: ToastProps): ReactElement {
  return (
    <div className={cx('svv-toast', `svv-tone-${tone}`)} data-sv-part="toast">
      <span className="svv-toast-icon" aria-hidden="true">
        <Icon name={TOAST_ICONS[tone]} size="sm" />
      </span>
      <span className="svv-toast-text">{children}</span>
      {action}
      {dismiss}
    </div>
  )
}

/**
 * An active filter: a soft accent pill with its (already labelled) remove button.
 *
 * @example
 * <Chip remove={removeButton}>Status: Paid</Chip>
 */
export function Chip({ children, remove }: ChipProps): ReactElement {
  return (
    <span className="svv-chip" data-sv-part="chip">
      <span className="svv-chip-text">{children}</span>
      {remove}
    </span>
  )
}

/**
 * Loading lines with a soft shimmer (still under `prefers-reduced-motion`). Decorative: the
 * region around it says `aria-busy`. Draws 1 to {@link MAX_SKELETON_LINES} lines.
 *
 * @example
 * <Skeleton lines={3} />
 */
export function Skeleton({ lines }: SkeletonProps): ReactElement {
  const count = Number.isFinite(lines)
    ? Math.max(1, Math.min(Math.floor(lines), MAX_SKELETON_LINES))
    : 1
  return (
    <div className="svv-skeleton" aria-hidden="true">
      {Array.from({ length: count }, (_, i) => (
        // biome-ignore lint/suspicious/noArrayIndexKey: placeholder lines have no identity.
        <span key={i} />
      ))}
    </div>
  )
}
