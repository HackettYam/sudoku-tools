import { SudokuPuzzle } from '../entities/sudoku.entity'
import { Difficulty } from '../models'
import { generatePuzzle } from '../utils'

/**
 * Creates a new Sudoku puzzle instance with the specified difficulty.
 *
 * This is the main entry point for creating a playable Sudoku game.
 *
 * @param difficulty - The difficulty level of the puzzle.
 *   Can be one of: 'Novice', 'Easy', 'Normal', 'Hard', 'Expert'.
 *   Defaults to 'Normal' if not specified.
 * @returns A SudokuPuzzle instance with methods to play the game:
 *   - setCell, clearCell, getCandidates, getHint, getProgress
 *   - isComplete, isSolved, isValidMove, reset
 *
 * @example
 * ```typescript
 * import { createSudoku, Difficulty } from '@hackettyam/sudoku-tools'
 *
 * const puzzle = createSudoku(Difficulty.Hard)
 *
 * puzzle.setCell(0, 0, 5)
 * const hint = puzzle.getHint()
 *
 * console.log(puzzle.getProgress())
 *
 * if (puzzle.isSolved()) {
 *   console.log('Congratulations!')
 * }
 * ```
 *
 * @see SudokuPuzzle
 * @since 1.0.0
 */
export function createSudoku(difficulty: Difficulty = Difficulty.Normal): SudokuPuzzle {
  const { board, solved } = generatePuzzle(difficulty)

  return new SudokuPuzzle({ board, difficulty, solved })
}
