import { SUDOKU_EMPTY_CELL } from '../constants'
import type { BoardType } from '../models'

/**
 * Validates if a 3x3 box in a Sudoku board contains digits 1-9 without repetition.
 *
 * Empty cells (value 0) are ignored during validation.
 * Returns true if all non-empty cells in the 3x3 box are unique.
 *
 * @param board - The Sudoku board to validate
 * @param boxRow - The row index of the box (0-2, represents which band)
 * @param boxCol - The column index of the box (0-2, represents which stack)
 * @returns true if the box is valid (no duplicate non-empty values), false otherwise
 *
 * @example
 * ```typescript
 * import { isValidBox } from '@hackettyam/sudoku-tools'
 *
 * const board = createSudoku().current
 * // Check the center box (box at position [1,1])
 * if (isValidBox(board, 1, 1)) {
 *   console.log('Center box is valid')
 * }
 * ```
 */
export function isValidBox(board: BoardType, boxRow: number, boxCol: number): boolean {
  const seen = new Set<number>()
  const startRow = boxRow * 3
  const startCol = boxCol * 3

  for (let r = startRow; r < startRow + 3; r++) {
    for (let c = startCol; c < startCol + 3; c++) {
      const val = board[r][c]

      if (val !== SUDOKU_EMPTY_CELL) {
        if (seen.has(val)) return false
        seen.add(val)
      }
    }
  }

  return true
}
