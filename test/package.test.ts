/**
 * Package hygiene (production-readiness gate R5, the parts a unit test can see): peers, engines,
 * ESM exports for the JS and the two CSS files, no local-only dependency specs, the lockstep
 * version line (CONSISTENCY item 128) and the files that must ship.
 */
import { existsSync, readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'

interface PackageJson {
  readonly name: string
  readonly version: string
  readonly type: string
  readonly license: string
  readonly sideEffects: readonly string[]
  readonly engines: { readonly node: string }
  readonly exports: Record<string, string | Record<string, string>>
  readonly files: readonly string[]
  readonly dependencies: Record<string, string>
  readonly peerDependencies: Record<string, string>
  readonly devDependencies: Record<string, string>
  readonly publishConfig: { readonly access: string; readonly provenance: boolean }
}

const pkg = JSON.parse(readFileSync('package.json', 'utf8')) as PackageJson

describe('package.json', () => {
  it('is the ESM package @strutvane/design-vivid, MIT, public with provenance', () => {
    expect(pkg.name).toBe('@strutvane/design-vivid')
    expect(pkg.type).toBe('module')
    expect(pkg.license).toBe('MIT')
    expect(pkg.publishConfig).toEqual({ access: 'public', provenance: true })
  })

  it('rides the core train as a 0.2.0-next.N pre-release, never a stable version on latest', () => {
    expect(pkg.version).toMatch(/^0\.2\.0-next\.\d+$/)
    const pre = JSON.parse(readFileSync('.changeset/pre.json', 'utf8')) as {
      mode: string
      tag: string
    }
    expect(pre).toMatchObject({ mode: 'pre', tag: 'next' })
  })

  it('needs Node 24.3 or newer', () => {
    expect(pkg.engines.node).toBe('>=24.3')
  })

  it('has @strutvane/ui and react as peers, never as dependencies', () => {
    expect(pkg.peerDependencies).toEqual({ '@strutvane/ui': '^0.2.0-next.1', react: '^19.2.0' })
    expect(pkg.dependencies['@strutvane/ui']).toBeUndefined()
    expect(pkg.dependencies['react']).toBeUndefined()
  })

  it('tests against the exact ui version the peer range starts at', () => {
    // The peer floor must be a published ui version that this repo's own tests ran against.
    expect(`^${pkg.devDependencies['@strutvane/ui']}`).toBe(pkg.peerDependencies['@strutvane/ui'])
  })

  it('pins every dependency to an exact registry version (no file:, link: or ranges)', () => {
    for (const field of [pkg.dependencies, pkg.devDependencies])
      for (const [name, spec] of Object.entries(field))
        expect(spec, `${name}@${spec}`).toMatch(/^\d+\.\d+\.\d+(?:-[\w.]+)?$/)
  })

  it('exports the JS entry (types first) and the two CSS files', () => {
    expect(pkg.exports['.']).toEqual({
      types: './dist/index.d.mts',
      default: './dist/index.mjs',
    })
    expect(Object.keys(pkg.exports['.'] as Record<string, string>)[0]).toBe('types')
    expect(pkg.exports['./vivid.css']).toBe('./dist/vivid.css')
    expect(pkg.exports['./fonts.css']).toBe('./dist/fonts.css')
  })

  it('marks only the CSS as having side effects, so bundlers tree-shake the rest', () => {
    expect(pkg.sideEffects).toEqual(['*.css'])
  })

  it('ships dist and the docs, and the docs exist', () => {
    expect(pkg.files).toEqual(['dist', 'README.md', 'DESIGN.md', 'CHANGELOG.md', 'LICENSE'])
    for (const file of ['README.md', 'DESIGN.md', 'CHANGELOG.md', 'LICENSE'])
      expect(existsSync(file), file).toBe(true)
  })
})
