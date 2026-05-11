import { SUDOKU_SIZE } from '../constants'
import type { BoardType } from '../models'

/**
 * Collects column values from the board.
 *
 * @param board - The Sudoku board
 * @param col - Column index (0-8)
 * @returns Array of values in the specified column
 *
 * @example
 * ```typescript
 * import { getColumnValues } from '@hackettyam/sudoku-tools'
 *
 * const values = getColumnValues(board, 0)
 * console.log(values) // [5, 6, 7, 2, 5, 8, 3, 6, 9]
 * ```
 */
export function getColumnValues(board: BoardType, col: number): number[] {
  const values: number[] = []
  for (let row = 0; row < SUDOKU_SIZE; row++) {
    values.push(board[row][col])
  }
  return values
}
