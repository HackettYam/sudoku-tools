import { SUDOKU_EMPTY_CELL, SUDOKU_SIZE } from '@/constants'
import type { BoardType } from '@/models'

import { cloneBoard } from './cloneBoard'
import { isValidBox } from './isValidBox'
import { isValidColumn } from './isValidColumn'
import { isValidPuzzle } from './isValidPuzzle'
import { isValidRow } from './isValidRow'

/**
 * Checks if placing a value at a specific position is valid.
 *
 * @param board - The Sudoku board
 * @param row - Row index
 * @param col - Column index
 * @param value - Value to check (1-9)
 * @returns true if the value can be placed at the position
 */
interface CellPosition {
  col: number
  row: number
  value: number
}

function isValidPlacement(board: BoardType, position: CellPosition): boolean {
  const { col, row, value } = position
  const original = board[row][col]
  board[row][col] = value

  const valid = isValidRow(board, row)
    && isValidColumn(board, col)
    && isValidBox(board, Math.floor(row / 3), Math.floor(col / 3))

  board[row][col] = original

  return valid
}

/**
 * Finds the next empty cell in the board.
 *
 * @param board - The Sudoku board
 * @returns The position of the next empty cell or null if none found
 */
function findEmptyCell(board: BoardType): { col: number, row: number } | null {
  for (let row = 0; row < SUDOKU_SIZE; row++) {
    for (let col = 0; col < SUDOKU_SIZE; col++) {
      if (board[row][col] === SUDOKU_EMPTY_CELL) {
        return { col, row }
      }
    }
  }

  return null
}

/**
 * Internal recursive backtracking solver.
 *
 * @param board - The Sudoku board (mutated during solving)
 * @returns true if solved, false otherwise
 */
function backtrack(board: BoardType): boolean {
  const emptyCell = findEmptyCell(board)

  if (!emptyCell) {
    return true
  }

  const { col, row } = emptyCell

  for (let num = 1; num <= SUDOKU_SIZE; num++) {
    if (isValidPlacement(board, { col, row, value: num })) {
      board[row][col] = num

      if (backtrack(board)) {
        return true
      }

      board[row][col] = SUDOKU_EMPTY_CELL
    }
  }

  return false
}

/**
 * Solves a Sudoku puzzle using backtracking algorithm.
 *
 * @param board - The Sudoku board to solve
 * @returns The solved board or null if no solution exists
 *
 * @example
 * ```typescript
 * import { solvePuzzle, createSudoku } from '@hackettyam/sudoku-tools'
 *
 * const { board } = createSudoku()
 * const solution = solvePuzzle(board)
 *
 * if (solution) {
 *   console.log('Solved:', solution)
 * } else {
 *   console.log('No solution exists')
 * }
 * ```
 */
export function solvePuzzle(board: BoardType): BoardType | null {
  if (!isValidPuzzle(board)) {
    return null
  }

  const boardCopy = cloneBoard(board)

  if (backtrack(boardCopy)) {
    return boardCopy
  }

  return null
}
