import type { BoardCellType } from './board.model'
import type { CellValue } from './cell.model'

/**
 * Result of the getHint function.
 *
 * Provides the position and correct value for revealing a cell.
 *
 * @example
 * ```typescript
 * const hint: HintResult = {
 *   row: 4,
 *   col: 5,
 *   value: 7
 * }
 * // Reveal: Place 7 at row 4, column 5
 * ```
 */
export interface HintResult extends BoardCellType {
  /** The correct value to place at this cell (1-9) */
  value: CellValue
}
