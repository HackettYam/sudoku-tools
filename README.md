# @hackettyam/sudoku-tools

A lightweight, zero-dependency TypeScript library for Sudoku puzzle generation, manipulation, and utilities. This library provides pure logic functions without any UI or framework dependencies, making it suitable for any JavaScript/TypeScript project.

## Features

- **Pure TypeScript** - Full type safety with comprehensive type definitions
- **Zero Dependencies** - No external runtime dependencies
- **Framework Agnostic** - Works with any JavaScript framework or vanilla JS
- **Modular Design** - Import only what you need
- **Well Documented** - JSDoc comments on all exports

## Installation

This is a local library. Add it to your project's path aliases:

```typescript
// tsconfig.json
{
  "compilerOptions": {
    "paths": {
      "@hackettyam/sudoku-tools": ["./libs/@hackettyam/sudoku-tools/src"]
    }
  }
}
```

## Quick Start

```typescript
import { generateSudoku, Difficulty } from '@hackettyam/sudoku-tools'

// Generate a Sudoku puzzle
const { board, solved } = generateSudoku(Difficulty.Normal)

console.log('Puzzle:', board)
console.log('Solution:', solved)
```

**Output:**

```text
Puzzle: [
  [0, 0, 3, 0, 5, 0, 7, 0, 9],
  [4, 0, 0, 7, 0, 9, 0, 2, 0],
  [0, 8, 9, 0, 2, 3, 0, 5, 0],
  [2, 0, 0, 5, 0, 7, 0, 9, 1],
  [0, 6, 7, 0, 9, 0, 2, 0, 4],
  [8, 0, 0, 2, 0, 4, 0, 6, 0],
  [0, 4, 5, 0, 7, 8, 0, 1, 2],
  [6, 0, 0, 9, 0, 2, 0, 4, 0],
  [0, 1, 2, 0, 4, 5, 0, 7, 8]
]

Solution: [
  [1, 2, 3, 4, 5, 6, 7, 8, 9],
  [4, 5, 6, 7, 8, 9, 1, 2, 3],
  [7, 8, 9, 1, 2, 3, 4, 5, 6],
  [2, 3, 4, 5, 6, 7, 8, 9, 1],
  [5, 6, 7, 8, 9, 1, 2, 3, 4],
  [8, 9, 1, 2, 3, 4, 5, 6, 7],
  [3, 4, 5, 6, 7, 8, 9, 1, 2],
  [6, 7, 8, 9, 1, 2, 3, 4, 5],
  [9, 1, 2, 3, 4, 5, 6, 7, 8]
]
```

> **Note:** The puzzle is randomized on each generation, so actual values will differ. Cells with `0` represent empty cells that the player needs to fill.

## API Reference

### Models

#### `BoardType`

Represents a Sudoku board as a 2D array of numbers.

```typescript
type BoardType = number[][]
```

#### `BoardCellType`

Represents a cell position on the board.

```typescript
interface BoardCellType {
  col: number
  row: number
}
```

#### `BoardReadOnlyType`

Represents a read-only cell map for the board (used to track which cells are pre-filled).

```typescript
type BoardReadOnlyType = boolean[][]
```

#### `Difficulty`

Enum representing difficulty levels.

```typescript
enum Difficulty {
  Novice = 'novice',   // 50 hints
  Easy = 'easy',       // 40 hints
  Normal = 'normal',   // 35 hints
  Hard = 'hard',       // 30 hints
  Expert = 'expert',   // 20 hints
}
```

#### `DifficultyHints`

Enum representing the number of hints for each difficulty level.

```typescript
enum DifficultyHints {
  Novice = 50,
  Easy = 40,
  Normal = 35,
  Hard = 30,
  Expert = 20,
}
```

---

### Constants

#### `SUDOKU_SIZE`

Standard Sudoku grid size (9x9).

```typescript
const SUDOKU_SIZE = 9
```

#### `SUDOKU_EMPTY`

Value representing an empty cell.

```typescript
const SUDOKU_EMPTY = 0
```

#### `SUDOKU_BASE_BOARD`

A valid solved Sudoku board used as the base for generation.

```typescript
const SUDOKU_BASE_BOARD: number[][] = [
  [1, 2, 3, 4, 5, 6, 7, 8, 9],
  [4, 5, 6, 7, 8, 9, 1, 2, 3],
  // ... (9x9 valid Sudoku)
]
```

