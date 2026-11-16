/**
 * Vivid's CSS: layout, shape and motion for every slot, plus the `data-sv-part` hooks the
 * behaviour renders (toolbar, chips, pagination, details, palette, menus, empty states).
 *
 * Rules this file keeps (tests guard each one):
 * - **Colours only through `var(--sv-*)`.** No literal colour, not even in a gradient or a shadow:
 *   the brand gradient is `--sv-accent` → `--sv-accent-hover` (the same family turned 18°), and
 *   glows are the accent with a negative spread. So dark mode, the brand hue and the contrast
 *   proof cover everything drawn here.
 * - **Nothing widens the page.** Every content column has `min-width: 0`, tables scroll inside
 *   their own positioned box, fixed widths stay under 375px or sit inside `min()`, and toolbars,
 *   headers and footers wrap (spike 14 finding 13, spike 17 browser pass).
 * - **The public tokens reach the screen.** Corners use `--sv-radius-*` (from `--radius`), controls
 *   and rows `--sv-control-height` / `--sv-row-height` (from `--density`), text `--sv-font-sans`.
 * - **Motion is short and optional:** 150–220ms ease-out, and none under
 *   `prefers-reduced-motion`.
 * - **No `</style>`**, so the text is safe inside the `<style nonce>` the provider injects.
 *
 * Breakpoints: the sidebar docks from 64rem (1024px); below that it is a drawer. The icon rail only
 * exists while docked.
 *
 * @module
 */

/** The design's root selector (`<DesignProvider>` sets `data-sv-design="vivid"`). */
const R = '[data-sv-design="vivid"]'

/** The brand gradient: accent to its turned far end. */
const GRADIENT = 'linear-gradient(118deg,var(--sv-accent),var(--sv-accent-hover))'

/** A soft glow in the accent colour under the active pill and primary buttons. */
const GLOW = '0 6px 16px -6px var(--sv-accent)'

/** Visually hidden but still read by screen readers. */
const HIDDEN =
  'position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap;border:0'

/**
 * The stylesheet text, scoped to Vivid's root (class names are `svv-` prefixed, so they never
 * match outside it). `defineDesign` puts it after the generated token declarations.
 *
 * @example
 * VIVID_STYLESHEET.includes('[data-sv-design="vivid"]') // true
 */
