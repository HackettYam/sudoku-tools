import { describe, expect, it } from 'vitest'

import { SUDOKU_BASE_BOARD, SUDOKU_EMPTY_CELL } from '../../constants'
import { cloneBoard } from '../cloneBoard'
import { serializeBoard } from '../serializeBoard'

describe('serializeBoard', () => {
  it('should return a string of 81 characters', () => {
    const result = serializeBoard(SUDOKU_BASE_BOARD)

    expect(result.length).toBe(81)
  })

  it('should serialize all cells in row-major order', () => {
    const result = serializeBoard(SUDOKU_BASE_BOARD)

    expect(result.startsWith('123456789')).toBe(true)
  })

  it('should serialize empty cells as 0', () => {
    const board = cloneBoard(SUDOKU_BASE_BOARD)
    board[0][0] = SUDOKU_EMPTY_CELL

    const result = serializeBoard(board)

    expect(result[0]).toBe('0')
  })

  it('should produce consistent results', () => {
    const result1 = serializeBoard(SUDOKU_BASE_BOARD)
    const result2 = serializeBoard(SUDOKU_BASE_BOARD)

    expect(result1).toBe(result2)
  })

  it('should serialize modified board correctly', () => {
    const board = cloneBoard(SUDOKU_BASE_BOARD)
    board[0][0] = 9
    board[8][8] = 1

    const result = serializeBoard(board)

    expect(result[0]).toBe('9')
    expect(result[80]).toBe('1')
  })
})
