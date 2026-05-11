import type { BoardType } from './board.model'

/**
 * Result of a Sudoku solving attempt.
 *
 * This interface provides detailed information about whether a Sudoku puzzle
 * was successfully solved. Instead of returning null on failure, it includes
 * an optional error message explaining why solving failed.
 *
 * @property board - The solved board if successful, null if unsolvable or invalid
 * @property error - Optional error message explaining why solving failed.
 *   Only present when `board` is null. Possible values include:
 *   - "Invalid initial board: duplicate found in row {n}"
 *   - "Invalid initial board: duplicate found in column {n}"
 *   - "Invalid initial board: duplicate found in box ({row},{col})"
 *   - "Board is unsolvable: no valid candidates for cell ({row},{col})"
 *   - "Board is unsolvable: constraints contradiction detected"
 *
 * @example
 * ```typescript
 * import { solvePuzzle, SolveResult } from '@hackettyam/sudoku-tools'
 *
 * const result: SolveResult = solvePuzzle(someBoard)
 *
 * if (result.board) {
 *   // Puzzle was solved successfully
 *   console.log('Solved!', result.board)
 * } else {
 *   // Solving failed - show error to user
 *   console.error('Failed to solve:', result.error)
 * }
 * ```
 *
 * @example
 * ```typescript
 * // Type guard pattern
 * function handleSolveResult(result: SolveResult): void {
 *   if (result.board) {
 *     displayBoard(result.board)
 *   } else {
 *     showErrorMessage(result.error ?? 'Unknown error')
 *   }
 * }
 * ```
 *
 * @see solvePuzzle
 * @since 1.1.0
 */
export interface SolveResult {
  /**
   * The solved board if successful, null if unsolvable or invalid.
   */
  board: BoardType | null

  /**
   * Optional error message explaining why solving failed.
   * Only present when `board` is null.
   */
  error?: string
}
