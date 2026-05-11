import { SUDOKU_SIZE } from '../constants/sudoku.constants'
import type { BoardType } from '../models/board.model'

/**
 * Swaps all occurrences of two digits in the board (permutation of digits).
 *
 * This mutates the board in place, replacing all instances of d1 with d2
 * and all instances of d2 with d1. Used as part of board randomization.
 *
 * @param board - The Sudoku board to swap digits in (mutated in place)
 * @param d1 - The first digit to swap (1-9)
 * @param d2 - The second digit to swap (1-9)
 *
 * @example
 * ```typescript
 * import { swapDigits, cloneBoard } from '@hackettyam/sudoku-tools'
 *
 * const board = cloneBoard(SUDOKU_BASE_BOARD)
 * swapDigits(board, 1, 9)
 * // All 1s are now 9s, all 9s are now 1s
 * ```
 *
 * @see randomizeBoard
 */
export function swapDigits(board: BoardType, d1: number, d2: number): void {
  for (let r = 0; r < SUDOKU_SIZE; r++) {
    for (let c = 0; c < SUDOKU_SIZE; c++) {
      if (board[r][c] === d1) {
        board[r][c] = d2
      } else if (board[r][c] === d2) {
        board[r][c] = d1
      }
    }
  }
}
