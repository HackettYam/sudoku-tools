import { describe, expect, it } from 'vitest'

import { SUDOKU_BASE_BOARD } from '../../constants'
import { cloneBoard } from '../cloneBoard'
import { countSolutions } from '../countSolutions'

// eslint-disable-next-line max-lines-per-function
describe('countSolutions', () => {
  it('should return 1 for a solved board', () => {
    const board = cloneBoard(SUDOKU_BASE_BOARD)

    const result = countSolutions(board)

    expect(result).toBe(1)
  })

  it('should return 1 for a board with unique solution', () => {
    const board = cloneBoard(SUDOKU_BASE_BOARD)
    board[0][0] = 0

    const result = countSolutions(board)

    expect(result).toBe(1)
  })

  it('should return 2 for a board with multiple solutions', () => {
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

    const result = countSolutions(board)

    expect(result).toBe(2)
  })

  it('should stop counting at 2 solutions', () => {
    const board: number[][] = [
      [
        1,
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

    const result = countSolutions(board)

    expect(result).toBe(2)
  })

  it('should use initial count parameter', () => {
    const board = cloneBoard(SUDOKU_BASE_BOARD)

    const result = countSolutions(board, 1)

    expect(result).toBe(2)
  })
})
