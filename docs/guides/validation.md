# ✅ Validation

Guide to validating Sudoku boards and moves. Keep your puzzles valid and error-free! 🛡️

## 🎲 Board Validation

### `isValidPuzzle(board)`

Validates that a board follows all Sudoku rules.

```typescript
import { isValidPuzzle, createSudoku, cloneBoard } from '@hackettyam/sudoku-tools'

const puzzle = createSudoku()

// Valid boards
console.log(isValidPuzzle(puzzle.current))  // true
console.log(isValidPuzzle(puzzle.solution)) // true

// Create an invalid board
const invalid = cloneBoard(puzzle.current)
invalid[0][0] = 5
invalid[0][1] = 5 // Duplicate in row
console.log(isValidPuzzle(invalid)) // false
```

**Checks performed:**
- Each row has no duplicate digits (1-9)
- Each column has no duplicate digits (1-9)
- Each 3x3 box has no duplicate digits (1-9)
- Empty cells (0) are ignored

---

## ↔️ Row Validation

### `isValidRow(board, row)`

Validates a specific row.

```typescript
import { isValidRow, cloneBoard, SUDOKU_BASE_BOARD } from '@hackettyam/sudoku-tools'

const board = cloneBoard(SUDOKU_BASE_BOARD)

console.log(isValidRow(board, 0)) // true

// Create duplicate
board[0][0] = board[0][1]
console.log(isValidRow(board, 0)) // false
```

---

## ↕️ Column Validation

### `isValidColumn(board, col)`

Validates a specific column.

```typescript
import { isValidColumn, cloneBoard, SUDOKU_BASE_BOARD } from '@hackettyam/sudoku-tools'

const board = cloneBoard(SUDOKU_BASE_BOARD)

console.log(isValidColumn(board, 0)) // true

// Create duplicate
board[0][0] = board[1][0]
console.log(isValidColumn(board, 0)) // false
```

---

## ▢ Box Validation

### `isValidBox(board, boxRow, boxCol)`

Validates a specific 3x3 box.

```typescript
import { isValidBox, cloneBoard, SUDOKU_BASE_BOARD } from '@hackettyam/sudoku-tools'

const board = cloneBoard(SUDOKU_BASE_BOARD)

// Box indices (0-2)
console.log(isValidBox(board, 0, 0)) // true (top-left)
console.log(isValidBox(board, 1, 1)) // true (center)
console.log(isValidBox(board, 2, 2)) // true (bottom-right)
```

**Box Grid:**

```
     col 0-2   col 3-5   col 6-8
    ┌────────┬────────┬────────┐
row │ (0,0)  │ (0,1)  │ (0,2)  │
0-2 ├────────┼────────┼────────┤
row │ (1,0)  │ (1,1)  │ (1,2)  │
3-5 ├────────┼────────┼────────┤
row │ (2,0)  │ (2,1)  │ (2,2)  │
6-8 └────────┴────────┴────────┘
```

---

## 🎯 Move Validation

### `isValidPlacement(board, position)`

Checks if placing a value at a position is valid.

```typescript
import { isValidPlacement, createSudoku } from '@hackettyam/sudoku-tools'

const puzzle = createSudoku()

const result = isValidPlacement(puzzle.current, {
  row: 0,
  col: 0,
  value: 5,
})

console.log(result.valid)   // true or false
console.log(result.reason)   // 'none' | 'row' | 'column' | 'box'
```

---

### Using `SudokuPuzzle.isValidMove()`

The puzzle instance has a built-in method:

```typescript
import { createSudoku } from '@hackettyam/sudoku-tools'

const puzzle = createSudoku()

if (puzzle.isValidMove(0, 0, 5)) {
  puzzle.setCell(0, 0, 5)
} else {
  console.log('Invalid move!')
}
```

---

## 🏁 Completion Checks

### `isComplete(board)` 🟢

Checks if all cells are filled (no empty cells).

```typescript
import { isComplete, createSudoku } from '@hackettyam/sudoku-tools'

const puzzle = createSudoku()

console.log(isComplete(puzzle.current))  // false (has empty cells)
console.log(isComplete(puzzle.solution)) // true
```

> ⚠️ **Note:** `isComplete` only checks that all cells are filled. It does NOT verify correctness. Use `isSolved` to check if the solution is correct.

---

### `isSolved(board, solved)` 🏆

Checks if the current board matches the solution exactly.

