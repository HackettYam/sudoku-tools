import { SUDOKU_EMPTY_CELL } from '../constants'
import type { BoardType } from '../models'
import { cloneBoard } from './cloneBoard'

/**
 * Clears a cell (sets it to empty) and returns a new board (immutable operation).
 * The original board is not modified.
 *
 * @param board - The Sudoku board
 * @param row - Row index (0-8)
 * @param col - Column index (0-8)
 * @returns A new board with the cell cleared
 *
 * @example
 * ```typescript
 * import { clearCell, createSudoku } from '@hackettyam/sudoku-tools'
 *
 * const { solved } = createSudoku()
 * const newBoard = clearCell(solved, 0, 0)
 *
 * console.log(solved[0][0])   // original value (unchanged)
 * console.log(newBoard[0][0]) // 0 (empty)
 * ```
 */
export function clearCell(board: BoardType, row: number, col: number): BoardType {
  const newBoard = cloneBoard(board)
  newBoard[row][col] = SUDOKU_EMPTY_CELL

  return newBoard
}
