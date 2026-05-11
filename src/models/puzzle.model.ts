import type { BoardType } from './board.model'

/**
 * Result of the generatePuzzle function.
 *
 * Contains both the puzzle board (with empty cells) and its solution.
 *
 * @example
 * ```typescript
 * const result: GeneratePuzzleResult = {
 *   board: createEmptyPuzzle(),
 *   solved: getSolution()
 * }
 * ```
 */
export interface GeneratePuzzleResult {
  /** The puzzle board with some cells empty (to be solved) */
  board: BoardType

  /** The complete solved board */
  solved: BoardType
}
