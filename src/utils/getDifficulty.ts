import { SUDOKU_SIZE } from '@/constants'
import { type BoardType, Difficulty, type DifficultyType } from '@/models'

import { countEmptyCells } from './countEmptyCells'
import { getCandidates } from './getCandidates'

/**
 * Result of difficulty analysis
 */
interface DifficultyResult {
  /** Average number of candidates per empty cell */
  avgCandidates: number

  /** The estimated difficulty level */
  difficulty: DifficultyType

  /** Number of empty cells in the puzzle */
  emptyCells: number

  /** Minimum candidates found in any empty cell */
  minCandidates: number

  /** Score used to determine difficulty (lower = easier) */
  score: number
}

interface ScoreParams {
  avgCandidates: number
  emptyCells: number
  fewCandidatesRatio: number
  minCandidates: number
}

function calculateDifficultyScore(params: ScoreParams): number {
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

function scoreToDifficulty(score: number): DifficultyType {
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
interface AnalysisResult {
  avg: number
  fewRatio: number
  min: number
  total: number
}

function analyzeCandidates(board: BoardType, emptyCount: number): AnalysisResult {
  let totalCandidates = 0
  let minCandidates = SUDOKU_SIZE
  let cellsWithFewCandidates = 0

  for (let row = 0; row < SUDOKU_SIZE; row++) {
    for (let col = 0; col < SUDOKU_SIZE; col++) {
      if (board[row][col] === 0) {
        const candidates = getCandidates(board, row, col)
        const count = candidates.length

        totalCandidates += count
        if (count < minCandidates) minCandidates = count
        if (count <= 2) cellsWithFewCandidates++
      }
    }
  }

  return {
    avg: totalCandidates / emptyCount,
    fewRatio: cellsWithFewCandidates / emptyCount,
    min: minCandidates,
    total: totalCandidates,
  }
}

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

export type { DifficultyResult }
