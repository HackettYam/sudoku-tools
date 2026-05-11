/**
 * A standard 9x9 Sudoku board represented as a 2D array of numbers.
 *
 * Each cell contains a value from 0-9, where 0 represents an empty cell
 * and 1-9 represent filled cells following Sudoku rules.
 *
 * @example
 * ```typescript
 * const board: BoardType = [
 *   [5, 3, 0, 0, 7, 0, 0, 0, 0],
 *   [6, 0, 0, 1, 9, 5, 0, 0, 0],
 *   // ... 9 rows total
 * ]
 * ```
 */
export type BoardType = number[][]

/**
 * Represents a cell position on the board using row and column indices.
 *
 * @example
 * ```typescript
 * const position: BoardCellType = { row: 4, col: 5 }
 * ```
 */
export interface BoardCellType {
  /** Column index (0-8) */
  col: number

  /** Row index (0-8) */
  row: number
}

/**
 * A read-only mask indicating which cells are part of the original puzzle.
 *
 * Each cell is true if it was pre-filled (cannot be modified), false otherwise.
 *
 * @example
 * ```typescript
 * if (readOnly[row][col]) {
 *   // Cell is part of original puzzle, cannot be modified
 * }
 * ```
 */
export type BoardReadOnlyType = boolean[][]
