import { describe, expect, it } from 'vitest'

import { SUDOKU_BASE_BOARD, SUDOKU_EMPTY_CELL } from '@/constants'

import { cloneBoard } from '../cloneBoard'
import { getCandidates } from '../getCandidates'

describe('getCandidates', () => {
  it('should return empty array for filled cell', () => {
    const board = cloneBoard(SUDOKU_BASE_BOARD)

    const candidates = getCandidates(board, 0, 0)

    expect(candidates).toEqual([])
  })

  it('should return all missing numbers for empty cell', () => {
    const board = cloneBoard(SUDOKU_BASE_BOARD)
    board[0][0] = SUDOKU_EMPTY_CELL

    const candidates = getCandidates(board, 0, 0)

    expect(candidates).toEqual([1])
  })

  it('should exclude values present in the same row', () => {
    const board = cloneBoard(SUDOKU_BASE_BOARD)
    board[0][0] = SUDOKU_EMPTY_CELL

    const candidates = getCandidates(board, 0, 0)

    expect(candidates).not.toContain(3)
    expect(candidates).not.toContain(9)
  })

  it('should exclude values present in the same column', () => {
    const board = cloneBoard(SUDOKU_BASE_BOARD)
    board[0][0] = SUDOKU_EMPTY_CELL

    const candidates = getCandidates(board, 0, 0)

    expect(candidates).not.toContain(4)
    expect(candidates).not.toContain(7)
  })

  it('should exclude values present in the same box', () => {
    const board = cloneBoard(SUDOKU_BASE_BOARD)
    board[0][0] = SUDOKU_EMPTY_CELL

    const candidates = getCandidates(board, 0, 0)

    expect(candidates).not.toContain(5)
    expect(candidates).not.toContain(9)
  })

  it('should return multiple candidates when many cells are empty', () => {
    const board = cloneBoard(SUDOKU_BASE_BOARD)

    for (let r = 0; r < 9; r++) {
      for (let c = 0; c < 9; c++) {
        board[r][c] = SUDOKU_EMPTY_CELL
      }
    }

    const candidates = getCandidates(board, 0, 0)

    expect(candidates.length).toBe(9)
    expect(candidates).toEqual([
      1,
      2,
      3,
      4,
      5,
      6,
      7,
      8,
      9,
    ])
  })

  it('should return sorted candidates', () => {
    const board = cloneBoard(SUDOKU_BASE_BOARD)

    for (let c = 0; c < 9; c++) {
      board[0][c] = SUDOKU_EMPTY_CELL
    }

    const candidates = getCandidates(board, 0, 0)
    const sorted = [...candidates].sort((a, b) => a - b)

    expect(candidates).toEqual(sorted)
  })
})
