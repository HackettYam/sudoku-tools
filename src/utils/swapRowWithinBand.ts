import type { BoardType } from '../models/board.model'

/**
 * Swaps two random rows within the same 3x3 band.
 *
 * This mutates the board in place. Used as part of board randomization.
 * A band is a group of 3 consecutive rows (0-2: rows 0-2, 1: rows 3-5, 2: rows 6-8).
 *
 * @param board - The Sudoku board to swap rows within a band (mutated in place)
 * @param band - The band index (0-2)
 *
 * @example
 * ```typescript
 * import { swapRowWithinBand, cloneBoard } from '@hackettyam/sudoku-tools'
 *
 * const board = cloneBoard(SUDOKU_BASE_BOARD)
 * swapRowWithinBand(board, 0)
 * // Randomly swaps two rows from the top band (rows 0-2)
 * ```
 *
 * @see randomizeBoard
 */
export function swapRowWithinBand(board: BoardType, band: number): void {
  const start = band * 3
  const r1 = start + Math.floor(Math.random() * 3)
  let r2 = start + Math.floor(Math.random() * 3)

  while (r2 === r1) {
    r2 = start + Math.floor(Math.random() * 3)
  }

  const temp = board[r1]
  board[r1] = board[r2]
  board[r2] = temp
}
