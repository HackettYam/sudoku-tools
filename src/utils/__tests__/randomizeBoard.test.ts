import { describe, expect, it, vi } from 'vitest'

import { SUDOKU_BASE_BOARD, SUDOKU_SIZE } from '../../constants'
import { cloneBoard } from '../cloneBoard'
import { isValidPuzzle } from '../isValidPuzzle'
import { randomizeBoard } from '../randomizeBoard'

describe('randomizeBoard', () => {
  it('should modify the board after randomization', () => {
    const board = cloneBoard(SUDOKU_BASE_BOARD)
    const originalBoard = cloneBoard(board)

    randomizeBoard(board)

    const boardChanged = JSON.stringify(board) !== JSON.stringify(originalBoard)
    expect(boardChanged).toBe(true)
  })

  it('should produce a valid Sudoku board after randomization', () => {
    const board = cloneBoard(SUDOKU_BASE_BOARD)

    randomizeBoard(board)

    expect(isValidPuzzle(board)).toBe(true)
  })

  it('should preserve all digits 1-9 in each row', () => {
    const board = cloneBoard(SUDOKU_BASE_BOARD)

    randomizeBoard(board)

    for (let r = 0; r < SUDOKU_SIZE; r++) {
      const rowDigits = new Set(board[r])
      expect(rowDigits.size).toBe(9)
      for (let d = 1; d <= 9; d++) {
        expect(rowDigits.has(d)).toBe(true)
      }
    }
  })

  it('should preserve all digits 1-9 in each column', () => {
    const board = cloneBoard(SUDOKU_BASE_BOARD)

    randomizeBoard(board)

    for (let c = 0; c < SUDOKU_SIZE; c++) {
      const colDigits = new Set<number>()
      for (let r = 0; r < SUDOKU_SIZE; r++) {
        colDigits.add(board[r][c])
      }
      expect(colDigits.size).toBe(9)
      for (let d = 1; d <= 9; d++) {
        expect(colDigits.has(d)).toBe(true)
      }
    }
  })

  it('should call Math.random multiple times for randomization', () => {
    const randomSpy = vi.spyOn(Math, 'random')
    const board = cloneBoard(SUDOKU_BASE_BOARD)

    randomizeBoard(board)

    expect(randomSpy.mock.calls.length).toBeGreaterThan(0)
    randomSpy.mockRestore()
  })

  it('should produce different results on multiple calls', () => {
    const results: string[] = []

    for (let i = 0; i < 5; i++) {
      const board = cloneBoard(SUDOKU_BASE_BOARD)
      randomizeBoard(board)
      results.push(JSON.stringify(board))
    }

    const uniqueResults = new Set(results)
    expect(uniqueResults.size).toBeGreaterThan(1)
  })
})
