import { describe, expect, it } from 'vitest'

import { SUDOKU_BASE_BOARD, SUDOKU_EMPTY_CELL } from '../../constants'
import { clearCell } from '../clearCell'
import { cloneBoard } from '../cloneBoard'

describe('clearCell', () => {
  it('should return a new board with the cell cleared', () => {
    const board = cloneBoard(SUDOKU_BASE_BOARD)

    const newBoard = clearCell(board, 0, 0)

    expect(newBoard[0][0]).toBe(SUDOKU_EMPTY_CELL)
  })

  it('should not modify the original board', () => {
    const board = cloneBoard(SUDOKU_BASE_BOARD)
    const [r] = [0]
    const [originalValue] = board[r]

    clearCell(board, 0, 0)

    expect(board[0][0]).toBe(originalValue)
  })

  it('should return a different board instance', () => {
    const board = cloneBoard(SUDOKU_BASE_BOARD)

    const newBoard = clearCell(board, 0, 0)

    expect(newBoard).not.toBe(board)
  })

  it('should preserve other cell values', () => {
    const board = cloneBoard(SUDOKU_BASE_BOARD)

    const newBoard = clearCell(board, 0, 0)

    expect(newBoard[0][1]).toBe(board[0][1])
    expect(newBoard[8][8]).toBe(board[8][8])
  })

  it('should handle already empty cell', () => {
    const board = cloneBoard(SUDOKU_BASE_BOARD)
    board[0][0] = SUDOKU_EMPTY_CELL

    const newBoard = clearCell(board, 0, 0)

    expect(newBoard[0][0]).toBe(SUDOKU_EMPTY_CELL)
  })
})
