import type { BoardType } from '../models/board.model'
import { swapDigits } from './swapDigits'
import { swapRowWithinBand } from './swapRowWithinBand'
import { swapColWithinStack } from './swapColWithinStack'

/**
 * Applies transformations to a Sudoku board to obtain randomness:
 * - Permutes digits randomly
 * - Permutes rows within 3x3 bands
 * - Permutes columns within 3x3 stacks
 */
export function randomizeBoard (board: BoardType): void {
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
