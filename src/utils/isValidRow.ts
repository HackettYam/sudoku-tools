import { SUDOKU_EMPTY_CELL, SUDOKU_SIZE } from '../constants'
import type { BoardType } from '../models'

/**
 * Validates if a row in a Sudoku board contains digits 1-9 without repetition.
 *
 * @param board - The Sudoku board to validate
 * @param row - The row index to validate
 * @returns true if the row is valid, false otherwise
 */
export function isValidRow(board: BoardType, row: number): boolean {
  const seen = new Set<number>()

  for (let c = 0; c < SUDOKU_SIZE; c++) {
    const val = board[row][c]

    if (val !== SUDOKU_EMPTY_CELL) {
      if (seen.has(val)) return false
      seen.add(val)
    }
  }

  return true
}
