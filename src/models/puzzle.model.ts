import type { BoardType } from './board.model'

/**
 * Result of the generatePuzzle function.
 */
export interface GeneratePuzzleResult {
  /** The puzzle board */
  board: BoardType

  /** The solved board */
  solved: BoardType
}
