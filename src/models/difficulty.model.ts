/**
 * Difficulty levels for Sudoku puzzles
 */
export enum Difficulty {
  Novice = 'novice',
  Easy = 'easy',
  Normal = 'normal',
  Hard = 'hard',
  Expert = 'expert',
}

/**
 * Number of hints (filled cells) for each difficulty level
 */
export enum DifficultyHints {
  Novice = 50,
  Easy = 40,
  Normal = 35,
  Hard = 30,
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
