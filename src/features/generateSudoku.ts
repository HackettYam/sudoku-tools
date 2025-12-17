import { SUDOKU_BASE_BOARD, SUDOKU_DIFFICULTY_HINTS } from '../constants/sudoku.constants'
import type { BoardType } from '../models/board.model'
import { Difficulty } from '../models/difficulty.model'
import { cloneBoard } from '../utils/cloneBoard'
import { randomizeBoard } from '../utils/randomizeBoard'
import { removeCells } from '../utils/removeCells'

export interface GenerateSudokuResult {
  board: BoardType
  solved: BoardType
}

/**
 * Generates a Sudoku puzzle based on the difficulty level.
 * Uses a fast and simple method (no guarantee of uniqueness).
 */
export function generateSudoku(difficulty: Difficulty = Difficulty.Normal): GenerateSudokuResult {
  // Clone the base solved board and randomize it
  const board = cloneBoard(SUDOKU_BASE_BOARD)
  randomizeBoard(board)

  // Clone the randomized board to get the solved board
  const solved = cloneBoard(board)

  // Remove cells from the randomized board to get the final board
  const hints = SUDOKU_DIFFICULTY_HINTS[difficulty]
  removeCells(board, hints)

  return { board, solved }
}
