import { SUDOKU_EMPTY_CELL, SUDOKU_SIZE } from '@/constants'
import type { BoardType } from '@/models'

/**
 * Counts the number of invalid (incorrect) cells in a Sudoku board.
 * A cell is invalid if it has a value that doesn't match the solved board.
 * Empty cells are not counted as invalid.
 *
 * @param board - The current Sudoku board state
 * @param solved - The solved Sudoku board to compare against
 * @returns The number of cells that don't match the solution
 */
export function countInvalidCells(board: BoardType, solved: BoardType): number {
  let count = 0

  for (let r = 0; r < SUDOKU_SIZE; r++) {
    for (let c = 0; c < SUDOKU_SIZE; c++) {
      const value = board[r][c]
      if (value !== SUDOKU_EMPTY_CELL && value !== solved[r][c]) {
        count++
      }
    }
  }

  return count
}
