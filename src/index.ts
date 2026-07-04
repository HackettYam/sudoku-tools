// Constants
export {
  SUDOKU_SIZE,
  SUDOKU_EMPTY_CELL,
  SUDOKU_BASE_BOARD,
  SUDOKU_DIFFICULTY_HINTS,
} from './constants'

// Entities
export {
  SudokuPuzzle,
  type SudokuPuzzle as SudokuPuzzleType,
} from './entities/sudoku.entity'

// Features
export { createSudoku } from './features'

// Models
export {
  type BoardType,
  type BoardCellType,
  type BoardReadOnlyType,
  type CellPosition,
  type CellValue,
  Difficulty,
  DifficultyHints,
  type DifficultyResult,
  type DifficultyType,
  type GeneratePuzzleResult,
  type HintResult,
  type MirrorDirection,
  type PlacementValidationResult,
  type SetCellOptions,
  type SolveResult,
  type SudokuPuzzleOptions,
  type SudokuPuzzleStatistics,
  type SudokuState,
} from './models'

// Utils
export {
  analyzeCandidates,
  clearCell,
  checkGroup,
  cloneBoard,
  countEmptyCells,
  countFilledCells,
  countInvalidCells,
  countSolutions,
  countValidCells,
  detectInvalidityReason,
  deserializeBoard,
  emptyCells,
  findEmptyCell,
  generatePuzzle,
  generateWithUniqueSolution,
  getAllCellPositions,
  getBoxValues,
  getCandidates,
  getColumnValues,
  getDifficulty,
  getEmptyCells,
  getHint,
  getInvalidCells,
  hasUniqueSolution,
  isComplete,
  isSolved,
  isValidBox,
  isValidPlacement,
  isValidColumn,
  isValidPuzzle,
  isValidRow,
  mirrorBoard,
  randomizeBoard,
  rotateBoard,
  scoreToDifficulty,
  serializeBoard,
  setCellValue,
  solvePuzzle,
  swapColWithinStack,
  swapDigits,
  swapRowWithinBand,
  validateCellIndex,
} from './utils'
