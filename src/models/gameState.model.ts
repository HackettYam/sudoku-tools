import type { BoardReadOnlyType, BoardType } from './board.model'
import type { DifficultyType } from './difficulty.model'

/**
 * Represents the complete state of a Sudoku game
 */
export interface GameState {
  /** Current state of the board (player's progress) */
  current: BoardType

  /** Difficulty level of the puzzle */
  difficulty: DifficultyType

  /** The original puzzle board */
  puzzle: BoardType

  /** Read-only mask indicating which cells are part of the original puzzle */
  readOnly: BoardReadOnlyType

  /** The solved version of the puzzle */
  solution: BoardType
}
