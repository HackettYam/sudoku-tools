# 💡 Advanced Examples

Real-world usage patterns and code snippets. Copy, paste, and build amazing things! 🚀

## 🎮 Creating a Custom Puzzle Generator

```typescript
import {
  cloneBoard,
  randomizeBoard,
  emptyCells,
  hasUniqueSolution,
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

---

## 🎮 Game State Management

### ⚛️ React State Example

```typescript
import { useState, useCallback } from 'react'
import { createSudoku, Difficulty, type SudokuPuzzle } from '@hackettyam/sudoku-tools'

function useSudokuGame(initialDifficulty = Difficulty.Normal) {
  const [puzzle, setPuzzle] = useState(() => createSudoku(initialDifficulty))
  const [, forceUpdate] = useState({})

  const setCell = useCallback((row: number, col: number, value: number) => {
    if (puzzle.setCell(row, col, value as any)) {
      forceUpdate({}) // Trigger re-render
    }
  }, [puzzle])

  const clearCell = useCallback((row: number, col: number) => {
    if (puzzle.clearCell(row, col)) {
      forceUpdate({})
    }
  }, [puzzle])

  const getHint = useCallback(() => {
    const hint = puzzle.getHint()
    if (hint) {
      puzzle.setCell(hint.row, hint.col, hint.value)
      forceUpdate({})
    }
    return hint
  }, [puzzle])

  const reset = useCallback((randomize = false) => {
    puzzle.reset(randomize)
    forceUpdate({})
  }, [puzzle])

  const newGame = useCallback((difficulty = initialDifficulty) => {
    setPuzzle(createSudoku(difficulty))
  }, [initialDifficulty])

  return {
    puzzle,
    current: puzzle.current,
    solution: puzzle.solution,
    readOnly: puzzle.readOnly,
    difficulty: puzzle.difficulty,
    progress: puzzle.getProgress(),
    isComplete: puzzle.isComplete(),
    isSolved: puzzle.isSolved(),
    setCell,
    clearCell,
    getHint,
    reset,
    newGame,
    getCandidates: puzzle.getCandidates.bind(puzzle),
    isValidMove: puzzle.isValidMove.bind(puzzle),
  }
}
```

---

## ✅ Validating User Input

```typescript
import { SUDOKU_SIZE, SUDOKU_EMPTY_CELL, type BoardType } from '@hackettyam/sudoku-tools'

function validateMove(
  board: BoardType,
  row: number,
  col: number,
  value: number
): { valid: boolean; reason?: string } {
  // Check bounds
  if (row < 0 || row >= SUDOKU_SIZE || col < 0 || col >= SUDOKU_SIZE) {
    return { valid: false, reason: 'Position out of bounds' }
  }

  // Check value range
  if (value < 0 || value > 9) {
    return { valid: false, reason: 'Value must be 0-9' }
  }

  // Allow clearing cells
  if (value === SUDOKU_EMPTY_CELL) {
    return { valid: true }
  }

  // Check row conflict
  for (let c = 0; c < SUDOKU_SIZE; c++) {
    if (c !== col && board[row][c] === value) {
      return { valid: false, reason: `Value ${value} already exists in row` }
    }
  }

  // Check column conflict
  for (let r = 0; r < SUDOKU_SIZE; r++) {
    if (r !== row && board[r][col] === value) {
      return { valid: false, reason: `Value ${value} already exists in column` }
    }
  }

  // Check box conflict
  const boxRow = Math.floor(row / 3) * 3
  const boxCol = Math.floor(col / 3) * 3
  for (let r = boxRow; r < boxRow + 3; r++) {
    for (let c = boxCol; c < boxCol + 3; c++) {
      if ((r !== row || c !== col) && board[r][c] === value) {
        return { valid: false, reason: `Value ${value} already exists in 3x3 box` }
      }
    }
  }

  return { valid: true }
}
```

---

## 🔒 Creating a Read-Only Map

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

const puzzle = createSudoku()
const readOnlyMap = createReadOnlyMap(puzzle.original)

// Check if a cell is editable
const canEdit = (row: number, col: number) => !readOnlyMap[row][col]
```

---

## 📈 Tracking Game Progress

```typescript
import {
  countFilledCells,
  countEmptyCells,
  countValidCells,
  countInvalidCells,
  type BoardType,
} from '@hackettyam/sudoku-tools'

interface GameStats {
  filled: number
  empty: number
  valid: number
  invalid: number
  progress: number
  accuracy: number
}

function getGameStats(board: BoardType, solved: BoardType): GameStats {
  const filled = countFilledCells(board)
  const empty = countEmptyCells(board)
  const valid = countValidCells(board, solved)
  const invalid = countInvalidCells(board, solved)
  const progress = Math.round((filled / 81) * 100)
  const accuracy = filled > 0 ? Math.round((valid / filled) * 100) : 100

  return { filled, empty, valid, invalid, progress, accuracy }
}

// Usage
const stats = getGameStats(puzzle.current, puzzle.solution)
console.log(`Progress: ${stats.progress}%`)
console.log(`Accuracy: ${stats.accuracy}%`)
console.log(`Mistakes: ${stats.invalid}`)
```

