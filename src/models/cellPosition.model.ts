/**
 * Represents a cell position with a value
 */
export interface CellPosition {
  /** Column index (0-8) */
  col: number

  /** Row index (0-8) */
  row: number

  /** Value to place (1-9) */
  value: number
}