export const VIVID_STYLESHEET: string = `
${R}{background:var(--sv-bg);color:var(--sv-fg);font-family:var(--sv-font-sans);font-size:var(--sv-font-size);line-height:1.57;min-height:100vh;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;text-rendering:optimizeLegibility}
${R} *,${R} *::before,${R} *::after{box-sizing:border-box}
${R} a{color:var(--sv-accent-text);text-underline-offset:3px}
${R} :focus-visible{outline:2px solid var(--sv-ring);outline-offset:2px}
${R} ::selection{background:var(--sv-accent-subtle);color:var(--sv-fg)}
${R} h1{font-size:var(--sv-font-size-lg);font-weight:700;letter-spacing:-0.02em;line-height:1.33;margin:0;overflow-wrap:anywhere}
${R} h2{font-size:1rem;font-weight:600;line-height:1.5;margin:0 0 calc(var(--sv-space) * 3)}
${R} p{overflow-wrap:anywhere}
${R} mark{background:var(--sv-mark);color:var(--sv-mark-fg);border-radius:var(--sv-radius-sm);padding:0 2px}
${R} code,${R} kbd,${R} samp{font-family:var(--sv-font-mono)}
${R} kbd{font-size:0.75rem;line-height:1.25rem;border:1px solid var(--sv-border);border-bottom-width:2px;border-radius:var(--sv-radius-sm);padding:0 6px;background:var(--sv-surface);color:var(--sv-fg-muted)}
${R} table,${R} [data-sv-part="details"]{font-variant-numeric:tabular-nums}
${R} [data-sv-part="skip-link"]{${HIDDEN}}
${R} [data-sv-part="skip-link"]:focus{position:fixed;left:16px;top:16px;width:auto;height:auto;margin:0;clip:auto;z-index:70;padding:8px 16px;border-radius:var(--sv-radius-md);background:var(--sv-accent);color:var(--sv-accent-fg);font-weight:600;text-decoration:none}
${R} [data-sv-part="visually-hidden"]{${HIDDEN}}
${R} main{min-width:0}
${R} .svv-icon{flex:none;display:block}
${R} .svv-icon-sm{width:16px;height:16px}
${R} .svv-icon-md{width:20px;height:20px}
${R} .svv-logo{width:32px;height:32px;flex:none;display:block}

.svv-shell{display:grid;grid-template-columns:var(--sv-sidebar-width) minmax(0,1fr);min-height:100vh;transition:grid-template-columns 200ms ease-out}
.svv-shell-nav{position:sticky;top:0;height:100vh;overflow-y:auto;overflow-x:hidden;min-width:0;background:var(--sv-surface);border-right:1px solid var(--sv-border);box-shadow:var(--sv-shadow-sm);z-index:30;scrollbar-width:thin;scrollbar-color:var(--sv-border) transparent}
.svv-shell-body{min-width:0;display:flex;flex-direction:column}
.svv-shell-body>main{flex:1;width:100%;max-width:90rem;margin:0 auto;padding:calc(var(--sv-space) * 8)}
.svv-shell-body>main:focus{outline:none}
.svv-scrim{position:fixed;inset:0;background:var(--sv-overlay);backdrop-filter:blur(2px);z-index:25;animation:svv-fade-in 150ms ease-out}

.svv-sidebar{display:flex;flex-direction:column;gap:calc(var(--sv-space) * 5);padding:12px 16px 24px}
.svv-sidebar-top{display:flex;align-items:center;justify-content:space-between;gap:8px;min-height:52px;padding:0 4px 0 8px}
.svv-brand{display:flex;align-items:center;gap:10px;min-width:0;font-size:1.0625rem;font-weight:800;letter-spacing:-0.02em}
.svv-brand-name{min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.svv-brand a{color:var(--sv-fg);text-decoration:none;border-radius:var(--sv-radius-sm)}
.svv-rail-toggle{display:inline-flex;align-items:center;justify-content:center;width:32px;height:32px;flex:none;border:0;border-radius:var(--sv-radius-md);background:transparent;color:var(--sv-fg-muted);cursor:pointer;transition:background-color 150ms ease-out,color 150ms ease-out}
.svv-rail-toggle:hover{background:var(--sv-surface-muted);color:var(--sv-fg)}
.svv-nav-group{display:grid;gap:8px}
.svv-nav-heading{margin:0;padding:0 12px;font-size:0.6875rem;line-height:1rem;font-weight:600;letter-spacing:0.08em;text-transform:uppercase;color:var(--sv-fg-muted)}
.svv-nav-list{list-style:none;margin:0;padding:0;display:grid;gap:4px}
.svv-nav-link{display:flex;align-items:center;gap:12px;min-height:calc(var(--sv-control-height) + 4px);padding:0 12px;border-radius:calc(var(--sv-radius-md) * 1.25);color:var(--sv-fg);font-weight:500;text-decoration:none;transition:background-color 150ms ease-out,color 150ms ease-out,box-shadow 150ms ease-out,transform 150ms ease-out}
.svv-nav-link:hover{background:var(--sv-surface-muted);transform:translateX(2px)}
.svv-nav-link[aria-current="page"]{background-color:var(--sv-accent);background-image:${GRADIENT};color:var(--sv-accent-fg);font-weight:600;box-shadow:${GLOW};transform:none}
.svv-nav-glyph{display:grid;place-items:center;width:22px;height:22px;flex:none}
.svv-nav-glyph>*{grid-area:1/1}
.svv-nav-glyph .svv-icon{width:22px;height:22px}
.svv-nav-monogram{display:grid;place-items:center;width:22px;height:22px;border-radius:var(--sv-radius-sm);background:var(--sv-accent-subtle);color:var(--sv-accent-text);font-size:0.75rem;font-weight:700}
.svv-nav-glyph:has(svg) .svv-nav-monogram{display:none}
.svv-nav-link[aria-current="page"] .svv-nav-monogram{background:transparent;color:inherit;box-shadow:inset 0 0 0 1.5px currentColor}
.svv-nav-label{flex:1;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.svv-nav-badge{display:inline-flex;align-items:center;height:20px;padding:0 8px;border-radius:999px;background:var(--sv-accent-subtle);color:var(--sv-accent-text);font-size:0.6875rem;font-weight:700}
.svv-nav-link[aria-current="page"] .svv-nav-badge{background:transparent;color:inherit;box-shadow:inset 0 0 0 1px currentColor}

.svv-topbar{position:sticky;top:0;z-index:20;display:flex;flex-wrap:wrap;align-items:center;gap:12px;min-height:64px;padding:12px calc(var(--sv-space) * 8);background:var(--sv-bg);border-bottom:1px solid var(--sv-border)}
.svv-topbar-search{flex:1;min-width:0}
.svv-topbar-search .svv-button{width:min(20rem,100%);justify-content:flex-start;border-color:var(--sv-border);color:var(--sv-fg-muted);font-weight:500;box-shadow:none}
.svv-topbar-search .svv-button kbd{margin-left:auto}
.svv-topbar-actions{display:flex;flex-wrap:wrap;align-items:center;gap:8px;margin-left:auto;min-width:0}
.svv-topbar-actions label{color:var(--sv-fg-muted);font-size:var(--sv-font-size-sm);font-weight:500}
.svv-topbar-actions .svv-select{width:auto;min-height:calc(var(--sv-control-height) * 0.84)}
.svv-topbar [data-sv-part="menu-button"]{display:none;font-size:0;padding:0;width:var(--sv-control-height)}

.svv-auth{display:grid;grid-template-columns:minmax(0,1.1fr) minmax(0,1fr);min-height:100vh}
.svv-auth-panel{position:relative;overflow:hidden;display:flex;flex-direction:column;gap:32px;padding:40px;background-color:var(--sv-accent);background-image:${GRADIENT};color:var(--sv-accent-fg)}
.svv-auth-panel-brand{display:flex;align-items:center;gap:10px;margin:0;font-size:1.125rem;font-weight:800;letter-spacing:-0.02em}
.svv-auth-panel .svv-auth-art{display:block;width:100%;max-width:32rem;margin:auto}
.svv-auth-column{display:flex;flex-direction:column;justify-content:center;gap:24px;min-width:0;padding:32px 16px}
.svv-auth-brand{display:none;align-items:center;gap:10px;margin:0 auto;width:min(25rem,100%);font-size:1.125rem;font-weight:800;letter-spacing:-0.02em}
.svv-auth-card{width:min(25rem,100%);margin:0 auto}
.svv-auth-card h1{font-size:1.75rem;line-height:2.25rem;margin-bottom:24px}

.svv-page-header{display:grid;gap:8px;margin-bottom:calc(var(--sv-space) * 6)}
.svv-page-header-row{display:flex;flex-wrap:wrap;align-items:center;gap:12px}
.svv-page-header-row h1{flex:1 1 12rem;min-width:0}
.svv-page-meta{display:inline-flex;align-items:center;height:24px;padding:0 10px;border-radius:999px;background:var(--sv-accent-subtle);color:var(--sv-accent-text);font-size:var(--sv-font-size-sm);font-weight:600}
.svv-page-actions{display:flex;flex-wrap:wrap;gap:8px;min-width:0}
${R} [data-sv-part="breadcrumbs"] ol{display:flex;flex-wrap:wrap;gap:6px;list-style:none;margin:0;padding:0;font-size:var(--sv-font-size-sm);color:var(--sv-fg-muted)}
${R} [data-sv-part="breadcrumbs"] li+li::before{content:"/";margin-right:6px;color:var(--sv-fg-muted)}
${R} [data-sv-part="breadcrumbs"] a{color:var(--sv-fg-muted);text-decoration:none}
${R} [data-sv-part="breadcrumbs"] a:hover{color:var(--sv-accent-text);text-decoration:underline}

.svv-button{display:inline-flex;align-items:center;justify-content:center;gap:8px;min-height:var(--sv-control-height);max-width:100%;padding:0 16px;border-radius:var(--sv-radius-md);border:1px solid var(--sv-input);background:var(--sv-surface);color:var(--sv-fg);font:inherit;font-weight:600;line-height:1.25;text-align:center;cursor:pointer;box-shadow:var(--sv-shadow-sm);transition:background-color 150ms ease-out,box-shadow 150ms ease-out,transform 150ms ease-out}
.svv-button:hover{background-color:var(--sv-surface-subtle)}
.svv-button:active{transform:translateY(1px)}
.svv-button.svv-sm{min-height:calc(var(--sv-control-height) * 0.84);padding:0 12px;font-size:var(--sv-font-size-sm)}
.svv-button-primary{border-color:transparent;background-color:var(--sv-accent);background-image:${GRADIENT};color:var(--sv-accent-fg);box-shadow:${GLOW}}
.svv-button-primary:hover{background-color:var(--sv-accent-hover);background-image:none}
.svv-button-danger{border-color:transparent;background:var(--sv-danger);color:var(--sv-danger-fg)}
.svv-button-danger:hover{background:var(--sv-danger-hover)}
.svv-button-ghost{border-color:transparent;background:transparent;box-shadow:none}
.svv-button-ghost:hover{background:var(--sv-surface-muted)}
.svv-button:disabled{opacity:0.55;cursor:not-allowed;transform:none}

.svv-input{display:block;width:100%;max-width:100%;min-height:var(--sv-control-height);padding:6px 12px;border:1px solid var(--sv-input);border-radius:var(--sv-radius-md);background:var(--sv-surface);color:var(--sv-fg);font:inherit;box-shadow:var(--sv-shadow-sm);transition:border-color 150ms ease-out,box-shadow 150ms ease-out}
.svv-input::placeholder{color:var(--sv-fg-muted);opacity:1}
.svv-input:focus-visible{border-color:var(--sv-accent);box-shadow:0 0 0 3px var(--sv-accent-subtle)}
.svv-input[aria-invalid="true"]{border-color:var(--sv-danger);box-shadow:0 0 0 3px var(--sv-danger-subtle)}
.svv-input:disabled{opacity:0.55;cursor:not-allowed}
.svv-textarea{min-height:6rem;resize:vertical}
.svv-select{cursor:pointer}
.svv-checkbox{width:18px;height:18px;margin:0;accent-color:var(--sv-accent);cursor:pointer}
.svv-field{display:grid;gap:6px;margin-bottom:calc(var(--sv-space) * 5);min-width:0}
.svv-label{font-weight:600;font-size:var(--sv-font-size-sm)}
.svv-required{color:var(--sv-danger-text)}
.svv-help{margin:0;color:var(--sv-fg-muted);font-size:var(--sv-font-size-sm)}
.svv-error{margin:0;color:var(--sv-danger-text);font-size:var(--sv-font-size-sm);font-weight:500}

.svv-card{background:var(--sv-surface);border:1px solid var(--sv-border);border-radius:var(--sv-radius-lg);box-shadow:var(--sv-shadow-sm);padding:calc(var(--sv-space) * 6);min-width:0}
.svv-badge{display:inline-flex;align-items:center;gap:6px;height:24px;max-width:100%;padding:0 8px;border-radius:var(--sv-radius-sm);background:var(--sv-surface-muted);color:var(--sv-fg);font-size:0.75rem;font-weight:600;white-space:nowrap}
.svv-badge::before{content:"";width:6px;height:6px;border-radius:999px;background:currentColor;flex:none}
.svv-badge.svv-tone-accent{background:var(--sv-accent-subtle);color:var(--sv-accent-text)}
.svv-badge.svv-tone-success{background:var(--sv-success-subtle);color:var(--sv-success-text)}
.svv-badge.svv-tone-warning{background:var(--sv-warning-subtle);color:var(--sv-warning-text)}
.svv-badge.svv-tone-danger{background:var(--sv-danger-subtle);color:var(--sv-danger-text)}
.svv-alert{display:block;margin:8px 0 16px;padding:12px 16px;border-radius:var(--sv-radius-md);border:1px solid var(--sv-border);background:var(--sv-surface);color:var(--sv-fg);box-shadow:inset 3px 0 0 var(--sv-border)}
.svv-alert:focus{outline:2px solid var(--sv-ring);outline-offset:2px}
.svv-alert.svv-tone-info{border-color:transparent;background:var(--sv-accent-subtle);color:var(--sv-accent-text);box-shadow:inset 3px 0 0 currentColor}
.svv-alert.svv-tone-success{border-color:transparent;background:var(--sv-success-subtle);color:var(--sv-success-text);box-shadow:inset 3px 0 0 currentColor}
.svv-alert.svv-tone-warning{border-color:transparent;background:var(--sv-warning-subtle);color:var(--sv-warning-text);box-shadow:inset 3px 0 0 currentColor}
.svv-alert.svv-tone-danger{border-color:transparent;background:var(--sv-danger-subtle);color:var(--sv-danger-text);box-shadow:inset 3px 0 0 currentColor}

.svv-table-scroll{position:relative;overflow-x:auto;max-width:100%;border:1px solid var(--sv-border);border-radius:var(--sv-radius-lg);background:var(--sv-surface);box-shadow:var(--sv-shadow-sm);scrollbar-width:thin;scrollbar-color:var(--sv-border) transparent}
.svv-table{width:100%;border-collapse:collapse}
.svv-table caption{text-align:left;padding:12px 16px;color:var(--sv-fg-muted);font-size:var(--sv-font-size-sm)}
.svv-table th,.svv-table td{text-align:left;padding:0 16px;height:var(--sv-row-height);border-bottom:1px solid var(--sv-border);white-space:nowrap}
.svv-table tbody tr:last-child>*{border-bottom:0}
.svv-table thead th{position:sticky;top:0;z-index:1;height:calc(var(--sv-row-height) * 0.8);background:var(--sv-surface-subtle);color:var(--sv-fg-muted);font-size:0.6875rem;font-weight:600;letter-spacing:0.08em;text-transform:uppercase}
.svv-table th button{background:none;border:0;padding:0;font:inherit;letter-spacing:inherit;text-transform:inherit;color:inherit;cursor:pointer}
.svv-table tbody tr{transition:background-color 150ms ease-out}
.svv-table tbody tr:hover{background:var(--sv-surface-subtle)}
.svv-table td a{font-weight:600}

.svv-overlay{position:fixed;inset:0;z-index:40;display:grid;place-items:start center;padding:10vh 16px 16px;overflow-y:auto;background:var(--sv-overlay);backdrop-filter:blur(4px);animation:svv-fade-in 150ms ease-out}
.svv-dialog{width:min(560px,100%);background:var(--sv-surface);color:var(--sv-fg);border:1px solid var(--sv-border);border-radius:calc(var(--sv-radius-lg) * 1.3);padding:24px;box-shadow:var(--sv-shadow-pop);animation:svv-pop-in 160ms cubic-bezier(0.2,0.8,0.2,1)}
.svv-dialog-sm{width:min(420px,100%)}
.svv-dialog-lg{width:min(720px,100%)}
.svv-dialog-title{font-size:1.125rem;font-weight:700;letter-spacing:-0.01em;margin:0 0 8px}
.svv-dialog-description{margin:0 0 16px;color:var(--sv-fg-muted)}
.svv-dialog-footer{display:flex;flex-wrap:wrap;justify-content:flex-end;gap:8px;margin-top:24px}
.svv-popover{position:absolute;z-index:30;min-width:min(220px,calc(100vw - 32px));max-width:calc(100vw - 32px);padding:6px;background:var(--sv-surface);border:1px solid var(--sv-border);border-radius:calc(var(--sv-radius-md) * 1.25);box-shadow:var(--sv-shadow-pop);animation:svv-pop-in 160ms cubic-bezier(0.2,0.8,0.2,1)}

${R} [data-sv-part="toasts"]{position:fixed;top:76px;right:16px;left:16px;z-index:60;display:grid;justify-items:end;gap:8px;pointer-events:none}
.svv-toast{pointer-events:auto;display:flex;flex-wrap:wrap;align-items:center;gap:10px;max-width:min(26rem,100%);padding:10px 12px;background:var(--sv-surface);color:var(--sv-fg);border:1px solid var(--sv-border);border-radius:var(--sv-radius-lg);box-shadow:var(--sv-shadow-pop);animation:svv-pop-in 160ms cubic-bezier(0.2,0.8,0.2,1)}
.svv-toast-icon{display:grid;place-items:center;width:32px;height:32px;flex:none;border-radius:999px;background:var(--sv-accent-subtle);color:var(--sv-accent-text)}
.svv-toast.svv-tone-success .svv-toast-icon{background:var(--sv-success-subtle);color:var(--sv-success-text)}
.svv-toast.svv-tone-danger .svv-toast-icon{background:var(--sv-danger-subtle);color:var(--sv-danger-text)}
.svv-toast-text{flex:1 1 10rem;min-width:0;font-weight:500}
.svv-chip{display:inline-flex;align-items:center;gap:4px;max-width:100%;min-height:28px;padding:2px 2px 2px 12px;border-radius:999px;background:var(--sv-accent-subtle);color:var(--sv-fg);font-size:var(--sv-font-size-sm);font-weight:600}
.svv-chip-text{min-width:0;overflow-wrap:anywhere}
.svv-chip .svv-button{min-height:24px;padding:0 8px;border-radius:999px}
.svv-skeleton{display:grid;gap:10px}
.svv-skeleton span{position:relative;display:block;height:12px;overflow:hidden;border-radius:var(--sv-radius-sm);background:var(--sv-surface-muted)}
.svv-skeleton span:nth-child(3n+2){width:85%}
.svv-skeleton span:nth-child(3n){width:60%}
.svv-skeleton span::after{content:"";position:absolute;inset:0;transform:translateX(-100%);background-image:linear-gradient(90deg,transparent,var(--sv-surface-subtle),transparent);animation:svv-shimmer 1.4s infinite}

${R} [data-sv-part="menu-anchor"]{position:relative}
${R} [data-sv-part="toolbar"]{display:flex;flex-wrap:wrap;align-items:end;gap:12px;margin-bottom:16px}
${R} [data-sv-part="toolbar"]>*{min-width:0}
${R} [data-sv-part="chips"]{display:flex;flex-wrap:wrap;gap:8px;margin:8px 0 16px}
${R} [data-sv-part="pagination"]{display:flex;flex-wrap:wrap;align-items:center;gap:6px;margin-top:16px}
${R} [data-sv-part="pagination"] [aria-current="page"]{border-color:transparent;background-color:var(--sv-accent);background-image:${GRADIENT};color:var(--sv-accent-fg);box-shadow:${GLOW}}
${R} [data-sv-part="details"]{display:grid;grid-template-columns:repeat(auto-fill,minmax(min(240px,100%),1fr));gap:16px 24px;margin:0;padding:calc(var(--sv-space) * 6);background:var(--sv-surface);border:1px solid var(--sv-border);border-radius:var(--sv-radius-lg);box-shadow:var(--sv-shadow-sm)}
${R} [data-sv-part="details"] dt{color:var(--sv-fg-muted);font-size:0.6875rem;font-weight:600;letter-spacing:0.08em;text-transform:uppercase}
${R} [data-sv-part="details"] dd{margin:4px 0 0;overflow-wrap:anywhere;font-weight:500}
${R} [data-sv-part="palette-list"]{list-style:none;margin:8px 0 0;padding:0;max-height:50vh;overflow-y:auto}
${R} [data-sv-part="palette-list"] [role="option"]{padding:8px 10px;border-radius:var(--sv-radius-md);cursor:pointer;overflow-wrap:anywhere}
${R} [data-sv-part="palette-list"] [aria-selected="true"]{background:var(--sv-accent-subtle);color:var(--sv-fg)}
${R} [data-sv-part="palette-group"]{padding:8px 10px 2px;color:var(--sv-fg-muted);font-size:0.6875rem;font-weight:600;letter-spacing:0.08em;text-transform:uppercase}
${R} [data-sv-part="menu"] [role="menuitemcheckbox"],${R} [data-sv-part="menu"] [role="menuitem"]{display:flex;align-items:center;gap:8px;width:100%;padding:8px 10px;border:0;border-radius:var(--sv-radius-md);background:none;color:inherit;font:inherit;text-align:left;cursor:pointer}
${R} [data-sv-part="menu"] [role="menuitemcheckbox"]:hover,${R} [data-sv-part="menu"] [role="menuitem"]:hover{background:var(--sv-surface-muted)}
${R} [data-sv-part="empty"]{display:grid;justify-items:center;gap:12px;padding:40px 16px;text-align:center;color:var(--sv-fg-muted)}
${R} [data-sv-part="filters"]{display:flex;flex-wrap:wrap;align-items:end;gap:12px;min-width:0}
${R} [data-sv-part="chip-list"]{display:flex;flex-wrap:wrap;gap:8px;list-style:none;margin:0;padding:0}
${R} [data-sv-part="detail"],${R} [data-sv-part="list"]{display:grid;gap:16px;min-width:0}
${R} [data-sv-part="related"]{display:grid;gap:12px;margin-top:24px;min-width:0}
${R} [data-sv-part="form"]{max-width:48rem;min-width:0}
${R} [data-sv-part="form-actions"]{display:flex;flex-wrap:wrap;justify-content:flex-end;gap:8px;margin-top:24px;padding-top:16px;border-top:1px solid var(--sv-border)}
${R} [data-sv-part="sign-in"] [type="submit"]{width:100%}
${R} [data-sv-part="palette-hint"]{margin:8px 0 0;color:var(--sv-fg-muted);font-size:var(--sv-font-size-sm)}
${R} [data-sv-part="shortcuts"]{display:grid;grid-template-columns:auto minmax(0,1fr);gap:8px 16px;margin:0}
${R} [data-sv-part="shortcuts"] dd{margin:0;color:var(--sv-fg-muted)}
${R} [data-sv-part="loading"]{color:var(--sv-fg-muted)}
${R} .svv-illustration{display:block;width:min(200px,60%);height:auto;margin:0 auto}

@keyframes svv-fade-in{from{opacity:0}}
@keyframes svv-pop-in{from{opacity:0;transform:translateY(4px) scale(0.98)}}
@keyframes svv-shimmer{to{transform:translateX(100%)}}

@media (min-width:64rem){
.svv-shell[data-rail]{grid-template-columns:76px minmax(0,1fr)}
.svv-shell[data-rail] .svv-sidebar{padding:12px 12px 24px}
.svv-shell[data-rail] .svv-sidebar-top{flex-direction:column;padding:0}
.svv-shell[data-rail] .svv-brand-name,.svv-shell[data-rail] .svv-nav-label,.svv-shell[data-rail] .svv-nav-badge,.svv-shell[data-rail] .svv-nav-heading{${HIDDEN}}
.svv-shell[data-rail] .svv-nav-link{justify-content:center;padding:0}
.svv-shell[data-rail] .svv-nav-link:hover{transform:none}
.svv-shell[data-rail] .svv-nav-group+.svv-nav-group{border-top:1px solid var(--sv-border);padding-top:16px}
}
@media (max-width:63.99rem){
.svv-shell{grid-template-columns:minmax(0,1fr)}
.svv-shell-nav{display:none}
.svv-shell[data-nav-open] .svv-shell-nav{display:block;position:fixed;inset:0 auto 0 0;width:min(var(--sv-sidebar-width),85vw);height:auto;z-index:30;box-shadow:var(--sv-shadow-pop);animation:svv-slide-in 220ms cubic-bezier(0.2,0.8,0.2,1)}
.svv-rail-toggle{display:none}
.svv-topbar{padding:12px 16px}
.svv-topbar [data-sv-part="menu-button"]{display:inline-flex}
.svv-shell-body>main{padding:16px}
.svv-auth{grid-template-columns:minmax(0,1fr)}
.svv-auth-panel{display:none}
.svv-auth-brand{display:flex}
}
@media (max-width:40rem){
.svv-page-actions{flex-basis:100%}
.svv-page-actions>*{flex:1 1 auto}
.svv-topbar-search .svv-button{width:100%}
.svv-card,${R} [data-sv-part="details"]{padding:16px}
}
@keyframes svv-slide-in{from{transform:translateX(-100%)}}
@media (prefers-reduced-motion:reduce){${R} *,${R} *::before,${R} *::after{animation:none;transition:none}}
`
