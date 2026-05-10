/* eslint-disable max-lines-per-function */

import { describe, expect, it } from 'vitest'

import { SUDOKU_BASE_BOARD, SUDOKU_EMPTY_CELL } from '../../constants'
import { type CellValue, Difficulty } from '../../models'
import { cloneBoard } from '../../utils'
import { SudokuPuzzle } from '../sudoku.entity'

/**
 * Creates a test puzzle with a known state
 */
function createTestPuzzle(): SudokuPuzzle {
  const solved = cloneBoard(SUDOKU_BASE_BOARD)
  const board = cloneBoard(SUDOKU_BASE_BOARD)

  board[0][0] = SUDOKU_EMPTY_CELL
  board[0][1] = SUDOKU_EMPTY_CELL
  board[1][0] = SUDOKU_EMPTY_CELL

  return new SudokuPuzzle({
    board,
    difficulty: Difficulty.Normal,
    solved,
  })
}

describe('SudokuPuzzle', () => {
  describe('constructor', () => {
    it('should initialize with correct properties', () => {
      const puzzle = createTestPuzzle()

      expect(puzzle.current).toBeInstanceOf(Array)
      expect(puzzle.original).toBeInstanceOf(Array)
      expect(puzzle.solution).toBeInstanceOf(Array)
      expect(puzzle.readOnly).toBeInstanceOf(Array)
      expect(puzzle.difficulty).toBe(Difficulty.Normal)
    })

    it('should clone boards to prevent mutation', () => {
      const solved = cloneBoard(SUDOKU_BASE_BOARD)
      const board = cloneBoard(SUDOKU_BASE_BOARD)
      board[0][0] = SUDOKU_EMPTY_CELL

      const puzzle = new SudokuPuzzle({
        board,
        difficulty: Difficulty.Easy,
        solved,
      })

      board[0][1] = SUDOKU_EMPTY_CELL
      expect(puzzle.current[0][1]).not.toBe(SUDOKU_EMPTY_CELL)
    })

    it('should set readOnly mask correctly', () => {
      const puzzle = createTestPuzzle()

      expect(puzzle.readOnly[0][0]).toBe(false)
      expect(puzzle.readOnly[0][1]).toBe(false)
      expect(puzzle.readOnly[1][0]).toBe(false)
      expect(puzzle.readOnly[0][2]).toBe(true)
    })
  })

  describe('setCell', () => {
    it('should set value in empty cell', () => {
      const puzzle = createTestPuzzle()

      const result = puzzle.setCell(0, 0, 1)

      expect(result).toBe(true)
      expect(puzzle.current[0][0]).toBe(1)
    })

    it('should not set value in read-only cell', () => {
      const puzzle = createTestPuzzle()
      const [ [,, originalValue] ] = puzzle.current

      const result = puzzle.setCell(0, 2, 9)

      expect(result).toBe(false)
      expect(puzzle.current[0][2]).toBe(originalValue)
    })

    it('should allow setting empty value', () => {
      const puzzle = createTestPuzzle()
      puzzle.setCell(0, 0, 5)

      const result = puzzle.setCell(0, 0, SUDOKU_EMPTY_CELL)

      expect(result).toBe(true)
      expect(puzzle.current[0][0]).toBe(SUDOKU_EMPTY_CELL)
    })
  })

  describe('clearCell', () => {
    it('should clear cell that is not read-only', () => {
      const puzzle = createTestPuzzle()
      puzzle.setCell(0, 0, 5)

      const result = puzzle.clearCell(0, 0)

      expect(result).toBe(true)
      expect(puzzle.current[0][0]).toBe(SUDOKU_EMPTY_CELL)
    })

    it('should not clear read-only cell', () => {
      const puzzle = createTestPuzzle()
      const [ [,, originalValue] ] = puzzle.current

      const result = puzzle.clearCell(0, 2)

      expect(result).toBe(false)
      expect(puzzle.current[0][2]).toBe(originalValue)
    })
  })

  describe('getCandidates', () => {
    it('should return valid candidates for empty cell', () => {
      const puzzle = createTestPuzzle()

      const candidates = puzzle.getCandidates(0, 0)

      expect(candidates).toBeInstanceOf(Array)
      expect(candidates.length).toBeGreaterThan(0)
      expect(candidates).toContain(puzzle.solution[0][0])
    })

    it('should return empty array for filled cell', () => {
      const puzzle = createTestPuzzle()

      const candidates = puzzle.getCandidates(0, 2)

      expect(candidates).toEqual([])
    })
  })

  describe('getHint', () => {
    it('should return hint for empty cell', () => {
      const puzzle = createTestPuzzle()

      const hint = puzzle.getHint()

      expect(hint).not.toBeNull()
      expect(hint?.row).toBeDefined()
      expect(hint?.col).toBeDefined()
      expect(hint?.value).toBeDefined()
    })

    it('should return correct value from solution', () => {
      const puzzle = createTestPuzzle()

      const hint = puzzle.getHint()

      if (hint) {
        expect(hint.value).toBe(puzzle.solution[hint.row][hint.col])
      }
    })

    it('should return null when puzzle is complete', () => {
      const solved = cloneBoard(SUDOKU_BASE_BOARD)
      const puzzle = new SudokuPuzzle({
        board: solved,
        difficulty: Difficulty.Normal,
        solved,
      })

      const hint = puzzle.getHint()

      expect(hint).toBeNull()
    })
  })

  describe('getProgress', () => {
    it('should return correct statistics', () => {
      const puzzle = createTestPuzzle()

      const progress = puzzle.getProgress()

      expect(progress).toHaveProperty('emptyCells')
      expect(progress).toHaveProperty('filledCells')
      expect(progress).toHaveProperty('validCells')
      expect(progress).toHaveProperty('invalidCells')
      expect(progress).toHaveProperty('progress')
    })

    it('should count empty cells correctly', () => {
      const puzzle = createTestPuzzle()

      const progress = puzzle.getProgress()

      expect(progress.emptyCells).toBe(3)
      expect(progress.filledCells).toBe(81 - 3)
    })

    it('should calculate progress percentage', () => {
      const puzzle = createTestPuzzle()

      const progress = puzzle.getProgress()
      const expectedProgress = Math.round(((81 - 3) / 81) * 100)

      expect(progress.progress).toBe(expectedProgress)
    })

    it('should track valid and invalid cells', () => {
      const puzzle = createTestPuzzle()
      const hint = puzzle.getHint()

      if (hint) {
        puzzle.setCell(hint.row, hint.col, hint.value)
      }

      const progress = puzzle.getProgress()

      expect(progress.validCells).toBeGreaterThan(0)
      expect(progress.invalidCells).toBe(0)
    })
  })

  describe('isComplete', () => {
    it('should return false for incomplete puzzle', () => {
      const puzzle = createTestPuzzle()

      expect(puzzle.isComplete()).toBe(false)
    })

    it('should return true for complete and valid puzzle', () => {
      const solved = cloneBoard(SUDOKU_BASE_BOARD)
      const puzzle = new SudokuPuzzle({
        board: solved,
        difficulty: Difficulty.Normal,
        solved,
      })

      expect(puzzle.isComplete()).toBe(true)
    })
  })

  describe('isValidMove', () => {
    it('should return true for valid move', () => {
      const puzzle = createTestPuzzle()
      const [ [correctValue] ] = puzzle.solution

      const isValid = puzzle.isValidMove(0, 0, correctValue as CellValue)

      expect(isValid).toBe(true)
    })

    it('should return false for read-only cell', () => {
      const puzzle = createTestPuzzle()

      const isValid = puzzle.isValidMove(0, 2, 5)

      expect(isValid).toBe(false)
    })

    it('should return true for empty value', () => {
      const puzzle = createTestPuzzle()

      const isValid = puzzle.isValidMove(0, 0, SUDOKU_EMPTY_CELL)

      expect(isValid).toBe(true)
    })

    it('should return false for invalid placement', () => {
      const puzzle = createTestPuzzle()
      const [ [,, existingValue] ] = puzzle.current

      const isValid = puzzle.isValidMove(0, 0, existingValue as CellValue)

      expect(isValid).toBe(false)
    })
  })

  describe('isSolved', () => {
    it('should return false for incomplete puzzle', () => {
      const puzzle = createTestPuzzle()

      expect(puzzle.isSolved()).toBe(false)
    })

    it('should return true when current matches solution', () => {
      const solved = cloneBoard(SUDOKU_BASE_BOARD)
      const puzzle = new SudokuPuzzle({
        board: solved,
        difficulty: Difficulty.Normal,
        solved,
      })

      expect(puzzle.isSolved()).toBe(true)
    })

    it('should return false when filled incorrectly', () => {
      const puzzle = createTestPuzzle()
      const wrongValue = puzzle.solution[0][0] === 9 ? 1 : 9

      puzzle.setCell(0, 0, wrongValue)

      expect(puzzle.isSolved()).toBe(false)
    })
  })

  describe('reset', () => {
    it('should reset current to original state', () => {
      const puzzle = createTestPuzzle()
      const originalJson = JSON.stringify(puzzle.current)

      puzzle.setCell(0, 0, 5)
      puzzle.setCell(0, 1, 6)

      puzzle.reset()

      expect(JSON.stringify(puzzle.current)).toBe(originalJson)
    })

    it('should not affect original board', () => {
      const puzzle = createTestPuzzle()
      const originalJson = JSON.stringify(puzzle.original)

      puzzle.setCell(0, 0, 5)
      puzzle.reset()

      expect(JSON.stringify(puzzle.original)).toBe(originalJson)
    })

    it('should allow reset with randomize flag', () => {
      const puzzle = createTestPuzzle()
      puzzle.reset(true)

      expect(puzzle.current).toBeDefined()
    })
  })

  describe('full gameplay scenario', () => {
    it('should complete puzzle by filling all hints', () => {
      const puzzle = createTestPuzzle()

      while (!puzzle.isSolved()) {
        const hint = puzzle.getHint()

        if (!hint) {
          break
        }
        puzzle.setCell(hint.row, hint.col, hint.value)
      }

      expect(puzzle.isSolved()).toBe(true)
      expect(puzzle.isComplete()).toBe(true)
      expect(puzzle.getProgress().progress).toBe(100)
    })

    it('should track progress as cells are filled', () => {
      const puzzle = createTestPuzzle()
      const initialProgress = puzzle.getProgress()

      const hint = puzzle.getHint()

      if (hint) {
        puzzle.setCell(hint.row, hint.col, hint.value)
      }

      const newProgress = puzzle.getProgress()

      expect(newProgress.filledCells).toBe(initialProgress.filledCells + 1)
      expect(newProgress.emptyCells).toBe(initialProgress.emptyCells - 1)
    })
  })
})
