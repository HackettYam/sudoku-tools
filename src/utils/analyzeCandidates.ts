import { SUDOKU_SIZE } from '../constants'
import type { BoardType } from '../models'
import { getCandidates } from './getCandidates'

/**
 * Result of candidate analysis for a Sudoku board.
 *
 * @example
 * ```typescript
 * const result: AnalysisResult = {
 *   avg: 4.5,
 *   fewRatio: 0.15,
 *   min: 2,
 *   total: 229
 * }
 * ```
 */
interface AnalysisResult {
  /** Average number of candidates per empty cell */
  avg: number

  /** Ratio of cells with 2 or fewer candidates */
  fewRatio: number

  /** Minimum candidates found in any empty cell */
  min: number

  /** Total number of candidates across all empty cells */
  total: number
}

/**
 * Analyzes candidates for all empty cells in a board.
 *
 * @param board - The Sudoku board to analyze
 * @param emptyCount - Number of empty cells in the board
 * @returns Analysis result with statistics about candidates
 *
 * @example
 * ```typescript
 * import { analyzeCandidates, countEmptyCells, createSudoku } from '@hackettyam/sudoku-tools'
 *
 * const { board } = createSudoku()
 * const emptyCount = countEmptyCells(board)
 * const analysis = analyzeCandidates(board, emptyCount)
 *
 * console.log(analysis.avg) // Average candidates per cell
 * ```
 */
export function analyzeCandidates(board: BoardType, emptyCount: number): AnalysisResult {
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
