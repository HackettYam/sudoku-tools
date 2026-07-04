/**
 * Sudoku Game Types
 * 
 * Type definitions for the React Sudoku game
 */

export type Difficulty = 'easy' | 'medium' | 'hard';

export interface CellPosition {
  row: number;
  col: number;
}

export interface GameStats {
  moves: number;
  hintsUsed: number;
  errors: number;
  startTime: number;
  elapsedSeconds: number;
}

export interface GameState {
  board: number[][];
  initialBoard: number[][];
  selectedCell: CellPosition | null;
  isComplete: boolean;
  gameStarted: boolean;
  stats: GameStats;
  difficulty: Difficulty;
}

export type GameAction =
  | { type: 'SELECT_CELL'; payload: CellPosition }
  | { type: 'PLACE_NUMBER'; payload: number }
  | { type: 'NEW_GAME'; payload: Difficulty }
  | { type: 'SET_DIFFICULTY'; payload: Difficulty }
  | { type: 'USE_HINT' }
  | { type: 'SOLVE' }
  | { type: 'TICK' };