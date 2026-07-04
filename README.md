# 🧩 @hackettyam/sudoku-tools

> A lightweight, zero-dependency TypeScript library for Sudoku puzzle generation, manipulation, and utilities. This library provides pure logic functions without any UI or framework dependencies, making it suitable for any JavaScript/TypeScript project.

[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue.svg)](https://www.typescriptlang.org/)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](./LICENSE)
[![Coverage](https://img.shields.io/badge/coverage-100%25-brightgreen.svg)](#)

## ✨ Features

- 🔷 **Pure TypeScript** - Full type safety with comprehensive type definitions
- 📦 **Zero Dependencies** - No external runtime dependencies
- 🎯 **Framework Agnostic** - Works with any JavaScript framework or vanilla JS
- 🧱 **Modular Design** - Import only what you need
- ✅ **100% Test Coverage** - Thoroughly tested and reliable

## 📦 Installation

### 📥 Package Manager

Install using your preferred package manager:

```bash
# npm
npm install @hackettyam/sudoku-tools

# yarn
yarn add @hackettyam/sudoku-tools

# pnpm
pnpm add @hackettyam/sudoku-tools
```

### 🔗 Path Alias (Monorepo)

If using as a local package in a monorepo, add the path alias to your `tsconfig.json`:

```json
{
  "compilerOptions": {
    "paths": {
      "@hackettyam/sudoku-tools": ["./libs/@hackettyam/sudoku-tools/src"]
    }
  }
}
```

## 🚀 Quick Start

Create your first Sudoku puzzle in seconds:

```typescript
import { createSudoku, Difficulty } from '@hackettyam/sudoku-tools'

// 1️⃣ Create a puzzle
const puzzle = createSudoku(Difficulty.Normal)

// 2️⃣ Play the game
puzzle.setCell(0, 0, 5)           // ✏️ Set a cell value
const hint = puzzle.getHint()     // 💡 Get help when stuck
puzzle.getCandidates(0, 0)        // 📋 See valid options

// 3️⃣ Track progress
console.log(puzzle.getProgress()) // 📊 { progress: 45, validCells: 35, ... }
console.log(puzzle.isSolved())    // 🏆 Check if solved!
```

## 📖 Documentation

Explore the complete documentation in [`docs/`](./docs/README.md):

| Section | Description |
|---------|-------------|
| 🚀 [**Getting Started**](./docs/getting-started.md) | Installation, setup, and first puzzle |
| 🧩 [**SudokuPuzzle**](./docs/api/sudoku-puzzle.md) | Main puzzle class - play, hint, validate |
| 🛠️ [**Utilities**](./docs/api/utilities.md) | Helper functions for everything else |
| 📦 [**Models & Types**](./docs/api/models.md) | TypeScript types and interfaces |
| 🔢 [**Constants**](./docs/api/constants.md) | Grid and difficulty constants |
| 💡 [**Examples**](./docs/guides/examples.md) | Real-world usage patterns |
| 🎮 [**Playground**](./docs/guides/playground.md) | Runnable examples (CLI, HTML, React) |
| 🔄 [**Transformations**](./docs/guides/transformations.md) | Rotate, mirror, shuffle boards |
| ✅ [**Validation**](./docs/guides/validation.md) | Check moves and board states |

## 🎮 API Overview

### 🧩 Creating Puzzles

```typescript
import { createSudoku, Difficulty } from '@hackettyam/sudoku-tools'

const puzzle = createSudoku(Difficulty.Hard)
```

### 🧩 SudokuPuzzle Methods

| Method | Description |
|--------|-------------|
| ✏️ `setCell(row, col, value)` | Place a number in a cell |
| 🗑️ `clearCell(row, col)` | Erase a cell |
| 📋 `getCandidates(row, col)` | Get valid options for a cell |
| 💡 `getHint()` | Get help when stuck |
| 📊 `getProgress()` | See completion stats |
| 🛡️ `isValidMove(row, col, value)` | Check before placing |
| ✅ `isComplete()` | All cells filled? |
| 🏆 `isSolved()` | Puzzle solved correctly? |
| 🔄 `reset(randomize?)` | Start over |

### 🎚️ Difficulty Levels

Choose the right challenge:

| Level | Hints | Empty Cells | Best For |
|-------|-------|-------------|----------|
| 🟢 `Novice` | 50 | 31 | Beginners |
| 🟡 `Easy` | 40 | 41 | Casual play |
| 🟠 `Normal` | 35 | 46 | Regular players |
| 🔴 `Hard` | 30 | 51 | Challenge seekers |
| ⚫ `Expert` | 20 | 61 | Sudoku masters |

## 🔧 Utilities

Powerful helper functions for advanced use cases:

```typescript
import {
  // 🎲 Board manipulation
  cloneBoard,          // Deep copy a board
  setCellValue,        // Immutably set a cell
  clearCell,           // Immutably clear a cell

  // 🧠 Solving
  solvePuzzle,         // Solve any valid puzzle
  hasUniqueSolution,   // Verify single solution

  // ✅ Validation
  isValidPuzzle,       // Check entire board
  isValidRow,          // Check specific row
  isValidColumn,       // Check specific column
  isValidBox,          // Check 3x3 box

  // 🔄 Transformations
  rotateBoard,         // Rotate 90° clockwise
  mirrorBoard,         // Flip horizontally/vertically
  randomizeBoard,      // Shuffle for variety

  // 💾 Serialization
  serializeBoard,      // Board → string (save)
  deserializeBoard,    // String → board (load)

  // 📊 Analysis
  getDifficulty,       // Estimate puzzle difficulty
  getCandidates,       // Valid values for a cell
  getHint,             // Find next move
} from '@hackettyam/sudoku-tools'
```

## 📝 TypeScript Support

Full type safety out of the box:

```typescript
import type {
  BoardType,              // 9x9 number grid
  CellValue,              // 0-9 cell value
  DifficultyType,         // Difficulty string union
  HintResult,             // { row, col, value }
  SudokuPuzzleStatistics, // Progress tracking
} from '@hackettyam/sudoku-tools'
```

## 📊 Performance Benchmark

Track generation and solving performance across difficulty levels:

```bash
pnpm bench
```

This runs 10 iterations per difficulty and outputs:

```
┌─────────────────┬─────────────┬───────────┬───────────┬─────────┐
│ Difficulty      │ Metric      │ Avg (ms)  │ Min (ms)  │ Max (ms)│
├─────────────────┼─────────────┼───────────┼───────────┼─────────┤
│ Novice          │ Generation  │      0.09 │      0.05 │      0.19 │
│ Novice          │ Solving     │      0.63 │      0.45 │      1.35 │
│ Expert          │ Generation  │      0.05 │      0.04 │      0.08 │
│ Expert          │ Solving     │     14.72 │     14.49 │     15.33 │
└─────────────────┴─────────────┴───────────┴───────────┴─────────┘
```

Results are saved to `benchmark-results/latest.md`. See [`docs/guides/benchmark.md`](./docs/guides/benchmark.md) for detailed documentation.

## 📄 License

MIT © hackettyam

---

*Happy puzzling!* 🧩✨
