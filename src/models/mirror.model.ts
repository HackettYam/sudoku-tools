/**
 * Mirror direction for board transformation.
 *
 * - `horizontal`: Mirrors left-to-right (swaps columns within each row)
 * - `vertical`: Mirrors top-to-bottom (swaps rows)
 *
 * @example
 * ```typescript
 * const mirrored: BoardType = mirrorBoard(board, 'horizontal')
 * ```
 */
export type MirrorDirection = 'horizontal' | 'vertical'
