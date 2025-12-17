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
import { createSudoku, Difficulty } from '@hackettyam/sudoku-tools'

// Create a Sudoku puzzle
const { board, solved } = createSudoku(Difficulty.Normal)

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

#### `CellValue`

Type-safe representation of valid Sudoku cell values.

```typescript
type CellValue = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9
```

#### `SetCellOptions`

Options for the `setCellValue` function.

```typescript
interface SetCellOptions {
  col: number    // Column index (0-8)
  row: number    // Row index (0-8)
  value: number  // Value to set (0-9)
}
```

#### `GameState`

Represents the complete state of a Sudoku game.

```typescript
interface GameState {
  current: BoardType        // Player's progress
  difficulty: DifficultyType
  puzzle: BoardType         // Original puzzle
  readOnly: BoardReadOnlyType
  solution: BoardType       // Solved version
}
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

#### `DifficultyResult`

Result of difficulty analysis returned by `getDifficulty`.

```typescript
interface DifficultyResult {
  avgCandidates: number   // Average candidates per empty cell
  difficulty: DifficultyType
  emptyCells: number      // Number of empty cells
  minCandidates: number   // Minimum candidates found
  score: number           // Numeric difficulty score
}
```

#### `HintResult`

Result type for `getHint` function.

```typescript
interface HintResult {
  col: number    // Column index
  row: number    // Row index
  value: number  // Correct value for the cell
}
```

#### `MirrorDirection`

Direction options for `mirrorBoard` function.

```typescript
type MirrorDirection = 'horizontal' | 'vertical'
```

---

### Constants

#### `SUDOKU_SIZE`

Standard Sudoku grid size (9x9).

```typescript
const SUDOKU_SIZE = 9
```

#### `SUDOKU_EMPTY_CELL`

Value representing an empty cell.

```typescript
const SUDOKU_EMPTY_CELL = 0
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

#### `createSudoku(difficulty?)`

Creates a Sudoku puzzle based on the difficulty level.

**Parameters:**

- `difficulty` (optional): `Difficulty` - The difficulty level. Defaults to `Difficulty.Normal`.

**Returns:**

- `GeneratePuzzleResult` - An object containing:
  - `board`: The puzzle board with empty cells
  - `solved`: The complete solution

**Example:**

```typescript
import { createSudoku, Difficulty, countFilledCells } from '@hackettyam/sudoku-tools'

// Create with default difficulty (Normal)
const puzzle1 = createSudoku()

// Create an easy puzzle
const puzzle2 = createSudoku(Difficulty.Easy)

// Create an expert puzzle
const puzzle3 = createSudoku(Difficulty.Expert)

console.log('Easy puzzle has', countFilledCells(puzzle2.board), 'hints') // 40 hints
console.log('Expert puzzle has', countFilledCells(puzzle3.board), 'hints') // 20 hints
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
import { cloneBoard, createSudoku } from '@hackettyam/sudoku-tools'

const { board } = createSudoku()
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

#### `emptyCells(board, hints)`

Empties cells from the board until reaching the desired number of hints. Modifies the board in place.

**Parameters:**

- `board`: `BoardType` - The board to modify.
- `hints`: `number` - The number of cells to keep filled.

**Example:**

```typescript
import { emptyCells, cloneBoard, SUDOKU_BASE_BOARD, countFilledCells } from '@hackettyam/sudoku-tools'

const board = cloneBoard(SUDOKU_BASE_BOARD)
emptyCells(board, 30) // Keep only 30 hints

console.log('Hints remaining:', countFilledCells(board)) // 30
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

#### `isValidPuzzle(board)`

Validates if a Sudoku board follows all Sudoku rules.

**Validation checks:**

- Each row contains digits 1-9 without repetition
- Each column contains digits 1-9 without repetition
- Each 3x3 box contains digits 1-9 without repetition

Empty cells (value 0) are ignored during validation.

**Parameters:**

- `board`: `BoardType` - The Sudoku board to validate.

**Returns:**

- `boolean` - `true` if the board is valid, `false` otherwise.

**Example:**

```typescript
import { isValidPuzzle, createSudoku, cloneBoard } from '@hackettyam/sudoku-tools'

const { board, solved } = createSudoku()

console.log(isValidPuzzle(board))  // true
console.log(isValidPuzzle(solved)) // true

// Create an invalid board
const invalidBoard = cloneBoard(board)
invalidBoard[0][0] = 5 // Duplicate value
console.log(isValidPuzzle(invalidBoard)) // false
```

---

#### `isValidRow(board, row)`

Validates if a specific row in a Sudoku board contains digits 1-9 without repetition.

