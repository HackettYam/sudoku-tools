/* eslint-disable max-lines-per-function */

import { describe, expect, it } from 'vitest'

import { SUDOKU_BASE_BOARD, SUDOKU_EMPTY_CELL } from '../../constants'
import type { BoardType } from '../../models'
import { cloneBoard } from '../cloneBoard'
import { isValidPuzzle } from '../isValidPuzzle'
import { solvePuzzle } from '../solvePuzzle'

describe('solvePuzzle', () => {
  it('should solve a valid puzzle', () => {
    const board = cloneBoard(SUDOKU_BASE_BOARD)
    board[0][0] = SUDOKU_EMPTY_CELL
    board[0][1] = SUDOKU_EMPTY_CELL
    board[1][0] = SUDOKU_EMPTY_CELL

    const result = solvePuzzle(board)

    expect(result.board).not.toBeNull()

    if (result.board) {
      expect(result.board[0][0]).toBe(SUDOKU_BASE_BOARD[0][0])
      expect(result.board[0][1]).toBe(SUDOKU_BASE_BOARD[0][1])
      expect(result.board[1][0]).toBe(SUDOKU_BASE_BOARD[1][0])
    }
  })

  it('should return a valid board after solving', () => {
    const board = cloneBoard(SUDOKU_BASE_BOARD)
    for (let i = 0; i < 20; i++) {
      const row = Math.floor(Math.random() * 9)
      const col = Math.floor(Math.random() * 9)
      board[row][col] = SUDOKU_EMPTY_CELL
    }

    const result = solvePuzzle(board)

    expect(result.board).not.toBeNull()

    if (result.board) {
      expect(isValidPuzzle(result.board)).toBe(true)
    }
  })

  it('should not have empty cells in the solution', () => {
    const board = cloneBoard(SUDOKU_BASE_BOARD)
    board[0][0] = SUDOKU_EMPTY_CELL
    board[4][4] = SUDOKU_EMPTY_CELL
    board[8][8] = SUDOKU_EMPTY_CELL

    const result = solvePuzzle(board)

    expect(result.board).not.toBeNull()

    if (result.board) {
      const hasEmptyCells = result.board.flat().includes(SUDOKU_EMPTY_CELL)
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

  it('should return error for an impossible puzzle', () => {
    const board = cloneBoard(SUDOKU_BASE_BOARD)
    board[0][0] = 1
    board[0][1] = 1

    const result = solvePuzzle(board)

    expect(result.board).toBeNull()
    expect(result.error).toContain('duplicate')
  })

  it('should solve an already solved board', () => {
    const board = cloneBoard(SUDOKU_BASE_BOARD)

    const result = solvePuzzle(board)

    expect(result.board).not.toBeNull()
    expect(result.board).toEqual(SUDOKU_BASE_BOARD)
  })

  it('should solve a board with many empty cells', () => {
    const board = cloneBoard(SUDOKU_BASE_BOARD)
    for (let r = 0; r < 9; r++) {
      for (let c = 0; c < 6; c++) {
        board[r][c] = SUDOKU_EMPTY_CELL
      }
    }

    const result = solvePuzzle(board)

    expect(result.board).not.toBeNull()

    if (result.board) {
      expect(isValidPuzzle(result.board)).toBe(true)
    }
  })

  it('should return error for board with invalid size', () => {
    const board = [
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9],
    ]

    const result = solvePuzzle(board as BoardType)

    expect(result.board).toBeNull()
  })

  it('should handle board with values out of range (keeps invalid values)', () => {
    const board = cloneBoard(SUDOKU_BASE_BOARD)
    board[0][0] = 10

    const result = solvePuzzle(board)

    // isValidPuzzle doesn't validate value range, so it passes through
    expect(result.board).not.toBeNull()

    if (result.board) {
      expect(result.board[0][0]).toBe(10)
    }
  })

  it('should handle board with negative values (keeps invalid values)', () => {
    const board = cloneBoard(SUDOKU_BASE_BOARD)
    board[0][0] = -1

    const result = solvePuzzle(board)

    // isValidPuzzle doesn't validate value range, so it passes through
    expect(result.board).not.toBeNull()

    if (result.board) {
      expect(result.board[0][0]).toBe(-1)
    }
  })

  it('should solve a completely empty board', () => {
    const createEmptyRow = (): number[] => Array.from({ length: 9 }, () => SUDOKU_EMPTY_CELL)
    const board: number[][] = Array.from({ length: 9 }, createEmptyRow)

    const result = solvePuzzle(board)

    expect(result.board).not.toBeNull()

    if (result.board) {
      expect(isValidPuzzle(result.board)).toBe(true)
      const hasEmptyCells = result.board.flat().includes(SUDOKU_EMPTY_CELL)
      expect(hasEmptyCells).toBe(false)
    }
  })

  it('should return error for board with duplicate in row', () => {
    const board = cloneBoard(SUDOKU_BASE_BOARD)
    board[0][0] = 5
    board[0][4] = 5

    const result = solvePuzzle(board)

    expect(result.board).toBeNull()
    expect(result.error).toContain('duplicate')
    expect(result.error).toContain('row')
  })

  it('should return error for board with duplicate in column', () => {
    // Board with duplicate 1 in column 0 (rows 0 and 4), no row or box duplicates
    const board: BoardType = [
      [
        1,
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
        0,
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
        0,
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
        0,
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
        1,
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
        0,
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
        0,
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
        0,
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
        0,
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

    const result = solvePuzzle(board)

    expect(result.board).toBeNull()
    expect(result.error).toContain('duplicate')
    expect(result.error).toContain('column')
  })

  it('should return error for board with duplicate in box', () => {
    /*
     * Board with duplicate 5 in box (0,0): positions [0][0] and [1][1]
     * No row or column duplicates
     */
    const board: BoardType = [
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
        0,
        5,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
      ],
      [
        0,
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
        0,
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
        0,
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
        0,
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
        0,
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
        0,
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
        0,
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

    const result = solvePuzzle(board)

    expect(result.board).toBeNull()
    expect(result.error).toContain('duplicate')
    expect(result.error).toContain('box')
  })

  it('should return error when backtrack fails on unsolvable valid puzzle', () => {
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

    const result = solvePuzzle(board)

    expect(result.board).toBeNull()
    expect(result.error).toContain('unsolvable')
  })
})
