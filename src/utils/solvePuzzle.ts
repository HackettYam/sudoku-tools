import type { BoardType, SolveResult } from '../models'
import { backtrack } from './backtrack'
import { cloneBoard } from './cloneBoard'
import { detectInvalidityReason } from './detectInvalidityReason'
import { isValidPuzzle } from './isValidPuzzle'

/**
 * Solves a Sudoku puzzle using backtracking algorithm.
 *
 * @param board - The Sudoku board to solve
 * @returns A SolveResult object containing the solved board or an error message
 *
 * @example
 * ```typescript
 * import { solvePuzzle, createSudoku } from '@hackettyam/sudoku-tools'
 *
 * const { board } = createSudoku()
 * const result = solvePuzzle(board)
 *
 * if (result.board) {
 *   console.log('Solved:', result.board)
 * } else {
 *   console.log('No solution exists:', result.error)
 * }
 * ```
 */
export function solvePuzzle(board: BoardType): SolveResult {
  if (!isValidPuzzle(board)) {
    return {
      board: null,
      error: `Invalid initial board: ${detectInvalidityReason(board)}`,
    }
  }

  const boardCopy = cloneBoard(board)

  if (backtrack(boardCopy)) {
    return { board: boardCopy }
  }

  return {
    board: null,
    error: 'Board is unsolvable: no solution exists with given constraints',
  }
}
