import { describe, expect, it } from 'vitest'

import {
  SUDOKU_DIFFICULTY_HINTS,
  SUDOKU_EMPTY_CELL,
  SUDOKU_SIZE,
} from '@/constants'
import { Difficulty, DifficultyHints } from '@/models'
import { countFilledCells, isValidPuzzle } from '@/utils'

import { generatePuzzle } from '../generatePuzzle'

describe('generatePuzzle', () => {
  it('should return board and solved properties', () => {
    const result = generatePuzzle()

    expect(result).toHaveProperty('board')
    expect(result).toHaveProperty('solved')
    expect(result.board).toBeInstanceOf(Array)
    expect(result.solved).toBeInstanceOf(Array)
  })

  it('should generate a valid solved board', () => {
    const { solved } = generatePuzzle()

    expect(isValidPuzzle(solved)).toBe(true)
    expect(countFilledCells(solved)).toBe(SUDOKU_SIZE * SUDOKU_SIZE)
  })

  it('should generate a valid puzzle board', () => {
    const { board } = generatePuzzle()

    expect(isValidPuzzle(board)).toBe(true)
  })

  it('should use Normal difficulty by default', () => {
    const { board } = generatePuzzle()
    const filledCells = countFilledCells(board)

    expect(filledCells).toBe(DifficultyHints.Normal)
  })

  it.each([
    [Difficulty.Novice, DifficultyHints.Novice],
    [Difficulty.Easy, DifficultyHints.Easy],
    [Difficulty.Normal, DifficultyHints.Normal],
    [Difficulty.Hard, DifficultyHints.Hard],
    [Difficulty.Expert, DifficultyHints.Expert],
  ])('should generate puzzle with correct hints for %s difficulty', (difficulty, expectedHints) => {
    const { board } = generatePuzzle(difficulty)
    const filledCells = countFilledCells(board)

    expect(filledCells).toBe(expectedHints)
  })

  it('should generate different boards on multiple calls', () => {
    const result1 = generatePuzzle()
    const result2 = generatePuzzle()

    const boardsAreDifferent = JSON.stringify(result1.board) !== JSON.stringify(result2.board)
      || JSON.stringify(result1.solved) !== JSON.stringify(result2.solved)

    expect(boardsAreDifferent).toBe(true)
  })

  it('should ensure puzzle cells match solved board', () => {
    const { board, solved } = generatePuzzle()

    for (let r = 0; r < SUDOKU_SIZE; r++) {
      for (let c = 0; c < SUDOKU_SIZE; c++) {
        if (board[r][c] !== SUDOKU_EMPTY_CELL) {
          expect(board[r][c]).toBe(solved[r][c])
        }
      }
    }
  })

  it('should use SUDOKU_DIFFICULTY_HINTS mapping correctly', () => {
    for (const difficulty of Object.values(Difficulty)) {
      const expectedHints = SUDOKU_DIFFICULTY_HINTS[difficulty]
      const { board } = generatePuzzle(difficulty)
      const filledCells = countFilledCells(board)

      expect(filledCells).toBe(expectedHints)
    }
  })
})
