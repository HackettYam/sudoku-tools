import { describe, expect, it } from 'vitest'

import { SUDOKU_BASE_BOARD } from '../../constants'
import { cloneBoard } from '../cloneBoard'
import { isValidRow } from '../isValidRow'

describe('isValidRow', () => {
  it('should return true for valid rows in base board', () => {
    const board = cloneBoard(SUDOKU_BASE_BOARD)

    for (let r = 0; r < 9; r++) {
      expect(isValidRow(board, r)).toBe(true)
    }
  })

  it('should return false for row with duplicate values', () => {
    const board = cloneBoard(SUDOKU_BASE_BOARD)
    const [r, c] = [0, 0]
    board[r][c] = board[r][c + 1]

    expect(isValidRow(board, r)).toBe(false)
  })

  it('should return true for row with empty cells', () => {
    const board = cloneBoard(SUDOKU_BASE_BOARD)
    board[0][0] = 0
    board[0][1] = 0
    board[0][2] = 0

    expect(isValidRow(board, 0)).toBe(true)
  })

  it('should ignore empty cells when checking duplicates', () => {
    const board = cloneBoard(SUDOKU_BASE_BOARD)
    board[0][0] = 0
    board[0][1] = 0

    expect(isValidRow(board, 0)).toBe(true)
  })

  it('should return true for completely empty row', () => {
    const board = cloneBoard(SUDOKU_BASE_BOARD)
    for (let c = 0; c < 9; c++) {
      board[0][c] = 0
    }

    expect(isValidRow(board, 0)).toBe(true)
  })

  it('should detect duplicate at different positions', () => {
    const board = cloneBoard(SUDOKU_BASE_BOARD)
    board[0][0] = 5
    board[0][8] = 5

    expect(isValidRow(board, 0)).toBe(false)
  })
})
