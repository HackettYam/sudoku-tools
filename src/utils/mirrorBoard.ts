import { SUDOKU_SIZE } from '@/constants'
import type { BoardType } from '@/models'

/**
 * Mirror direction options
 */
export type MirrorDirection = 'horizontal' | 'vertical'

/**
 * Mirrors a Sudoku board horizontally or vertically.
 *
 * @param board - The Sudoku board to mirror
 * @param direction - Mirror direction: 'horizontal' (flip left-right) or 'vertical' (flip top-bottom)
 * @returns A new mirrored board
 *
 * @example
 * ```typescript
 * import { mirrorBoard, SUDOKU_BASE_BOARD } from '@hackettyam/sudoku-tools'
 *
 * const horizontalMirror = mirrorBoard(SUDOKU_BASE_BOARD, 'horizontal')
 * const verticalMirror = mirrorBoard(SUDOKU_BASE_BOARD, 'vertical')
 * ```
 */
export function mirrorBoard(board: BoardType, direction: MirrorDirection): BoardType {
  const result: BoardType = []

  if (direction === 'horizontal') {
    for (let row = 0; row < SUDOKU_SIZE; row++) {
      result.push([...board[row]].reverse())
    }
  } else {
    for (let row = SUDOKU_SIZE - 1; row >= 0; row--) {
      result.push([...board[row]])
    }
  }

  return result
}
