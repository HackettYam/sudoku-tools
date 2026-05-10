import { describe, expect, it } from 'vitest'

import { SUDOKU_BASE_BOARD } from '../../constants'
import { deserializeBoard } from '../deserializeBoard'
import { serializeBoard } from '../serializeBoard'

describe('deserializeBoard', () => {
  it('should deserialize a valid string', () => {
    const serialized = serializeBoard(SUDOKU_BASE_BOARD)

    const board = deserializeBoard(serialized)

    expect(board).toEqual(SUDOKU_BASE_BOARD)
  })

  it('should throw error for string too short', () => {
    expect(() => deserializeBoard('123')).toThrow('Invalid string length')
  })

  it('should throw error for string too long', () => {
    const longString = '1'.repeat(100)

    expect(() => deserializeBoard(longString)).toThrow('Invalid string length')
  })

  it('should throw error for invalid characters', () => {
    const invalidString = 'a'.repeat(81)

    expect(() => deserializeBoard(invalidString)).toThrow('Invalid character')
  })

  it('should handle empty cells (0)', () => {
    const serialized = '0'.repeat(81)

    const board = deserializeBoard(serialized)

    expect(board[0][0]).toBe(0)
    expect(board[8][8]).toBe(0)
  })

  it('should be inverse of serializeBoard', () => {
    const serialized = serializeBoard(SUDOKU_BASE_BOARD)
    const deserialized = deserializeBoard(serialized)
    const reSerialized = serializeBoard(deserialized)

    expect(reSerialized).toBe(serialized)
  })
})
