import { SUDOKU_EMPTY_CELL, SUDOKU_SIZE } from '../constants/sudoku.constants'
import type { BoardType } from '../models/board.model'

/**
 * Empties cells from the board until reaching the desired number of hints.
 * Leaves the number of hints according to the difficulty.
 *
 * @param board - The Sudoku board to empty cells from
 * @param hints - The number of hints to leave on the board
 */
export function emptyCells(board: BoardType, hints: number): void {
  let cellsToRemove = (SUDOKU_SIZE * SUDOKU_SIZE) - hints
  const cells: [number, number][] = []

  for (let r = 0; r < SUDOKU_SIZE; r++) {
    for (let c = 0; c < SUDOKU_SIZE; c++) {
      cells.push([r, c])
    }
  }

  // Shuffle cells array (Fisher-Yates)
  for (let i = cells.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [cells[i], cells[j]] = [cells[j], cells[i]]
  }

  // Remove cells
  for (let i = 0; i < cells.length && cellsToRemove > 0; i++) {
    const [r, c] = cells[i]
    board[r][c] = SUDOKU_EMPTY_CELL
    cellsToRemove--
  }
}
