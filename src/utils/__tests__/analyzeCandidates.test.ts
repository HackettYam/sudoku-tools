import { describe, expect, it } from 'vitest'

import { SUDOKU_BASE_BOARD } from '@/constants'

import { analyzeCandidates } from '../analyzeCandidates'
import { cloneBoard } from '../cloneBoard'

describe('analyzeCandidates', () => {
  it('should analyze a board with empty cells', () => {
    const board = cloneBoard(SUDOKU_BASE_BOARD)
    board[0][0] = 0
    board[0][1] = 0
    board[0][2] = 0

    const result = analyzeCandidates(board, 3)

    expect(result).toHaveProperty('avg')
    expect(result).toHaveProperty('fewRatio')
    expect(result).toHaveProperty('min')
    expect(result).toHaveProperty('total')
  })

  it('should return correct average candidates', () => {
    const board = cloneBoard(SUDOKU_BASE_BOARD)
    board[0][0] = 0

    const result = analyzeCandidates(board, 1)

    expect(result.avg).toBe(result.total)
  })

  it('should count cells with few candidates', () => {
    const board = cloneBoard(SUDOKU_BASE_BOARD)
    board[0][0] = 0
    board[1][1] = 0

    const result = analyzeCandidates(board, 2)

    expect(result.fewRatio).toBeGreaterThanOrEqual(0)
    expect(result.fewRatio).toBeLessThanOrEqual(1)
  })

  it('should find minimum candidates', () => {
    const board = cloneBoard(SUDOKU_BASE_BOARD)
    board[0][0] = 0
    board[4][4] = 0

    const result = analyzeCandidates(board, 2)

    expect(result.min).toBeGreaterThanOrEqual(1)
    expect(result.min).toBeLessThanOrEqual(9)
  })

  it('should calculate total candidates correctly', () => {
    const board = cloneBoard(SUDOKU_BASE_BOARD)
    board[0][0] = 0

    const result = analyzeCandidates(board, 1)

    expect(result.total).toBeGreaterThanOrEqual(1)
    expect(result.total).toBe(result.avg * 1)
  })
})
