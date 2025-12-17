import { describe, expect, it, vi } from 'vitest'

import { SUDOKU_BASE_BOARD } from '@/constants'

import { swapColWithinStack } from './swapColWithinStack'

describe('swapColWithinStack', () => {
  it('should swap two columns within stack 0 (cols 0-2)', () => {
    vi.spyOn(Math, 'random')
      .mockReturnValueOnce(0)
      .mockReturnValueOnce(0.9)

    const board = [...SUDOKU_BASE_BOARD]
    const originalCol0 = board.map(row => row[0])
    const originalCol2 = board.map(row => row[2])

    swapColWithinStack(board, 0)

    const newCol0 = board.map(row => row[0])
    const newCol2 = board.map(row => row[2])

    expect(newCol0).toEqual(originalCol2)
    expect(newCol2).toEqual(originalCol0)

    vi.restoreAllMocks()
  })

  it('should swap two columns within stack 1 (cols 3-5)', () => {
    vi.spyOn(Math, 'random')
      .mockReturnValueOnce(0)
      .mockReturnValueOnce(0.5)

    const board = [...SUDOKU_BASE_BOARD]
    const originalCol3 = board.map(row => row[3])
    const originalCol4 = board.map(row => row[4])

    swapColWithinStack(board, 1)

    const newCol3 = board.map(row => row[3])
    const newCol4 = board.map(row => row[4])

    expect(newCol3).toEqual(originalCol4)
    expect(newCol4).toEqual(originalCol3)

    vi.restoreAllMocks()
  })

  it('should swap two columns within stack 2 (cols 6-8)', () => {
    vi.spyOn(Math, 'random')
      .mockReturnValueOnce(0.5)
      .mockReturnValueOnce(0.9)

    const board = [...SUDOKU_BASE_BOARD]
    const originalCol7 = board.map(row => row[7])
    const originalCol8 = board.map(row => row[8])

    swapColWithinStack(board, 2)

    const newCol7 = board.map(row => row[7])
    const newCol8 = board.map(row => row[8])

    expect(newCol7).toEqual(originalCol8)
    expect(newCol8).toEqual(originalCol7)

    vi.restoreAllMocks()
  })

  it('should not affect columns outside the stack', () => {
    vi.spyOn(Math, 'random')
      .mockReturnValueOnce(0)
      .mockReturnValueOnce(0.9)

    const board = [...SUDOKU_BASE_BOARD]
    const originalCols3to8 = board.map(row => row.slice(3))

    swapColWithinStack(board, 0)

    const newCols3to8 = board.map(row => row.slice(3))

    expect(newCols3to8).toEqual(originalCols3to8)

    vi.restoreAllMocks()
  })
})
