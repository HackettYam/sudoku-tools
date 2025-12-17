/* eslint-disable @stylistic/array-bracket-newline */
/* eslint-disable @stylistic/array-element-newline */

import { Difficulty, DifficultyHints } from '../models/difficulty.model'

/**
 * Standard Sudoku grid size (9x9)
 */
export const SUDOKU_SIZE = 9

/**
 * Value representing an empty cell
 */
export const SUDOKU_EMPTY_CELL = 0

/**
 * A valid solved Sudoku board used as base for generation
 */
export const SUDOKU_BASE_BOARD = [
  [1, 2, 3, 4, 5, 6, 7, 8, 9],
  [4, 5, 6, 7, 8, 9, 1, 2, 3],
  [7, 8, 9, 1, 2, 3, 4, 5, 6],
  [2, 3, 4, 5, 6, 7, 8, 9, 1],
  [5, 6, 7, 8, 9, 1, 2, 3, 4],
  [8, 9, 1, 2, 3, 4, 5, 6, 7],
  [3, 4, 5, 6, 7, 8, 9, 1, 2],
  [6, 7, 8, 9, 1, 2, 3, 4, 5],
  [9, 1, 2, 3, 4, 5, 6, 7, 8],
]

/**
 * Mapping of difficulty levels to number of hints
 */
export const SUDOKU_DIFFICULTY_HINTS: Record<Difficulty, DifficultyHints> = {
  [Difficulty.Novice]: DifficultyHints.Novice,
  [Difficulty.Easy]: DifficultyHints.Easy,
  [Difficulty.Normal]: DifficultyHints.Normal,
  [Difficulty.Hard]: DifficultyHints.Hard,
  [Difficulty.Expert]: DifficultyHints.Expert,
}