#### `SUDOKU_DIFFICULTY_HINTS`

Mapping of difficulty levels to number of hints.

```typescript
const SUDOKU_DIFFICULTY_HINTS: Record<Difficulty, DifficultyHints>
```

---

### Features

#### `generateSudoku(difficulty?)`

Generates a Sudoku puzzle based on the difficulty level.

**Parameters:**
- `difficulty` (optional): `Difficulty` - The difficulty level. Defaults to `Difficulty.Normal`.

**Returns:**
- `GenerateSudokuResult` - An object containing:
  - `board`: The puzzle board with empty cells
  - `solved`: The complete solution

**Example:**

```typescript
import { generateSudoku, Difficulty } from '@hackettyam/sudoku-tools'

// Generate with default difficulty (Normal)
const puzzle1 = generateSudoku()

// Generate an easy puzzle
const puzzle2 = generateSudoku(Difficulty.Easy)

// Generate an expert puzzle
const puzzle3 = generateSudoku(Difficulty.Expert)

console.log('Easy puzzle has', countHints(puzzle2.board), 'hints') // ~40 hints
console.log('Expert puzzle has', countHints(puzzle3.board), 'hints') // ~20 hints
```

---

### Utilities

#### `cloneBoard(board)`

Creates a deep copy of a Sudoku board.

**Parameters:**
- `board`: `BoardType` - The board to clone.

**Returns:**
- `BoardType` - A new board with copied values.

**Example:**

```typescript
import { cloneBoard, generateSudoku } from '@hackettyam/sudoku-tools'

const { board } = generateSudoku()
const boardCopy = cloneBoard(board)

// Modify the copy without affecting the original
boardCopy[0][0] = 5
console.log(board[0][0] !== boardCopy[0][0]) // true
```

---

#### `randomizeBoard(board)`

Applies transformations to a Sudoku board to obtain randomness. Modifies the board in place.

**Transformations applied:**
- Permutes digits randomly
- Permutes rows within 3x3 bands
- Permutes columns within 3x3 stacks

**Parameters:**
- `board`: `BoardType` - The board to randomize (modified in place).

**Example:**

```typescript
import { randomizeBoard, cloneBoard, SUDOKU_BASE_BOARD } from '@hackettyam/sudoku-tools'

const board = cloneBoard(SUDOKU_BASE_BOARD)
randomizeBoard(board)

// Board is now randomized but still valid
console.log('Randomized board:', board)
```

---

#### `removeCells(board, hints)`

Removes cells from the board until reaching the desired number of hints. Modifies the board in place.

**Parameters:**
- `board`: `BoardType` - The board to modify.
- `hints`: `number` - The number of cells to keep filled.

**Example:**

```typescript
import { removeCells, cloneBoard, SUDOKU_BASE_BOARD, SUDOKU_EMPTY } from '@hackettyam/sudoku-tools'

const board = cloneBoard(SUDOKU_BASE_BOARD)
removeCells(board, 30) // Keep only 30 hints

// Count remaining hints
const hintCount = board.flat().filter(cell => cell !== SUDOKU_EMPTY).length
console.log('Hints remaining:', hintCount) // 30
```

---

#### `swapDigits(board, d1, d2)`

Swaps all occurrences of two digits in the board. Modifies the board in place.

**Parameters:**
- `board`: `BoardType` - The board to modify.
- `d1`: `number` - First digit (1-9).
- `d2`: `number` - Second digit (1-9).

**Example:**

```typescript
import { swapDigits, cloneBoard, SUDOKU_BASE_BOARD } from '@hackettyam/sudoku-tools'

const board = cloneBoard(SUDOKU_BASE_BOARD)

// Swap all 1s with 9s
swapDigits(board, 1, 9)

// Now every cell that was 1 is 9 and vice versa
console.log(board[0][0]) // 9 (was 1)
```

---

#### `swapRowWithinBand(board, band)`

Swaps two random rows within the same 3x3 band. Modifies the board in place.

**Parameters:**
- `board`: `BoardType` - The board to modify.
- `band`: `number` - The band index (0, 1, or 2).

**Example:**

```typescript
import { swapRowWithinBand, cloneBoard, SUDOKU_BASE_BOARD } from '@hackettyam/sudoku-tools'

const board = cloneBoard(SUDOKU_BASE_BOARD)

// Swap rows in the first band (rows 0-2)
swapRowWithinBand(board, 0)

// Swap rows in the second band (rows 3-5)
swapRowWithinBand(board, 1)
```

