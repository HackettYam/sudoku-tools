import { SUDOKU_SIZE } from '../constants'
import type { BoardType, CellPosition, PlacementValidationResult } from '../models'
import { isValidBox } from './isValidBox'
import { isValidColumn } from './isValidColumn'
import { isValidRow } from './isValidRow'
import { validateCellIndex } from './validateCellIndex'

/**
 * Checks if placing a value at a specific position is valid.
 *
 * @param board - The Sudoku board
 * @param position - Object with row, col, and value
 * @returns A PlacementValidationResult with valid status and constraint info
 * @throws {Error} If row or col is outside the range 0-8
 *
 * @example
 * ```typescript
 * import { isValidPlacement, createSudoku } from '@hackettyam/sudoku-tools'
 *
 * const { board } = createSudoku()
 * const result = isValidPlacement(board, { row: 0, col: 0, value: 5 })
 *
 * if (result.valid) {
 *   console.log('Value 5 can be placed at (0, 0)')
 * } else {
 *   console.log(`Invalid: conflicts with ${result.reason}`)
 * }
 * ```
 */
export function isValidPlacement(board: BoardType, position: CellPosition): PlacementValidationResult {
  const { col, row, value } = position

  if (!validateCellIndex(row, col)) {
    throw new Error(`Invalid cell coordinates: (${row}, ${col}). `
      + `Row and column must be integers between 0 and ${SUDOKU_SIZE - 1}.`)
  }

  const original = board[row][col]
  board[row][col] = value

  // Check row constraint first
  if (!isValidRow(board, row)) {
    board[row][col] = original
    return { reason: 'row', valid: false }
  }

  // Check column constraint second
  if (!isValidColumn(board, col)) {
    board[row][col] = original
    return { reason: 'column', valid: false }
  }

  // Check box constraint third
  if (!isValidBox(board, Math.floor(row / 3), Math.floor(col / 3))) {
    board[row][col] = original
    return { reason: 'box', valid: false }
  }

  board[row][col] = original
  return { reason: 'none', valid: true }
}
