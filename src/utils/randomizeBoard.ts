import { swapColWithinStack } from './swapColWithinStack'
import { swapDigits } from './swapDigits'
import { swapRowWithinBand } from './swapRowWithinBand'
import type { BoardType } from '../models/board.model'

/**
 * Applies transformations to a Sudoku board to obtain randomness.
 *
 * This function mutates the input board with three types of transformations:
 * 1. Permutes digits (swaps pairs of numbers 1-9)
 * 2. Permutes rows within 3x3 bands
 * 3. Permutes columns within 3x3 stacks
 *
 * These transformations maintain the validity of the Sudoku board while
 * creating a different puzzle that is still solvable.
 *
 * @param board - The Sudoku board to randomize (mutated in place)
 *
 * @example
 * ```typescript
 * import { randomizeBoard, cloneBoard } from '@hackettyam/sudoku-tools'
 *
 * const original = cloneBoard(SUDOKU_BASE_BOARD)
 * randomizeBoard(original)
 * // original is now a different valid Sudoku
 * ```
 *
 * @see swapDigits
 * @see swapRowWithinBand
 * @see swapColWithinStack
 */
export function randomizeBoard(board: BoardType): void {
  // Permute digits (swap between pairs randomly)
  for (let i = 0; i < 5; i++) {
    const d1 = 1 + Math.floor(Math.random() * 9)
    const d2 = 1 + Math.floor(Math.random() * 9)

    if (d1 !== d2) {
      swapDigits(board, d1, d2)
    }
  }

  // Permute rows within 3x3 bands
  for (let band = 0; band < 3; band++) {
    swapRowWithinBand(board, band)
  }

  // Permute columns within 3x3 stacks
  for (let stack = 0; stack < 3; stack++) {
    swapColWithinStack(board, stack)
  }
}
