/**
 * Difficulty levels for Sudoku puzzles.
 *
 * Higher difficulty means fewer pre-filled cells and more complex solving required.
 *
 * @example
 * ```typescript
 * const difficulty: Difficulty = Difficulty.Hard
 * ```
 */
export enum Difficulty {
  /** Novice difficulty - 50 hints (easiest) */
  Novice = 'novice',

  /** Easy difficulty - 40 hints */
  Easy = 'easy',

  /** Normal difficulty - 35 hints */
  Normal = 'normal',

  /** Hard difficulty - 30 hints */
  Hard = 'hard',

  /** Expert difficulty - 20 hints (hardest) */
  Expert = 'expert',
}

/**
 * Number of hints (pre-filled cells) for each difficulty level.
 *
 * More hints = easier puzzle.
 *
 * @example
 * ```typescript
 * const hints: number = DifficultyHints.Normal // 35
 * ```
 */
export enum DifficultyHints {
  /** Novice difficulty - 50 hints */
  Novice = 50,

  /** Easy difficulty - 40 hints */
  Easy = 40,

  /** Normal difficulty - 35 hints */
  Normal = 35,

  /** Hard difficulty - 30 hints */
  Hard = 30,

  /** Expert difficulty - 20 hints */
  Expert = 20,
}

/**
 * Union type of all possible difficulty values.
 *
 * @example
 * ```typescript
 * const levels: DifficultyType[] = [Difficulty.Novice, Difficulty.Hard]
 * ```
 */
export type DifficultyType =
  | Difficulty.Novice
  | Difficulty.Easy
  | Difficulty.Normal
  | Difficulty.Hard
  | Difficulty.Expert

/**
 * Result of the getDifficulty function.
 *
 * Contains the estimated difficulty and metrics used to calculate it.
 *
 * @example
 * ```typescript
 * const result: DifficultyResult = {
 *   avgCandidates: 4.5,
 *   difficulty: Difficulty.Hard,
 *   emptyCells: 51,
 *   minCandidates: 2,
 *   score: 45.5
 * }
 * ```
 */
export interface DifficultyResult {
  /** Average number of candidates per empty cell */
  avgCandidates: number

  /** The estimated difficulty level */
  difficulty: DifficultyType

  /** Number of empty cells in the puzzle */
  emptyCells: number

  /** Minimum candidates found in any empty cell (naked singles indicator) */
  minCandidates: number

  /** Score used to determine difficulty (lower = easier) */
  score: number
}