---

## 🎬 Auto-Solve Animation

```typescript
import { createSudoku, type SudokuPuzzle } from '@hackettyam/sudoku-tools'

async function autoSolve(
  puzzle: SudokuPuzzle,
  onStep: (row: number, col: number, value: number) => void,
  delayMs = 100
): Promise<void> {
  while (!puzzle.isSolved()) {
    const hint = puzzle.getHint()
    if (!hint) break

    puzzle.setCell(hint.row, hint.col, hint.value)
    onStep(hint.row, hint.col, hint.value)

    await new Promise(resolve => setTimeout(resolve, delayMs))
  }
}

// Usage
const puzzle = createSudoku()

autoSolve(puzzle, (row, col, value) => {
  console.log(`Placed ${value} at (${row}, ${col})`)
  // Update UI here
})
```

---

## 💾 Save/Load Game State

```typescript
import {
  serializeBoard,
  deserializeBoard,
  type DifficultyType,
  type SudokuPuzzle,
} from '@hackettyam/sudoku-tools'

interface SavedGame {
  current: string
  original: string
  solution: string
  difficulty: DifficultyType
  timestamp: number
}

function saveGame(puzzle: SudokuPuzzle): string {
  const saved: SavedGame = {
    current: serializeBoard(puzzle.current),
    original: serializeBoard(puzzle.original),
    solution: serializeBoard(puzzle.solution),
    difficulty: puzzle.difficulty,
    timestamp: Date.now(),
  }
  return JSON.stringify(saved)
}

function loadGame(json: string): SavedGame {
  const saved: SavedGame = JSON.parse(json)
  return {
    ...saved,
    current: deserializeBoard(saved.current),
    original: deserializeBoard(saved.original),
    solution: deserializeBoard(saved.solution),
  }
}

// Save to localStorage
localStorage.setItem('sudoku-save', saveGame(puzzle))

// Load from localStorage
const saved = loadGame(localStorage.getItem('sudoku-save')!)
```

---

## 🔴 Highlighting Conflicts

```typescript
import { SUDOKU_SIZE, type BoardType, type BoardCellType } from '@hackettyam/sudoku-tools'

function findConflicts(board: BoardType): BoardCellType[] {
  const conflicts: BoardCellType[] = []

  for (let row = 0; row < SUDOKU_SIZE; row++) {
    for (let col = 0; col < SUDOKU_SIZE; col++) {
      const value = board[row][col]
      if (value === 0) continue

      // Check row
      for (let c = 0; c < SUDOKU_SIZE; c++) {
        if (c !== col && board[row][c] === value) {
          conflicts.push({ row, col })
          break
        }
      }

      // Check column
      for (let r = 0; r < SUDOKU_SIZE; r++) {
        if (r !== row && board[r][col] === value) {
          if (!conflicts.some(c => c.row === row && c.col === col)) {
            conflicts.push({ row, col })
          }
          break
        }
      }

      // Check box
      const boxRow = Math.floor(row / 3) * 3
      const boxCol = Math.floor(col / 3) * 3
      outer: for (let r = boxRow; r < boxRow + 3; r++) {
        for (let c = boxCol; c < boxCol + 3; c++) {
          if ((r !== row || c !== col) && board[r][c] === value) {
            if (!conflicts.some(cf => cf.row === row && cf.col === col)) {
              conflicts.push({ row, col })
            }
            break outer
          }
        }
      }
    }
  }

  return conflicts
}
```

---

## ✏️ Pencil Marks (Notes)

```typescript
type PencilMarks = Set<number>[][]

function createPencilMarks(): PencilMarks {
  return Array.from({ length: 9 }, () =>
    Array.from({ length: 9 }, () => new Set<number>())
  )
}

function togglePencilMark(
  marks: PencilMarks,
  row: number,
  col: number,
  value: number
): void {
  if (marks[row][col].has(value)) {
    marks[row][col].delete(value)
  } else {
    marks[row][col].add(value)
  }
}

function clearPencilMarks(marks: PencilMarks, row: number, col: number): void {
  marks[row][col].clear()
}

function autoFillPencilMarks(
  marks: PencilMarks,
  board: BoardType,
  getCandidates: (row: number, col: number) => number[]
): void {
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      if (board[row][col] === 0) {
        marks[row][col] = new Set(getCandidates(row, col))
      }
    }
  }
}
```

---

## 🔗 See Also

- 🚀 [Getting Started](../getting-started.md) - Basic usage
- 🧩 [SudokuPuzzle](../api/sudoku-puzzle.md) - Class reference
- 🔄 [Transformations](./transformations.md) - Board transformations

---

*Build something awesome!* 🚀✨
