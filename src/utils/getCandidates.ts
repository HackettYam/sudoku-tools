import { SUDOKU_EMPTY_CELL, SUDOKU_SIZE } from '../constants'
import type { BoardType } from '../models'
import { validateCellIndex } from './validateCellIndex'

/**
 * Gets all valid candidate values for a specific cell in a Sudoku board.
 * Returns an empty array if the cell is already filled.
 *
 * @param board - The Sudoku board
 * @param row - Row index (0-8)
 * @param col - Column index (0-8)
 * @returns Array of valid numbers (1-9) that can be placed in the cell
 * @throws {Error} If row or col is outside the range 0-8
 *
 * @example
 * ```typescript
 * import { getCandidates, createSudoku } from '@hackettyam/sudoku-tools'
 *
 * const { board } = createSudoku()
 * const candidates = getCandidates(board, 0, 0)
 *
 * console.log('Possible values:', candidates) // e.g., [1, 3, 7]
 * ```
 */
// eslint-disable-next-line max-statements
export function getCandidates(board: BoardType, row: number, col: number): number[] {
  if (!validateCellIndex(row, col)) {
    const msg = `Invalid cell coordinates: (${row}, ${col}). `
      + `Row and column must be integers between 0 and ${SUDOKU_SIZE - 1}.`

    throw new Error(msg)
  }

  if (board[row][col] !== SUDOKU_EMPTY_CELL) {
    return []
  }

  const used = new Set<number>()

  for (let c = 0; c < SUDOKU_SIZE; c++) {
    if (board[row][c] !== SUDOKU_EMPTY_CELL) {
      used.add(board[row][c])
    }
  }

  for (let r = 0; r < SUDOKU_SIZE; r++) {
    if (board[r][col] !== SUDOKU_EMPTY_CELL) {
      used.add(board[r][col])
    }
  }

  const boxRow = Math.floor(row / 3) * 3
  const boxCol = Math.floor(col / 3) * 3

  for (let r = boxRow; r < boxRow + 3; r++) {
    for (let c = boxCol; c < boxCol + 3; c++) {
      if (board[r][c] !== SUDOKU_EMPTY_CELL) {
        used.add(board[r][c])
      }
    }
  }

  const candidates: number[] = []

  for (let num = 1; num <= SUDOKU_SIZE; num++) {
    if (!used.has(num)) {
      candidates.push(num)
    }
  }

  return candidates
}
