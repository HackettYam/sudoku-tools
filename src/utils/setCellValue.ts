import { SUDOKU_SIZE } from '../constants'
import type { BoardType, SetCellOptions } from '../models'
import { cloneBoard } from './cloneBoard'
import { validateCellIndex } from './validateCellIndex'

/**
 * Sets a value in a cell and returns a new board (immutable operation).
 * The original board is not modified.
 *
 * @param board - The Sudoku board
 * @param options - Object with row, col, and value
 * @returns A new board with the value set
 * @throws {Error} If row or col is outside the range 0-8
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

  if (!validateCellIndex(row, col)) {
    throw new Error(`Invalid cell coordinates: (${row}, ${col}). `
      + `Row and column must be integers between 0 and ${SUDOKU_SIZE - 1}.`)
  }

  const newBoard = cloneBoard(board)
  newBoard[row][col] = value

  return newBoard
}
