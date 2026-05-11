import { SUDOKU_EMPTY_CELL, SUDOKU_SIZE } from '../constants'
import {
  type BoardReadOnlyType,
  type BoardType,
  type CellValue,
  type DifficultyType,
  type HintResult,
  type SudokuPuzzleOptions,
  type SudokuPuzzleStatistics,
  type SudokuState,
} from '../models'
import {
  cloneBoard,
  countEmptyCells,
  countFilledCells,
  countInvalidCells,
  countValidCells,
  getCandidates,
  getHint,
  isComplete,
  isSolved,
  isValidPlacement,
  randomizeBoard,
  validateCellIndex,
} from '../utils'

/**
 * Represents a Sudoku puzzle instance with all necessary methods to play.
 *
 * This class provides a complete interface for interacting with a Sudoku puzzle,
 * including cell manipulation, validation, hints, and progress tracking.
 *
 * @example
 * ```typescript
 * import { createSudoku, Difficulty } from '@hackettyam/sudoku-tools'
 *
 * const puzzle = createSudoku(Difficulty.Normal)
 * puzzle.setCell(0, 0, 5)
 *
 * if (puzzle.isSolved()) {
 *   console.log('Puzzle solved!')
 * }
 * ```
 *
 * @see createSudoku
 * @since 1.0.0
 */
export class SudokuPuzzle implements SudokuState {
  /** The current state of the board (player's progress) */
  public current: BoardType

  /** The difficulty level of the puzzle */
  public difficulty: DifficultyType

  /** The original puzzle board (cannot be modified) */
  public original: BoardType

  /** Read-only mask indicating which cells are part of the original puzzle */
  public readOnly: BoardReadOnlyType

  /** The solved version of the puzzle */
  public solution: BoardType

  /**
   * Creates a new SudokuPuzzle instance.
   *
   * @param options - Configuration options containing board, solved board, and difficulty
   */
  constructor(options: SudokuPuzzleOptions) {
    const { board, difficulty, solved } = options

    this.current = cloneBoard(board)
    this.difficulty = difficulty
    this.original = cloneBoard(board)
    this.readOnly = board.map(row => row.map(cell => cell !== SUDOKU_EMPTY_CELL))
    this.solution = cloneBoard(solved)
  }

  /**
   * Clears a cell (sets it to empty).
   *
   * Only clears if the cell is not read-only (part of the original puzzle).
   * The original puzzle cells cannot be modified.
   *
   * @param row - Row index (0-8)
   * @param col - Column index (0-8)
   * @returns true if cell was cleared, false if cell is read-only
   * @throws {Error} If row or col is outside the range 0-8
   */
  public clearCell(row: number, col: number): boolean {
    if (!validateCellIndex(row, col)) {
      throw new Error(`Invalid cell coordinates: (${row}, ${col}). `
        + `Row and column must be integers between 0 and ${SUDOKU_SIZE - 1}.`)
    }

    if (this.readOnly[row][col]) {
      return false
    }
    this.current[row][col] = SUDOKU_EMPTY_CELL

    return true
  }

  /**
   * Gets all valid candidate values for a specific cell.
   *
   * @param row - Row index (0-8)
   * @param col - Column index (0-8)
   * @returns Array of valid numbers (1-9) that can be placed in the cell
   * @throws {Error} If row or col is outside the range 0-8
   */
  public getCandidates(row: number, col: number): number[] {
    if (!validateCellIndex(row, col)) {
      throw new Error(`Invalid cell coordinates: (${row}, ${col}). `
        + `Row and column must be integers between 0 and ${SUDOKU_SIZE - 1}.`)
    }

    return getCandidates(this.current, row, col)
  }

  /**
   * Gets a hint for the next move.
   *
   * Returns the position and value of an empty cell that has a valid answer.
   *
   * @returns HintResult with row, col, and value, or null if no hints available
   */
  public getHint(): HintResult | null {
    return getHint(this.current, this.solution)
  }

  /**
   * Gets progress statistics for the current puzzle state.
   *
   * @returns SudokuPuzzleStatistics object containing counts and progress percentage
   */
  public getProgress(): SudokuPuzzleStatistics {
    const emptyCells = countEmptyCells(this.current)
    const filledCells = countFilledCells(this.current)
    const validCells = countValidCells(this.current, this.solution)
    const invalidCells = countInvalidCells(this.current, this.solution)
    const progress = Math.round((filledCells / 81) * 100)

    return {
      emptyCells,
      filledCells,
      invalidCells,
      progress,
      validCells,
    }
  }

  /**
   * Checks if the puzzle is complete (all cells filled, regardless of validity).
   *
   * @returns true if all 81 cells are filled, false otherwise
   */
  public isComplete(): boolean {
    return isComplete(this.current)
  }

  /**
   * Checks if a move is valid (doesn't violate Sudoku rules).
   *
   * @param row - Row index (0-8)
   * @param col - Column index (0-8)
   * @param value - Value to place (0-9, where 0 means clear)
   * @returns true if the value can be placed at the position, false otherwise
   */
  public isValidMove(row: number, col: number, value: CellValue): boolean {
    if (!validateCellIndex(row, col)) {
      throw new Error(`Invalid cell coordinates: (${row}, ${col}). `
        + `Row and column must be integers between 0 and ${SUDOKU_SIZE - 1}.`)
    }

    if (this.readOnly[row][col]) {
      return false
    }
    if (value === SUDOKU_EMPTY_CELL) {
      return true
    }

    const placementResult = isValidPlacement(this.current, { col, row, value })

    return placementResult.valid
  }

  /**
   * Checks if the puzzle is solved correctly.
   *
   * Compares current state against the solution to verify correctness.
   *
   * @returns true if the current board matches the solution, false otherwise
   */
  public isSolved(): boolean {
    return isSolved(this.current, this.solution)
  }

  /**
   * Resets the puzzle to its original state.
   *
   * @param withRandomize - If true, randomizes the board after resetting
   */
  public reset(withRandomize = false): void {
    this.current = cloneBoard(this.original)

    if (withRandomize) {
      randomizeBoard(this.current)
    }
  }

  /**
   * Sets a value in a cell.
   *
   * Only sets if the cell is not read-only (part of the original puzzle).
   * The original puzzle cells cannot be modified.
   *
   * @param row - Row index (0-8)
   * @param col - Column index (0-8)
   * @param value - Value to set (1-9)
   * @returns true if cell was set, false if cell is read-only
   * @throws {Error} If row or col is outside the range 0-8
   */
  public setCell(row: number, col: number, value: CellValue): boolean {
    if (!validateCellIndex(row, col)) {
      throw new Error(`Invalid cell coordinates: (${row}, ${col}). `
        + `Row and column must be integers between 0 and ${SUDOKU_SIZE - 1}.`)
    }

    if (this.readOnly[row][col]) {
      return false
    }
    this.current[row][col] = value

    return true
  }
}
