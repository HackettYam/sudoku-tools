import { describe, expect, it } from 'vitest'

import { SUDOKU_BASE_BOARD } from '../../constants'
import { cloneBoard } from '../cloneBoard'
import { findEmptyCell } from '../findEmptyCell'

describe('findEmptyCell', () => {
  it('should return null for a complete board', () => {
    const result = findEmptyCell(SUDOKU_BASE_BOARD)

    expect(result).toBeNull()
  })

  it('should find the first empty cell', () => {
    const board = cloneBoard(SUDOKU_BASE_BOARD)
    board[0][0] = 0

    const result = findEmptyCell(board)

    expect(result).toEqual({ col: 0, row: 0 })
  })

  it('should find empty cell in the middle of the board', () => {
    const board = cloneBoard(SUDOKU_BASE_BOARD)
    board[4][4] = 0

    const result = findEmptyCell(board)

    expect(result).toEqual({ col: 4, row: 4 })
  })

  it('should find the first empty cell when multiple exist', () => {
    const board = cloneBoard(SUDOKU_BASE_BOARD)
    board[2][3] = 0
    board[5][6] = 0
    board[8][8] = 0

    const result = findEmptyCell(board)

    expect(result).toEqual({ col: 3, row: 2 })
  })

  it('should find empty cell at the end of the board', () => {
    const board = cloneBoard(SUDOKU_BASE_BOARD)
    board[8][8] = 0

    const result = findEmptyCell(board)

    expect(result).toEqual({ col: 8, row: 8 })
  })
})
