import type { BoardCellType } from './board.model'

/**
 * Result type for getHint function
 */
export interface HintResult extends BoardCellType {
  /** The correct value for the cell */
  value: number
}
