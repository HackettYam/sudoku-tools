import { SUDOKU_EMPTY_CELL, SUDOKU_SIZE } from '@/constants'
import type { BoardCellType, BoardType } from '@/models'

/**
 * Gets all cell positions that have incorrect values compared to the solution.
 * Only checks filled cells (empty cells are not considered invalid).
 *
 * @param board - The current Sudoku board state
 * @param solved - The solved Sudoku board
 * @returns Array of cell positions (row, col) that have incorrect values
 *
 * @example
 * ```typescript
 * import { getInvalidCells, createSudoku, cloneBoard } from '@hackettyam/sudoku-tools'
 *
 * const { board, solved } = createSudoku()
 * const playerBoard = cloneBoard(board)
 *
 * // Player fills wrong value
 * playerBoard[0][0] = solved[0][0] === 1 ? 2 : 1
 *
 * const invalidCells = getInvalidCells(playerBoard, solved)
 * console.log(`${invalidCells.length} incorrect cells`)
 * ```
 */
export function getInvalidCells(board: BoardType, solved: BoardType): BoardCellType[] {
  const cells: BoardCellType[] = []

  for (let row = 0; row < SUDOKU_SIZE; row++) {
    for (let col = 0; col < SUDOKU_SIZE; col++) {
      const value = board[row][col]

      if (value !== SUDOKU_EMPTY_CELL && value !== solved[row][col]) {
        cells.push({ col, row })
      }
    }
  }

  return cells
}
