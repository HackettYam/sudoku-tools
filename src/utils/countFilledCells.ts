import { SUDOKU_EMPTY_CELL, SUDOKU_SIZE } from '@/constants'
import type { BoardType } from '@/models'

/**
 * Counts the number of filled (non-empty) cells in a Sudoku board.
 *
 * @param board - The Sudoku board to count filled cells from
 * @returns The number of cells that are not empty (value !== 0)
 */
export function countFilledCells(board: BoardType): number {
  let count = 0

  for (let r = 0; r < SUDOKU_SIZE; r++) {
    for (let c = 0; c < SUDOKU_SIZE; c++) {
      if (board[r][c] !== SUDOKU_EMPTY_CELL) {
        count++
      }
    }
  }

  return count
}
