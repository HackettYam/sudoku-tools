import { SUDOKU_EMPTY_CELL, SUDOKU_SIZE } from '@/constants'
import type { BoardType } from '@/models'

/**
 * Finds the next empty cell in the board.
 *
 * @param board - The Sudoku board
 * @returns The position of the next empty cell or null if none found
 *
 * @example
 * ```typescript
 * import { findEmptyCell, createSudoku } from '@hackettyam/sudoku-tools'
 *
 * const { board } = createSudoku()
 * const emptyCell = findEmptyCell(board)
 *
 * if (emptyCell) {
 *   console.log(`Empty cell at row ${emptyCell.row}, col ${emptyCell.col}`)
 * }
 * ```
 */
export function findEmptyCell(board: BoardType): { col: number, row: number } | null {
  for (let row = 0; row < SUDOKU_SIZE; row++) {
    for (let col = 0; col < SUDOKU_SIZE; col++) {
      if (board[row][col] === SUDOKU_EMPTY_CELL) {
        return { col, row }
      }
    }
  }

  return null
}
