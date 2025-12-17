import { SUDOKU_SIZE } from '../constants/sudoku.constants'
import type { BoardType } from '../models/board.model'

/**
 * Swaps all occurrences of two digits in the board (permutation of digits)
 *
 * @param board - The Sudoku board to swap digits in
 * @param d1 - The first digit to swap
 * @param d2 - The second digit to swap
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
