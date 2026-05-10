import type { BoardType } from '../models'
import { cloneBoard } from './cloneBoard'
import { countSolutions } from './countSolutions'
import { isValidPuzzle } from './isValidPuzzle'

/**
 * Checks if a Sudoku puzzle has exactly one unique solution.
 *
 * @param board - The Sudoku board to check
 * @returns true if the puzzle has exactly one solution, false otherwise
 *
 * @example
 * ```typescript
 * import { hasUniqueSolution, createSudoku } from '@hackettyam/sudoku-tools'
 *
 * const { board } = createSudoku()
 *
 * if (hasUniqueSolution(board)) {
 *   console.log('Puzzle has a unique solution')
 * } else {
 *   console.log('Puzzle has multiple solutions or no solution')
 * }
 * ```
 */
export function hasUniqueSolution(board: BoardType): boolean {
  if (!isValidPuzzle(board)) {
    return false
  }

  const boardCopy = cloneBoard(board)
  const solutions = countSolutions(boardCopy)

  return solutions === 1
}
