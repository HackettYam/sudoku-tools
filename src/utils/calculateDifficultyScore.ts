/**
 * Parameters for calculating difficulty score
 */
interface ScoreParams {
  avgCandidates: number
  emptyCells: number
  fewCandidatesRatio: number
  minCandidates: number
}

/**
 * Calculates a numeric difficulty score based on puzzle analysis.
 *
 * @param params - Score calculation parameters
 * @returns A numeric score (0-100) representing difficulty
 *
 * @example
 * ```typescript
 * import { calculateDifficultyScore } from '@hackettyam/sudoku-tools'
 *
 * const score = calculateDifficultyScore({
 *   avgCandidates: 4.5,
 *   emptyCells: 50,
 *   fewCandidatesRatio: 0.2,
 *   minCandidates: 2
 * })
 * ```
 */
export function calculateDifficultyScore(params: ScoreParams): number {
  const { avgCandidates, emptyCells, fewCandidatesRatio, minCandidates } = params

  const emptyWeight = 0.4
  const avgCandidatesWeight = 0.3
  const minCandidatesWeight = 0.15
  const fewCandidatesWeight = 0.15

  const emptyScore = (emptyCells / 64) * 100
  const avgScore = ((avgCandidates - 1) / 8) * 100
  const minScore = minCandidates === 1 ? 0 : ((minCandidates - 1) / 8) * 100
  const fewScore = (1 - fewCandidatesRatio) * 100

  return (emptyScore * emptyWeight)
    + (avgScore * avgCandidatesWeight)
    + (minScore * minCandidatesWeight)
    + (fewScore * fewCandidatesWeight)
}
