import { SUDOKU_SIZE } from '../constants'
import type { BoardType } from '../models'

/**
 * Rotates a Sudoku board 90 degrees clockwise.
 * The rotation is performed the specified number of times (default: 1).
 *
 * @param board - The Sudoku board to rotate
 * @param times - Number of 90-degree clockwise rotations (default: 1)
 * @returns A new rotated board
 *
 * @example
 * ```typescript
 * import { rotateBoard, SUDOKU_BASE_BOARD } from '@hackettyam/sudoku-tools'
 *
 * const rotated90 = rotateBoard(SUDOKU_BASE_BOARD)      // 90° clockwise
 * const rotated180 = rotateBoard(SUDOKU_BASE_BOARD, 2)  // 180°
 * const rotated270 = rotateBoard(SUDOKU_BASE_BOARD, 3)  // 270° (or 90° counter-clockwise)
 * ```
 */
export function rotateBoard(board: BoardType, times = 1): BoardType {
  const normalizedTimes = ((times % 4) + 4) % 4

  let result = board.map(row => [...row])

  for (let t = 0; t < normalizedTimes; t++) {
    const rotated: BoardType = []

    for (let col = 0; col < SUDOKU_SIZE; col++) {
      const newRow: number[] = []

      for (let row = SUDOKU_SIZE - 1; row >= 0; row--) {
        newRow.push(result[row][col])
      }

      rotated.push(newRow)
    }

    result = rotated
  }

  return result
}
