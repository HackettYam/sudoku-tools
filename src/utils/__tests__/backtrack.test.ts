import { describe, expect, it } from 'vitest'

import { SUDOKU_BASE_BOARD } from '@/constants'

import { backtrack } from '../backtrack'
import { cloneBoard } from '../cloneBoard'
import { isValidPuzzle } from '../isValidPuzzle'

describe('backtrack', () => {
  it('should return true for already solved board', () => {
    const board = cloneBoard(SUDOKU_BASE_BOARD)

    const result = backtrack(board)

    expect(result).toBe(true)
  })

  it('should solve a board with one empty cell', () => {
    const board = cloneBoard(SUDOKU_BASE_BOARD)
    const [ [originalValue] ] = board
    board[0][0] = 0

    const result = backtrack(board)

    expect(result).toBe(true)
    expect(board[0][0]).toBe(originalValue)
  })

  it('should solve a board with multiple empty cells', () => {
    const board = cloneBoard(SUDOKU_BASE_BOARD)
    board[0][0] = 0
    board[1][1] = 0
    board[2][2] = 0

    const result = backtrack(board)

    expect(result).toBe(true)
    expect(isValidPuzzle(board)).toBe(true)
  })

  it('should return false for unsolvable board', () => {
    const board: number[][] = [
      [
        1,
        1,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
      ],
      [
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
      ],
      [
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
      ],
      [
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
      ],
      [
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
      ],
      [
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
      ],
      [
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
      ],
      [
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
      ],
      [
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
      ],
    ]

    const result = backtrack(board)

    expect(result).toBe(false)
  })

  it('should mutate the board when solving', () => {
    const board = cloneBoard(SUDOKU_BASE_BOARD)
    board[4][4] = 0

    backtrack(board)

    expect(board[4][4]).not.toBe(0)
  })
})
