import type { BoardType } from '../models/board.model'

/**
 * Swaps two random rows within the same 3x3 band
 *
 * @param board - The Sudoku board to swap rows within a band
 * @param band - The band index (0-2)
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
