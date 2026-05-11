import { describe, expect, it } from 'vitest'

import { SUDOKU_BASE_BOARD } from '../../constants'
import type { CellValue } from '../../models'
import { cloneBoard } from '../cloneBoard'
import { isValidPlacement } from '../isValidPlacement'

// eslint-disable-next-line max-lines-per-function
describe('isValidPlacement', () => {
  it('should return valid: true for valid placement in empty cell', () => {
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

    expect(result.valid).toBe(true)
    expect(result.reason).toBe('none')
  })

  it('should return valid: false for duplicate in row', () => {
    // Row 0 already has value 5 in SUDOKU_BASE_BOARD, placing another 5 triggers row conflict
    const board = cloneBoard(SUDOKU_BASE_BOARD)
    board[0][0] = 0
    const [, existingValue] = board[0] as [number, number]

    const result = isValidPlacement(board, { col: 0, row: 0, value: existingValue as CellValue })

    expect(result.valid).toBe(false)
    expect(result.reason).toBe('row')
  })

  it('should return valid: false for duplicate in column', () => {
    /*
     * Board where column 0 has two 5s but no row conflicts
     * [0][0] is empty, placing 5 should conflict with [4][0] which is 5
     */
    const board: number[][] = [
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
        5,
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

    const result = isValidPlacement(board, { col: 0, row: 0, value: 5 })

    expect(result.valid).toBe(false)
    expect(result.reason).toBe('column')
  })

  it('should return valid: false for duplicate in box', () => {
    // Board where box (0,0) has a 5 at [1][1], placing 5 at [0][0] should conflict in box only
    const board: number[][] = [
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
        5,
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

    const result = isValidPlacement(board, { col: 0, row: 0, value: 5 })

    expect(result.valid).toBe(false)
    expect(result.reason).toBe('box')
  })

  it('should not modify the original board', () => {
    const board = cloneBoard(SUDOKU_BASE_BOARD)
    board[0][0] = 0
    const [ [originalValue] ] = board

    isValidPlacement(board, { col: 0, row: 0, value: 5 })

    expect(board[0][0]).toBe(originalValue)
  })

  it('should return valid: true when placing valid value', () => {
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

    expect(result.valid).toBe(true)
    expect(result.reason).toBe('none')
  })
})
