import { describe, expect, it } from 'vitest'

import type { CellValue } from '../../models'
import { cloneBoard } from '../cloneBoard'
import { isValidPlacement } from '../isValidPlacement'

const createEmptyBoard = (): CellValue[][] => {
  return Array.from({ length: 9 }, () => Array.from({ length: 9 }, () => 0 as CellValue))
}

describe('isValidPlacement - Input Validation', () => {
  it('should throw Error for negative row', () => {
    const board = createEmptyBoard()

    expect(() => isValidPlacement(board, { col: 0, row: -1, value: 5 })).toThrow(/Invalid cell coordinates/)
  })

  it('should throw Error for negative col', () => {
    const board = createEmptyBoard()

    expect(() => isValidPlacement(board, { col: -5, row: 0, value: 5 })).toThrow(/Invalid cell coordinates/)
  })

  it('should throw Error for row >= 9', () => {
    const board = createEmptyBoard()

    expect(() => isValidPlacement(board, { col: 0, row: 9, value: 5 })).toThrow(/Invalid cell coordinates/)
  })

  it('should throw Error for col >= 9', () => {
    const board = createEmptyBoard()

    expect(() => isValidPlacement(board, { col: 9, row: 0, value: 5 })).toThrow(/Invalid cell coordinates/)
  })

  it('should throw Error for both invalid row and col', () => {
    const board = createEmptyBoard()

    expect(() => isValidPlacement(board, { col: 9, row: -1, value: 5 })).toThrow(/Invalid cell coordinates/)
  })

  it('should work for valid boundary values (0, 0)', () => {
    const board = createEmptyBoard()

    const result = isValidPlacement(cloneBoard(board), { col: 0, row: 0, value: 5 })

    expect(result.valid).toBe(true)
    expect(result.reason).toBe('none')
  })

  it('should work for valid boundary values (8, 8)', () => {
    const board = createEmptyBoard()

    const result = isValidPlacement(cloneBoard(board), { col: 8, row: 8, value: 9 })

    expect(result.valid).toBe(true)
    expect(result.reason).toBe('none')
  })
})
