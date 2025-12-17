import { describe, expect, it } from 'vitest'

import { SUDOKU_BASE_BOARD, SUDOKU_EMPTY_CELL } from '@/constants'

import { cloneBoard } from './cloneBoard'
import { getHint } from './getHint'

describe('getHint', () => {
  it('should return hint for first empty cell', () => {
    const board = cloneBoard(SUDOKU_BASE_BOARD)
    const solved = cloneBoard(SUDOKU_BASE_BOARD)
    board[0][0] = SUDOKU_EMPTY_CELL

    const hint = getHint(board, solved)

    expect(hint).not.toBeNull()
    expect(hint?.row).toBe(0)
    expect(hint?.col).toBe(0)
    expect(hint?.value).toBe(SUDOKU_BASE_BOARD[0][0])
  })

  it('should return null for complete board', () => {
    const board = cloneBoard(SUDOKU_BASE_BOARD)
    const solved = cloneBoard(SUDOKU_BASE_BOARD)

    const hint = getHint(board, solved)

    expect(hint).toBeNull()
  })

  it('should find hint in middle of board', () => {
    const board = cloneBoard(SUDOKU_BASE_BOARD)
    const solved = cloneBoard(SUDOKU_BASE_BOARD)
    board[4][4] = SUDOKU_EMPTY_CELL

    const hint = getHint(board, solved)

    expect(hint).not.toBeNull()
    expect(hint?.row).toBe(4)
    expect(hint?.col).toBe(4)
    expect(hint?.value).toBe(SUDOKU_BASE_BOARD[4][4])
  })

  it('should return first empty cell when multiple empty', () => {
    const board = cloneBoard(SUDOKU_BASE_BOARD)
    const solved = cloneBoard(SUDOKU_BASE_BOARD)
    board[5][5] = SUDOKU_EMPTY_CELL
    board[2][2] = SUDOKU_EMPTY_CELL

    const hint = getHint(board, solved)

    expect(hint).not.toBeNull()
    expect(hint?.row).toBe(2)
    expect(hint?.col).toBe(2)
  })

  it('should return correct value from solution', () => {
    const board = cloneBoard(SUDOKU_BASE_BOARD)
    const solved = cloneBoard(SUDOKU_BASE_BOARD)

    for (let r = 0; r < 3; r++) {
      for (let c = 0; c < 3; c++) {
        board[r][c] = SUDOKU_EMPTY_CELL
      }
    }

    const hint = getHint(board, solved)

    expect(hint).not.toBeNull()

    if (hint) {
      expect(hint.value).toBe(solved[hint.row][hint.col])
    }
  })
})
