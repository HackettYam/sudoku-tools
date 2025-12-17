import { describe, expect, it } from 'vitest'

import { SUDOKU_BASE_BOARD } from '@/constants'
import type { BoardType } from '@/models'

import { cloneBoard } from './cloneBoard'
import { isValidPuzzle } from './isValidPuzzle'

describe('isValidPuzzle', () => {
  it('should return true for a valid complete board', () => {
    const board = cloneBoard(SUDOKU_BASE_BOARD)

    expect(isValidPuzzle(board)).toBe(true)
  })

  it('should return true for a valid partial board', () => {
    const board = cloneBoard(SUDOKU_BASE_BOARD)
    board[0][0] = 0
    board[1][1] = 0
    board[2][2] = 0

    expect(isValidPuzzle(board)).toBe(true)
  })

  it('should return false for duplicate in row', () => {
    const board = cloneBoard(SUDOKU_BASE_BOARD)
    board[0][0] = 2

    expect(isValidPuzzle(board)).toBe(false)
  })

  it('should return false for duplicate in column', () => {
    const board = cloneBoard(SUDOKU_BASE_BOARD)
    board[0][0] = 4

    expect(isValidPuzzle(board)).toBe(false)
  })

  it('should return false for duplicate in 3x3 box', () => {
    const board = cloneBoard(SUDOKU_BASE_BOARD)
    board[0][0] = 5

    expect(isValidPuzzle(board)).toBe(false)
  })

  it('should return true for empty board', () => {
    const board: BoardType = Array.from(
      { length: 9 },
      () => Array<number>(9).fill(0),
    )

    expect(isValidPuzzle(board)).toBe(true)
  })

  it('should ignore empty cells (0) during validation', () => {
    const board = cloneBoard(SUDOKU_BASE_BOARD)
    board[0][0] = 0
    board[0][8] = 0

    expect(isValidPuzzle(board)).toBe(true)
  })

  it('should detect invalid board with same value in different boxes but same row', () => {
    const board = cloneBoard(SUDOKU_BASE_BOARD)
    board[0][3] = 1

    expect(isValidPuzzle(board)).toBe(false)
  })
})
