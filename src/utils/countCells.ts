import { SUDOKU_EMPTY_CELL, SUDOKU_SIZE } from '../constants/sudoku.constants'
import type { BoardType } from '../models/board.model'

/**
 * Counts the number of filled (non-empty) cells in a Sudoku board.
 *
 * @param board - The Sudoku board to count filled cells from
 * @returns The number of cells that are not empty (value !== 0)
 */
export function countFilledCells(board: BoardType): number {
  let count = 0

  for (let r = 0; r < SUDOKU_SIZE; r++) {
    for (let c = 0; c < SUDOKU_SIZE; c++) {
      if (board[r][c] !== SUDOKU_EMPTY_CELL) {
        count++
      }
    }
  }

  return count
}

/**
 * Counts the number of empty cells in a Sudoku board.
 *
 * @param board - The Sudoku board to count empty cells from
 * @returns The number of cells that are empty (value === 0)
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

/**
 * Counts the number of valid (correct) cells in a Sudoku board.
 * A cell is valid if it matches the corresponding cell in the solved board.
 * Empty cells are not counted as valid.
 *
 * @param board - The current Sudoku board state
 * @param solved - The solved Sudoku board to compare against
 * @returns The number of cells that match the solution
 */
export function countValidCells(board: BoardType, solved: BoardType): number {
  let count = 0

  for (let r = 0; r < SUDOKU_SIZE; r++) {
    for (let c = 0; c < SUDOKU_SIZE; c++) {
      const value = board[r][c]
      if (value !== SUDOKU_EMPTY_CELL && value === solved[r][c]) {
        count++
      }
    }
  }

  return count
}

/**
 * Counts the number of invalid (incorrect) cells in a Sudoku board.
 * A cell is invalid if it has a value that doesn't match the solved board.
 * Empty cells are not counted as invalid.
 *
 * @param board - The current Sudoku board state
 * @param solved - The solved Sudoku board to compare against
 * @returns The number of cells that don't match the solution
 */
export function countInvalidCells(board: BoardType, solved: BoardType): number {
  let count = 0

  for (let r = 0; r < SUDOKU_SIZE; r++) {
    for (let c = 0; c < SUDOKU_SIZE; c++) {
      const value = board[r][c]
      if (value !== SUDOKU_EMPTY_CELL && value !== solved[r][c]) {
        count++
      }
    }
  }

  return count
}
