import { type BoardType, Difficulty, type DifficultyResult } from '../models'
import { analyzeCandidates } from './analyzeCandidates'
import { calculateDifficultyScore } from './calculateDifficultyScore'
import { countEmptyCells } from './countEmptyCells'
import { scoreToDifficulty } from './scoreToDifficulty'

/**
 * Estimates the difficulty of a Sudoku puzzle based on various factors:
 * - Number of empty cells
 * - Average candidates per cell
 * - Minimum candidates (naked singles)
 *
 * @param board - The Sudoku puzzle to analyze
 * @returns DifficultyResult with difficulty level and analysis details
 *
 * @example
 * ```typescript
 * import { getDifficulty, createSudoku, Difficulty } from '@hackettyam/sudoku-tools'
 *
 * const { board } = createSudoku(Difficulty.Hard)
 * const result = getDifficulty(board)
 *
 * console.log(result.difficulty) // 'hard'
 * console.log(result.emptyCells) // ~51
 * console.log(result.avgCandidates) // ~4.5
 * ```
 */
export function getDifficulty(board: BoardType): DifficultyResult {
  const emptyCount = countEmptyCells(board)

  if (emptyCount === 0) {
    return {
      avgCandidates: 0,
      difficulty: Difficulty.Novice,
      emptyCells: 0,
      minCandidates: 0,
      score: 0,
    }
  }

  const analysis = analyzeCandidates(board, emptyCount)
  const score = calculateDifficultyScore({
    avgCandidates: analysis.avg,
    emptyCells: emptyCount,
    fewCandidatesRatio: analysis.fewRatio,
    minCandidates: analysis.min,
  })

  return {
    avgCandidates: Math.round(analysis.avg * 100) / 100,
    difficulty: scoreToDifficulty(score),
    emptyCells: emptyCount,
    minCandidates: analysis.min,
    score: Math.round(score * 100) / 100,
  }
}
