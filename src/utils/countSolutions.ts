import { SUDOKU_EMPTY_CELL, SUDOKU_SIZE } from '@/constants'
import type { BoardType } from '@/models'

import { findEmptyCell } from './findEmptyCell'
import { isValidPlacement } from './isValidPlacement'

/**
 * Counts solutions using backtracking, stopping at 2.
 *
 * @param board - The Sudoku board (mutated during solving)
 * @param count - Current solution count
 * @returns Number of solutions found (max 2)
 *
 * @example
 * ```typescript
 * import { countSolutions, cloneBoard, createSudoku } from '@hackettyam/sudoku-tools'
 *
 * const { board } = createSudoku()
 * const boardCopy = cloneBoard(board)
 * const solutions = countSolutions(boardCopy)
 *
 * console.log(solutions) // 1 for unique solution
 * ```
 */
export function countSolutions(board: BoardType, count = 0): number {
  if (count >= 2) return count

  const emptyCell = findEmptyCell(board)

  if (!emptyCell) {
    return count + 1
  }

  const { col, row } = emptyCell
  let currentCount = count

  for (let num = 1; num <= SUDOKU_SIZE; num++) {
    if (isValidPlacement(board, { col, row, value: num })) {
      board[row][col] = num
      currentCount = countSolutions(board, currentCount)

      if (currentCount >= 2) {
        board[row][col] = SUDOKU_EMPTY_CELL

        return currentCount
      }

      board[row][col] = SUDOKU_EMPTY_CELL
    }
  }

  return currentCount
}
