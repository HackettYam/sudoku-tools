import { SUDOKU_SIZE } from '@/constants'
import type { BoardType } from '@/models'

/**
 * Serializes a Sudoku board to a string of 81 characters.
 * Each character represents a cell value (0-9).
 *
 * @param board - The Sudoku board to serialize
 * @returns A string of 81 characters representing the board
 *
 * @example
 * ```typescript
 * import { serializeBoard, SUDOKU_BASE_BOARD } from '@hackettyam/sudoku-tools'
 *
 * const serialized = serializeBoard(SUDOKU_BASE_BOARD)
 * console.log(serialized) // "123456789456789123789123456..."
 * console.log(serialized.length) // 81
 * ```
 */
export function serializeBoard(board: BoardType): string {
  let result = ''

  for (let row = 0; row < SUDOKU_SIZE; row++) {
    for (let col = 0; col < SUDOKU_SIZE; col++) {
      result += board[row][col].toString()
    }
  }

  return result
}
