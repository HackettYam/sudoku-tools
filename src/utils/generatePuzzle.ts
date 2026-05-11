import { SUDOKU_BASE_BOARD, SUDOKU_DIFFICULTY_HINTS } from '../constants'
import { Difficulty, type GeneratePuzzleResult } from '../models'
import { cloneBoard } from './cloneBoard'
import { emptyCells } from './emptyCells'
import { randomizeBoard } from './randomizeBoard'

/**
 * Generates a Sudoku puzzle based on the difficulty level.
 *
 * Uses a fast generation method that creates a valid puzzle by
 * randomizing a solved board and removing cells based on difficulty.
 * Note: This method does not guarantee uniqueness of the solution.
 *
 * @param difficulty - The difficulty level of the puzzle to generate.
 *   Can be one of: 'Novice', 'Easy', 'Normal', 'Hard', 'Expert'.
 *   Defaults to 'Normal' if not specified.
 * @returns An object containing:
 *   - `board`: The puzzle board with cells emptied according to difficulty
 *   - `solved`: The complete solved board
 *
 * @example
 * ```typescript
 * import { generatePuzzle, Difficulty } from '@hackettyam/sudoku-tools'
 *
 * const { board, solved } = generatePuzzle(Difficulty.Hard)
 * console.log(`Puzzle has ${board.flat().filter(v => v === 0).length} empty cells`)
 * ```
 *
 * @example
 * ```typescript
 * // Generate puzzle with default difficulty
 * const { board } = generatePuzzle()
 * ```
 *
 * @see createSudoku
 * @since 1.0.0
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
