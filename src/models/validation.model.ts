// validation.model.ts no necesita importar BoardType

/**
 * Result of validating a Sudoku placement.
 *
 * This interface provides detailed information about whether a value
 * can be legally placed at a specific position on the Sudoku board.
 * Instead of returning a simple boolean, it includes the specific
 * constraint that was violated (if any).
 *
 * @property valid - Whether the placement satisfies all Sudoku constraints.
 *   - `true` if the placement is legal and can be made
 *   - `false` if the placement violates one of the Sudoku rules
 * @property reason - Which constraint was violated, or 'none' if valid.
 *   - `'row'`: Placement violates row constraint (duplicate value in row)
 *   - `'column'`: Placement violates column constraint (duplicate value in column)
 *   - `'box'`: Placement violates 3x3 box constraint (duplicate value in box)
 *   - `'none'`: No constraint violated (valid placement)
 *
 * @example
 * ```typescript
 * import { isValidPlacement, PlacementValidationResult } from '@hackettyam/sudoku-tools'
 *
 * const result: PlacementValidationResult = isValidPlacement(board, {
 *   row: 0,
 *   col: 0,
 *   value: 5
 * })
 *
 * if (result.valid) {
 *   console.log('Can place 5 at (0, 0)')
 * } else {
 *   console.error(`Cannot place 5 at (0, 0): conflicts with ${result.reason}`)
 * }
 * ```
 *
 * @example
 * ```typescript
 * // Handling different constraint violations
 * const result = isValidPlacement(board, position)
 *
 * switch (result.reason) {
 *   case 'row':
 *     showMessage('Duplicate in row')
 *     break
 *   case 'column':
 *     showMessage('Duplicate in column')
 *     break
 *   case 'box':
 *     showMessage('Duplicate in 3x3 box')
 *     break
 * }
 * ```
 *
 * @see isValidPlacement
 * @since 1.1.0
 */
export interface PlacementValidationResult {
  /**
   * Whether the placement satisfies all Sudoku constraints.
   */
  valid: boolean

  /**
   * Which constraint was violated, or 'none' if valid.
   * Only meaningful when `valid` is `false`.
   */
  reason?: 'row' | 'column' | 'box' | 'none'
}
