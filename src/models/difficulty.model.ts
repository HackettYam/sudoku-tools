/**
 * Difficulty levels for Sudoku puzzles
 */
export enum Difficulty {
  /** Novice difficulty level */
  Novice = 'novice',

  /** Easy difficulty level */
  Easy = 'easy',

  /** Normal difficulty level */
  Normal = 'normal',

  /** Hard difficulty level */
  Hard = 'hard',

  /** Expert difficulty level */
  Expert = 'expert',
}

/**
 * Number of hints (filled cells) for each difficulty level
 */
export enum DifficultyHints {
  /** Novice difficulty hints */
  Novice = 50,

  /** Easy difficulty hints */
  Easy = 40,

  /** Normal difficulty hints */
  Normal = 35,

  /** Hard difficulty hints */
  Hard = 30,

  /** Expert difficulty hints */
  Expert = 20,
}

/**
 * Type representing all difficulty levels
 */
export type DifficultyType =
  | Difficulty.Novice
  | Difficulty.Easy
  | Difficulty.Normal
  | Difficulty.Hard
  | Difficulty.Expert

/**
 * Result of difficulty analysis
 */
export interface DifficultyResult {
  /** Average number of candidates per empty cell */
  avgCandidates: number

  /** The estimated difficulty level */
  difficulty: DifficultyType

  /** Number of empty cells in the puzzle */
  emptyCells: number

  /** Minimum candidates found in any empty cell */
  minCandidates: number

  /** Score used to determine difficulty (lower = easier) */
  score: number
}
