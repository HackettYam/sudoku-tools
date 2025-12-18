/**
 * Valid values for a Sudoku cell (0 = empty, 1-9 = filled)
 */
export type CellValue = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9

/**
 * Cell update options for setCellValue
 */
export interface SetCellOptions {
  /** Column index (0-8) */
  col: number

  /** Row index (0-8) */
  row: number

  /** Value to set (1-9 or 0 for empty) */
  value: CellValue
}

/**
 * Represents a cell position with a value
 */
export interface CellPosition {
  /** Column index (0-8) */
  col: number

  /** Row index (0-8) */
  row: number

  /** Value to place (1-9) */
  value: CellValue
}

