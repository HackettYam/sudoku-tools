/**
 * Represents a Sudoku board as a 2D array of numbers
 */
export type BoardType = number[][]

/**
 * Represents a cell position on the board
 */
export interface BoardCellType {
  col: number
  row: number
}

/**
 * Represents a read-only cell map for the board
 */
export type BoardReadOnlyType = boolean[][]
