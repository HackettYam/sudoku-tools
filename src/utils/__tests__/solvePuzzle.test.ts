/* eslint-disable max-lines-per-function */

import { describe, expect, it } from 'vitest'

import { SUDOKU_BASE_BOARD, SUDOKU_EMPTY_CELL } from '../../constants'
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

  it('should return null for board with invalid size', () => {
    const board = [
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9],
    ]

    const solution = solvePuzzle(board)

    expect(solution).toBeNull()
  })

  it('should handle board with values out of range (keeps invalid values)', () => {
    const board = cloneBoard(SUDOKU_BASE_BOARD)
    board[0][0] = 10

    const solution = solvePuzzle(board)

    // isValidPuzzle doesn't validate value range, so it passes through
    expect(solution).not.toBeNull()

    if (solution) {
      expect(solution[0][0]).toBe(10)
    }
  })

  it('should handle board with negative values (keeps invalid values)', () => {
    const board = cloneBoard(SUDOKU_BASE_BOARD)
    board[0][0] = -1

    const solution = solvePuzzle(board)

    // isValidPuzzle doesn't validate value range, so it passes through
    expect(solution).not.toBeNull()

    if (solution) {
      expect(solution[0][0]).toBe(-1)
    }
  })

  it('should solve a completely empty board', () => {
    const createEmptyRow = (): number[] => Array.from({ length: 9 }, () => SUDOKU_EMPTY_CELL)
    const board: number[][] = Array.from({ length: 9 }, createEmptyRow)

    const solution = solvePuzzle(board)

    expect(solution).not.toBeNull()

    if (solution) {
      expect(isValidPuzzle(solution)).toBe(true)
      const hasEmptyCells = solution.flat().includes(SUDOKU_EMPTY_CELL)
      expect(hasEmptyCells).toBe(false)
    }
  })

  it('should return null for board with duplicate in row', () => {
    const board = cloneBoard(SUDOKU_BASE_BOARD)
    board[0][0] = 5
    board[0][4] = 5

    const solution = solvePuzzle(board)

    expect(solution).toBeNull()
  })

  it('should return null for board with duplicate in column', () => {
    const board = cloneBoard(SUDOKU_BASE_BOARD)
    board[0][0] = 5
    board[4][0] = 5

    const solution = solvePuzzle(board)

    expect(solution).toBeNull()
  })

  it('should return null for board with duplicate in box', () => {
    const board = cloneBoard(SUDOKU_BASE_BOARD)
    board[0][0] = 5
    board[1][1] = 5

    const solution = solvePuzzle(board)

    expect(solution).toBeNull()
  })

  it('should return null when backtrack fails on unsolvable valid puzzle', () => {
    /*
     * This puzzle passes isValidPuzzle (no duplicates) but backtrack fails
     * Cell [0][0] is empty and all values 1-9 are blocked:
     * - Row 0 has: 2,3,4,5,6,7,8,9 (blocks all except 1)
     * - Column 0 has: 1 in box (blocks 1)
     * - So [0][0] has no valid candidates
     */
    const board = [
      [
        0,
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        9,
      ],
      [
        4,
        1,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
      ],
      [
        7,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
      ],
      [
        5,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
      ],
      [
        6,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
      ],
      [
        8,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
      ],
      [
        9,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
      ],
      [
        3,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
      ],
      [
        2,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
      ],
    ]

    const solution = solvePuzzle(board)

    expect(solution).toBeNull()
  })
})
