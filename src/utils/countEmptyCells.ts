import { SUDOKU_EMPTY_CELL, SUDOKU_SIZE } from '../constants'
import type { BoardType } from '../models'

/**
 * Counts the number of empty cells in a Sudoku board.
 *
 * @param board - The Sudoku board to count empty cells from
 * @returns The number of cells that are empty (value === 0)
 *
 * @example
 * ```typescript
 * import { countEmptyCells, createSudoku } from '@hackettyam/sudoku-tools'
 *
 * const { board } = createSudoku()
 * const empty = countEmptyCells(board)
 *
 * console.log(`Puzzle has ${empty} empty cells`)
 * ```
 */
export function countEmptyCells(board: BoardType): number {
  let count = 0

  for (let r = 0; r < SUDOKU_SIZE; r++) {
    for (let c = 0; c < SUDOKU_SIZE; c++) {
      if (board[r][c] === SUDOKU_EMPTY_CELL) {
        count++
      }
    }
  }

  return count
}
