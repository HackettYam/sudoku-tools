import type { BoardReadOnlyType, BoardType } from './board.model'
import type { DifficultyType } from './difficulty.model'

/**
 * Represents the complete state of a Sudoku game
 */
export interface SudokuState {
  /** Current state of the board (player's progress) */
  current: BoardType

  /** Difficulty level of the puzzle */
  difficulty: DifficultyType

  /** The original puzzle board */
  original: BoardType

  /** Read-only mask indicating which cells are part of the original puzzle */
  readOnly: BoardReadOnlyType

  /** The solved version of the puzzle */
  solution: BoardType
}

/**
 * Options for SudokuPuzzle component
 */
export interface SudokuPuzzleOptions {
  /** The original puzzle board */
  board: BoardType

  /** Difficulty level of the puzzle */
  difficulty: DifficultyType

  /** The solved version of the puzzle */
  solved: BoardType
}

/**
 * Statistics for a Sudoku puzzle
 */
export interface SudokuPuzzleStatistics {
  /** Number of empty cells */
  emptyCells: number

  /** Number of filled cells */
  filledCells: number

  /** Number of invalid cells */
  invalidCells: number

  /** Progress percentage */
  progress: number

  /** Number of valid cells */
  validCells: number
}