**Parameters:**

- `board`: `BoardType` - The Sudoku board to validate.
- `row`: `number` - The row index (0-8) to validate.

**Returns:**

- `boolean` - `true` if the row is valid, `false` otherwise.

**Example:**

```typescript
import { isValidRow, cloneBoard, SUDOKU_BASE_BOARD } from '@hackettyam/sudoku-tools'

const board = cloneBoard(SUDOKU_BASE_BOARD)

console.log(isValidRow(board, 0)) // true

board[0][0] = board[0][1] // Create duplicate
console.log(isValidRow(board, 0)) // false
```

---

#### `isValidColumn(board, col)`

Validates if a specific column in a Sudoku board contains digits 1-9 without repetition.

**Parameters:**

- `board`: `BoardType` - The Sudoku board to validate.
- `col`: `number` - The column index (0-8) to validate.

**Returns:**

- `boolean` - `true` if the column is valid, `false` otherwise.

**Example:**

```typescript
import { isValidColumn, cloneBoard, SUDOKU_BASE_BOARD } from '@hackettyam/sudoku-tools'

const board = cloneBoard(SUDOKU_BASE_BOARD)

console.log(isValidColumn(board, 0)) // true

board[0][0] = board[1][0] // Create duplicate
console.log(isValidColumn(board, 0)) // false
```

---

#### `isValidBox(board, boxRow, boxCol)`

Validates if a specific 3x3 box in a Sudoku board contains digits 1-9 without repetition.

**Parameters:**

- `board`: `BoardType` - The Sudoku board to validate.
- `boxRow`: `number` - The box row index (0, 1, or 2).
- `boxCol`: `number` - The box column index (0, 1, or 2).

**Returns:**

- `boolean` - `true` if the box is valid, `false` otherwise.

**Example:**

```typescript
import { isValidBox, cloneBoard, SUDOKU_BASE_BOARD } from '@hackettyam/sudoku-tools'

const board = cloneBoard(SUDOKU_BASE_BOARD)

console.log(isValidBox(board, 0, 0)) // true (top-left box)
console.log(isValidBox(board, 1, 1)) // true (center box)

board[0][0] = board[1][1] // Create duplicate in top-left box
console.log(isValidBox(board, 0, 0)) // false
```

---

#### `generatePuzzle(difficulty?)`

Generates a Sudoku puzzle based on the difficulty level. Lower-level utility used by `createSudoku`.

**Parameters:**

- `difficulty` (optional): `Difficulty` - The difficulty level. Defaults to `Difficulty.Normal`.

**Returns:**

- `GeneratePuzzleResult` - An object containing `board` and `solved`.

**Example:**

```typescript
import { generatePuzzle, Difficulty } from '@hackettyam/sudoku-tools'

const { board, solved } = generatePuzzle(Difficulty.Hard)
```

---

#### `countFilledCells(board)`

Counts the number of filled (non-empty) cells in a Sudoku board.

**Parameters:**
- `board`: `BoardType` - The Sudoku board to count.

**Returns:**
- `number` - The number of cells that are not empty.

**Example:**

```typescript
import { countFilledCells, createSudoku, Difficulty } from '@hackettyam/sudoku-tools'

const { board, solved } = createSudoku(Difficulty.Normal)

console.log(countFilledCells(solved)) // 81 (complete board)
console.log(countFilledCells(board))  // 35 (Normal difficulty hints)
```

---

#### `countEmptyCells(board)`

Counts the number of empty cells in a Sudoku board.

**Parameters:**
- `board`: `BoardType` - The Sudoku board to count.

**Returns:**
- `number` - The number of cells that are empty (value === 0).

**Example:**

```typescript
import { countEmptyCells, createSudoku, Difficulty } from '@hackettyam/sudoku-tools'

const { board } = createSudoku(Difficulty.Normal)

console.log(countEmptyCells(board)) // 46 (81 - 35 hints)
```

---

#### `countValidCells(board, solved)`

Counts the number of valid (correct) cells in a Sudoku board by comparing against the solution.

**Parameters:**
- `board`: `BoardType` - The current Sudoku board state.
- `solved`: `BoardType` - The solved Sudoku board to compare against.

**Returns:**
- `number` - The number of cells that match the solution (empty cells not counted).

**Example:**

```typescript
import { countValidCells, createSudoku, cloneBoard } from '@hackettyam/sudoku-tools'

const { board, solved } = createSudoku()

// All pre-filled cells are valid
console.log(countValidCells(board, solved)) // 35 (for Normal difficulty)

// Player fills a correct cell
const playerBoard = cloneBoard(board)
playerBoard[0][0] = solved[0][0]
console.log(countValidCells(playerBoard, solved)) // 36
```

