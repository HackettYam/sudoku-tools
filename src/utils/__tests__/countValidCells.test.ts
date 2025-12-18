import { describe, expect, it } from 'vitest'

import { SUDOKU_BASE_BOARD } from '@/constants'
import type { BoardType } from '@/models'

import { cloneBoard } from '../cloneBoard'
import { countValidCells } from '../countValidCells'

describe('countValidCells', () => {
  it('should return 81 when board matches solved completely', () => {
    const board = cloneBoard(SUDOKU_BASE_BOARD)
    const solved = cloneBoard(SUDOKU_BASE_BOARD)

    expect(countValidCells(board, solved)).toBe(81)
  })

  it('should return 0 for an empty board', () => {
    const board: BoardType = Array.from(
      { length: 9 },
      () => Array<number>(9).fill(0),
    )
    const solved = cloneBoard(SUDOKU_BASE_BOARD)

    expect(countValidCells(board, solved)).toBe(0)
  })

  it('should count only cells that match the solution', () => {
    const board = cloneBoard(SUDOKU_BASE_BOARD)
    const solved = cloneBoard(SUDOKU_BASE_BOARD)
    board[0][0] = 9
    board[1][1] = 9

    expect(countValidCells(board, solved)).toBe(79)
  })

  it('should not count empty cells as valid', () => {
    const board = cloneBoard(SUDOKU_BASE_BOARD)
    const solved = cloneBoard(SUDOKU_BASE_BOARD)
    board[0][0] = 0
    board[1][1] = 0

    expect(countValidCells(board, solved)).toBe(79)
  })
})
