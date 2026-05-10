import { describe, expect, it, vi } from 'vitest'

import { SUDOKU_BASE_BOARD } from '../../constants'
import { swapRowWithinBand } from '../swapRowWithinBand'

describe('swapRowWithinBand', () => {
  it('should swap two rows within band 0 (rows 0-2)', () => {
    vi.spyOn(Math, 'random')
      .mockReturnValueOnce(0)
      .mockReturnValueOnce(0.9)

    const board = [...SUDOKU_BASE_BOARD]
    const originalRow0 = [...board[0]]
    const originalRow2 = [...board[2]]

    swapRowWithinBand(board, 0)

    expect(board[0]).toEqual(originalRow2)
    expect(board[2]).toEqual(originalRow0)

    vi.restoreAllMocks()
  })

  it('should swap two rows within band 1 (rows 3-5)', () => {
    vi.spyOn(Math, 'random')
      .mockReturnValueOnce(0)
      .mockReturnValueOnce(0.5)

    const board = [...SUDOKU_BASE_BOARD]
    const originalRow3 = [...board[3]]
    const originalRow4 = [...board[4]]

    swapRowWithinBand(board, 1)

    expect(board[3]).toEqual(originalRow4)
    expect(board[4]).toEqual(originalRow3)

    vi.restoreAllMocks()
  })

  it('should swap two rows within band 2 (rows 6-8)', () => {
    vi.spyOn(Math, 'random')
      .mockReturnValueOnce(0.5)
      .mockReturnValueOnce(0.9)

    const board = [...SUDOKU_BASE_BOARD]
    const originalRow7 = [...board[7]]
    const originalRow8 = [...board[8]]

    swapRowWithinBand(board, 2)

    expect(board[7]).toEqual(originalRow8)
    expect(board[8]).toEqual(originalRow7)

    vi.restoreAllMocks()
  })

  it('should not affect rows outside the band', () => {
    vi.spyOn(Math, 'random')
      .mockReturnValueOnce(0)
      .mockReturnValueOnce(0.9)

    const board = [...SUDOKU_BASE_BOARD]
    const originalRows3to8 = board.slice(3).map(row => [...row])

    swapRowWithinBand(board, 0)

    expect(board.slice(3)).toEqual(originalRows3to8)

    vi.restoreAllMocks()
  })
})
