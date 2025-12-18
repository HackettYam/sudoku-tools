import { describe, expect, it } from 'vitest'

import { SUDOKU_BASE_BOARD } from '@/constants'

import { cloneBoard } from '../cloneBoard'
import { isValidColumn } from '../isValidColumn'

describe('isValidColumn', () => {
  it('should return true for valid columns in base board', () => {
    const board = cloneBoard(SUDOKU_BASE_BOARD)

    for (let c = 0; c < 9; c++) {
      expect(isValidColumn(board, c)).toBe(true)
    }
  })

  it('should return false for column with duplicate values', () => {
    const board = cloneBoard(SUDOKU_BASE_BOARD)
    board[0][0] = 4

    expect(isValidColumn(board, 0)).toBe(false)
  })

  it('should return true for column with empty cells', () => {
    const board = cloneBoard(SUDOKU_BASE_BOARD)
    board[0][0] = 0
    board[1][0] = 0
    board[2][0] = 0

    expect(isValidColumn(board, 0)).toBe(true)
  })

  it('should ignore empty cells when checking duplicates', () => {
    const board = cloneBoard(SUDOKU_BASE_BOARD)
    board[0][0] = 0
    board[1][0] = 0

    expect(isValidColumn(board, 0)).toBe(true)
  })

  it('should return true for completely empty column', () => {
    const board = cloneBoard(SUDOKU_BASE_BOARD)
    for (let r = 0; r < 9; r++) {
      board[r][0] = 0
    }

    expect(isValidColumn(board, 0)).toBe(true)
  })

  it('should detect duplicate at different positions', () => {
    const board = cloneBoard(SUDOKU_BASE_BOARD)
    board[0][0] = 5
    board[8][0] = 5

    expect(isValidColumn(board, 0)).toBe(false)
  })
})
