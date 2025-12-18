# 🚀 Getting Started

Get up and running with **@hackettyam/sudoku-tools** in minutes! This guide will have you creating and playing Sudoku puzzles in no time.

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

## ⚡ Quick Start

### 🎮 Creating Your First Puzzle

```typescript
import { createSudoku, Difficulty } from '@hackettyam/sudoku-tools'

// Create a puzzle with default difficulty (Normal)
const puzzle = createSudoku()

// Or specify a difficulty level
const easyPuzzle = createSudoku(Difficulty.Easy)
const hardPuzzle = createSudoku(Difficulty.Expert)
```

### 📊 Accessing Puzzle Data

```typescript
const puzzle = createSudoku(Difficulty.Normal)

// The current board state (player's progress)
console.log(puzzle.current)

// The complete solution
console.log(puzzle.solution)

// The original puzzle (for reset)
console.log(puzzle.original)

// Difficulty level
console.log(puzzle.difficulty) // 'normal'

// Which cells are pre-filled (read-only)
console.log(puzzle.readOnly) // boolean[][]
```

### 🎯 Playing the Game

```typescript
const puzzle = createSudoku()

// Set a cell value
puzzle.setCell(0, 0, 5) // row, col, value

// Clear a cell
puzzle.clearCell(0, 0)

// Get valid candidates for a cell
const candidates = puzzle.getCandidates(0, 0)
console.log('Possible values:', candidates) // [1, 3, 7]

// Check if a move is valid
if (puzzle.isValidMove(0, 0, 5)) {
  puzzle.setCell(0, 0, 5)
}
```

### 💡 Getting Help

```typescript
const puzzle = createSudoku()

// Get a hint (next cell to fill with correct value)
const hint = puzzle.getHint()
if (hint) {
  console.log(`Place ${hint.value} at row ${hint.row}, col ${hint.col}`)
  puzzle.setCell(hint.row, hint.col, hint.value)
}
```

### 📈 Tracking Progress

```typescript
const puzzle = createSudoku()

// Get progress statistics
const stats = puzzle.getProgress()
console.log(`Progress: ${stats.progress}%`)
console.log(`Empty: ${stats.emptyCells}`)
console.log(`Filled: ${stats.filledCells}`)
console.log(`Valid: ${stats.validCells}`)
console.log(`Invalid: ${stats.invalidCells}`)

// Check if puzzle is complete
if (puzzle.isComplete()) {
  console.log('All cells filled!')
}

// Check if puzzle is solved correctly
if (puzzle.isSolved()) {
  console.log('Congratulations! You solved it!')
}
```

### 🔄 Resetting the Puzzle

```typescript
const puzzle = createSudoku()

// Reset to original state
puzzle.reset()

// Reset and randomize the board
puzzle.reset(true)
```

## 🎚️ Difficulty Levels

Choose the challenge that's right for you!

| Difficulty | Hints | Empty Cells | Best For |
|------------|-------|-------------|----------|
| 🟢 `Novice`   | 50    | 31          | Beginners |
| 🟡 `Easy`     | 40    | 41          | Casual play |
| 🟠 `Normal`   | 35    | 46          | Regular players |
| 🔴 `Hard`     | 30    | 51          | Challenge seekers |
| ⚫ `Expert`   | 20    | 61          | Sudoku masters |

```typescript
import { Difficulty, DifficultyHints } from '@hackettyam/sudoku-tools'

// Access difficulty values
console.log(Difficulty.Normal) // 'normal'
console.log(DifficultyHints.Normal) // 35
```

## 🎯 Next Steps

Ready to dive deeper? Check out these resources:

- 🧩 [SudokuPuzzle API](./api/sudoku-puzzle.md) - Master all puzzle methods
- 🛠️ [Utilities](./api/utilities.md) - Explore helper functions
- 💡 [Advanced Examples](./guides/examples.md) - Real-world code patterns

---

*You're all set! Start creating awesome Sudoku games!* 🎉
