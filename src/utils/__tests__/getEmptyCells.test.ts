import { describe, expect, it } from 'vitest'

import { SUDOKU_BASE_BOARD, SUDOKU_EMPTY_CELL } from '../../constants'
import { cloneBoard } from '../cloneBoard'
import { getEmptyCells } from '../getEmptyCells'

describe('getEmptyCells', () => {
  it('should return empty array for complete board', () => {
    const board = cloneBoard(SUDOKU_BASE_BOARD)

    const cells = getEmptyCells(board)

    expect(cells).toEqual([])
  })

  it('should return single cell when one is empty', () => {
    const board = cloneBoard(SUDOKU_BASE_BOARD)
    board[0][0] = SUDOKU_EMPTY_CELL

    const cells = getEmptyCells(board)

    expect(cells).toHaveLength(1)
    expect(cells[0]).toEqual({ col: 0, row: 0 })
  })

  it('should return multiple cells when many are empty', () => {
    const board = cloneBoard(SUDOKU_BASE_BOARD)
    board[0][0] = SUDOKU_EMPTY_CELL
    board[4][4] = SUDOKU_EMPTY_CELL
    board[8][8] = SUDOKU_EMPTY_CELL

    const cells = getEmptyCells(board)

    expect(cells).toHaveLength(3)
  })

  it('should return cells in row-major order', () => {
    const board = cloneBoard(SUDOKU_BASE_BOARD)
    board[2][3] = SUDOKU_EMPTY_CELL
    board[1][5] = SUDOKU_EMPTY_CELL

    const cells = getEmptyCells(board)

    expect(cells[0]).toEqual({ col: 5, row: 1 })
    expect(cells[1]).toEqual({ col: 3, row: 2 })
  })

  it('should return 81 cells for completely empty board', () => {
    const board = cloneBoard(SUDOKU_BASE_BOARD)

    for (let r = 0; r < 9; r++) {
      for (let c = 0; c < 9; c++) {
        board[r][c] = SUDOKU_EMPTY_CELL
      }
    }

    const cells = getEmptyCells(board)

    expect(cells).toHaveLength(81)
  })
})
