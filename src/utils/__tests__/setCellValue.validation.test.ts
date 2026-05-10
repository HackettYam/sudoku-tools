import { describe, expect, it } from 'vitest'

import { SUDOKU_BASE_BOARD } from '../../constants'
import { cloneBoard } from '../cloneBoard'
import { setCellValue } from '../setCellValue'

describe('setCellValue - Input Validation', () => {
  it('should throw Error for negative row', () => {
    const board = cloneBoard(SUDOKU_BASE_BOARD)

    expect(() => setCellValue(board, { col: 0, row: -1, value: 5 })).toThrow(/Invalid cell coordinates/)
  })

  it('should throw Error for negative col', () => {
    const board = cloneBoard(SUDOKU_BASE_BOARD)

    expect(() => setCellValue(board, { col: -5, row: 0, value: 5 })).toThrow(/Invalid cell coordinates/)
  })

  it('should throw Error for row >= 9', () => {
    const board = cloneBoard(SUDOKU_BASE_BOARD)

    expect(() => setCellValue(board, { col: 0, row: 9, value: 5 })).toThrow(/Invalid cell coordinates/)
  })

  it('should throw Error for col >= 9', () => {
    const board = cloneBoard(SUDOKU_BASE_BOARD)

    expect(() => setCellValue(board, { col: 9, row: 0, value: 5 })).toThrow(/Invalid cell coordinates/)
  })

  it('should throw Error for both invalid row and col', () => {
    const board = cloneBoard(SUDOKU_BASE_BOARD)

    expect(() => setCellValue(board, { col: 9, row: -1, value: 5 })).toThrow(/Invalid cell coordinates/)
  })

  it('should throw Error with message containing invalid values', () => {
    const board = cloneBoard(SUDOKU_BASE_BOARD)

    expect(() => setCellValue(board, { col: 20, row: 15, value: 5 })).toThrow(/15.*20/)
  })

  it('should throw Error with message containing valid range', () => {
    const board = cloneBoard(SUDOKU_BASE_BOARD)

    expect(() => setCellValue(board, { col: 0, row: 9, value: 5 })).toThrow(/0 and 8/)
  })

  it('should work for valid boundary values (0, 0)', () => {
    const board = cloneBoard(SUDOKU_BASE_BOARD)

    const newBoard = setCellValue(board, { col: 0, row: 0, value: 5 })

    expect(newBoard[0][0]).toBe(5)
  })

  it('should work for valid boundary values (8, 8)', () => {
    const board = cloneBoard(SUDOKU_BASE_BOARD)

    const newBoard = setCellValue(board, { col: 8, row: 8, value: 9 })

    expect(newBoard[8][8]).toBe(9)
  })
})
