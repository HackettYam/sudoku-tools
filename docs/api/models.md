# 📦 Models & Types

Complete reference for all TypeScript types and interfaces. These are the building blocks you'll use throughout your Sudoku app! 🧱

## 🎲 Board Types

### `BoardType`

Represents a Sudoku board as a 9x9 2D array of numbers.

```typescript
type BoardType = number[][]
```

**Example:**

```typescript
const board: BoardType = [
  [1, 2, 3, 4, 5, 6, 7, 8, 9],
  [4, 5, 6, 7, 8, 9, 1, 2, 3],
  // ... 9 rows total
]
```

---

### `BoardReadOnlyType`

Boolean mask indicating which cells are pre-filled (read-only).

```typescript
type BoardReadOnlyType = boolean[][]
```

**Example:**

```typescript
const readOnly: BoardReadOnlyType = [
  [true, false, true, ...], // true = pre-filled, false = editable
  // ...
]
```

---

### `BoardCellType`

Represents a cell position on the board.

```typescript
interface BoardCellType {
  col: number  // Column index (0-8)
  row: number  // Row index (0-8)
}
```

---

## 📍 Cell Types

### `CellValue`

Type-safe representation of valid Sudoku cell values.

```typescript
type CellValue = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9
```

- `0` represents an empty cell
- `1-9` are valid Sudoku digits

---

### `CellPosition`

Position and value for cell operations.

```typescript
interface CellPosition {
  col: number    // Column index (0-8)
  row: number    // Row index (0-8)
  value: number  // Value (0-9)
}
```

---

### `SetCellOptions`

Options for the `setCellValue` utility function.

```typescript
interface SetCellOptions {
  col: number    // Column index (0-8)
  row: number    // Row index (0-8)
  value: number  // Value to set (0-9)
}
```

---

## 🎚️ Difficulty Types

### `DifficultyType`

String literal type for difficulty levels.

```typescript
type DifficultyType = 'novice' | 'easy' | 'normal' | 'hard' | 'expert'
```

---

### `Difficulty` (Enum)

Enum for difficulty levels.

```typescript
enum Difficulty {
  Novice = 'novice',
  Easy = 'easy',
  Normal = 'normal',
  Hard = 'hard',
  Expert = 'expert',
}
```

**Usage:**

```typescript
import { Difficulty } from '@hackettyam/sudoku-tools'

const puzzle = createSudoku(Difficulty.Hard)
```

---

### `DifficultyHints` (Enum)

Number of hints for each difficulty level.

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

### `DifficultyResult`

Result of difficulty analysis from `getDifficulty()`.

```typescript
interface DifficultyResult {
  avgCandidates: number     // Average candidates per empty cell
  difficulty: DifficultyType // Estimated difficulty level
  emptyCells: number        // Number of empty cells
  minCandidates: number     // Minimum candidates found
  score: number             // Numeric difficulty score (0-100)
}
```

---

## 🧩 Puzzle Types

### `SudokuState`

Complete state of a Sudoku game.

```typescript
interface SudokuState {
  current: BoardType          // Player's progress
  difficulty: DifficultyType  // Difficulty level
  original: BoardType         // Original puzzle
  readOnly: BoardReadOnlyType // Pre-filled cells mask
  solution: BoardType         // Complete solution
}
```

---

### `SudokuPuzzleOptions`

Options for creating a `SudokuPuzzle` instance.

```typescript
interface SudokuPuzzleOptions {
  board: BoardType           // Initial puzzle board
  difficulty: DifficultyType // Difficulty level
  solved: BoardType          // Complete solution
}
```

---

### `SudokuPuzzleStatistics`

Progress statistics returned by `getProgress()`.

```typescript
interface SudokuPuzzleStatistics {
  emptyCells: number    // Number of empty cells
  filledCells: number   // Number of filled cells
  invalidCells: number  // Number of incorrectly filled cells
  progress: number      // Progress percentage (0-100)
  validCells: number    // Number of correctly filled cells
}
```

---

### `GeneratePuzzleResult`

Result from `generatePuzzle()` and `generateWithUniqueSolution()`.

```typescript
interface GeneratePuzzleResult {
  board: BoardType   // Puzzle with empty cells
  solved: BoardType  // Complete solution
}
```

---

## 💡 Hint Types

### `HintResult`

Result from `getHint()` function.

```typescript
interface HintResult {
  col: number   // Column index (0-8)
  row: number   // Row index (0-8)
  value: CellValue // Correct value for the cell
}
```

---

## 🧩 Solving Types

### `SolveResult`

Result from `solvePuzzle()` function with detailed error information.

```typescript
interface SolveResult {
  board: BoardType | null  // Solved board or null if unsolvable
  error?: string            // Error message if solving failed
}
```

**Error values:**
- `"Invalid initial board: duplicate found in row {n}"`
- `"Invalid initial board: duplicate found in column {n}"`
- `"Invalid initial board: duplicate found in box ({row},{col})"`
- `"Board is unsolvable: no valid candidates for cell ({row},{col})"`
- `"Board is unsolvable: constraints contradiction detected"`

**Example:**

```typescript
import { solvePuzzle, SolveResult } from '@hackettyam/sudoku-tools'

const result: SolveResult = solvePuzzle(board)

if (result.board) {
  console.log('Solved!', result.board)
} else {
  console.error('Failed:', result.error)
}
```

---

### `PlacementValidationResult`

Result from `isValidPlacement()` with detailed constraint information.

```typescript
interface PlacementValidationResult {
  valid: boolean                          // Whether placement is valid
  reason?: 'row' | 'column' | 'box' | 'none'  // Which constraint was violated
}
```

**Example:**

```typescript
import { isValidPlacement, PlacementValidationResult } from '@hackettyam/sudoku-tools'

const result: PlacementValidationResult = isValidPlacement(board, {
  row: 0,
  col: 0,
  value: 5
})

if (result.valid) {
  console.log('Can place value')
} else {
  console.log(`Cannot place: ${result.reason}`)
}
```

---

## 🔄 Transformation Types

### `MirrorDirection`

Direction for `mirrorBoard()` function.

```typescript
type MirrorDirection = 'horizontal' | 'vertical'
```

---

## 📥 Importing Types

Import only what you need:

```typescript
import type {
  BoardType,
  BoardCellType,
  BoardReadOnlyType,
  CellPosition,
  CellValue,
  DifficultyType,
  DifficultyResult,
  GeneratePuzzleResult,
  HintResult,
  MirrorDirection,
  PlacementValidationResult,
  SetCellOptions,
  SolveResult,
  SudokuPuzzleOptions,
  SudokuPuzzleStatistics,
  SudokuState,
} from '@hackettyam/sudoku-tools'
```

---

## 🔗 See Also

- 🔢 [Constants](./constants.md) - Library constants
- 🧩 [SudokuPuzzle](./sudoku-puzzle.md) - Main puzzle class
- 🛠️ [Utilities](./utilities.md) - Utility functions

---

*Types make your code safer!* 🛡️
