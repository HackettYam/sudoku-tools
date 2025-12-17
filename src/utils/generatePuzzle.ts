import { SUDOKU_BASE_BOARD, SUDOKU_DIFFICULTY_HINTS } from '@/constants'
import { Difficulty, type GeneratePuzzleResult } from '@/models'

import { cloneBoard } from './cloneBoard'
import { emptyCells } from './emptyCells'
import { randomizeBoard } from './randomizeBoard'

/**
 * Generates a Sudoku puzzle based on the difficulty level.
 * Uses a fast and simple method (no guarantee of uniqueness).
 */
export function generatePuzzle(difficulty: Difficulty = Difficulty.Normal): GeneratePuzzleResult {
  // Clone the base solved board and randomize it
  const board = cloneBoard(SUDOKU_BASE_BOARD)
  randomizeBoard(board)

  // Clone the randomized board to get the solved board
  const solved = cloneBoard(board)

  // Empty cells from the randomized board to get the final board
  const hints = SUDOKU_DIFFICULTY_HINTS[difficulty]
  emptyCells(board, hints)

  return { board, solved }
}
