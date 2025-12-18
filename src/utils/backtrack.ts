import { SUDOKU_EMPTY_CELL, SUDOKU_SIZE } from '@/constants'
import type { BoardType, CellValue } from '@/models'

import { findEmptyCell } from './findEmptyCell'
import { isValidPlacement } from './isValidPlacement'

/**
 * Internal recursive backtracking solver.
 *
 * @param board - The Sudoku board (mutated during solving)
 * @returns true if solved, false otherwise
 *
 * @example
 * ```typescript
 * import { backtrack, cloneBoard, createSudoku } from '@hackettyam/sudoku-tools'
 *
 * const { board } = createSudoku()
 * const boardCopy = cloneBoard(board)
 *
 * if (backtrack(boardCopy)) {
 *   console.log('Solved!', boardCopy)
 * }
 * ```
 */
export function backtrack(board: BoardType): boolean {
  const emptyCell = findEmptyCell(board)

  if (!emptyCell) {
    return true
  }

  const { col, row } = emptyCell

  for (let num = 1; num <= SUDOKU_SIZE; num++) {
    if (isValidPlacement(board, { col, row, value: num as CellValue })) {
      board[row][col] = num

      if (backtrack(board)) {
        return true
      }

      board[row][col] = SUDOKU_EMPTY_CELL
    }
  }

  return false
}
