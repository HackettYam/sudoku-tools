import { SudokuPuzzle } from '../entities/sudoku.entity'
import { Difficulty } from '../models'
import { generatePuzzle } from '../utils'

/**
 * Creates a Sudoku puzzle based on the difficulty level.
 * @returns A SudokuPuzzle instance with all methods to play the game.
 */
export function createSudoku(difficulty: Difficulty = Difficulty.Normal): SudokuPuzzle {
  const { board, solved } = generatePuzzle(difficulty)

  return new SudokuPuzzle({ board, difficulty, solved })
}
