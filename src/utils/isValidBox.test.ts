import { describe, expect, it } from 'vitest'

import { SUDOKU_BASE_BOARD } from '@/constants'

import { cloneBoard } from './cloneBoard'
import { isValidBox } from './isValidBox'

describe('isValidBox', () => {
  it('should return true for all valid boxes in base board', () => {
    const board = cloneBoard(SUDOKU_BASE_BOARD)

    for (let boxRow = 0; boxRow < 3; boxRow++) {
      for (let boxCol = 0; boxCol < 3; boxCol++) {
        expect(isValidBox(board, boxRow, boxCol)).toBe(true)
      }
    }
  })

  it('should return false for box with duplicate values', () => {
    const board = cloneBoard(SUDOKU_BASE_BOARD)
    board[0][0] = 5

    expect(isValidBox(board, 0, 0)).toBe(false)
  })

  it('should return true for box with empty cells', () => {
    const board = cloneBoard(SUDOKU_BASE_BOARD)
    board[0][0] = 0
    board[1][1] = 0
    board[2][2] = 0

    expect(isValidBox(board, 0, 0)).toBe(true)
  })

  it('should ignore empty cells when checking duplicates', () => {
    const board = cloneBoard(SUDOKU_BASE_BOARD)
    board[0][0] = 0
    board[1][1] = 0

    expect(isValidBox(board, 0, 0)).toBe(true)
  })

  it('should return true for completely empty box', () => {
    const board = cloneBoard(SUDOKU_BASE_BOARD)
    for (let r = 0; r < 3; r++) {
      for (let c = 0; c < 3; c++) {
        board[r][c] = 0
      }
    }

    expect(isValidBox(board, 0, 0)).toBe(true)
  })

  it('should validate middle box correctly', () => {
    const board = cloneBoard(SUDOKU_BASE_BOARD)

    expect(isValidBox(board, 1, 1)).toBe(true)

    board[3][3] = 9
    expect(isValidBox(board, 1, 1)).toBe(false)
  })

  it('should validate bottom-right box correctly', () => {
    const board = cloneBoard(SUDOKU_BASE_BOARD)

    expect(isValidBox(board, 2, 2)).toBe(true)

    board[6][6] = 4
    expect(isValidBox(board, 2, 2)).toBe(false)
  })

  it('should not affect other boxes when one is invalid', () => {
    const board = cloneBoard(SUDOKU_BASE_BOARD)
    board[0][0] = 5

    expect(isValidBox(board, 0, 0)).toBe(false)
    expect(isValidBox(board, 0, 1)).toBe(true)
    expect(isValidBox(board, 1, 0)).toBe(true)
  })
})
