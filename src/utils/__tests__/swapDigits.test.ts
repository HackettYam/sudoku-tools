import { describe, expect, it } from 'vitest'

import { SUDOKU_BASE_BOARD } from '@/constants'

import { cloneBoard } from '../cloneBoard'
import { swapDigits } from '../swapDigits'

describe('swapDigits', () => {
  it('should swap all occurrences of two digits', () => {
    const board = cloneBoard(SUDOKU_BASE_BOARD)

    swapDigits(board, 1, 9)

    expect(board[0][0]).toBe(9)
    expect(board[0][8]).toBe(1)
    expect(board[8][0]).toBe(1)
  })

  it('should swap digits correctly in a full 9x9 board', () => {
    const board = cloneBoard(SUDOKU_BASE_BOARD)

    swapDigits(board, 1, 2)

    let countOf1 = 0
    let countOf2 = 0

    for (let r = 0; r < 9; r++) {
      for (let c = 0; c < 9; c++) {
        if (board[r][c] === 1) countOf1++
        if (board[r][c] === 2) countOf2++
      }
    }

    expect(countOf1).toBe(9)
    expect(countOf2).toBe(9)
  })

  it('should not change other digits', () => {
    const board = cloneBoard(SUDOKU_BASE_BOARD)

    swapDigits(board, 1, 9)

    expect(board[0][1]).toBe(2)
    expect(board[0][2]).toBe(3)
    expect(board[1][0]).toBe(4)
    expect(board[1][1]).toBe(5)
    expect(board[1][2]).toBe(6)
    expect(board[2][0]).toBe(7)
    expect(board[2][1]).toBe(8)
  })

  it('should handle swapping same digit (no change)', () => {
    const board = cloneBoard(SUDOKU_BASE_BOARD)
    const originalBoard = cloneBoard(board)

    swapDigits(board, 5, 5)

    expect(board).toEqual(originalBoard)
  })

  it('should handle board with zeros (empty cells)', () => {
    const board = cloneBoard(SUDOKU_BASE_BOARD)
    board[0][1] = 0
    board[1][0] = 0

    swapDigits(board, 1, 9)

    expect(board[0][0]).toBe(9)
    expect(board[0][1]).toBe(0)
    expect(board[0][8]).toBe(1)
  })
})
