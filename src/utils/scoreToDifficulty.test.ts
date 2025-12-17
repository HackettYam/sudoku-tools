import { describe, expect, it } from 'vitest'

import { Difficulty } from '@/models'

import { scoreToDifficulty } from './scoreToDifficulty'

describe('scoreToDifficulty', () => {
  it('should return Novice for score < 20', () => {
    expect(scoreToDifficulty(0)).toBe(Difficulty.Novice)
    expect(scoreToDifficulty(10)).toBe(Difficulty.Novice)
    expect(scoreToDifficulty(19)).toBe(Difficulty.Novice)
  })

  it('should return Easy for score >= 20 and < 35', () => {
    expect(scoreToDifficulty(20)).toBe(Difficulty.Easy)
    expect(scoreToDifficulty(27)).toBe(Difficulty.Easy)
    expect(scoreToDifficulty(34)).toBe(Difficulty.Easy)
  })

  it('should return Normal for score >= 35 and < 50', () => {
    expect(scoreToDifficulty(35)).toBe(Difficulty.Normal)
    expect(scoreToDifficulty(42)).toBe(Difficulty.Normal)
    expect(scoreToDifficulty(49)).toBe(Difficulty.Normal)
  })

  it('should return Hard for score >= 50 and < 65', () => {
    expect(scoreToDifficulty(50)).toBe(Difficulty.Hard)
    expect(scoreToDifficulty(57)).toBe(Difficulty.Hard)
    expect(scoreToDifficulty(64)).toBe(Difficulty.Hard)
  })

  it('should return Expert for score >= 65', () => {
    expect(scoreToDifficulty(65)).toBe(Difficulty.Expert)
    expect(scoreToDifficulty(80)).toBe(Difficulty.Expert)
    expect(scoreToDifficulty(100)).toBe(Difficulty.Expert)
  })
})
