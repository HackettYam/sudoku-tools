# 🧩 SudokuPuzzle Class

The main class for creating and playing Sudoku puzzles. This is where all the magic happens! ✨

## 🎮 Creating a Puzzle

### `createSudoku(difficulty?)`

Factory function that creates a new `SudokuPuzzle` instance.

```typescript
import { createSudoku, Difficulty } from '@hackettyam/sudoku-tools'

// Default difficulty (Normal)
const puzzle = createSudoku()

// Specific difficulty
const easyPuzzle = createSudoku(Difficulty.Easy)
const hardPuzzle = createSudoku(Difficulty.Expert)
```

**Parameters:**

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `difficulty` | `Difficulty` | `Difficulty.Normal` | Puzzle difficulty level |

**Returns:** `SudokuPuzzle` instance

---

## 📊 Properties

### `current`

The current state of the board (player's progress).

```typescript
puzzle.current: BoardType // number[][]
```

**Example:**

```typescript
// Access current board
console.log(puzzle.current[0][0]) // Value at row 0, col 0

// Iterate over cells
puzzle.current.forEach((row, rowIndex) => {
  row.forEach((value, colIndex) => {
    console.log(`Cell (${rowIndex}, ${colIndex}): ${value}`)
  })
})
```

---

### `original`

The original puzzle board (used for reset).

```typescript
puzzle.original: BoardType // number[][]
```

---

### `solution`

The complete solution.

```typescript
puzzle.solution: BoardType // number[][]
```

**Example:**

```typescript
// Check if player's value is correct
const playerValue = puzzle.current[0][0]
const correctValue = puzzle.solution[0][0]

if (playerValue === correctValue) {
  console.log('Correct!')
}
```

---

### `readOnly`

Boolean mask indicating which cells are pre-filled.

```typescript
puzzle.readOnly: BoardReadOnlyType // boolean[][]
```

**Example:**

```typescript
// Check if a cell is editable
if (!puzzle.readOnly[row][col]) {
  // Cell is editable
  puzzle.setCell(row, col, value)
}
```

---

### `difficulty`

The difficulty level of the puzzle.

```typescript
puzzle.difficulty: DifficultyType // 'novice' | 'easy' | 'normal' | 'hard' | 'expert'
```

---

## 🛠️ Methods

### `setCell(row, col, value)` ✏️

Sets a value in a cell. Only works if the cell is not read-only.

```typescript
setCell(row: number, col: number, value: CellValue): boolean
```

**Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `row` | `number` | Row index (0-8) |
| `col` | `number` | Column index (0-8) |
| `value` | `CellValue` | Value to set (0-9) |

**Returns:** `boolean` - `true` if cell was set, `false` if read-only

**Example:**

```typescript
const success = puzzle.setCell(0, 0, 5)

if (success) {
  console.log('Cell updated')
} else {
  console.log('Cell is read-only')
}
```

---

### `clearCell(row, col)` 🗑️

Clears a cell (sets it to empty). Only works if the cell is not read-only.

```typescript
clearCell(row: number, col: number): boolean
```

**Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `row` | `number` | Row index (0-8) |
| `col` | `number` | Column index (0-8) |

**Returns:** `boolean` - `true` if cleared, `false` if read-only

**Example:**

```typescript
puzzle.clearCell(0, 0)
console.log(puzzle.current[0][0]) // 0
```

---

### `getCandidates(row, col)` 📋

Gets all valid candidate values for a specific cell. Perfect for showing pencil marks!

```typescript
getCandidates(row: number, col: number): number[]
```

**Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `row` | `number` | Row index (0-8) |
| `col` | `number` | Column index (0-8) |

**Returns:** `number[]` - Array of valid values (1-9)

**Example:**

```typescript
const candidates = puzzle.getCandidates(0, 0)
console.log('Possible values:', candidates) // [1, 3, 7]

// Show candidates in UI
candidates.forEach(value => {
  console.log(`Can place ${value} here`)
})
```

---

### `getHint()` 💡

Gets a hint for the next cell to fill. Great for when players get stuck!

```typescript
getHint(): HintResult | null
```

**Returns:** `HintResult | null`

- `HintResult`: `{ row, col, value }` - Next cell with correct value
- `null` - No empty cells remain

**Example:**

```typescript
const hint = puzzle.getHint()

if (hint) {
  console.log(`Hint: Place ${hint.value} at (${hint.row}, ${hint.col})`)

  // Auto-apply hint
  puzzle.setCell(hint.row, hint.col, hint.value)
} else {
  console.log('No hints available - puzzle is complete!')
}
```

---

### `getProgress()` 📈

Gets progress statistics for the puzzle. Show your players how far they've come!

```typescript
getProgress(): SudokuPuzzleStatistics
```

**Returns:** `SudokuPuzzleStatistics`

| Property | Type | Description |
|----------|------|-------------|
| `emptyCells` | `number` | Number of empty cells |
| `filledCells` | `number` | Number of filled cells |
| `validCells` | `number` | Number of correctly filled cells |
| `invalidCells` | `number` | Number of incorrectly filled cells |
| `progress` | `number` | Progress percentage (0-100) |

**Example:**

```typescript
const stats = puzzle.getProgress()

console.log(`Progress: ${stats.progress}%`)
console.log(`Cells remaining: ${stats.emptyCells}`)
console.log(`Correct: ${stats.validCells}`)
console.log(`Mistakes: ${stats.invalidCells}`)

// Progress bar
const progressBar = '█'.repeat(stats.progress / 10) + '░'.repeat(10 - stats.progress / 10)
console.log(`[${progressBar}] ${stats.progress}%`)
```

---

### `isComplete()` ✅

Checks if all cells are filled (no empty cells).

```typescript
isComplete(): boolean
```

**Returns:** `boolean` - `true` if no empty cells

> ⚠️ **Note:** This only checks if all cells are filled, not if they are correct. Use `isSolved()` to verify correctness.

**Example:**

```typescript
if (puzzle.isComplete()) {
  if (puzzle.isSolved()) {
    console.log('Congratulations! Puzzle solved!')
  } else {
    console.log('Puzzle complete but has errors')
  }
}
```

---

### `isValidMove(row, col, value)` 🛡️

Checks if a move is valid (doesn't violate Sudoku rules). Prevent mistakes before they happen!

```typescript
isValidMove(row: number, col: number, value: CellValue): boolean
```

**Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `row` | `number` | Row index (0-8) |
| `col` | `number` | Column index (0-8) |
| `value` | `CellValue` | Value to check (1-9) |

**Returns:** `boolean` - `true` if the move is valid

**Example:**

```typescript
const value = 5

if (puzzle.isValidMove(0, 0, value)) {
  puzzle.setCell(0, 0, value)
} else {
  console.log('Invalid move - conflicts with existing value')
}
```

---

### `isSolved()` 🏆

Checks if the puzzle is solved correctly. Time to celebrate!

```typescript
isSolved(): boolean
```

**Returns:** `boolean` - `true` if current matches solution

**Example:**

```typescript
if (puzzle.isSolved()) {
  console.log('🎉 Congratulations!')

  // Show completion time, save score, etc.
}
```

---

### `reset(withRandomize?)` 🔄

Resets the puzzle to its original state. Fresh start!

```typescript
reset(withRandomize?: boolean): void
```

**Parameters:**

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `withRandomize` | `boolean` | `false` | Randomize board after reset |

**Example:**

```typescript
// Simple reset
puzzle.reset()

// Reset and randomize for a new challenge
puzzle.reset(true)
```

---

## 🎯 Complete Example

```typescript
import { createSudoku, Difficulty } from '@hackettyam/sudoku-tools'

// Create puzzle
const puzzle = createSudoku(Difficulty.Normal)

// Game loop
function playGame() {
  // Show progress
  const stats = puzzle.getProgress()
  console.log(`Progress: ${stats.progress}%`)

  // Get hint if stuck
  const hint = puzzle.getHint()
  if (hint) {
    // Validate before placing
    if (puzzle.isValidMove(hint.row, hint.col, hint.value)) {
      puzzle.setCell(hint.row, hint.col, hint.value)
    }
  }

  // Check win condition
  if (puzzle.isSolved()) {
    console.log('You won!')
    return
  }

  // Continue game...
}

// Reset for new game
puzzle.reset()
```

---

## 🔗 Type Alias

### `SudokuPuzzleType`

Type alias for the `SudokuPuzzle` class. Use this when you need the type without instantiating.

```typescript
import type { SudokuPuzzleType } from '@hackettyam/sudoku-tools'
```

---

## 🔗 See Also

- 🚀 [Getting Started](../getting-started.md) - Quick start guide
- 🛠️ [Utilities](./utilities.md) - Standalone utility functions
- 💡 [Examples](../guides/examples.md) - Advanced usage patterns

---

*Happy puzzling!* 🧩🎉
