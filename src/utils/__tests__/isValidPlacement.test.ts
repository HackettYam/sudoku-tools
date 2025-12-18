import { describe, expect, it } from 'vitest'

import { SUDOKU_BASE_BOARD } from '@/constants'

import { cloneBoard } from '../cloneBoard'
import { isValidPlacement } from '../isValidPlacement'

// eslint-disable-next-line max-lines-per-function
describe('isValidPlacement', () => {
  it('should return true for valid placement in empty cell', () => {
    const board: number[][] = [
      [
        0,
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        9,
      ],
      [
        4,
        5,
        6,
        7,
        8,
        9,
        1,
        2,
        3,
      ],
      [
        7,
        8,
        9,
        1,
        2,
        3,
        4,
        5,
        6,
      ],
      [
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        1,
      ],
      [
        5,
        6,
        7,
        8,
        9,
        1,
        2,
        3,
        4,
      ],
      [
        8,
        9,
        1,
        2,
        3,
        4,
        5,
        6,
        7,
      ],
      [
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        1,
        2,
      ],
      [
        6,
        7,
        8,
        9,
        1,
        2,
        3,
        4,
        5,
      ],
      [
        9,
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        8,
      ],
    ]

    const result = isValidPlacement(board, { col: 0, row: 0, value: 1 })

    expect(result).toBe(true)
  })

  it('should return false for duplicate in row', () => {
    const board = cloneBoard(SUDOKU_BASE_BOARD)
    board[0][0] = 0
    const [ [, existingValue] ] = [board[0]]

    const result = isValidPlacement(board, { col: 0, row: 0, value: existingValue })

    expect(result).toBe(false)
  })

  it('should return false for duplicate in column', () => {
    const board = cloneBoard(SUDOKU_BASE_BOARD)
    board[0][0] = 0
    const [ [existingValue] ] = board.slice(1)

    const result = isValidPlacement(board, { col: 0, row: 0, value: existingValue })

    expect(result).toBe(false)
  })

  it('should return false for duplicate in box', () => {
    const board = cloneBoard(SUDOKU_BASE_BOARD)
    board[0][0] = 0
    const [, [, existingValue] ] = board

    const result = isValidPlacement(board, { col: 0, row: 0, value: existingValue })

    expect(result).toBe(false)
  })

  it('should not modify the original board', () => {
    const board = cloneBoard(SUDOKU_BASE_BOARD)
    board[0][0] = 0
    const [ [originalValue] ] = board

    isValidPlacement(board, { col: 0, row: 0, value: 5 })

    expect(board[0][0]).toBe(originalValue)
  })

  it('should return true when placing valid value', () => {
    const board: number[][] = [
      [
        0,
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        9,
      ],
      [
        4,
        5,
        6,
        7,
        8,
        9,
        1,
        2,
        3,
      ],
      [
        7,
        8,
        9,
        1,
        2,
        3,
        4,
        5,
        6,
      ],
      [
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        1,
      ],
      [
        5,
        6,
        7,
        8,
        9,
        1,
        2,
        3,
        4,
      ],
      [
        8,
        9,
        1,
        2,
        3,
        4,
        5,
        6,
        7,
      ],
      [
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        1,
        2,
      ],
      [
        6,
        7,
        8,
        9,
        1,
        2,
        3,
        4,
        5,
      ],
      [
        9,
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        8,
      ],
    ]

    const result = isValidPlacement(board, { col: 0, row: 0, value: 1 })

    expect(result).toBe(true)
  })
})
