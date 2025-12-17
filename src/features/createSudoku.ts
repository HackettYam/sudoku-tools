import { Difficulty, type GeneratePuzzleResult } from '@/models'
import { generatePuzzle } from '@/utils'

/**
 * Creates a Sudoku puzzle based on the difficulty level.
 */
export function createSudoku(difficulty: Difficulty = Difficulty.Normal): GeneratePuzzleResult {
  const { board, solved } = generatePuzzle(difficulty)

  return { board, solved }
}
