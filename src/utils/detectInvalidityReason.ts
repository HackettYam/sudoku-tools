import type { BoardType } from '../models'
import { checkGroup } from './checkGroup'
import { getBoxValues } from './getBoxValues'
import { getColumnValues } from './getColumnValues'
import { SUDOKU_SIZE } from '../constants'

/**
 * Detects the specific reason why a Sudoku board is invalid.
 *
 * Checks for duplicate values in rows, columns, and 3x3 boxes
 * to identify the constraint violation that makes the board unsolvable.
 *
 * @param board - The Sudoku board to analyze
 * @returns A string describing why the board is invalid,
 *   or null if no specific reason is found
 *
 * @example
 * ```typescript
 * import { detectInvalidityReason } from '@hackettyam/sudoku-tools'
 *
 * const board: number[][] = [
 *   [5, 5, 0, 0, 0, 0, 0, 0, 0],
 *   [0, 0, 0, 0, 0, 0, 0, 0, 0],
 * ]
 *
 * const reason = detectInvalidityReason(board)
 * console.log(reason) // "duplicate found in row 0"
 * ```
 *
 * @see solvePuzzle
 */
export function detectInvalidityReason(board: BoardType): string | null {
  for (let row = 0; row < SUDOKU_SIZE; row++) {
    if (!board[row] || board[row].length < SUDOKU_SIZE) {
      return `invalid board size`
    }
    const label = checkGroup(board[row], `duplicate found in row ${row}`)
    if (label) {
      return label
    }
  }

  for (let col = 0; col < SUDOKU_SIZE; col++) {
    const label = checkGroup(
      getColumnValues(board, col),
      `duplicate found in column ${col}`,
    )
    if (label) {
      return label
    }
  }

  for (let boxRow = 0; boxRow < 3; boxRow++) {
    for (let boxCol = 0; boxCol < 3; boxCol++) {
      const label = checkGroup(
        getBoxValues(board, boxRow, boxCol),
        `duplicate found in box (${boxRow},${boxCol})`,
      )
      if (label) {
        return label
      }
    }
  }

  return null
}
