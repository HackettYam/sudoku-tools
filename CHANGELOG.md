# Changelog

All notable changes to this project will be documented in this file. See [release-it](https://github.com/release-it/release-it) and [@release-it/conventional-changelog](https://github.com/release-it/conventional-changelog) for commit guidelines.

## [1.1.0](https://github.com/hackettyam/sudoku-tools/releases/tag/v1.1.0) (2026-07-04)

### Features

* **utils:** Export missing utility functions in index ([80df163](https://github.com/hackettyam/sudoku-tools/commit/80df163))
* **utils:** Add input validation for cell indices ([61e4fce](https://github.com/hackettyam/sudoku-tools/commit/61e4fce))
* **solver:** Improve error messages and return types ([d1dd2bb](https://github.com/hackettyam/sudoku-tools/commit/d1dd2bb))
* **security:** Replace husky+lint-staged with lefthook (CVE mitigation) ([1db59a9](https://github.com/hackettyam/sudoku-tools/commit/1db59a9))

### Bug Fixes

* **core:** Replace @/ alias with relative imports ([730cd75](https://github.com/hackettyam/sudoku-tools/commit/730cd75))
* **example:** Start timer only when game begins ([4acb871](https://github.com/hackettyam/sudoku-tools/commit/4acb871))
* **utils:** Remove unreachable branch for 100% branch coverage ([0801558](https://github.com/hackettyam/sudoku-tools/commit/0801558))

### Documentation

* **api:** Export CellPosition and SudokuPuzzleOptions, fix docs consistency ([0fd5085](https://github.com/hackettyam/sudoku-tools/commit/0fd5085))
* **core:** Add JSDoc to all public exports ([5e37e2e](https://github.com/hackettyam/sudoku-tools/commit/5e37e2e))
* **readme:** Add documentation for new types and utilities ([60506ed](https://github.com/hackettyam/sudoku-tools/commit/60506ed))
* **readme:** Add playable Sudoku examples with CLI library integration ([ef51c64](https://github.com/hackettyam/sudoku-tools/commit/ef51c64))

### Performance Improvements

* **utils:** Add benchmark script with auto-generated results ([b3c3d9d](https://github.com/hackettyam/sudoku-tools/commit/b3c3d9d))

### Code Refactoring

* **config:** Export difficulty constants as `as const` ([9fb2691](https://github.com/hackettyam/sudoku-tools/commit/9fb2691))

### CI/CD

* Add GitHub Actions CI workflow ([bdd5d42](https://github.com/hackettyam/sudoku-tools/commit/bdd5d42))

### BREAKING CHANGES

* **solver:** `solvePuzzle()` now returns `SolveResult` instead of `BoardType | null`
* **solver:** `isValidPlacement()` now returns `PlacementValidationResult` instead of `boolean`

---

## [1.0.0](https://github.com/hackettyam/sudoku-tools/releases/tag/v1.0.0) (2025-12-18)

### Features

* **config:** Configure Git hooks and commit automation with Husky, Commitlint, and Standard Version ([20ac842](https://github.com/hackettyam/sudoku-tools/commit/20ac842a53410c2dcc4dadcfa84555998ab64b54))
* **core:** Add SudokuPuzzle class with comprehensive game state management and update documentation ([66b082e](https://github.com/hackettyam/sudoku-tools/commit/66b082e7cc019902cd4bb34fa0b05dfe3deff5db))
* **core:** Rename main API functions and improve naming consistency ([d038548](https://github.com/hackettyam/sudoku-tools/commit/d0385487ee9fdbc52c82dd7d0b57c03723818383))
* **testing:** Add Vitest testing framework with coverage support ([d4ee9fd](https://github.com/hackettyam/sudoku-tools/commit/d4ee9fd84fc7c17c6aa600b12693a63ec428e67d))
* **testing:** Add Vitest UI for interactive test visualization ([6063c8b](https://github.com/hackettyam/sudoku-tools/commit/6063c8b1d7bdc33e82507dd9e2a098e551374781))
* **utils:** Add advanced solving utilities and difficulty analysis functions ([98a9485](https://github.com/hackettyam/sudoku-tools/commit/98a948541020902d3ba4b60bb566b8261f8b8155))
* **utils:** Add cell counting and validation utilities with comprehensive tests ([06cc1a1](https://github.com/hackettyam/sudoku-tools/commit/06cc1a18b09de2df52ac737fdf26204edc912611))
* **utils:** Add comprehensive game utilities and cell manipulation functions ([10df1eb](https://github.com/hackettyam/sudoku-tools/commit/10df1eb4116af15dc73f40f482af9246b5f522e4))

### Code Refactoring

* **models:** Reorganize type exports and move interfaces to dedicated model files ([b464487](https://github.com/hackettyam/sudoku-tools/commit/b464487010ddfae32bfb541d86c24c265801b89f))
* **testing:** Reorganize test files into __tests__ directories following standard convention ([104b22c](https://github.com/hackettyam/sudoku-tools/commit/104b22c95bcf82e92e6eb3a9c32870a497f57c14))

### Documentation

* **core:** Add comprehensive documentation for game utilities and new types ([b070e6d](https://github.com/hackettyam/sudoku-tools/commit/b070e6dd930efc329ab251dc098caf6b12fd2522))
* **readme:** Enhance README with modern formatting, badges, and improved navigation ([ef55335](https://github.com/hackettyam/sudoku-tools/commit/ef553358da10f18386eaf8bcf8bf0850d0e5e130))
