/**
 * Valid values for a Sudoku cell (0 = empty, 1-9 = filled).
 *
 * 0 represents an empty cell, while 1-9 represent filled cells
 * following Sudoku rules.
 *
 * @example
 * ```typescript
 * const cellValue: CellValue = 5
 * const emptyValue: CellValue = 0
 * ```
 */
export type CellValue = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9

/**
 * Options for setting a cell value in the Sudoku board.
 *
 * @example
 * ```typescript
 * const options: SetCellOptions = {
 *   row: 4,
 *   col: 5,
 *   value: 7
 * }
 * setCellValue(board, options)
 * ```
 */
export interface SetCellOptions {
  /** Column index (0-8) */
  col: number

  /** Row index (0-8) */
  row: number

  /** Value to set (1-9 for filled, 0 for empty) */
  value: CellValue
}

/**
 * Represents a cell position with a value to place.
 *
 * Used by functions that need to validate a potential move.
 *
 * @example
 * ```typescript
 * const position: CellPosition = {
 *   row: 0,
 *   col: 0,
 *   value: 5
 * }
 * if (isValidPlacement(board, position)) {
 *   // Can place 5 at (0, 0)
 * }
 * ```
 */
export interface CellPosition {
  /** Column index (0-8) */
  col: number

  /** Row index (0-8) */
  row: number

  /** Value to place at the position (1-9) */
  value: CellValue
}

