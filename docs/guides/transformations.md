# 🔄 Board Transformations

Guide to transforming Sudoku boards while maintaining validity. Spin, flip, and shuffle! 🎲

## 🔃 Rotation

### `rotateBoard(board, times?)`

Rotates the board 90° clockwise. Returns a new board.

```typescript
import { rotateBoard, createSudoku } from '@hackettyam/sudoku-tools'

const puzzle = createSudoku()

// 90° clockwise
const rotated90 = rotateBoard(puzzle.current)

// 180°
const rotated180 = rotateBoard(puzzle.current, 2)

// 270° clockwise (90° counter-clockwise)
const rotated270 = rotateBoard(puzzle.current, 3)

// 360° (back to original)
const rotated360 = rotateBoard(puzzle.current, 4)
```

**Visual:**

```
Original:          90° Clockwise:
1 2 3              7 4 1
4 5 6      →       8 5 2
7 8 9              9 6 3
```

---

## 🪞 Mirroring

### `mirrorBoard(board, direction)`

Mirrors the board horizontally or vertically. Returns a new board.

```typescript
import { mirrorBoard, createSudoku } from '@hackettyam/sudoku-tools'

const puzzle = createSudoku()

// Horizontal mirror (flip left-right)
const horizontal = mirrorBoard(puzzle.current, 'horizontal')

// Vertical mirror (flip top-bottom)
const vertical = mirrorBoard(puzzle.current, 'vertical')
```

**Visual:**

```
Original:          Horizontal:        Vertical:
1 2 3              3 2 1              7 8 9
4 5 6      →       6 5 4              4 5 6
7 8 9              9 8 7              1 2 3
```

---

## 🔀 Digit Swapping

### `swapDigits(board, d1, d2)`

Swaps all occurrences of two digits. Modifies the board in place.

```typescript
import { swapDigits, cloneBoard, SUDOKU_BASE_BOARD } from '@hackettyam/sudoku-tools'

const board = cloneBoard(SUDOKU_BASE_BOARD)

// Swap all 1s with 9s
swapDigits(board, 1, 9)

// Now every cell that was 1 is 9 and vice versa
console.log(board[0][0]) // 9 (was 1)
```

**Why it's valid:** Swapping digits preserves Sudoku validity because if each digit appears exactly once per row/column/box, swapping two digits maintains that property.

---

## ↔️ Row Swapping

### `swapRowWithinBand(board, band)`

Swaps two random rows within the same 3-row band. Modifies in place.

```typescript
import { swapRowWithinBand, cloneBoard, SUDOKU_BASE_BOARD } from '@hackettyam/sudoku-tools'

const board = cloneBoard(SUDOKU_BASE_BOARD)

// Swap rows in band 0 (rows 0-2)
swapRowWithinBand(board, 0)

// Swap rows in band 1 (rows 3-5)
swapRowWithinBand(board, 1)

// Swap rows in band 2 (rows 6-8)
swapRowWithinBand(board, 2)
```

**Bands:**

```
Band 0: rows 0, 1, 2  ─┐
Band 1: rows 3, 4, 5  ─┤ Can swap within band
Band 2: rows 6, 7, 8  ─┘
```

**Why it's valid:** Rows within the same band share the same 3x3 boxes, so swapping them doesn't affect box validity.

---

## ↕️ Column Swapping

### `swapColWithinStack(board, stack)`

Swaps two random columns within the same 3-column stack. Modifies in place.

```typescript
import { swapColWithinStack, cloneBoard, SUDOKU_BASE_BOARD } from '@hackettyam/sudoku-tools'

const board = cloneBoard(SUDOKU_BASE_BOARD)

// Swap columns in stack 0 (cols 0-2)
swapColWithinStack(board, 0)

// Swap columns in stack 1 (cols 3-5)
swapColWithinStack(board, 1)

// Swap columns in stack 2 (cols 6-8)
swapColWithinStack(board, 2)
```

**Stacks:**

```
Stack 0   Stack 1   Stack 2
cols 0-2  cols 3-5  cols 6-8
   ↓         ↓         ↓
┌───┬───┬───┐
│ · │ · │ · │
└───┴───┴───┘
```

---

## 🎲 Complete Randomization

### `randomizeBoard(board)`

Applies multiple transformations for thorough randomization. Modifies in place.

```typescript
import { randomizeBoard, cloneBoard, SUDOKU_BASE_BOARD } from '@hackettyam/sudoku-tools'

const board = cloneBoard(SUDOKU_BASE_BOARD)
randomizeBoard(board)

// Board is now thoroughly randomized but still valid
```

**Transformations applied:**
1. Random digit permutation (swaps all digit pairs)
2. Random row swaps within each band
3. Random column swaps within each stack

---

## 💾 Serialization

### `serializeBoard(board)` 📤

Converts a 9x9 board to a compact 81-character string.

```typescript
import { serializeBoard, createSudoku } from '@hackettyam/sudoku-tools'

const puzzle = createSudoku()
const str = serializeBoard(puzzle.current)

console.log(str)        // "003050709400709020089023050..."
console.log(str.length) // 81
```

**Format:** Each character represents one cell, row by row:
- `0` = empty cell
- `1-9` = cell value

---

### `deserializeBoard(str)` 📥

Converts an 81-character string back to a board.

```typescript
import { deserializeBoard } from '@hackettyam/sudoku-tools'

const str = "123456789456789123789123456234567891567891234891234567345678912678912345912345678"
const board = deserializeBoard(str)

console.log(board[0]) // [1, 2, 3, 4, 5, 6, 7, 8, 9]
```

**Validation:**
- String must be exactly 81 characters
- Each character must be 0-9
- Throws error if invalid

---

## 🌟 Combining Transformations

Create unique puzzles by combining transformations:

```typescript
import {
  cloneBoard,
  SUDOKU_BASE_BOARD,
  swapDigits,
  swapRowWithinBand,
  swapColWithinStack,
  rotateBoard,
  mirrorBoard,
} from '@hackettyam/sudoku-tools'

function createUniquePuzzle(): BoardType {
  let board = cloneBoard(SUDOKU_BASE_BOARD)

  // Apply digit permutation
  const digits = [1, 2, 3, 4, 5, 6, 7, 8, 9]
  for (let i = digits.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    if (i !== j) {
      swapDigits(board, digits[i], digits[j]);
      [digits[i], digits[j]] = [digits[j], digits[i]]
    }
  }

  // Swap rows in each band
  for (let band = 0; band < 3; band++) {
    swapRowWithinBand(board, band)
  }

  // Swap columns in each stack
  for (let stack = 0; stack < 3; stack++) {
    swapColWithinStack(board, stack)
  }

  // Random rotation
  const rotations = Math.floor(Math.random() * 4)
  if (rotations > 0) {
    board = rotateBoard(board, rotations)
  }

  // Random mirror
  if (Math.random() > 0.5) {
    board = mirrorBoard(board, 'horizontal')
  }
  if (Math.random() > 0.5) {
    board = mirrorBoard(board, 'vertical')
  }

  return board
}
```

---

## 🔗 See Also

- 🛠️ [Utilities](../api/utilities.md) - All utility functions
- 💡 [Examples](./examples.md) - More code examples
- ✅ [Validation](./validation.md) - Validating transformations

---

*Transform your puzzles!* 🔄✨
