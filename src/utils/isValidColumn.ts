import { SUDOKU_EMPTY_CELL, SUDOKU_SIZE } from '../constants'
import type { BoardType } from '../models'

/**
 * Validates if a column in a Sudoku board contains digits 1-9 without repetition.
 *
 * Empty cells (value 0) are ignored during validation.
 * Returns true if all non-empty cells in the column are unique.
 *
 * @param board - The Sudoku board to validate
 * @param col - The column index to validate (0-8)
 * @returns true if the column is valid (no duplicate non-empty values), false otherwise
 *
 * @example
 * ```typescript
 * import { isValidColumn } from '@hackettyam/sudoku-tools'
 *
 * const board = createSudoku().current
 * if (isValidColumn(board, 4)) {
 *   console.log('Column 4 is valid')
 * }
 * ```
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