---

#### `swapColWithinStack(board, stack)`

Swaps two random columns within the same 3x3 stack. Modifies the board in place.

**Parameters:**
- `board`: `BoardType` - The board to modify.
- `stack`: `number` - The stack index (0, 1, or 2).

**Example:**

```typescript
import { swapColWithinStack, cloneBoard, SUDOKU_BASE_BOARD } from '@hackettyam/sudoku-tools'

const board = cloneBoard(SUDOKU_BASE_BOARD)

// Swap columns in the first stack (columns 0-2)
swapColWithinStack(board, 0)

// Swap columns in the last stack (columns 6-8)
swapColWithinStack(board, 2)
```

---

## Advanced Examples

### Creating a Custom Puzzle Generator

```typescript
import {
  cloneBoard,
  randomizeBoard,
  removeCells,
  SUDOKU_BASE_BOARD,
  type BoardType,
} from '@hackettyam/sudoku-tools'

function createCustomPuzzle(hints: number): { puzzle: BoardType; solution: BoardType } {
  // Start with the base board
  const solution = cloneBoard(SUDOKU_BASE_BOARD)

  // Randomize to create a unique puzzle
  randomizeBoard(solution)

  // Create the puzzle by removing cells
  const puzzle = cloneBoard(solution)
  removeCells(puzzle, hints)

  return { puzzle, solution }
}

// Create a puzzle with exactly 25 hints
const { puzzle, solution } = createCustomPuzzle(25)
```

### Validating User Input

```typescript
import { SUDOKU_SIZE, SUDOKU_EMPTY, type BoardType } from '@hackettyam/sudoku-tools'

function isValidMove(board: BoardType, row: number, col: number, value: number): boolean {
  // Check if cell is empty
  if (board[row][col] !== SUDOKU_EMPTY) {
    return false
  }

  // Check row
  for (let c = 0; c < SUDOKU_SIZE; c++) {
    if (board[row][c] === value) return false
  }

  // Check column
  for (let r = 0; r < SUDOKU_SIZE; r++) {
    if (board[r][col] === value) return false
  }

  // Check 3x3 box
  const boxRow = Math.floor(row / 3) * 3
  const boxCol = Math.floor(col / 3) * 3
  for (let r = boxRow; r < boxRow + 3; r++) {
    for (let c = boxCol; c < boxCol + 3; c++) {
      if (board[r][c] === value) return false
    }
  }

  return true
}
```

### Creating a Read-Only Map

```typescript
import {
  generateSudoku,
  SUDOKU_SIZE,
  SUDOKU_EMPTY,
  type BoardReadOnlyType,
} from '@hackettyam/sudoku-tools'

function createReadOnlyMap(board: number[][]): BoardReadOnlyType {
  const readOnly: BoardReadOnlyType = []

  for (let r = 0; r < SUDOKU_SIZE; r++) {
    readOnly[r] = []
    for (let c = 0; c < SUDOKU_SIZE; c++) {
      // Cells with values are read-only (pre-filled hints)
      readOnly[r][c] = board[r][c] !== SUDOKU_EMPTY
    }
  }

  return readOnly
}

const { board } = generateSudoku()
const readOnlyMap = createReadOnlyMap(board)

// Check if a cell is editable
const canEdit = (row: number, col: number) => !readOnlyMap[row][col]
```

### Counting Empty Cells

```typescript
import { SUDOKU_EMPTY, type BoardType } from '@hackettyam/sudoku-tools'

function countEmptyCells(board: BoardType): number {
  return board.flat().filter(cell => cell === SUDOKU_EMPTY).length
}

function countFilledCells(board: BoardType): number {
  return board.flat().filter(cell => cell !== SUDOKU_EMPTY).length
}

function getProgress(board: BoardType): number {
  const total = 81
  const filled = countFilledCells(board)
  return Math.round((filled / total) * 100)
}
```

---

## TypeScript Support

This library is written in TypeScript and provides full type definitions. All exports are properly typed:

```typescript
import type {
  BoardType,
  BoardCellType,
  BoardReadOnlyType,
  DifficultyType,
  GenerateSudokuResult,
} from '@hackettyam/sudoku-tools'
```

---

## License

MIT © hackettyam
