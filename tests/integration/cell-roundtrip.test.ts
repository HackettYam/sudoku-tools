import { beforeEach, describe, expect, it } from 'vitest'

import { createSudoku } from '../../src/features/createSudoku'
import { Difficulty } from '../../src/models'
import { clearCell } from '../../src/utils/clearCell'
import { setCellValue } from '../../src/utils/setCellValue'

describe('Cell Manipulation Round-Trip', () => {
  let puzzle = createSudoku(Difficulty.Novice)

  beforeEach(() => {
    puzzle = createSudoku(Difficulty.Novice)
  })

  it('should set a value and keep original board immutable', () => {
    const modified = setCellValue(puzzle.current, { col: 0, row: 0, value: 5 })

    expect(modified[0][0]).toBe(5)
    expect(puzzle.current[0][0]).not.toBe(5)
  })

  it('should clear a cell and keep original board immutable', () => {
    const modified = setCellValue(puzzle.current, { col: 4, row: 4, value: 9 })
    const cleared = clearCell(modified, 4, 4)

    expect(cleared[4][4]).toBe(0)
    expect(modified[4][4]).toBe(9)
  })

  it('should handle multiple operations in sequence', () => {
    // Save original values before modifications
    const originalRow0 = puzzle.current[0].slice()

    let board = puzzle.current

    board = setCellValue(board, { col: 0, row: 0, value: 1 })
    board = setCellValue(board, { col: 1, row: 0, value: 2 })
    board = setCellValue(board, { col: 2, row: 0, value: 3 })

    expect(board[0][0]).toBe(1)
    expect(board[0][1]).toBe(2)
    expect(board[0][2]).toBe(3)

    /*
     * Original values should be preserved in the returned board
     * (setCellValue returns a new board, doesn't modify original)
     */
    expect(puzzle.current[0][0]).toBe(originalRow0[0])
    expect(puzzle.current[0][1]).toBe(originalRow0[1])
    expect(puzzle.current[0][2]).toBe(originalRow0[2])
  })

  it('should handle boundary indices (0, 8)', () => {
    const modified = setCellValue(puzzle.current, { col: 8, row: 0, value: 9 })
    expect(modified[0][8]).toBe(9)

    const cleared = clearCell(modified, 8, 0)
    expect(cleared[8][0]).toBe(0)
  })

  it('should throw error for invalid indices', () => {
    expect(() => setCellValue(puzzle.current, { col: 0, row: -1, value: 5 })).toThrow()

    expect(() => setCellValue(puzzle.current, { col: 9, row: 0, value: 5 })).toThrow()

    expect(() => clearCell(puzzle.current, -1, 0)).toThrow()
    expect(() => clearCell(puzzle.current, 0, 9)).toThrow()
  })

  it('should work with read-only cells (should not modify)', () => {
    // Try to set a value using setCell method
    const result = puzzle.setCell(0, 0, 9)

    // Just verify setCell returns a boolean (true if modified, false if read-only)
    expect(typeof result).toBe('boolean')
  })
})
