import { SUDOKU_EMPTY_CELL, SUDOKU_SIZE } from '../constants/sudoku.constants'
import type { BoardType } from '../models/board.model'

/**
 * Validates if a row in a Sudoku board contains digits 1-9 without repetition.
 *
 * @param board - The Sudoku board to validate
 * @param row - The row index to validate
 * @returns true if the row is valid, false otherwise
 */
export function isValidRow(board: BoardType, row: number): boolean {
  const seen = new Set<number>()
  for (let c = 0; c < SUDOKU_SIZE; c++) {
    const val = board[row][c]
    if (val !== SUDOKU_EMPTY_CELL) {
      if (seen.has(val)) return false
      seen.add(val)
    }
  }
  return true
}

/**
 * Validates if a column in a Sudoku board contains digits 1-9 without repetition.
 *
 * @param board - The Sudoku board to validate
 * @param col - The column index to validate
 * @returns true if the column is valid, false otherwise
 */
export function isValidColumn(board: BoardType, col: number): boolean {
  const seen = new Set<number>()
  for (let r = 0; r < SUDOKU_SIZE; r++) {
    const val = board[r][col]
    if (val !== SUDOKU_EMPTY_CELL) {
      if (seen.has(val)) return false
      seen.add(val)
    }
  }
  return true
}

/**
 * Validates if a 3x3 box in a Sudoku board contains digits 1-9 without repetition.
 *
 * @param board - The Sudoku board to validate
 * @param boxRow - The row index of the box to validate
 * @param boxCol - The column index of the box to validate
 * @returns true if the box is valid, false otherwise
 */
export function isValidBox(board: BoardType, boxRow: number, boxCol: number): boolean {
  const seen = new Set<number>()
  const startRow = boxRow * 3
  const startCol = boxCol * 3

  for (let r = startRow; r < startRow + 3; r++) {
    for (let c = startCol; c < startCol + 3; c++) {
      const val = board[r][c]
      if (val !== SUDOKU_EMPTY_CELL) {
        if (seen.has(val)) return false
        seen.add(val)
      }
    }
  }
  return true
}

/**
 * Validates if a Sudoku board follows all Sudoku rules:
 * - Each row contains digits 1-9 without repetition
 * - Each column contains digits 1-9 without repetition
 * - Each 3x3 box contains digits 1-9 without repetition
 *
 * Empty cells (value 0) are ignored during validation.
 *
 * @param board - The Sudoku board to validate
 * @returns true if the board is valid, false otherwise
 */
export function isValidSudoku(board: BoardType): boolean {
  for (let i = 0; i < SUDOKU_SIZE; i++) {
    if (!isValidRow(board, i)) return false
    if (!isValidColumn(board, i)) return false
  }

  for (let boxRow = 0; boxRow < 3; boxRow++) {
    for (let boxCol = 0; boxCol < 3; boxCol++) {
      if (!isValidBox(board, boxRow, boxCol)) return false
    }
  }

  return true
}
