/**
 * The sidebar's icon-rail preference: whether a desktop viewer collapsed Vivid's 260px sidebar to
 * a 76px rail, remembered per browser.
 *
 * Why the design keeps it: the Design contract has no "collapsed" state (only the mobile drawer's
 * `navOpen`), and the rail only exists in Vivid's look. It is a viewing preference like the theme,
 * not app state, and it is stored the same way: storage that is blocked, full or missing (private
 * mode, server rendering, a sandboxed iframe) just means the choice isn't remembered. Nothing here
 * ever throws.
 *
 * @module
 */

/** The storage key of the rail preference. */
export const RAIL_STORAGE_KEY = 'strutvane:vivid:rail'

/** The stored value for a collapsed sidebar (anything else, or nothing, means expanded). */
const RAIL = 'rail'

/** The storage the preference lives in, or `undefined` when the environment has none. */
function storage(): Storage | undefined {
  try {
    return typeof localStorage === 'undefined' ? undefined : localStorage
  } catch {
    // Some sandboxes throw on the mere access to `localStorage`.
    return undefined
  }
}

/**
 * Whether the viewer last chose the icon rail. `false` when nothing (readable) is stored.
 *
 * @example
 * readRail() // false on a first visit
 */
export function readRail(): boolean {
  try {
    return storage()?.getItem(RAIL_STORAGE_KEY) === RAIL
  } catch {
    return false
  }
}

/**
 * Remember the viewer's choice. Never throws: blocked or full storage is ignored.
 *
 * @example
 * writeRail(true) // the next visit starts with the rail
 */
export function writeRail(rail: boolean): void {
  try {
    storage()?.setItem(RAIL_STORAGE_KEY, rail ? RAIL : 'full')
  } catch {
    // Blocked or full storage: the choice still applies now, it just isn't remembered.
  }
}
