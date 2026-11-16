# Changesets

Every pull request that changes the published package adds a changeset:

```bash
npx changeset
```

Before 1.0, breaking changes ride a **minor** bump (blueprint §8, CONSISTENCY item 128); never pick
`major`. The repo is in pre mode `next`, so versions come out as `0.2.0-next.N` in lockstep with
the core train. The release workflow turns pending changesets into a version bump and a CHANGELOG
entry and stages the release on npm.
