# 🛠️ Utilities

Standalone utility functions for board manipulation and analysis. Your Swiss Army knife for Sudoku! 🪡

## 🎲 Board Manipulation

### `cloneBoard(board)`

Creates a deep copy of a Sudoku board.

```typescript
cloneBoard(board: BoardType): BoardType
```

**Example:**

```typescript
import { cloneBoard, SUDOKU_BASE_BOARD } from '@hackettyam/sudoku-tools'

const original = SUDOKU_BASE_BOARD
const copy = cloneBoard(original)

// Modify copy without affecting original
copy[0][0] = 5
console.log(original[0][0]) // 1 (unchanged)
```

---

### `setCellValue(board, options)`

Creates a new board with a cell value changed (immutable).

```typescript
setCellValue(board: BoardType, options: SetCellOptions): BoardType
```

**Throws:** `Error` if row or col is outside the range 0-8.

**Example:**

```typescript
import { setCellValue } from '@hackettyam/sudoku-tools'

const newBoard = setCellValue(board, { row: 0, col: 0, value: 5 })
// Original board is unchanged
```

---

### `clearCell(board, row, col)`

Creates a new board with a cell cleared (immutable).

```typescript
clearCell(board: BoardType, row: number, col: number): BoardType
```

**Throws:** `Error` if row or col is outside the range 0-8.

**Example:**

```typescript
import { clearCell } from '@hackettyam/sudoku-tools'

const newBoard = clearCell(board, 0, 0)
console.log(newBoard[0][0]) // 0
```

---

## 🎲 Board Generation

### `generatePuzzle(difficulty?)` ✨

Generates a puzzle with the specified difficulty.

```typescript
generatePuzzle(difficulty?: Difficulty): GeneratePuzzleResult
```

**Example:**

```typescript
import { generatePuzzle, Difficulty } from '@hackettyam/sudoku-tools'

const { board, solved } = generatePuzzle(Difficulty.Hard)
```

---

### `generateWithUniqueSolution(difficulty?)` 🎯

Generates a puzzle with a guaranteed unique solution. Quality over speed!

```typescript
generateWithUniqueSolution(difficulty?: Difficulty): GeneratePuzzleResult
```

> ⚠️ **Note:** Slower than `generatePuzzle` but guarantees exactly one solution.

**Example:**

```typescript
import { generateWithUniqueSolution, hasUniqueSolution } from '@hackettyam/sudoku-tools'

const { board, solved } = generateWithUniqueSolution(Difficulty.Hard)
console.log(hasUniqueSolution(board)) // Always true
```

---

### `randomizeBoard(board)` 🎲

Randomizes a board in place using valid transformations. Make each puzzle unique!

```typescript
randomizeBoard(board: BoardType): void
```

**Transformations applied:**
- Digit permutation
- Row swaps within bands
- Column swaps within stacks

**Example:**

```typescript
import { randomizeBoard, cloneBoard, SUDOKU_BASE_BOARD } from '@hackettyam/sudoku-tools'

const board = cloneBoard(SUDOKU_BASE_BOARD)
randomizeBoard(board)
// Board is now randomized but still valid
```

---

### `emptyCells(board, hints)` 🗑️

Empties cells until reaching the target hint count. Control your difficulty!

```typescript
emptyCells(board: BoardType, hints: number): void
```

**Example:**

```typescript
import { emptyCells, cloneBoard, SUDOKU_BASE_BOARD } from '@hackettyam/sudoku-tools'

const board = cloneBoard(SUDOKU_BASE_BOARD)
emptyCells(board, 30) // Keep only 30 hints
```

---

## 🧠 Solving

### `solvePuzzle(board)` 🧩

Solves a puzzle using backtracking. Let the computer do the hard work!

```typescript
solvePuzzle(board: BoardType): SolveResult
```

**Returns:** `SolveResult` with `board` (solved board or null) and optional `error` message.

**Example:**

```typescript
import { solvePuzzle } from '@hackettyam/sudoku-tools'

const solution = solvePuzzle(board)
if (solution) {
  console.log('Solved!', solution)
}
```

---

### `hasUniqueSolution(board)` ✅

Checks if a puzzle has exactly one solution. Quality assurance!

```typescript
hasUniqueSolution(board: BoardType): boolean
```

**Example:**

```typescript
import { hasUniqueSolution } from '@hackettyam/sudoku-tools'

if (hasUniqueSolution(board)) {
  console.log('Valid puzzle with unique solution')
}
```

---

### `countSolutions(board, count?)`

Counts solutions (stops at 2 for efficiency).

```typescript
countSolutions(board: BoardType, count?: number): number
```

---

### `detectInvalidityReason(board)` 🔍

Detects why a Sudoku board is invalid. Returns a descriptive error string.

```typescript
detectInvalidityReason(board: BoardType): string | null
```

**Returns:** Description of invalidity or `null` if board appears valid.

