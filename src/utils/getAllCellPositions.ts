import { SUDOKU_SIZE } from '../constants'
import { shuffleArray } from './shuffleArray'

/**
 * Gets all cell positions in the board, shuffled randomly.
 *
 * @returns Array of [row, col] tuples in random order
 *
 * @example
 * ```typescript
 * import { getAllCellPositions } from '@hackettyam/sudoku-tools'
 *
 * const positions = getAllCellPositions()
 * // [[3, 5], [0, 2], [8, 1], ...] (random order)
 * ```
 */
export function getAllCellPositions(): [number, number][] {
  const positions: [number, number][] = []

  for (let row = 0; row < SUDOKU_SIZE; row++) {
    for (let col = 0; col < SUDOKU_SIZE; col++) {
      positions.push([row, col])
    }
  }

  return shuffleArray(positions)
}
