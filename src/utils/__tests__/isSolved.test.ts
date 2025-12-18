import { describe, expect, it } from 'vitest'

import { SUDOKU_BASE_BOARD, SUDOKU_EMPTY_CELL } from '@/constants'

import { cloneBoard } from '../cloneBoard'
import { isSolved } from '../isSolved'

describe('isSolved', () => {
  it('should return true when board matches solution', () => {
    const board = cloneBoard(SUDOKU_BASE_BOARD)
    const solved = cloneBoard(SUDOKU_BASE_BOARD)

    expect(isSolved(board, solved)).toBe(true)
  })

  it('should return false when board has empty cells', () => {
    const board = cloneBoard(SUDOKU_BASE_BOARD)
    const solved = cloneBoard(SUDOKU_BASE_BOARD)
    board[0][0] = SUDOKU_EMPTY_CELL

    expect(isSolved(board, solved)).toBe(false)
  })

  it('should return false when board has wrong values', () => {
    const board = cloneBoard(SUDOKU_BASE_BOARD)
    const solved = cloneBoard(SUDOKU_BASE_BOARD)
    board[0][0] = board[0][0] === 1 ? 2 : 1

    expect(isSolved(board, solved)).toBe(false)
  })

  it('should return false when single cell differs', () => {
    const board = cloneBoard(SUDOKU_BASE_BOARD)
    const solved = cloneBoard(SUDOKU_BASE_BOARD)
    board[4][4] = board[4][4] === 9 ? 1 : 9

    expect(isSolved(board, solved)).toBe(false)
  })
})
