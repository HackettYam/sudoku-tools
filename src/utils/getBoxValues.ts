import type { BoardType } from '../models'

/**
 * Collects box values from the board for a given box.
 *
 * @param board - The Sudoku board
 * @param boxRow - Box row index (0-2)
 * @param boxCol - Box column index (0-2)
 * @returns Array of values in the specified 3x3 box
 *
 * @example
 * ```typescript
 * import { getBoxValues } from '@hackettyam/sudoku-tools'
 *
 * const values = getBoxValues(board, 0, 0)
 * console.log(values) // [5, 3, 0, 6, 0, 0, 0, 9, 8]
 * ```
 */
export function getBoxValues(board: BoardType, boxRow: number, boxCol: number): number[] {
  const values: number[] = []
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      values.push(board[(boxRow * 3) + i][(boxCol * 3) + j])
    }
  }
  return values
}
