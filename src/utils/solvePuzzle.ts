import type { BoardType } from '../models'
import { backtrack } from './backtrack'
import { cloneBoard } from './cloneBoard'
import { isValidPuzzle } from './isValidPuzzle'

/**
 * Solves a Sudoku puzzle using backtracking algorithm.
 *
 * @param board - The Sudoku board to solve
 * @returns The solved board or null if no solution exists
 *
 * @example
 * ```typescript
 * import { solvePuzzle, createSudoku } from '@hackettyam/sudoku-tools'
 *
 * const { board } = createSudoku()
 * const solution = solvePuzzle(board)
 *
 * if (solution) {
 *   console.log('Solved:', solution)
 * } else {
 *   console.log('No solution exists')
 * }
 * ```
 */
export function solvePuzzle(board: BoardType): BoardType | null {
  if (!isValidPuzzle(board)) {
    return null
  }

  const boardCopy = cloneBoard(board)

  if (backtrack(boardCopy)) {
    return boardCopy
  }

  return null
}
