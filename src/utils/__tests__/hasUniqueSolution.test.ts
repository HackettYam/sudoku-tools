import { describe, expect, it } from 'vitest'

import { SUDOKU_BASE_BOARD, SUDOKU_EMPTY_CELL } from '@/constants'

import { cloneBoard } from '../cloneBoard'
import { hasUniqueSolution } from '../hasUniqueSolution'

describe('hasUniqueSolution', () => {
  it('should return true for a board with one empty cell', () => {
    const board = cloneBoard(SUDOKU_BASE_BOARD)
    board[0][0] = SUDOKU_EMPTY_CELL

    expect(hasUniqueSolution(board)).toBe(true)
  })

  it('should return true for a solved board', () => {
    const board = cloneBoard(SUDOKU_BASE_BOARD)

    expect(hasUniqueSolution(board)).toBe(true)
  })

  it('should return true for a puzzle with few empty cells', () => {
    const board = cloneBoard(SUDOKU_BASE_BOARD)
    board[0][0] = SUDOKU_EMPTY_CELL
    board[0][1] = SUDOKU_EMPTY_CELL
    board[1][0] = SUDOKU_EMPTY_CELL

    expect(hasUniqueSolution(board)).toBe(true)
  })

  it('should return false for a board with multiple solutions', () => {
    const board = cloneBoard(SUDOKU_BASE_BOARD)

    for (let r = 0; r < 9; r++) {
      for (let c = 0; c < 9; c++) {
        board[r][c] = SUDOKU_EMPTY_CELL
      }
    }

    expect(hasUniqueSolution(board)).toBe(false)
  })

  it('should return false for an invalid board', () => {
    const board = cloneBoard(SUDOKU_BASE_BOARD)
    board[0][0] = 1
    board[0][1] = 1

    expect(hasUniqueSolution(board)).toBe(false)
  })

  it('should not modify the original board', () => {
    const board = cloneBoard(SUDOKU_BASE_BOARD)
    board[0][0] = SUDOKU_EMPTY_CELL
    const originalBoard = cloneBoard(board)

    hasUniqueSolution(board)

    expect(board).toEqual(originalBoard)
  })
})
