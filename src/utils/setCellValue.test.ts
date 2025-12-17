import { describe, expect, it } from 'vitest'

import { SUDOKU_BASE_BOARD } from '@/constants'

import { cloneBoard } from './cloneBoard'
import { setCellValue } from './setCellValue'

describe('setCellValue', () => {
  it('should return a new board with the value set', () => {
    const board = cloneBoard(SUDOKU_BASE_BOARD)

    const newBoard = setCellValue(board, { col: 0, row: 0, value: 5 })

    expect(newBoard[0][0]).toBe(5)
  })

  it('should not modify the original board', () => {
    const board = cloneBoard(SUDOKU_BASE_BOARD)
    const [r, c] = [0, 0]
    const originalValue = board[r][c]

    setCellValue(board, { col: 0, row: 0, value: 5 })

    expect(board[0][0]).toBe(originalValue)
  })

  it('should return a different board instance', () => {
    const board = cloneBoard(SUDOKU_BASE_BOARD)

    const newBoard = setCellValue(board, { col: 0, row: 0, value: 5 })

    expect(newBoard).not.toBe(board)
  })

  it('should preserve other cell values', () => {
    const board = cloneBoard(SUDOKU_BASE_BOARD)

    const newBoard = setCellValue(board, { col: 0, row: 0, value: 5 })

    expect(newBoard[0][1]).toBe(board[0][1])
    expect(newBoard[8][8]).toBe(board[8][8])
  })

  it('should handle setting value to 0', () => {
    const board = cloneBoard(SUDOKU_BASE_BOARD)

    const newBoard = setCellValue(board, { col: 0, row: 0, value: 0 })

    expect(newBoard[0][0]).toBe(0)
  })
})
