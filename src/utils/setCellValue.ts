import type { BoardType } from '@/models'

import { cloneBoard } from './cloneBoard'

/**
 * Cell update options for setCellValue
 */
export interface SetCellOptions {
  /** Column index (0-8) */
  col: number

  /** Row index (0-8) */
  row: number

  /** Value to set (1-9 or 0 for empty) */
  value: number
}

/**
 * Sets a value in a cell and returns a new board (immutable operation).
 * The original board is not modified.
 *
 * @param board - The Sudoku board
 * @param options - Object with row, col, and value
 * @returns A new board with the value set
 *
 * @example
 * ```typescript
 * import { setCellValue, createSudoku } from '@hackettyam/sudoku-tools'
 *
 * const { board } = createSudoku()
 * const newBoard = setCellValue(board, { row: 0, col: 0, value: 5 })
 *
 * console.log(board[0][0])    // original value (unchanged)
 * console.log(newBoard[0][0]) // 5
 * ```
 */
export function setCellValue(board: BoardType, options: SetCellOptions): BoardType {
  const { col, row, value } = options
  const newBoard = cloneBoard(board)
  newBoard[row][col] = value

  return newBoard
}