---

#### `countInvalidCells(board, solved)`

Counts the number of invalid (incorrect) cells in a Sudoku board by comparing against the solution.

**Parameters:**
- `board`: `BoardType` - The current Sudoku board state.
- `solved`: `BoardType` - The solved Sudoku board to compare against.

**Returns:**
- `number` - The number of cells that don't match the solution (empty cells not counted).

**Example:**

```typescript
import { countInvalidCells, createSudoku, cloneBoard } from '@hackettyam/sudoku-tools'

const { board, solved } = createSudoku()
const playerBoard = cloneBoard(board)

// Player fills a wrong value
playerBoard[0][0] = solved[0][0] === 1 ? 2 : 1

console.log(countInvalidCells(playerBoard, solved)) // 1
```

---

#### `solvePuzzle(board)`

Solves a Sudoku puzzle using backtracking algorithm.

**Parameters:**

- `board`: `BoardType` - The Sudoku puzzle to solve.

**Returns:**

- `BoardType | null` - The solved board, or `null` if no solution exists.

**Example:**

```typescript
import { solvePuzzle, createSudoku } from '@hackettyam/sudoku-tools'

const { board } = createSudoku()
const solution = solvePuzzle(board)

if (solution) {
  console.log('Puzzle solved!', solution)
} else {
  console.log('No solution exists')
}
```

---

#### `hasUniqueSolution(board)`

Checks if a Sudoku puzzle has exactly one solution.

**Parameters:**

- `board`: `BoardType` - The Sudoku puzzle to check.

**Returns:**

- `boolean` - `true` if the puzzle has exactly one solution.

**Example:**

```typescript
import { hasUniqueSolution, createSudoku } from '@hackettyam/sudoku-tools'

const { board } = createSudoku()
console.log(hasUniqueSolution(board)) // true
```

---

#### `getCandidates(board, row, col)`

Gets all valid candidate values for a specific cell.

**Parameters:**

- `board`: `BoardType` - The Sudoku board.
- `row`: `number` - Row index (0-8).
- `col`: `number` - Column index (0-8).

**Returns:**

- `number[]` - Array of valid values (1-9) that can be placed in the cell.

**Example:**

```typescript
import { getCandidates, createSudoku } from '@hackettyam/sudoku-tools'

const { board } = createSudoku()
const candidates = getCandidates(board, 0, 0)

console.log('Valid values for cell (0,0):', candidates) // e.g., [1, 4, 7]
```

---

#### `getHint(board)`

Finds a cell and value that can be filled using logical deduction.

**Parameters:**

- `board`: `BoardType` - The current board state.

**Returns:**

- `HintResult | null` - Object with `row`, `col`, and `value`, or `null` if no hint found.

**Example:**

```typescript
import { getHint, createSudoku } from '@hackettyam/sudoku-tools'

const { board } = createSudoku()
const hint = getHint(board)

if (hint) {
  console.log(`Place ${hint.value} at (${hint.row}, ${hint.col})`)
}
```

---

#### `isComplete(board)`

Checks if all cells in the board are filled (no empty cells).

**Parameters:**

- `board`: `BoardType` - The Sudoku board to check.

**Returns:**

- `boolean` - `true` if board has no empty cells.

**Example:**

```typescript
import { isComplete, createSudoku } from '@hackettyam/sudoku-tools'

const { board, solved } = createSudoku()

console.log(isComplete(board))  // false (has empty cells)
console.log(isComplete(solved)) // true (fully filled)
```

---

#### `isSolved(board, solved)`

Checks if the current board matches the solution.

**Parameters:**

- `board`: `BoardType` - The current board state.
- `solved`: `BoardType` - The solved board to compare against.

**Returns:**

- `boolean` - `true` if the board matches the solution.

**Example:**

```typescript
import { isSolved, createSudoku, cloneBoard } from '@hackettyam/sudoku-tools'

const { board, solved } = createSudoku()

console.log(isSolved(board, solved))  // false
console.log(isSolved(solved, solved)) // true
```

---

#### `getEmptyCells(board)`

Gets all empty cell positions in the board.

**Parameters:**

- `board`: `BoardType` - The Sudoku board.

**Returns:**

- `BoardCellType[]` - Array of `{ row, col }` objects for each empty cell.

**Example:**

```typescript
import { getEmptyCells, createSudoku } from '@hackettyam/sudoku-tools'

const { board } = createSudoku()
const emptyCells = getEmptyCells(board)

console.log(`${emptyCells.length} cells to fill`)
emptyCells.forEach(cell => console.log(`Empty: (${cell.row}, ${cell.col})`))
```

