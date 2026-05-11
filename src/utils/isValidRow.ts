import { SUDOKU_EMPTY_CELL, SUDOKU_SIZE } from '../constants'
import type { BoardType } from '../models'

/**
 * Validates if a row in a Sudoku board contains digits 1-9 without repetition.
 *
 * Empty cells (value 0) are ignored during validation.
 * Returns true if all non-empty cells in the row are unique.
 *
 * @param board - The Sudoku board to validate
 * @param row - The row index to validate (0-8)
 * @returns true if the row is valid (no duplicate non-empty values), false otherwise
 *
 * @example
 * ```typescript
 * import { isValidRow } from '@hackettyam/sudoku-tools'
 *
 * const board = createSudoku().current
 * if (isValidRow(board, 0)) {
 *   console.log('Row 0 is valid')
 * }
 * ```
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