**Error values:**
- `"duplicate found in row {n}"`
- `"duplicate found in column {n}"`
- `"duplicate found in box ({row},{col})"`
- `"invalid board size"`

**Example:**

```typescript
import { detectInvalidityReason } from '@hackettyam/sudoku-tools'

const board = [
  [5, 5, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
]

const reason = detectInvalidityReason(board)
console.log(reason) // "duplicate found in row 0"
```

---

## 🔍 Cell Analysis

### `getCandidates(board, row, col)` 📋

Gets valid candidate values for a cell. Perfect for pencil marks!

```typescript
getCandidates(board: BoardType, row: number, col: number): number[]
```

**Throws:** `Error` if row or col is outside the range 0-8.

**Example:**

```typescript
import { getCandidates } from '@hackettyam/sudoku-tools'

const candidates = getCandidates(board, 0, 0)
console.log('Valid values:', candidates) // [1, 4, 7]
```

---

### `getHint(board, solved)` 💡

Gets a hint for the next cell to fill. Help stuck players!

```typescript
getHint(board: BoardType, solved: BoardType): HintResult | null
```

**Example:**

```typescript
import { getHint } from '@hackettyam/sudoku-tools'

const hint = getHint(board, solved)
if (hint) {
  console.log(`Place ${hint.value} at (${hint.row}, ${hint.col})`)
}
```

---

### `findEmptyCell(board)` 🔎

Finds the first empty cell.

```typescript
findEmptyCell(board: BoardType): { row: number; col: number } | null
```

---

### `getEmptyCells(board)` 📍

Gets all empty cell positions.

```typescript
getEmptyCells(board: BoardType): BoardCellType[]
```

**Example:**

```typescript
import { getEmptyCells } from '@hackettyam/sudoku-tools'

const emptyCells = getEmptyCells(board)
console.log(`${emptyCells.length} cells to fill`)
```

---

### `getInvalidCells(board, solved)` ❌

Gets all cells with incorrect values. Highlight mistakes!

```typescript
getInvalidCells(board: BoardType, solved: BoardType): BoardCellType[]
```

---

## 🔢 Counting

### `countFilledCells(board)` 🟢

Counts non-empty cells.

```typescript
countFilledCells(board: BoardType): number
```

---

### `countEmptyCells(board)` ⚪

Counts empty cells.

```typescript
countEmptyCells(board: BoardType): number
```

---

### `countValidCells(board, solved)` ✅

Counts correctly filled cells.

```typescript
countValidCells(board: BoardType, solved: BoardType): number
```

---

### `countInvalidCells(board, solved)` ❌

Counts incorrectly filled cells.

```typescript
countInvalidCells(board: BoardType, solved: BoardType): number
```

---

## ✅ Validation

### `isValidPuzzle(board)` 🛡️

Validates entire board follows Sudoku rules.

```typescript
isValidPuzzle(board: BoardType): boolean
```

---

### `isValidRow(board, row)` ↔️

Validates a specific row.

```typescript
isValidRow(board: BoardType, row: number): boolean
```

---

### `isValidColumn(board, col)` ↕️

Validates a specific column.

```typescript
isValidColumn(board: BoardType, col: number): boolean
```

---

### `isValidBox(board, boxRow, boxCol)` ▢

Validates a specific 3x3 box.

```typescript
isValidBox(board: BoardType, boxRow: number, boxCol: number): boolean
```

---

### `isValidPlacement(board, position)` 🎯

Checks if placing a value is valid.

```typescript
isValidPlacement(board: BoardType, position: CellPosition): PlacementValidationResult
```

**Throws:** `Error` if row or col is outside the range 0-8.

**Returns:** `PlacementValidationResult` with `valid` and optional `reason`.

---

### `checkGroup(values, label)` 🔍

Checks a group of values (row, column, or box) for duplicates.

```typescript
checkGroup(values: number[], label: string): string | null
```

**Returns:** The label if duplicate found, `null` otherwise.

**Example:**

```typescript
import { checkGroup } from '@hackettyam/sudoku-tools'

const values = [1, 2, 3, 4, 5, 6, 7, 8, 9]
const result = checkGroup(values, 'row 0')
// result is null (no duplicates)

const withDupes = [1, 1, 3, 4, 5, 6, 7, 8, 9]
const result2 = checkGroup(withDupes, 'row 0')
// result2 is "row 0"
```

---

### `getColumnValues(board, col)` 📊

Extracts all values from a specific column.

```typescript
getColumnValues(board: BoardType, col: number): number[]
```

**Example:**

```typescript
import { getColumnValues } from '@hackettyam/sudoku-tools'

const values = getColumnValues(board, 0)
// Returns: [5, 6, 7, 2, 5, 8, 3, 6, 9]
```

---

### `getBoxValues(board, boxRow, boxCol)` 📦

Extracts all values from a 3x3 box.

```typescript
getBoxValues(board: BoardType, boxRow: number, boxCol: number): number[]
```

