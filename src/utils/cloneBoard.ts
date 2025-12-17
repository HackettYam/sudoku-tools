import type { BoardType } from '../models/board.model'

/**
 * Creates a deep copy of a Sudoku board
 *
 * @param board - The Sudoku board to clone
 * @returns A new board that is a deep copy of the input board
 */
export function cloneBoard(board: BoardType): BoardType {
  return board.map(row => [...row])
}
