import { describe, expect, it } from 'vitest'

import { SUDOKU_BASE_BOARD } from '@/constants'

import { cloneBoard } from './cloneBoard'

const originalStack = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
]

describe('cloneBoard', () => {
  it('should create a deep copy of the board', () => {
    const original = [...originalStack]
    const cloned = cloneBoard(original)

    expect(cloned).toEqual(original)
    expect(cloned).not.toBe(original)
  })

  it('should not affect the original when modifying the clone', () => {
    const original = [...originalStack]
    const cloned = cloneBoard(original)
    cloned[0][0] = 99

    expect(original[0][0]).toBe(1)
    expect(cloned[0][0]).toBe(99)
  })

  it('should not share row references between original and clone', () => {
    const original = [...originalStack]
    const cloned = cloneBoard(original)

    expect(cloned[0]).not.toBe(original[0])
    expect(cloned[1]).not.toBe(original[1])
    expect(cloned[2]).not.toBe(original[2])
  })

  it('should handle empty board', () => {
    const original: number[][] = []
    const cloned = cloneBoard(original)

    expect(cloned).toEqual([])
    expect(cloned).not.toBe(original)
  })

  it('should handle a full 9x9 Sudoku board', () => {
    const original = [...SUDOKU_BASE_BOARD]
    const cloned = cloneBoard(original)

    expect(cloned).toEqual(original)
    expect(cloned.length).toBe(9)

    cloned.forEach((row, index) => {
      expect(row.length).toBe(9)
      expect(row).not.toBe(original[index])
    })
  })
})
