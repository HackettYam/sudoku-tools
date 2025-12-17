/**
 * Represents a Sudoku board as a 2D array of numbers
 */
export type BoardType = number[][]

/**
 * Represents a cell position on the board
 */
export interface BoardCellType {
  /** Column index */
  col: number

  /** Row index */
  row: number
}

/**
 * Represents a read-only cell map for the board
 */
export type BoardReadOnlyType = boolean[][]
