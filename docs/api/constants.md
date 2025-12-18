# 🔢 Constants

Reference for all exported constants. These are the magic numbers that power your Sudoku games! ✨

## 📐 Grid Constants

### `SUDOKU_SIZE`

Standard Sudoku grid dimension (9x9).

```typescript
const SUDOKU_SIZE = 9
```

**Usage:**

```typescript
import { SUDOKU_SIZE } from '@hackettyam/sudoku-tools'

for (let row = 0; row < SUDOKU_SIZE; row++) {
  for (let col = 0; col < SUDOKU_SIZE; col++) {
    // Process each cell
  }
}
```

---

### `SUDOKU_EMPTY_CELL`

Value representing an empty cell.

```typescript
const SUDOKU_EMPTY_CELL = 0
```

**Usage:**

```typescript
import { SUDOKU_EMPTY_CELL } from '@hackettyam/sudoku-tools'

// Check if a cell is empty
if (board[row][col] === SUDOKU_EMPTY_CELL) {
  console.log('Cell is empty')
}

// Clear a cell
board[row][col] = SUDOKU_EMPTY_CELL
```

---

### `SUDOKU_BASE_BOARD`

A valid solved Sudoku board used as the base for puzzle generation.

```typescript
const SUDOKU_BASE_BOARD: number[][] = [
  [1, 2, 3, 4, 5, 6, 7, 8, 9],
  [4, 5, 6, 7, 8, 9, 1, 2, 3],
  [7, 8, 9, 1, 2, 3, 4, 5, 6],
  [2, 3, 4, 5, 6, 7, 8, 9, 1],
  [5, 6, 7, 8, 9, 1, 2, 3, 4],
  [8, 9, 1, 2, 3, 4, 5, 6, 7],
  [3, 4, 5, 6, 7, 8, 9, 1, 2],
  [6, 7, 8, 9, 1, 2, 3, 4, 5],
  [9, 1, 2, 3, 4, 5, 6, 7, 8],
]
```

**Usage:**

```typescript
import { SUDOKU_BASE_BOARD, cloneBoard, randomizeBoard } from '@hackettyam/sudoku-tools'

// Create a randomized valid board
const board = cloneBoard(SUDOKU_BASE_BOARD)
randomizeBoard(board)
```

> ⚠️ **Warning:** Always clone before modifying to avoid mutating the original constant.

---

## 🎚️ Difficulty Constants

### `SUDOKU_DIFFICULTY_HINTS`

Mapping of difficulty levels to number of pre-filled hints.

```typescript
const SUDOKU_DIFFICULTY_HINTS: Record<Difficulty, DifficultyHints> = {
  [Difficulty.Novice]: DifficultyHints.Novice,   // 50
  [Difficulty.Easy]: DifficultyHints.Easy,       // 40
  [Difficulty.Normal]: DifficultyHints.Normal,   // 35
  [Difficulty.Hard]: DifficultyHints.Hard,       // 30
  [Difficulty.Expert]: DifficultyHints.Expert,   // 20
}
```

**Usage:**

```typescript
import { SUDOKU_DIFFICULTY_HINTS, Difficulty } from '@hackettyam/sudoku-tools'

const hints = SUDOKU_DIFFICULTY_HINTS[Difficulty.Hard]
console.log(`Hard puzzles have ${hints} hints`) // 30
```

---

## ⚡ Quick Reference Table

| Constant | Value | Description |
|----------|-------|-------------|
| `SUDOKU_SIZE` | `9` | Grid dimension (9×9) |
| `SUDOKU_EMPTY_CELL` | `0` | Empty cell marker |
| `SUDOKU_BASE_BOARD` | `number[][]` | Starting solved board |
| `SUDOKU_DIFFICULTY_HINTS` | `Record` | Hints per difficulty |

---

## 📥 Importing Constants

Grab just what you need:

```typescript
import {
  SUDOKU_SIZE,
  SUDOKU_EMPTY_CELL,
  SUDOKU_BASE_BOARD,
  SUDOKU_DIFFICULTY_HINTS,
  Difficulty,
  DifficultyHints,
} from '@hackettyam/sudoku-tools'
```

---

## 🔗 See Also

- 📦 [Models & Types](./models.md) - TypeScript types
- 🧩 [SudokuPuzzle](./sudoku-puzzle.md) - Main puzzle class
- 🛠️ [Utilities](./utilities.md) - Utility functions

---

*Constants keep your code consistent!* 🎯
