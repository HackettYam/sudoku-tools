import { describe, expect, it } from 'vitest'

import { SUDOKU_BASE_BOARD } from '../../constants'
import type { BoardType } from '../../models'
import { cloneBoard } from '../cloneBoard'
import { countEmptyCells } from '../countEmptyCells'
import { countInvalidCells } from '../countInvalidCells'
import { countValidCells } from '../countValidCells'

describe('countInvalidCells', () => {
  it('should return 0 when board matches solved completely', () => {
    const board = cloneBoard(SUDOKU_BASE_BOARD)
    const solved = cloneBoard(SUDOKU_BASE_BOARD)

    expect(countInvalidCells(board, solved)).toBe(0)
  })

  it('should return 0 for an empty board', () => {
    const board: BoardType = Array.from(
      { length: 9 },
      () => Array<number>(9).fill(0),
    )
    const solved = cloneBoard(SUDOKU_BASE_BOARD)

    expect(countInvalidCells(board, solved)).toBe(0)
  })

  it('should count cells that do not match the solution', () => {
    const board = cloneBoard(SUDOKU_BASE_BOARD)
    const solved = cloneBoard(SUDOKU_BASE_BOARD)
    board[0][0] = 9
    board[1][1] = 9

    expect(countInvalidCells(board, solved)).toBe(2)
  })

  it('should not count empty cells as invalid', () => {
    const board = cloneBoard(SUDOKU_BASE_BOARD)
    const solved = cloneBoard(SUDOKU_BASE_BOARD)
    board[0][0] = 0

    expect(countInvalidCells(board, solved)).toBe(0)
  })

  it('valid + invalid + empty should equal 81', () => {
    const board = cloneBoard(SUDOKU_BASE_BOARD)
    const solved = cloneBoard(SUDOKU_BASE_BOARD)
    board[0][0] = 0
    board[1][1] = 9
    board[2][2] = 0

    const valid = countValidCells(board, solved)
    const invalid = countInvalidCells(board, solved)
    const empty = countEmptyCells(board)

    expect(valid + invalid + empty).toBe(81)
  })
})
