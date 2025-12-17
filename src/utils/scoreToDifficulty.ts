import { Difficulty, type DifficultyType } from '@/models'

/**
 * Converts a numeric score to a difficulty level.
 *
 * @param score - Numeric difficulty score (0-100)
 * @returns The corresponding difficulty level
 *
 * @example
 * ```typescript
 * import { scoreToDifficulty, Difficulty } from '@hackettyam/sudoku-tools'
 *
 * const difficulty = scoreToDifficulty(45)
 * console.log(difficulty) // Difficulty.Normal
 * ```
 */
export function scoreToDifficulty(score: number): DifficultyType {
  if (score < 20) {
    return Difficulty.Novice
  }
  if (score < 35) {
    return Difficulty.Easy
  }
  if (score < 50) {
    return Difficulty.Normal
  }
  if (score < 65) {
    return Difficulty.Hard
  }

  return Difficulty.Expert
}
