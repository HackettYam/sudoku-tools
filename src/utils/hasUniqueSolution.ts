import { SUDOKU_EMPTY_CELL, SUDOKU_SIZE } from '@/constants'
import type { BoardType } from '@/models'

import { cloneBoard } from './cloneBoard'
import { isValidBox } from './isValidBox'
import { isValidColumn } from './isValidColumn'
import { isValidPuzzle } from './isValidPuzzle'
import { isValidRow } from './isValidRow'

interface CellPosition {
  col: number
  row: number
  value: number
}

/**
 * Checks if placing a value at a specific position is valid.
 */
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
 * Counts solutions using backtracking, stopping at 2.
 *
 * @param board - The Sudoku board (mutated during solving)
 * @param count - Current solution count
 * @returns Number of solutions found (max 2)
 */
function countSolutions(board: BoardType, count = 0): number {
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

/**
 * Checks if a Sudoku puzzle has exactly one unique solution.
 *
 * @param board - The Sudoku board to check
 * @returns true if the puzzle has exactly one solution, false otherwise
 *
 * @example
 * ```typescript
 * import { hasUniqueSolution, createSudoku } from '@hackettyam/sudoku-tools'
 *
 * const { board } = createSudoku()
 *
 * if (hasUniqueSolution(board)) {
 *   console.log('Puzzle has a unique solution')
 * } else {
 *   console.log('Puzzle has multiple solutions or no solution')
 * }
 * ```
 */
export function hasUniqueSolution(board: BoardType): boolean {
  if (!isValidPuzzle(board)) {
    return false
  }

  const boardCopy = cloneBoard(board)
  const solutions = countSolutions(boardCopy)

  return solutions === 1
}
