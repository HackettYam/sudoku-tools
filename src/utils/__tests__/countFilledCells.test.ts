import { describe, expect, it } from 'vitest'

import { SUDOKU_BASE_BOARD } from '../../constants'
import type { BoardType } from '../../models'
import { cloneBoard } from '../cloneBoard'
import { countFilledCells } from '../countFilledCells'

describe('countFilledCells', () => {
  it('should return 81 for a complete board', () => {
    const board = cloneBoard(SUDOKU_BASE_BOARD)

    expect(countFilledCells(board)).toBe(81)
  })

  it('should return 0 for an empty board', () => {
    const board: BoardType = Array.from(
      { length: 9 },
      () => Array<number>(9).fill(0),
    )

    expect(countFilledCells(board)).toBe(0)
  })

  it('should count correctly with some empty cells', () => {
    const board = cloneBoard(SUDOKU_BASE_BOARD)
    board[0][0] = 0
    board[1][1] = 0
    board[2][2] = 0

    expect(countFilledCells(board)).toBe(78)
  })
})