```typescript
import { isSolved, createSudoku } from '@hackettyam/sudoku-tools'

const puzzle = createSudoku()

console.log(isSolved(puzzle.current, puzzle.solution))  // false
console.log(isSolved(puzzle.solution, puzzle.solution)) // true
```

---

## 🔴 Finding Invalid Cells

### `getInvalidCells(board, solved)` ❌

Gets all cells that have incorrect values.

```typescript
import { getInvalidCells, createSudoku, cloneBoard } from '@hackettyam/sudoku-tools'

const puzzle = createSudoku()
const board = cloneBoard(puzzle.current)

// Make a wrong move
board[0][0] = puzzle.solution[0][0] === 1 ? 2 : 1

const invalid = getInvalidCells(board, puzzle.solution)
console.log(invalid) // [{ row: 0, col: 0 }]
```

---

### `countInvalidCells(board, solved)` 📊

Counts cells with incorrect values.

```typescript
import { countInvalidCells, createSudoku, cloneBoard } from '@hackettyam/sudoku-tools'

const puzzle = createSudoku()
const board = cloneBoard(puzzle.current)

// Make some wrong moves
board[0][0] = puzzle.solution[0][0] === 1 ? 2 : 1
board[0][1] = puzzle.solution[0][1] === 1 ? 2 : 1

const count = countInvalidCells(board, puzzle.solution)
console.log(`${count} mistakes`) // "2 mistakes"
```

---

## 🧠 Solution Validation

### `hasUniqueSolution(board)` ✅

Checks if a puzzle has exactly one solution.

```typescript
import { hasUniqueSolution, createSudoku } from '@hackettyam/sudoku-tools'

const puzzle = createSudoku()
console.log(hasUniqueSolution(puzzle.current)) // true
```

> ⚠️ **Performance:** This function uses backtracking and may be slow for puzzles with many empty cells.

---

### `countSolutions(board)` 🔢

Counts the number of solutions (stops at 2).

```typescript
import { countSolutions, createSudoku } from '@hackettyam/sudoku-tools'

const puzzle = createSudoku()
const count = countSolutions(puzzle.current)

if (count === 0) {
  console.log('No solution')
} else if (count === 1) {
  console.log('Unique solution')
} else {
  console.log('Multiple solutions')
}
```

---

## 🛠️ Custom Validation Helpers

### 📝 Validate Cell Input

```typescript
function validateCellInput(value: string): number | null {
  const num = parseInt(value, 10)

  if (isNaN(num)) return null
  if (num < 0 || num > 9) return null

  return num
}

// Usage
const input = "5"
const value = validateCellInput(input)

if (value !== null) {
  puzzle.setCell(row, col, value)
}
```

### 🔴 Find Conflicts for Highlighting

```typescript
import { SUDOKU_SIZE, type BoardType, type BoardCellType } from '@hackettyam/sudoku-tools'

function findConflictingCells(
  board: BoardType,
  row: number,
  col: number,
  value: number
): BoardCellType[] {
  if (value === 0) return []

  const conflicts: BoardCellType[] = []

  // Check row
  for (let c = 0; c < SUDOKU_SIZE; c++) {
    if (c !== col && board[row][c] === value) {
      conflicts.push({ row, col: c })
    }
  }

  // Check column
  for (let r = 0; r < SUDOKU_SIZE; r++) {
    if (r !== row && board[r][col] === value) {
      conflicts.push({ row: r, col })
    }
  }

  // Check box
  const boxRow = Math.floor(row / 3) * 3
  const boxCol = Math.floor(col / 3) * 3
  for (let r = boxRow; r < boxRow + 3; r++) {
    for (let c = boxCol; c < boxCol + 3; c++) {
      if ((r !== row || c !== col) && board[r][c] === value) {
        conflicts.push({ row: r, col: c })
      }
    }
  }

  return conflicts
}

// Usage: Highlight conflicting cells in UI
const conflicts = findConflictingCells(board, 0, 0, 5)
conflicts.forEach(cell => {
  highlightCell(cell.row, cell.col, 'red')
})
```

---

## 🔗 See Also

- 🛠️ [Utilities](../api/utilities.md) - All validation functions
- 💡 [Examples](./examples.md) - Usage examples
- 🧩 [SudokuPuzzle](../api/sudoku-puzzle.md) - Built-in validation methods

---

*Keep your puzzles valid!* ✅✨