**Parameters:**
- `boxRow`: Box row index (0-2)
- `boxCol`: Box column index (0-2)

**Example:**

```typescript
import { getBoxValues } from '@hackettyam/sudoku-tools'

const values = getBoxValues(board, 0, 0)
// Returns: [5, 3, 0, 6, 0, 0, 0, 9, 8]
```

---

### `isComplete(board)` 🟢

Checks if all cells are filled.

```typescript
isComplete(board: BoardType): boolean
```

---

### `isSolved(board, solved)` 🏆

Checks if board matches solution.

```typescript
isSolved(board: BoardType, solved: BoardType): boolean
```

---

## 🎚️ Difficulty Analysis

### `getDifficulty(board)` 📊

Analyzes and estimates puzzle difficulty. Know how hard your puzzles are!

```typescript
getDifficulty(board: BoardType): DifficultyResult
```

**Returns:**

```typescript
{
  difficulty: DifficultyType,
  emptyCells: number,
  avgCandidates: number,
  minCandidates: number,
  score: number // 0-100
}
```

---

### `analyzeCandidates(board, emptyCount)`

Analyzes candidates for difficulty scoring.

```typescript
analyzeCandidates(board: BoardType, emptyCount: number): AnalysisResult
```

---

### `calculateDifficultyScore(params)`

Calculates numeric difficulty score.

```typescript
calculateDifficultyScore(params: ScoreParams): number
```

---

### `scoreToDifficulty(score)`

Converts score to difficulty level.

```typescript
scoreToDifficulty(score: number): DifficultyType
```

---

## 🔄 Transformations

### `rotateBoard(board, times?)` 🔃

Rotates board 90° clockwise. Fresh perspective!

```typescript
rotateBoard(board: BoardType, times?: number): BoardType
```

**Example:**

```typescript
import { rotateBoard } from '@hackettyam/sudoku-tools'

const rotated90 = rotateBoard(board)
const rotated180 = rotateBoard(board, 2)
const rotated270 = rotateBoard(board, 3)
```

---

### `mirrorBoard(board, direction)` 🪞

Mirrors board horizontally or vertically.

```typescript
mirrorBoard(board: BoardType, direction: MirrorDirection): BoardType
```

**Example:**

```typescript
import { mirrorBoard } from '@hackettyam/sudoku-tools'

const horizontal = mirrorBoard(board, 'horizontal')
const vertical = mirrorBoard(board, 'vertical')
```

---

### `swapDigits(board, d1, d2)` 🔀

Swaps all occurrences of two digits. Modifies in place.

```typescript
swapDigits(board: BoardType, d1: number, d2: number): void
```

---

### `swapRowWithinBand(board, band)`

Swaps random rows within a band. Modifies in place.

```typescript
swapRowWithinBand(board: BoardType, band: number): void
```

---

### `swapColWithinStack(board, stack)`

Swaps random columns within a stack. Modifies in place.

```typescript
swapColWithinStack(board: BoardType, stack: number): void
```

---

## 💾 Serialization

### `serializeBoard(board)` 📤

Converts board to 81-character string. Easy storage!

```typescript
serializeBoard(board: BoardType): string
```

**Example:**

```typescript
import { serializeBoard } from '@hackettyam/sudoku-tools'

const str = serializeBoard(board)
console.log(str) // "003050709..."
console.log(str.length) // 81
```

---

### `deserializeBoard(str)` 📥

Converts 81-character string to board. Restore saved games!

```typescript
deserializeBoard(str: string): BoardType
```

**Example:**

```typescript
import { deserializeBoard, serializeBoard } from '@hackettyam/sudoku-tools'

const str = serializeBoard(board)
const restored = deserializeBoard(str)
```

---

## ⚙️ Internal Utilities

### `validateCellIndex(row, col)` ✅

Validates that row and column indices are within Sudoku bounds (0-8).

```typescript
validateCellIndex(row: number, col: number): boolean
```

**Example:**

```typescript
import { validateCellIndex } from '@hackettyam/sudoku-tools'

validateCellIndex(0, 0)  // true
validateCellIndex(8, 8)  // true
validateCellIndex(-1, 0) // false
validateCellIndex(9, 0)  // false
```

---

### `backtrack(board)` 🧠

Recursive backtracking solver. Mutates board.

```typescript
backtrack(board: BoardType): boolean
```

---

### `shuffleArray(array)` 🎲

Fisher-Yates shuffle. True randomness!

```typescript
shuffleArray<T>(array: T[]): T[]
```

---

### `getAllCellPositions()`

Gets all 81 positions in random order.

```typescript
getAllCellPositions(): [number, number][]
```

---

## 🔗 See Also

- 🧩 [SudokuPuzzle](./sudoku-puzzle.md) - Main puzzle class
- 🔄 [Transformations Guide](../guides/transformations.md) - Detailed examples
- ✅ [Validation Guide](../guides/validation.md) - Validation patterns

---

*So many tools, so little time!* 🛠️✨
