import type { BoardType } from '../models/board.model'

/**
 * Creates a deep copy of a Sudoku board
 */
export function cloneBoard(board: BoardType): BoardType {
  return board.map(row => [...row])
}
