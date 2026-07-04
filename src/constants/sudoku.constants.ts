/* eslint-disable @stylistic/array-bracket-newline */
/* eslint-disable @stylistic/array-element-newline */

import { Difficulty, DifficultyHints } from '../models/difficulty.model'

/**
 * Standard Sudoku grid size (9x9).
 *
 * Use this constant for iterating through the board dimensions.
 *
 * @example
 * ```typescript
 * import { SUDOKU_SIZE } from '@hackettyam/sudoku-tools'
 *
 * for (let i = 0; i < SUDOKU_SIZE; i++) {
 *   console.log(`Row/Column ${i}`)
 * }
 * ```
 */
export const SUDOKU_SIZE = 9

/**
 * Value representing an empty cell in the Sudoku board.
 *
 * Cells with value 0 are considered empty and need to be filled.
 *
 * @example
 * ```typescript
 * import { SUDOKU_EMPTY_CELL, createSudoku } from '@hackettyam/sudoku-tools'
 *
 * const { board } = createSudoku()
 * const emptyCount = board.flat().filter(v => v === SUDOKU_EMPTY_CELL).length
 * console.log(`Empty cells: ${emptyCount}`)
 * ```
 */
export const SUDOKU_EMPTY_CELL = 0

/**
 * A valid solved Sudoku board used as base for puzzle generation.
 *
 * This board serves as the foundation for generating new puzzles by
 * randomizing the row/column order and removing cells based on difficulty.
 *
 * @example
 * ```typescript
 * import { SUDOKU_BASE_BOARD } from '@hackettyam/sudoku-tools'
 *
 * console.log('Base board is a valid completed Sudoku:', isValidPuzzle(SUDOKU_BASE_BOARD))
 * ```
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
 * Mapping of difficulty levels to the number of hints (filled cells).
 *
 * Higher hints = easier puzzle (more cells pre-filled).
 * Lower hints = harder puzzle (fewer cells pre-filled).
 *
 * @example
 * ```typescript
 * import { SUDOKU_DIFFICULTY_HINTS, Difficulty } from '@hackettyam/sudoku-tools'
 *
 * console.log(`Normal difficulty has ${SUDOKU_DIFFICULTY_HINTS[Difficulty.Normal]} hints`)
 * ```
 */
export const SUDOKU_DIFFICULTY_HINTS = {
  [Difficulty.Novice]: DifficultyHints.Novice,
  [Difficulty.Easy]: DifficultyHints.Easy,
  [Difficulty.Normal]: DifficultyHints.Normal,
  [Difficulty.Hard]: DifficultyHints.Hard,
  [Difficulty.Expert]: DifficultyHints.Expert,
} as const satisfies Readonly<Record<Difficulty, DifficultyHints>>
