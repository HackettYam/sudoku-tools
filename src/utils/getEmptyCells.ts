import { SUDOKU_EMPTY_CELL, SUDOKU_SIZE } from '@/constants'
import type { BoardCellType, BoardType } from '@/models'

/**
 * Gets all empty cell positions in a Sudoku board.
 *
 * @param board - The Sudoku board
 * @returns Array of cell positions (row, col) that are empty
 *
 * @example
 * ```typescript
 * import { getEmptyCells, createSudoku } from '@hackettyam/sudoku-tools'
 *
 * const { board } = createSudoku()
 * const emptyCells = getEmptyCells(board)
 *
 * console.log(`${emptyCells.length} cells to fill`)
 * emptyCells.forEach(cell => {
 *   console.log(`Empty at row ${cell.row}, col ${cell.col}`)
 * })
 * ```
 */
export function getEmptyCells(board: BoardType): BoardCellType[] {
  const cells: BoardCellType[] = []

  for (let row = 0; row < SUDOKU_SIZE; row++) {
    for (let col = 0; col < SUDOKU_SIZE; col++) {
      if (board[row][col] === SUDOKU_EMPTY_CELL) {
        cells.push({ col, row })
      }
    }
  }

  return cells
}
