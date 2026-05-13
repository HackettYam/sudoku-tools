import { describe, expect, it } from 'vitest'

import { createSudoku } from '../../src/features/createSudoku'
import { Difficulty } from '../../src/models'
import { isValidPuzzle } from '../../src/utils/isValidPuzzle'
import { solvePuzzle } from '../../src/utils/solvePuzzle'

const difficultyNames: Record<Difficulty, string> = {
  [Difficulty.Novice]: 'Novice',
  [Difficulty.Easy]: 'Easy',
  [Difficulty.Normal]: 'Normal',
  [Difficulty.Hard]: 'Hard',
  [Difficulty.Expert]: 'Expert',
}

describe('Create → Solve → Validate Pipeline', () => {
  const difficulties = [
    Difficulty.Novice,
    Difficulty.Easy,
    Difficulty.Normal,
    Difficulty.Hard,
    Difficulty.Expert,
  ]

  difficulties.forEach(diff => {
    it(`should create, solve, and validate ${difficultyNames[diff]} puzzle`, () => {
      const puzzle = createSudoku(diff)
      const result = solvePuzzle(puzzle.current)

      expect(result.board).not.toBeNull()
      expect(result.error).toBeUndefined()

      if (result.board) {
        expect(isValidPuzzle(result.board)).toBe(true)
      }
    })
  })

  it('should handle already-solved puzzles', () => {
    const puzzle = createSudoku(Difficulty.Novice)
    const result = solvePuzzle(puzzle.solution)

    expect(result.board).not.toBeNull()
    expect(result.error).toBeUndefined()
    expect(result.board).toEqual(puzzle.solution)
  })

  it('should report unsolvable boards with detailed error', () => {
    // Create an invalid board with duplicate in row
    const board = [
      [
        1,
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
        5,
        6,
        7,
        8,
        9,
        1,
        2,
        3,
      ],
      [
        7,
        8,
        9,
        1,
        2,
        3,
        4,
        5,
        6,
      ],
      [
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        1,
      ],
      [
        5,
        6,
        7,
        8,
        9,
        1,
        2,
        3,
        4,
      ],
      [
        8,
        9,
        1,
        2,
        3,
        4,
        5,
        6,
        7,
      ],
      // Invalid: duplicate 3 in column
      [
        3,
        1,
        2,
        6,
        4,
        5,
        9,
        7,
        8,
      ],
      [
        6,
        4,
        5,
        9,
        1,
        8,
        3,
        7,
        2,
      ],
      [
        9,
        7,
        8,
        3,
        5,
        2,
        6,
        1,
        4,
      ],
    ]

    const result = solvePuzzle(board)
    expect(result.board).toBeNull()
    expect(result.error).toBeDefined()
    expect(result.error).toContain('duplicate found in')
  })

  it('should preserve read-only cells after solving', () => {
    const puzzle = createSudoku(Difficulty.Normal)

    // After solving, the solved board should have same readOnly pattern
    const result = solvePuzzle(puzzle.current)
    expect(result.board).not.toBeNull()

    // Check that original readOnly cells match solved values
    const solved = result.board
    if (solved) {
      for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
          if (puzzle.readOnly[row][col]) {
            expect(solved[row][col]).toBe(puzzle.solution[row][col])
          }
        }
      }
    }
  })
})
