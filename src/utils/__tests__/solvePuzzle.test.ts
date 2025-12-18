import { describe, expect, it } from 'vitest'

import { SUDOKU_BASE_BOARD, SUDOKU_EMPTY_CELL } from '@/constants'

import { cloneBoard } from '../cloneBoard'
import { isValidPuzzle } from '../isValidPuzzle'
import { solvePuzzle } from '../solvePuzzle'

describe('solvePuzzle', () => {
  it('should solve a valid puzzle', () => {
    const board = cloneBoard(SUDOKU_BASE_BOARD)
    board[0][0] = SUDOKU_EMPTY_CELL
    board[0][1] = SUDOKU_EMPTY_CELL
    board[1][0] = SUDOKU_EMPTY_CELL

    const solution = solvePuzzle(board)

    expect(solution).not.toBeNull()

    if (solution) {
      expect(solution[0][0]).toBe(SUDOKU_BASE_BOARD[0][0])
      expect(solution[0][1]).toBe(SUDOKU_BASE_BOARD[0][1])
      expect(solution[1][0]).toBe(SUDOKU_BASE_BOARD[1][0])
    }
  })

  it('should return a valid board after solving', () => {
    const board = cloneBoard(SUDOKU_BASE_BOARD)
    for (let i = 0; i < 20; i++) {
      const row = Math.floor(Math.random() * 9)
      const col = Math.floor(Math.random() * 9)
      board[row][col] = SUDOKU_EMPTY_CELL
    }

    const solution = solvePuzzle(board)

    expect(solution).not.toBeNull()

    if (solution) {
      expect(isValidPuzzle(solution)).toBe(true)
    }
  })

  it('should not have empty cells in the solution', () => {
    const board = cloneBoard(SUDOKU_BASE_BOARD)
    board[0][0] = SUDOKU_EMPTY_CELL
    board[4][4] = SUDOKU_EMPTY_CELL
    board[8][8] = SUDOKU_EMPTY_CELL

    const solution = solvePuzzle(board)

    expect(solution).not.toBeNull()

    if (solution) {
      const hasEmptyCells = solution.flat().includes(SUDOKU_EMPTY_CELL)
      expect(hasEmptyCells).toBe(false)
    }
  })

  it('should not modify the original board', () => {
    const board = cloneBoard(SUDOKU_BASE_BOARD)
    const [r, c] = [0, 0]
    board[r][c] = SUDOKU_EMPTY_CELL
    const originalValue = board[r][c]

    solvePuzzle(board)

    expect(board[r][c]).toBe(originalValue)
  })

  it('should return null for an impossible puzzle', () => {
    const board = cloneBoard(SUDOKU_BASE_BOARD)
    board[0][0] = 1
    board[0][1] = 1

    const solution = solvePuzzle(board)

    expect(solution).toBeNull()
  })

  it('should solve an already solved board', () => {
    const board = cloneBoard(SUDOKU_BASE_BOARD)

    const solution = solvePuzzle(board)

    expect(solution).not.toBeNull()
    expect(solution).toEqual(SUDOKU_BASE_BOARD)
  })

  it('should solve a board with many empty cells', () => {
    const board = cloneBoard(SUDOKU_BASE_BOARD)
    for (let r = 0; r < 9; r++) {
      for (let c = 0; c < 6; c++) {
        board[r][c] = SUDOKU_EMPTY_CELL
      }
    }

    const solution = solvePuzzle(board)

    expect(solution).not.toBeNull()

    if (solution) {
      expect(isValidPuzzle(solution)).toBe(true)
    }
  })
})
