import { describe, expect, it } from 'vitest'

import { createSudoku } from '../../src/features/createSudoku'
import { Difficulty } from '../../src/models'
import { getDifficulty } from '../../src/utils/getDifficulty'

describe('Difficulty Scaling', () => {
  const difficultyLevels = [
    Difficulty.Novice,
    Difficulty.Easy,
    Difficulty.Normal,
    Difficulty.Hard,
    Difficulty.Expert,
  ] as const

  const difficultyKeys = [
    'Novice',
    'Easy',
    'Normal',
    'Hard',
    'Expert',
  ] as const

  difficultyLevels.forEach((diff, index) => {
    it(`should generate ${difficultyKeys[index]} puzzle with appropriate difficulty score`, () => {
      const puzzle = createSudoku(diff)
      const score = getDifficulty(puzzle.current)

      expect(score).toBeDefined()
      expect(typeof score.score).toBe('number')
      expect(score.score).toBeGreaterThan(0)
    })
  })

  it('should produce increasing difficulty scores across levels', () => {
    const scores: Record<string, number> = {}

    for (let i = 0; i < difficultyLevels.length; i++) {
      const diff = difficultyLevels[i]
      const puzzle = createSudoku(diff)
      const result = getDifficulty(puzzle.current)
      scores[difficultyKeys[i]] = result.score
    }

    // Scores should generally increase (not guaranteed, but expected)
    expect(scores.Novice).toBeLessThanOrEqual(scores.Easy)
    expect(scores.Easy).toBeLessThanOrEqual(scores.Normal)
    expect(scores.Normal).toBeLessThanOrEqual(scores.Hard)
    expect(scores.Hard).toBeLessThanOrEqual(scores.Expert)
  })

  it('should handle edge case: fully solved board', () => {
    const puzzle = createSudoku(Difficulty.Novice)
    const score = getDifficulty(puzzle.solution)

    expect(score).toBeDefined()
    expect(score.score).toBe(0)
    expect(score.emptyCells).toBe(0)
  })

  it('should handle edge case: empty board', () => {
    const empty: number[][] = Array.from({ length: 9 }, () => Array(9).fill(0) as number[])
    const score = getDifficulty(empty)

    expect(score).toBeDefined()
    expect(score.score).toBeGreaterThan(0)
    expect(score.emptyCells).toBe(81)
  })

  it('should return consistent results for same difficulty', () => {
    const scores: number[] = []

    // Generate 5 puzzles at the same difficulty
    for (let i = 0; i < 5; i++) {
      const puzzle = createSudoku(Difficulty.Normal)
      const result = getDifficulty(puzzle.current)
      scores.push(result.score)
    }

    /*
     * All scores should be in a reasonable range for Normal difficulty
     * (not too easy, not too hard)
     */
    const avgScore = scores.reduce((a, b) => a + b, 0) / scores.length
    expect(avgScore).toBeGreaterThan(0)
    expect(avgScore).toBeLessThan(100)
  })

  it('should calculate emptyCells correctly', () => {
    const puzzle = createSudoku(Difficulty.Normal)
    const result = getDifficulty(puzzle.current)

    // Count empty cells manually
    let emptyCount = 0
    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        if (puzzle.current[row][col] === 0) {
          emptyCount++
        }
      }
    }

    expect(result.emptyCells).toBe(emptyCount)
  })
})
