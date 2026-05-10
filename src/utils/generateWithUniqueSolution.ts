import {
  SUDOKU_BASE_BOARD,
  SUDOKU_DIFFICULTY_HINTS,
  SUDOKU_EMPTY_CELL,
  SUDOKU_SIZE,
} from '../constants'
import { Difficulty, type GeneratePuzzleResult } from '../models'
import { cloneBoard } from './cloneBoard'
import { getAllCellPositions } from './getAllCellPositions'
import { hasUniqueSolution } from './hasUniqueSolution'
import { randomizeBoard } from './randomizeBoard'

/**
 * Generates a Sudoku puzzle with a guaranteed unique solution.
 * This method is slower than generatePuzzle but ensures quality.
 *
 * @param difficulty - The difficulty level for the puzzle
 * @returns GeneratePuzzleResult with board and solved board
 *
 * @example
 * ```typescript
 * import { generateWithUniqueSolution, Difficulty } from '@hackettyam/sudoku-tools'
 *
 * const { board, solved } = generateWithUniqueSolution(Difficulty.Hard)
 * // board has a guaranteed unique solution
 * ```
 */
export function generateWithUniqueSolution(difficulty: Difficulty = Difficulty.Normal): GeneratePuzzleResult {
  const board = cloneBoard(SUDOKU_BASE_BOARD)
  randomizeBoard(board)

  const solved = cloneBoard(board)
  const targetHints = SUDOKU_DIFFICULTY_HINTS[difficulty]
  const targetEmpty = (SUDOKU_SIZE * SUDOKU_SIZE) - targetHints

  const positions = getAllCellPositions()
  let removedCount = 0

  for (const [row, col] of positions) {
    if (removedCount >= targetEmpty) break

    const originalValue = board[row][col]

    if (originalValue === SUDOKU_EMPTY_CELL) continue

    board[row][col] = SUDOKU_EMPTY_CELL

    if (hasUniqueSolution(board)) {
      removedCount++
    } else {
      board[row][col] = originalValue
    }
  }

  return { board, solved }
}
