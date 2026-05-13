import { describe, expect, it } from 'vitest'

import { createSudoku } from '../../src/features/createSudoku'
import { Difficulty } from '../../src/models'
import { deserializeBoard, serializeBoard } from '../../src/utils'

const difficultyNames: Record<Difficulty, string> = {
  [Difficulty.Novice]: 'Novice',
  [Difficulty.Easy]: 'Easy',
  [Difficulty.Normal]: 'Normal',
  [Difficulty.Hard]: 'Hard',
  [Difficulty.Expert]: 'Expert',
}

describe('Serialization Round-Trip', () => {
  const difficulties = [
    Difficulty.Novice,
    Difficulty.Easy,
    Difficulty.Normal,
    Difficulty.Hard,
    Difficulty.Expert,
  ]

  difficulties.forEach(diff => {
    it(`should serialize and deserialize ${difficultyNames[diff]} board without data loss`, () => {
      const puzzle = createSudoku(diff)
      const serialized = serializeBoard(puzzle.current)
      const deserialized = deserializeBoard(serialized)

      expect(deserialized).toEqual(puzzle.current)
    })
  })

  it('should handle fully solved boards', () => {
    const puzzle = createSudoku(Difficulty.Novice)
    const serialized = serializeBoard(puzzle.solution)
    const deserialized = deserializeBoard(serialized)

    expect(deserialized).toEqual(puzzle.solution)
  })

  it('should handle empty boards', () => {
    const empty: number[][] = Array.from({ length: 9 }, () => Array(9).fill(0) as number[])
    const serialized = serializeBoard(empty)
    const deserialized = deserializeBoard(serialized)

    expect(deserialized).toEqual(empty)
  })

  it('should produce valid serialized string', () => {
    const puzzle = createSudoku(Difficulty.Normal)
    const serialized = serializeBoard(puzzle.current)

    expect(typeof serialized).toBe('string')
    expect(serialized.length).toBeGreaterThan(0)

    // Serialized string should contain only digits and commas
    expect(serialized).toMatch(/^[\d,]+$/)
  })

  it('should throw on invalid serialized string', () => {
    expect(() => deserializeBoard('invalid')).toThrow()
    expect(() => deserializeBoard('')).toThrow()
  })

  it('should preserve cell values through multiple serialize/deserialize cycles', () => {
    const puzzle = createSudoku(Difficulty.Normal)

    let { current } = puzzle

    // Multiple round-trips
    for (let i = 0; i < 3; i++) {
      const serialized = serializeBoard(current)
      current = deserializeBoard(serialized)
    }

    expect(current).toEqual(puzzle.current)
  })
})
