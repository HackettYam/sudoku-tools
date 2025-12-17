import { SUDOKU_EMPTY_CELL, SUDOKU_SIZE } from '@/constants'
import type { BoardType, HintResult } from '@/models'

/**
 * Gets a hint by finding an empty cell and returning its correct value from the solution.
 * Returns null if there are no empty cells or all empty cells have incorrect values in solution.
 *
 * @param board - The current Sudoku board state
 * @param solved - The solved Sudoku board
 * @returns An object with row, col, and value of a correct hint, or null if no hint available
 *
 * @example
 * ```typescript
 * import { getHint, createSudoku } from '@hackettyam/sudoku-tools'
 *
 * const { board, solved } = createSudoku()
 * const hint = getHint(board, solved)
 *
 * if (hint) {
 *   console.log(`Hint: Place ${hint.value} at row ${hint.row}, col ${hint.col}`)
 * }
 * ```
 */
export function getHint(board: BoardType, solved: BoardType): HintResult | null {
  for (let row = 0; row < SUDOKU_SIZE; row++) {
    for (let col = 0; col < SUDOKU_SIZE; col++) {
      if (board[row][col] === SUDOKU_EMPTY_CELL) {
        return {
          col,
          row,
          value: solved[row][col],
        }
      }
    }
  }

  return null
}
