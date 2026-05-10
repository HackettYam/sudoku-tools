import { SUDOKU_SIZE } from '../constants'
import type { BoardType } from '../models'

/**
 * Checks if a Sudoku board matches the solution exactly.
 *
 * @param board - The current Sudoku board state
 * @param solved - The solved Sudoku board
 * @returns true if the board matches the solution exactly
 *
 * @example
 * ```typescript
 * import { isSolved, createSudoku, cloneBoard } from '@hackettyam/sudoku-tools'
 *
 * const { board, solved } = createSudoku()
 *
 * console.log(isSolved(board, solved))  // false
 * console.log(isSolved(solved, solved)) // true
 * ```
 */
export function isSolved(board: BoardType, solved: BoardType): boolean {
  for (let row = 0; row < SUDOKU_SIZE; row++) {
    for (let col = 0; col < SUDOKU_SIZE; col++) {
      if (board[row][col] !== solved[row][col]) {
        return false
      }
    }
  }

  return true
}
