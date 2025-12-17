import { describe, expect, it } from 'vitest'

import { cloneBoard } from './cloneBoard'
import { removeCells } from './removeCells'
import {
  SUDOKU_BASE_BOARD,
  SUDOKU_EMPTY_CELL,
  SUDOKU_SIZE,
} from '../constants/sudoku.constants'

describe('removeCells', () => {
  it('should remove cells until reaching the desired number of hints', () => {
    const board = cloneBoard(SUDOKU_BASE_BOARD)
    const hints = 40

    removeCells(board, hints)

    let filledCells = 0
    for (let r = 0; r < SUDOKU_SIZE; r++) {
      for (let c = 0; c < SUDOKU_SIZE; c++) {
        if (board[r][c] !== SUDOKU_EMPTY_CELL) {
          filledCells++
        }
      }
    }

    expect(filledCells).toBe(hints)
  })

  it('should leave correct number of hints for different values', () => {
    const testCases = [50, 35, 20]

    for (const hints of testCases) {
      const board = cloneBoard(SUDOKU_BASE_BOARD)
      removeCells(board, hints)

      let filledCells = 0
      for (let r = 0; r < SUDOKU_SIZE; r++) {
        for (let c = 0; c < SUDOKU_SIZE; c++) {
          if (board[r][c] !== SUDOKU_EMPTY_CELL) {
            filledCells++
          }
        }
      }

      expect(filledCells).toBe(hints)
    }
  })

  it('should set removed cells to SUDOKU_EMPTY_CELL (0)', () => {
    const board = cloneBoard(SUDOKU_BASE_BOARD)
    const hints = 30

    removeCells(board, hints)

    let emptyCells = 0
    for (let r = 0; r < SUDOKU_SIZE; r++) {
      for (let c = 0; c < SUDOKU_SIZE; c++) {
        if (board[r][c] === SUDOKU_EMPTY_CELL) {
          emptyCells++
        }
      }
    }

    expect(emptyCells).toBe((SUDOKU_SIZE * SUDOKU_SIZE) - hints)
  })

  it('should not modify remaining cells values', () => {
    const board = cloneBoard(SUDOKU_BASE_BOARD)
    const hints = 40

    removeCells(board, hints)

    for (let r = 0; r < SUDOKU_SIZE; r++) {
      for (let c = 0; c < SUDOKU_SIZE; c++) {
        const value = board[r][c]
        if (value !== SUDOKU_EMPTY_CELL) {
          expect(value).toBeGreaterThanOrEqual(1)
          expect(value).toBeLessThanOrEqual(9)
        }
      }
    }
  })
})
