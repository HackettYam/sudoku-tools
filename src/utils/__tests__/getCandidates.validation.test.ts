import { describe, expect, it } from 'vitest'

import { SUDOKU_BASE_BOARD, SUDOKU_EMPTY_CELL } from '../../constants'
import { cloneBoard } from '../cloneBoard'
import { getCandidates } from '../getCandidates'

describe('getCandidates - Input Validation', () => {
  it('should throw Error for negative row', () => {
    const board = cloneBoard(SUDOKU_BASE_BOARD)

    expect(() => getCandidates(board, -1, 0)).toThrow(/Invalid cell coordinates/)
  })

  it('should throw Error for negative col', () => {
    const board = cloneBoard(SUDOKU_BASE_BOARD)

    expect(() => getCandidates(board, 0, -5)).toThrow(/Invalid cell coordinates/)
  })

  it('should throw Error for row >= 9', () => {
    const board = cloneBoard(SUDOKU_BASE_BOARD)

    expect(() => getCandidates(board, 9, 0)).toThrow(/Invalid cell coordinates/)
  })

  it('should throw Error for col >= 9', () => {
    const board = cloneBoard(SUDOKU_BASE_BOARD)

    expect(() => getCandidates(board, 0, 9)).toThrow(/Invalid cell coordinates/)
  })

  it('should throw Error for both invalid row and col', () => {
    const board = cloneBoard(SUDOKU_BASE_BOARD)

    expect(() => getCandidates(board, -1, 9)).toThrow(/Invalid cell coordinates/)
  })

  it('should work for valid boundary values (0, 0)', () => {
    const board = cloneBoard(SUDOKU_BASE_BOARD)
    board[0][0] = SUDOKU_EMPTY_CELL

    const candidates = getCandidates(board, 0, 0)

    expect(candidates).toEqual([1])
  })

  it('should work for valid boundary values (8, 8)', () => {
    const board = cloneBoard(SUDOKU_BASE_BOARD)
    board[8][8] = SUDOKU_EMPTY_CELL

    const candidates = getCandidates(board, 8, 8)

    expect(candidates).toBeDefined()
  })
})
