<!-- markdownlint-configure-file {"MD024": { "siblings_only": true } } -->

# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and this project
adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Changed

- Switched the test runner from Jest to Vitest. Removed `jest`, `ts-jest`, and `@types/jest`;
  added `vitest` and `@vitest/coverage-v8`. The test imports from `vitest` and wraps the
  module-level `global.ObjC` setup in `vi.hoisted(...)` so the SUT's `ObjC.import('stdlib')`
  call sees the stub at module-load time. The dead `jest.mock('stdlib', ..., { virtual: true })`
  call was removed: `'stdlib'` is a JXA framework name, not a JS module, so no module-level mock
  is needed.
- Upgraded TypeScript to the latest 6.x. Removed the temporary 5.x pin from `.wiswa.jsonnet` and
  the `moduleResolution: 'node'` override in `tsconfig`.
- Generated `Tests` workflow now runs `yarn vitest run --coverage`.

## [0.0.5] - 2026-05-02

### Changed

- Updated development and runtime dependencies, including `cspell`, `eslint`,
  `typescript-eslint`, `typescript`, `webpack`, `webpack-cli`, `jest`, `ts-jest`, `prettier`,
  `markdownlint-cli2`, `typedoc`, and `@types/node`.
- Bumped GitHub Actions: `actions/checkout`, `actions/setup-node`, `softprops/action-gh-release`,
  and `github/codeql-action`.
- Release workflows now gate publication on a dedicated **Upload dist** job, drop redundant
  install and build steps from the publish and upload-dist workflows, and rename the release
  asset to `facetime-clear-badge`.

### Fixed

- Restored CommonJS compatibility by setting `moduleResolution` correctly in `tsconfig`.
- Removed the deprecated `baseUrl` from `tsconfig` and addressed TypeScript 6 deprecation
  warnings.

## [0.0.1]

First version.

[unreleased]: https://github.com/Tatsh/facetime-clear-badge/compare/v0.0.5...HEAD
[0.0.5]: https://github.com/Tatsh/facetime-clear-badge/compare/v0.0.4...v0.0.5
[0.0.1]: https://github.com/Tatsh/facetime-clear-badge/releases/tag/v0.0.1
