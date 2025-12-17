import { describe, expect, it } from 'vitest'

import { SUDOKU_BASE_BOARD, SUDOKU_EMPTY_CELL } from '@/constants'

import { cloneBoard } from './cloneBoard'
import { getInvalidCells } from './getInvalidCells'

describe('getInvalidCells', () => {
  it('should return empty array when board matches solution', () => {
    const board = cloneBoard(SUDOKU_BASE_BOARD)
    const solved = cloneBoard(SUDOKU_BASE_BOARD)

    const cells = getInvalidCells(board, solved)

    expect(cells).toEqual([])
  })

  it('should not count empty cells as invalid', () => {
    const board = cloneBoard(SUDOKU_BASE_BOARD)
    const solved = cloneBoard(SUDOKU_BASE_BOARD)
    board[0][0] = SUDOKU_EMPTY_CELL

    const cells = getInvalidCells(board, solved)

    expect(cells).toEqual([])
  })

  it('should return single cell when one is wrong', () => {
    const board = cloneBoard(SUDOKU_BASE_BOARD)
    const solved = cloneBoard(SUDOKU_BASE_BOARD)
    board[0][0] = board[0][0] === 1 ? 2 : 1

    const cells = getInvalidCells(board, solved)

    expect(cells).toHaveLength(1)
    expect(cells[0]).toEqual({ col: 0, row: 0 })
  })

  it('should return multiple cells when many are wrong', () => {
    const board = cloneBoard(SUDOKU_BASE_BOARD)
    const solved = cloneBoard(SUDOKU_BASE_BOARD)
    board[0][0] = board[0][0] === 1 ? 2 : 1
    board[4][4] = board[4][4] === 9 ? 1 : 9

    const cells = getInvalidCells(board, solved)

    expect(cells).toHaveLength(2)
  })

  it('should return cells in row-major order', () => {
    const board = cloneBoard(SUDOKU_BASE_BOARD)
    const solved = cloneBoard(SUDOKU_BASE_BOARD)
    board[2][3] = board[2][3] === 5 ? 1 : 5
    board[1][5] = board[1][5] === 9 ? 1 : 9

    const cells = getInvalidCells(board, solved)

    expect(cells[0]).toEqual({ col: 5, row: 1 })
    expect(cells[1]).toEqual({ col: 3, row: 2 })
  })
})
