/**
 * The rail preference outside a browser: no storage at all (server rendering, Node), and storage
 * whose mere access throws (some sandboxed iframes). Neither may throw or remember anything.
 */
import { afterEach, describe, expect, it, vi } from 'vitest'
import { readRail, writeRail } from '../src/index.ts'

afterEach(() => {
  vi.unstubAllGlobals()
})

describe('rail preference without usable storage', () => {
  it('reads "expanded" and ignores writes when there is no localStorage', () => {
    expect(typeof localStorage).toBe('undefined')
    expect(readRail()).toBe(false)
    expect(() => writeRail(true)).not.toThrow()
    expect(readRail()).toBe(false)
  })

  it('survives a localStorage whose access throws', () => {
    Object.defineProperty(globalThis, 'localStorage', {
      configurable: true,
      get() {
        throw new DOMException('denied', 'SecurityError')
      },
    })
    try {
      expect(readRail()).toBe(false)
      expect(() => writeRail(true)).not.toThrow()
    } finally {
      Reflect.deleteProperty(globalThis, 'localStorage')
    }
  })
})
