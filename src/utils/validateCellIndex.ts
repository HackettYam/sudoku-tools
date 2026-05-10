import { SUDOKU_SIZE } from '../constants'

/**
 * Validates that row and column indices are within Sudoku bounds (0-8).
 *
 * @param row - Row index to validate (0-8)
 * @param col - Column index to validate (0-8)
 * @returns True if both indices are valid, false otherwise
 *
 * @example
 * ```typescript
 * import { validateCellIndex } from '@hackettyam/sudoku-tools'
 *
 * // Valid indices
 * validateCellIndex(0, 0)  // true
 * validateCellIndex(8, 8)  // true
 * validateCellIndex(4, 7)  // true
 *
 * // Invalid indices
 * validateCellIndex(-1, 0) // false
 * validateCellIndex(9, 0)  // false
 * validateCellIndex(0, 9)  // false
 * validateCellIndex(-1, 9) // false
 * ```
 */
export function validateCellIndex(row: number, col: number): boolean {
  return row >= 0 && row < SUDOKU_SIZE && col >= 0 && col < SUDOKU_SIZE
}
