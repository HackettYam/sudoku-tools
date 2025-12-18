import { describe, expect, it } from 'vitest'

import { calculateDifficultyScore } from '../calculateDifficultyScore'

describe('calculateDifficultyScore', () => {
  it('should return 0 for easiest puzzle', () => {
    const score = calculateDifficultyScore({
      avgCandidates: 1,
      emptyCells: 0,
      fewCandidatesRatio: 1,
      minCandidates: 1,
    })

    expect(score).toBe(0)
  })

  it('should return higher score for more empty cells', () => {
    const score1 = calculateDifficultyScore({
      avgCandidates: 3,
      emptyCells: 20,
      fewCandidatesRatio: 0.5,
      minCandidates: 2,
    })

    const score2 = calculateDifficultyScore({
      avgCandidates: 3,
      emptyCells: 50,
      fewCandidatesRatio: 0.5,
      minCandidates: 2,
    })

    expect(score2).toBeGreaterThan(score1)
  })

  it('should return higher score for more candidates', () => {
    const score1 = calculateDifficultyScore({
      avgCandidates: 2,
      emptyCells: 40,
      fewCandidatesRatio: 0.5,
      minCandidates: 2,
    })

    const score2 = calculateDifficultyScore({
      avgCandidates: 6,
      emptyCells: 40,
      fewCandidatesRatio: 0.5,
      minCandidates: 2,
    })

    expect(score2).toBeGreaterThan(score1)
  })

  it('should return higher score for fewer cells with few candidates', () => {
    const score1 = calculateDifficultyScore({
      avgCandidates: 4,
      emptyCells: 40,
      fewCandidatesRatio: 0.8,
      minCandidates: 2,
    })

    const score2 = calculateDifficultyScore({
      avgCandidates: 4,
      emptyCells: 40,
      fewCandidatesRatio: 0.2,
      minCandidates: 2,
    })

    expect(score2).toBeGreaterThan(score1)
  })

  it('should return score between 0 and 100', () => {
    const score = calculateDifficultyScore({
      avgCandidates: 5,
      emptyCells: 50,
      fewCandidatesRatio: 0.3,
      minCandidates: 3,
    })

    expect(score).toBeGreaterThanOrEqual(0)
    expect(score).toBeLessThanOrEqual(100)
  })
})
