import { SUDOKU_EMPTY_CELL, SUDOKU_SIZE } from '../constants'
import type { BoardType } from '../models'

/**
 * Validates if a column in a Sudoku board contains digits 1-9 without repetition.
 *
 * @param board - The Sudoku board to validate
 * @param col - The column index to validate
 * @returns true if the column is valid, false otherwise
 */
export function isValidColumn(board: BoardType, col: number): boolean {
  const seen = new Set<number>()

  for (let r = 0; r < SUDOKU_SIZE; r++) {
    const val = board[r][col]

    if (val !== SUDOKU_EMPTY_CELL) {
      if (seen.has(val)) return false
      seen.add(val)
    }
  }

  return true
}
