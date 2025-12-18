import { describe, expect, it } from 'vitest'

import { SUDOKU_BASE_BOARD } from '@/constants'

import { isValidPuzzle } from '../isValidPuzzle'
import { mirrorBoard } from '../mirrorBoard'

describe('mirrorBoard', () => {
  it('should mirror board horizontally', () => {
    const mirrored = mirrorBoard(SUDOKU_BASE_BOARD, 'horizontal')

    expect(mirrored[0][0]).toBe(SUDOKU_BASE_BOARD[0][8])
    expect(mirrored[0][8]).toBe(SUDOKU_BASE_BOARD[0][0])
  })

  it('should mirror board vertically', () => {
    const mirrored = mirrorBoard(SUDOKU_BASE_BOARD, 'vertical')

    expect(mirrored[0][0]).toBe(SUDOKU_BASE_BOARD[8][0])
    expect(mirrored[8][0]).toBe(SUDOKU_BASE_BOARD[0][0])
  })

  it('should return valid board after horizontal mirror', () => {
    const mirrored = mirrorBoard(SUDOKU_BASE_BOARD, 'horizontal')

    expect(isValidPuzzle(mirrored)).toBe(true)
  })

  it('should return valid board after vertical mirror', () => {
    const mirrored = mirrorBoard(SUDOKU_BASE_BOARD, 'vertical')

    expect(isValidPuzzle(mirrored)).toBe(true)
  })

  it('should return to original after double horizontal mirror', () => {
    const mirrored = mirrorBoard(SUDOKU_BASE_BOARD, 'horizontal')
    const doubleMirrored = mirrorBoard(mirrored, 'horizontal')

    expect(doubleMirrored).toEqual(SUDOKU_BASE_BOARD)
  })

  it('should return to original after double vertical mirror', () => {
    const mirrored = mirrorBoard(SUDOKU_BASE_BOARD, 'vertical')
    const doubleMirrored = mirrorBoard(mirrored, 'vertical')

    expect(doubleMirrored).toEqual(SUDOKU_BASE_BOARD)
  })

  it('should not modify original board', () => {
    const original = SUDOKU_BASE_BOARD.map(row => [...row])

    mirrorBoard(SUDOKU_BASE_BOARD, 'horizontal')

    expect(SUDOKU_BASE_BOARD).toEqual(original)
  })
})
