import type { BoardType } from '../models/board.model'
import { SUDOKU_SIZE } from '../constants/sudoku.constants'

/**
 * Swaps two random columns within the same 3x3 stack
 */
export function swapColWithinStack (board: BoardType, stack: number): void {
  const start = stack * 3
  const c1 = start + Math.floor(Math.random() * 3)
  let c2 = start + Math.floor(Math.random() * 3)

  while (c2 === c1) {
    c2 = start + Math.floor(Math.random() * 3)
  }

  for (let r = 0; r < SUDOKU_SIZE; r++) {
    const temp = board[r][c1]
    board[r][c1] = board[r][c2]
    board[r][c2] = temp
  }
}
