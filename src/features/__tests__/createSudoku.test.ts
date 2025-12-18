import { describe, expect, it } from 'vitest'

import { SUDOKU_DIFFICULTY_HINTS, SUDOKU_EMPTY_CELL, SUDOKU_SIZE } from '@/constants'
import { SudokuPuzzle } from '@/entities/sudoku.entity'
import { Difficulty, DifficultyHints } from '@/models'
import { countFilledCells, isValidPuzzle } from '@/utils'

import { createSudoku } from '../createSudoku'

describe('createSudoku', () => {
  it('should return a SudokuPuzzle instance', () => {
    const puzzle = createSudoku()

    expect(puzzle).toBeInstanceOf(SudokuPuzzle)
    expect(puzzle.current).toBeInstanceOf(Array)
    expect(puzzle.solution).toBeInstanceOf(Array)
    expect(puzzle.original).toBeInstanceOf(Array)
    expect(puzzle.readOnly).toBeInstanceOf(Array)
  })

  it('should generate a valid solved board', () => {
    const puzzle = createSudoku()

    expect(isValidPuzzle(puzzle.solution)).toBe(true)
    expect(countFilledCells(puzzle.solution)).toBe(SUDOKU_SIZE * SUDOKU_SIZE)
  })

  it('should generate a valid puzzle board', () => {
    const puzzle = createSudoku()

    expect(isValidPuzzle(puzzle.current)).toBe(true)
  })

  it('should use Normal difficulty by default', () => {
    const puzzle = createSudoku()
    const filledCells = countFilledCells(puzzle.current)

    expect(filledCells).toBe(DifficultyHints.Normal)
    expect(puzzle.difficulty).toBe(Difficulty.Normal)
  })

  it.each([
    [Difficulty.Novice, DifficultyHints.Novice],
    [Difficulty.Easy, DifficultyHints.Easy],
    [Difficulty.Normal, DifficultyHints.Normal],
    [Difficulty.Hard, DifficultyHints.Hard],
    [Difficulty.Expert, DifficultyHints.Expert],
  ])('should generate puzzle with correct hints for %s difficulty', (difficulty, expectedHints) => {
    const puzzle = createSudoku(difficulty)
    const filledCells = countFilledCells(puzzle.current)

    expect(filledCells).toBe(expectedHints)
    expect(puzzle.difficulty).toBe(difficulty)
  })

  it('should generate different boards on multiple calls', () => {
    const puzzle1 = createSudoku()
    const puzzle2 = createSudoku()

    const boardsAreDifferent = JSON.stringify(puzzle1.current) !== JSON.stringify(puzzle2.current)
      || JSON.stringify(puzzle1.solution) !== JSON.stringify(puzzle2.solution)

    expect(boardsAreDifferent).toBe(true)
  })

  it('should ensure puzzle cells match solved board', () => {
    const puzzle = createSudoku()

    for (let r = 0; r < SUDOKU_SIZE; r++) {
      for (let c = 0; c < SUDOKU_SIZE; c++) {
        if (puzzle.current[r][c] !== SUDOKU_EMPTY_CELL) {
          expect(puzzle.current[r][c]).toBe(puzzle.solution[r][c])
        }
      }
    }
  })

  it('should use SUDOKU_DIFFICULTY_HINTS mapping correctly', () => {
    for (const difficulty of Object.values(Difficulty)) {
      const expectedHints = SUDOKU_DIFFICULTY_HINTS[difficulty]
      const puzzle = createSudoku(difficulty)
      const filledCells = countFilledCells(puzzle.current)

      expect(filledCells).toBe(expectedHints)
    }
  })

  it('should have working entity methods', () => {
    const puzzle = createSudoku()

    expect(puzzle.isSolved()).toBe(false)
    expect(puzzle.isComplete()).toBe(false)
    expect(puzzle.getHint()).not.toBeNull()
    expect(puzzle.getProgress().filledCells).toBeGreaterThan(0)
  })

  it('should allow setting and clearing cells', () => {
    const puzzle = createSudoku()
    const hint = puzzle.getHint()

    if (hint) {
      expect(puzzle.setCell(hint.row, hint.col, hint.value)).toBe(true)
      expect(puzzle.current[hint.row][hint.col]).toBe(hint.value)
      expect(puzzle.clearCell(hint.row, hint.col)).toBe(true)
      expect(puzzle.current[hint.row][hint.col]).toBe(SUDOKU_EMPTY_CELL)
    }
  })

  it('should reset to original state', () => {
    const puzzle = createSudoku()
    const originalBoard = JSON.stringify(puzzle.current)

    const hint = puzzle.getHint()

    if (hint) {
      puzzle.setCell(hint.row, hint.col, hint.value)
    }

    puzzle.reset()
    expect(JSON.stringify(puzzle.current)).toBe(originalBoard)
  })
})
