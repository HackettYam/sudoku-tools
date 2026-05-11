import type { BoardReadOnlyType, BoardType } from './board.model'
import type { DifficultyType } from './difficulty.model'

/**
 * Represents the complete state of a Sudoku game.
 *
 * This interface defines the required properties for a Sudoku puzzle state.
 *
 * @example
 * ```typescript
 * const state: SudokuState = {
 *   current: puzzleBoard,
 *   difficulty: Difficulty.Hard,
 *   original: initialPuzzle,
 *   readOnly: readonlyMask,
 *   solution: solvedBoard
 * }
 * ```
 */
export interface SudokuState {
  /** Current state of the board (player's progress) */
  current: BoardType

  /** Difficulty level of the puzzle */
  difficulty: DifficultyType

  /** The original puzzle board (cannot be modified by player) */
  original: BoardType

  /** Read-only mask indicating which cells are part of the original puzzle */
  readOnly: BoardReadOnlyType

  /** The solved version of the puzzle */
  solution: BoardType
}

/**
 * Configuration options for creating a SudokuPuzzle instance.
 *
 * @example
 * ```typescript
 * const options: SudokuPuzzleOptions = {
 *   board: puzzle,
 *   difficulty: Difficulty.Normal,
 *   solved: solution
 * }
 * ```
 */
export interface SudokuPuzzleOptions {
  /** The puzzle board with some cells empty */
  board: BoardType

  /** Difficulty level of the puzzle */
  difficulty: DifficultyType

  /** The complete solved board */
  solved: BoardType
}

/**
 * Statistics about the current puzzle state.
 *
 * @example
 * ```typescript
 * const stats: SudokuPuzzleStatistics = {
 *   emptyCells: 51,
 *   filledCells: 30,
 *   invalidCells: 2,
 *   progress: 37,
 *   validCells: 28
 * }
 * ```
 */
export interface SudokuPuzzleStatistics {
  /** Number of empty cells remaining */
  emptyCells: number

  /** Number of cells that have been filled */
  filledCells: number

  /** Number of filled cells that violate Sudoku rules */
  invalidCells: number

  /** Progress percentage (0-100) */
  progress: number

  /** Number of filled cells that are valid */
  validCells: number
}
