import { describe, expect, it } from 'vitest'

import { SUDOKU_BASE_BOARD } from '@/constants'

import { isValidPuzzle } from './isValidPuzzle'
import { rotateBoard } from './rotateBoard'

describe('rotateBoard', () => {
  it('should rotate board 90 degrees clockwise', () => {
    const rotated = rotateBoard(SUDOKU_BASE_BOARD)

    expect(rotated[0][0]).toBe(SUDOKU_BASE_BOARD[8][0])
    expect(rotated[0][8]).toBe(SUDOKU_BASE_BOARD[0][0])
  })

  it('should return valid board after rotation', () => {
    const rotated = rotateBoard(SUDOKU_BASE_BOARD)

    expect(isValidPuzzle(rotated)).toBe(true)
  })

  it('should rotate 180 degrees with times=2', () => {
    const rotated = rotateBoard(SUDOKU_BASE_BOARD, 2)

    expect(rotated[0][0]).toBe(SUDOKU_BASE_BOARD[8][8])
    expect(rotated[8][8]).toBe(SUDOKU_BASE_BOARD[0][0])
  })

  it('should return to original after 4 rotations', () => {
    const rotated = rotateBoard(SUDOKU_BASE_BOARD, 4)

    expect(rotated).toEqual(SUDOKU_BASE_BOARD)
  })

  it('should handle negative rotations', () => {
    const rotatedNeg1 = rotateBoard(SUDOKU_BASE_BOARD, -1)
    const rotated3 = rotateBoard(SUDOKU_BASE_BOARD, 3)

    expect(rotatedNeg1).toEqual(rotated3)
  })

  it('should not modify original board', () => {
    const original = SUDOKU_BASE_BOARD.map(row => [...row])

    rotateBoard(SUDOKU_BASE_BOARD)

    expect(SUDOKU_BASE_BOARD).toEqual(original)
  })
})
