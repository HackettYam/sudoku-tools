import { SUDOKU_SIZE } from '../constants'
import type { BoardType, CellPosition } from '../models'
import { isValidBox } from './isValidBox'
import { isValidColumn } from './isValidColumn'
import { isValidRow } from './isValidRow'
import { validateCellIndex } from './validateCellIndex'

/**
 * Checks if placing a value at a specific position is valid.
 *
 * @param board - The Sudoku board
 * @param position - Object with row, col, and value
 * @returns true if the value can be placed at the position
 * @throws {Error} If row or col is outside the range 0-8
 *
 * @example
 * ```typescript
 * import { isValidPlacement, createSudoku } from '@hackettyam/sudoku-tools'
 *
 * const { board } = createSudoku()
 * const canPlace = isValidPlacement(board, { row: 0, col: 0, value: 5 })
 *
 * if (canPlace) {
 *   console.log('Value 5 can be placed at (0, 0)')
 * }
 * ```
 */
export function isValidPlacement(board: BoardType, position: CellPosition): boolean {
  const { col, row, value } = position

  if (!validateCellIndex(row, col)) {
    throw new Error(`Invalid cell coordinates: (${row}, ${col}). `
      + `Row and column must be integers between 0 and ${SUDOKU_SIZE - 1}.`)
  }

  const original = board[row][col]
  board[row][col] = value

  const valid = isValidRow(board, row)
    && isValidColumn(board, col)
    && isValidBox(board, Math.floor(row / 3), Math.floor(col / 3))

  board[row][col] = original

  return valid
}
