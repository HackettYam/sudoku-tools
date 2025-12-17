import { SUDOKU_EMPTY_CELL, SUDOKU_SIZE } from '@/constants'
import type { BoardType } from '@/models'

import { isValidPuzzle } from './isValidPuzzle'

/**
 * Checks if a Sudoku board is complete (all cells filled and valid).
 *
 * @param board - The Sudoku board to check
 * @returns true if all cells are filled and the board is valid
 *
 * @example
 * ```typescript
 * import { isComplete, createSudoku } from '@hackettyam/sudoku-tools'
 *
 * const { board, solved } = createSudoku()
 *
 * console.log(isComplete(board))  // false (has empty cells)
 * console.log(isComplete(solved)) // true (complete and valid)
 * ```
 */
export function isComplete(board: BoardType): boolean {
  for (let row = 0; row < SUDOKU_SIZE; row++) {
    for (let col = 0; col < SUDOKU_SIZE; col++) {
      if (board[row][col] === SUDOKU_EMPTY_CELL) {
        return false
      }
    }
  }

  return isValidPuzzle(board)
}