---

#### `getInvalidCells(board, solved)`

Gets all cells that have incorrect values.

**Parameters:**

- `board`: `BoardType` - The current board state.
- `solved`: `BoardType` - The solved board to compare against.

**Returns:**

- `BoardCellType[]` - Array of `{ row, col }` objects for each invalid cell.

**Example:**

```typescript
import { getInvalidCells, createSudoku, cloneBoard } from '@hackettyam/sudoku-tools'

const { board, solved } = createSudoku()
const playerBoard = cloneBoard(board)

// Make a wrong move
playerBoard[0][0] = solved[0][0] === 1 ? 2 : 1

const invalidCells = getInvalidCells(playerBoard, solved)
console.log('Invalid cells:', invalidCells) // [{ row: 0, col: 0 }]
```

---

#### `setCellValue(board, options)`

Creates a new board with a cell value changed (immutable operation).

**Parameters:**

- `board`: `BoardType` - The original board.
- `options`: `SetCellOptions` - Object with `row`, `col`, and `value`.

**Returns:**

- `BoardType` - A new board with the updated value.

**Example:**

```typescript
import { setCellValue, createSudoku } from '@hackettyam/sudoku-tools'

const { board } = createSudoku()
const newBoard = setCellValue(board, { row: 0, col: 0, value: 5 })

console.log(board[0][0])    // Original value unchanged
console.log(newBoard[0][0]) // 5
```

---

#### `clearCell(board, row, col)`

Creates a new board with a cell cleared (immutable operation).

**Parameters:**

- `board`: `BoardType` - The original board.
- `row`: `number` - Row index (0-8).
- `col`: `number` - Column index (0-8).

**Returns:**

- `BoardType` - A new board with the cell set to 0.

**Example:**

```typescript
import { clearCell, createSudoku } from '@hackettyam/sudoku-tools'

const { solved } = createSudoku()
const newBoard = clearCell(solved, 0, 0)

console.log(solved[0][0])   // Original value
console.log(newBoard[0][0]) // 0
```

---

#### `serializeBoard(board)`

Converts a board to a compact 81-character string.

**Parameters:**

- `board`: `BoardType` - The board to serialize.

**Returns:**

- `string` - 81-character string representation.

**Example:**

```typescript
import { serializeBoard, createSudoku } from '@hackettyam/sudoku-tools'

const { board } = createSudoku()
const serialized = serializeBoard(board)

console.log(serialized) // "003050709400709020089023050..."
console.log(serialized.length) // 81
```

---

#### `deserializeBoard(str)`

Converts a 81-character string back to a board.

**Parameters:**

- `str`: `string` - 81-character string representation.

**Returns:**

- `BoardType` - The reconstructed board.

**Throws:**

- Error if string is not exactly 81 characters or contains invalid characters.

**Example:**

```typescript
import { deserializeBoard, serializeBoard, createSudoku } from '@hackettyam/sudoku-tools'

const { board } = createSudoku()
const serialized = serializeBoard(board)
const restored = deserializeBoard(serialized)

// board and restored are equivalent
```

---

#### `rotateBoard(board, times?)`

Rotates the board 90 degrees clockwise.

**Parameters:**

- `board`: `BoardType` - The board to rotate.
- `times` (optional): `number` - Number of 90° rotations (default: 1).

**Returns:**

- `BoardType` - A new rotated board.

**Example:**

```typescript
import { rotateBoard, createSudoku } from '@hackettyam/sudoku-tools'

const { board } = createSudoku()

const rotated90 = rotateBoard(board)      // 90° clockwise
const rotated180 = rotateBoard(board, 2)  // 180°
const rotated270 = rotateBoard(board, 3)  // 270° clockwise
```

---

#### `mirrorBoard(board, direction)`

Mirrors the board horizontally or vertically.

**Parameters:**

- `board`: `BoardType` - The board to mirror.
- `direction`: `'horizontal' | 'vertical'` - Mirror direction.

**Returns:**

- `BoardType` - A new mirrored board.

**Example:**

```typescript
import { mirrorBoard, createSudoku } from '@hackettyam/sudoku-tools'

const { board } = createSudoku()

const horizontalMirror = mirrorBoard(board, 'horizontal')
const verticalMirror = mirrorBoard(board, 'vertical')
```

---

#### `getDifficulty(board)`

Analyzes and estimates the difficulty of a puzzle.

**Parameters:**

- `board`: `BoardType` - The puzzle to analyze.

**Returns:**

