import { describe, expect, it } from 'vitest'

import type { BoardType } from '../../models'
import { detectInvalidityReason } from '../detectInvalidityReason'

const EMPTY_ROW: number[] = [
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
]

function makeBoard(overrides: Partial<Record<number, number[]>>): BoardType {
  const board: number[][] = []
  for (let i = 0; i < 9; i++) {
    const override = overrides[i]
    if (override) {
      const row = [...override]
      while (row.length < 9) {
        row.push(0)
      }
      board.push(row)
    } else {
      board.push([...EMPTY_ROW])
    }
  }
  return board
}

describe('detectInvalidityReason', () => {
  it('should detect duplicate in row', () => {
    const board = makeBoard({ 0: [5, 5] })

    expect(detectInvalidityReason(board)).toBe('duplicate found in row 0')
  })

  it('should detect duplicate in column', () => {
    const board = makeBoard({ 0: [5], 4: [5] })

    expect(detectInvalidityReason(board)).toBe('duplicate found in column 0')
  })

  it('should detect duplicate in box', () => {
    const board = makeBoard({ 0: [5], 1: [0, 5] })

    expect(detectInvalidityReason(board)).toBe('duplicate found in box (0,0)')
  })

  it('should return null for board with no duplicates', () => {
    const board = makeBoard({
      0: [
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        0,
      ],
    })

    expect(detectInvalidityReason(board)).toBeNull()
  })

  it('should check rows before columns and boxes', () => {
    const board = makeBoard({ 0: [5, 5] })

    const reason = detectInvalidityReason(board)

    expect(reason).toContain('row')
    expect(reason).not.toContain('column')
  })

  it('should detect invalid board size', () => {
    const shortBoard = [ [1, 2, 3] ] as unknown as BoardType

    const reason = detectInvalidityReason(shortBoard)

    expect(reason).toBe('invalid board size')
  })
})
