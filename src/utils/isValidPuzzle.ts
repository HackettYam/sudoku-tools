import { SUDOKU_SIZE } from '@/constants'
import type { BoardType } from '@/models'

import { isValidBox } from './isValidBox'
import { isValidColumn } from './isValidColumn'
import { isValidRow } from './isValidRow'

/**
 * Validates if a Sudoku board follows all Sudoku rules:
 * - Each row contains digits 1-9 without repetition
 * - Each column contains digits 1-9 without repetition
 * - Each 3x3 box contains digits 1-9 without repetition
 *
 * Empty cells (value 0) are ignored during validation.
 *
 * @param board - The Sudoku board to validate
 * @returns true if the board is valid, false otherwise
 */
export function isValidPuzzle(board: BoardType): boolean {
  for (let i = 0; i < SUDOKU_SIZE; i++) {
    if (!isValidRow(board, i)) return false
    if (!isValidColumn(board, i)) return false
  }

  for (let boxRow = 0; boxRow < 3; boxRow++) {
    for (let boxCol = 0; boxCol < 3; boxCol++) {
      if (!isValidBox(board, boxRow, boxCol)) return false
    }
  }

  return true
}
