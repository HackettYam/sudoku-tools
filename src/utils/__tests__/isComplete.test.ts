import { describe, expect, it } from 'vitest'

import { SUDOKU_BASE_BOARD, SUDOKU_EMPTY_CELL } from '../../constants'
import { cloneBoard } from '../cloneBoard'
import { isComplete } from '../isComplete'

describe('isComplete', () => {
  it('should return true for a complete valid board', () => {
    const board = cloneBoard(SUDOKU_BASE_BOARD)

    expect(isComplete(board)).toBe(true)
  })

  it('should return false for board with empty cells', () => {
    const board = cloneBoard(SUDOKU_BASE_BOARD)
    board[0][0] = SUDOKU_EMPTY_CELL

    expect(isComplete(board)).toBe(false)
  })

  it('should return false for board with many empty cells', () => {
    const board = cloneBoard(SUDOKU_BASE_BOARD)

    for (let i = 0; i < 20; i++) {
      const r = Math.floor(i / 9)
      const c = i % 9
      board[r][c] = SUDOKU_EMPTY_CELL
    }

    expect(isComplete(board)).toBe(false)
  })

  it('should return false for filled but invalid board', () => {
    const board = cloneBoard(SUDOKU_BASE_BOARD)
    board[0][0] = 2

    expect(isComplete(board)).toBe(false)
  })
})
