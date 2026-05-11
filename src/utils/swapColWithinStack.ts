import { SUDOKU_SIZE } from '../constants/sudoku.constants'
import type { BoardType } from '../models/board.model'

/**
 * Swaps two random columns within the same 3x3 stack.
 *
 * This mutates the board in place. Used as part of board randomization.
 * A stack is a group of 3 consecutive columns (0: cols 0-2, 1: cols 3-5, 2: cols 6-8).
 *
 * @param board - The Sudoku board to swap columns within a stack (mutated in place)
 * @param stack - The stack index (0-2)
 *
 * @example
 * ```typescript
 * import { swapColWithinStack, cloneBoard } from '@hackettyam/sudoku-tools'
 *
 * const board = cloneBoard(SUDOKU_BASE_BOARD)
 * swapColWithinStack(board, 2)
 * // Randomly swaps two columns from the right stack (cols 6-8)
 * ```
 *
 * @see randomizeBoard
 */
export function swapColWithinStack(board: BoardType, stack: number): void {
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