- `DifficultyResult` - Object containing:
  - `difficulty`: The estimated difficulty level
  - `emptyCells`: Number of empty cells
  - `avgCandidates`: Average candidates per empty cell
  - `minCandidates`: Minimum candidates found
  - `score`: Numeric difficulty score

**Example:**

```typescript
import { getDifficulty, createSudoku, Difficulty } from '@hackettyam/sudoku-tools'

const { board } = createSudoku(Difficulty.Hard)
const result = getDifficulty(board)

console.log(result.difficulty)    // 'hard'
console.log(result.emptyCells)    // ~51
console.log(result.avgCandidates) // ~4.5
console.log(result.score)         // ~55
```

---

#### `generateWithUniqueSolution(difficulty?)`

Generates a puzzle with a guaranteed unique solution (slower but higher quality).

**Parameters:**

- `difficulty` (optional): `Difficulty` - The difficulty level. Defaults to `Difficulty.Normal`.

**Returns:**

- `GeneratePuzzleResult` - An object containing `board` and `solved`.

**Example:**

```typescript
import { generateWithUniqueSolution, Difficulty, hasUniqueSolution } from '@hackettyam/sudoku-tools'

const { board, solved } = generateWithUniqueSolution(Difficulty.Hard)

// Guaranteed to have exactly one solution
console.log(hasUniqueSolution(board)) // true
```

---

## Advanced Examples

### Creating a Custom Puzzle Generator

```typescript
import {
  cloneBoard,
  randomizeBoard,
  emptyCells,
  SUDOKU_BASE_BOARD,
  type BoardType,
} from '@hackettyam/sudoku-tools'

function createCustomPuzzle(hints: number): { puzzle: BoardType; solution: BoardType } {
  // Start with the base board
  const solution = cloneBoard(SUDOKU_BASE_BOARD)

  // Randomize to create a unique puzzle
  randomizeBoard(solution)

  // Create the puzzle by emptying cells
  const puzzle = cloneBoard(solution)
  emptyCells(puzzle, hints)

  return { puzzle, solution }
}

// Create a puzzle with exactly 25 hints
const { puzzle, solution } = createCustomPuzzle(25)
```

### Validating User Input

```typescript
import { SUDOKU_SIZE, SUDOKU_EMPTY_CELL, type BoardType } from '@hackettyam/sudoku-tools'

function isValidMove(board: BoardType, row: number, col: number, value: number): boolean {
  // Check if cell is empty
  if (board[row][col] !== SUDOKU_EMPTY_CELL) {
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
  createSudoku,
  SUDOKU_SIZE,
  SUDOKU_EMPTY_CELL,
  type BoardReadOnlyType,
} from '@hackettyam/sudoku-tools'

function createReadOnlyMap(board: number[][]): BoardReadOnlyType {
  const readOnly: BoardReadOnlyType = []

  for (let r = 0; r < SUDOKU_SIZE; r++) {
    readOnly[r] = []
    for (let c = 0; c < SUDOKU_SIZE; c++) {
      // Cells with values are read-only (pre-filled hints)
      readOnly[r][c] = board[r][c] !== SUDOKU_EMPTY_CELL
    }
  }

  return readOnly
}

const { board } = createSudoku()
const readOnlyMap = createReadOnlyMap(board)

// Check if a cell is editable
const canEdit = (row: number, col: number) => !readOnlyMap[row][col]
```

### Tracking Game Progress

```typescript
import {
  countFilledCells,
  countEmptyCells,
  countValidCells,
  countInvalidCells,
  createSudoku,
  type BoardType,
} from '@hackettyam/sudoku-tools'

function getGameStats(board: BoardType, solved: BoardType) {
  const filled = countFilledCells(board)
  const empty = countEmptyCells(board)
  const valid = countValidCells(board, solved)
  const invalid = countInvalidCells(board, solved)
  const progress = Math.round((filled / 81) * 100)

  return { filled, empty, valid, invalid, progress }
}

const { board, solved } = createSudoku()
const stats = getGameStats(board, solved)

console.log(`Progress: ${stats.progress}%`)
console.log(`Valid cells: ${stats.valid}`)
console.log(`Invalid cells: ${stats.invalid}`)
console.log(`Remaining: ${stats.empty}`)
```

---

## TypeScript Support

This library is written in TypeScript and provides full type definitions. All exports are properly typed:

```typescript
import type {
  BoardType,
  BoardCellType,
  BoardReadOnlyType,
  CellValue,
  DifficultyType,
  DifficultyResult,
  GameState,
  GeneratePuzzleResult,
  HintResult,
  SetCellOptions,
} from '@hackettyam/sudoku-tools'
```

---

## License

MIT © hackettyam
