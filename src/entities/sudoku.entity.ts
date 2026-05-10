import { SUDOKU_EMPTY_CELL } from '../constants'
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
} from '../utils'

/**
 * Represents a Sudoku puzzle instance with all necessary methods to play.
 */
export class SudokuPuzzle implements SudokuState {
  /** The current state of the board (player's progress) */
  public current: BoardType

  /** The difficulty level of the puzzle */
  public difficulty: DifficultyType

  /** The original puzzle board */
  public original: BoardType

  /** Read-only mask indicating which cells are part of the original puzzle */
  public readOnly: BoardReadOnlyType

  /** The solved version of the puzzle */
  public solution: BoardType

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
   * Only clears if the cell is not read-only.
   * @returns true if cell was cleared, false if cell is read-only
   */
  public clearCell(row: number, col: number): boolean {
    if (this.readOnly[row][col]) {
      return false
    }
    this.current[row][col] = SUDOKU_EMPTY_CELL

    return true
  }

  /**
   * Gets all valid candidate values for a specific cell.
   */
  public getCandidates(row: number, col: number): number[] {
    return getCandidates(this.current, row, col)
  }

  /**
   * Gets a hint (next empty cell with its correct value).
   */
  public getHint(): HintResult | null {
    return getHint(this.current, this.solution)
  }

  /**
   * Gets progress statistics.
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
   * Checks if the puzzle is complete (all cells filled and valid).
   */
  public isComplete(): boolean {
    return isComplete(this.current)
  }

  /**
   * Checks if a move is valid (doesn't violate Sudoku rules).
   */
  public isValidMove(row: number, col: number, value: CellValue): boolean {
    if (this.readOnly[row][col]) {
      return false
    }
    if (value === SUDOKU_EMPTY_CELL) {
      return true
    }

    return isValidPlacement(this.current, { col, row, value })
  }

  /**
   * Checks if the puzzle is solved correctly.
   */
  public isSolved(): boolean {
    return isSolved(this.current, this.solution)
  }

  /**
   * Resets the puzzle to its original state.
   */
  public reset(withRandomize = false): void {
    this.current = cloneBoard(this.original)

    if (withRandomize) {
      randomizeBoard(this.current)
    }
  }

  /**
   * Sets a value in a cell.
   * Only sets if the cell is not read-only.
   * @returns true if cell was set, false if cell is read-only
   */
  public setCell(row: number, col: number, value: CellValue): boolean {
    if (this.readOnly[row][col]) {
      return false
    }
    this.current[row][col] = value

    return true
  }
}
