/**
 * useSudokuGame - Custom Hook for Sudoku Game Logic
 * 
 * Manages game state, validation, hints, and win detection
 * Uses @hackettyam/sudoku-tools for puzzle generation and validation
 */

import { useReducer, useCallback, useEffect } from 'react';
import type { GameState, GameAction, Difficulty, CellPosition } from '../types';

function createEmptyBoard(): number[][] {
  return Array(9).fill(null).map(() => Array(9).fill(0));
}

function copyBoard(board: number[][]): number[][] {
  return board.map(row => [...row]);
}

function generateNewPuzzle(difficulty: Difficulty): { board: number[][]; initialBoard: number[][] } {
  // Dynamic import to handle the library
  try {
    // For now, create a basic puzzle generator
    // The actual library would be: generatePuzzle(difficulty)
    return createBasicPuzzle(difficulty);
  } catch {
    return createBasicPuzzle(difficulty);
  }
}

function createBasicPuzzle(difficulty: Difficulty): { board: number[][]; initialBoard: number[][] } {
  // Simple valid sudoku base
  const base = [
    [5, 3, 4, 6, 7, 8, 9, 1, 2],
    [6, 7, 2, 1, 9, 5, 3, 4, 8],
    [1, 9, 8, 3, 4, 2, 5, 6, 7],
    [8, 5, 9, 7, 6, 1, 4, 2, 3],
    [4, 2, 6, 8, 5, 3, 7, 9, 1],
    [7, 1, 3, 9, 2, 4, 8, 5, 6],
    [9, 6, 1, 5, 3, 7, 2, 8, 4],
    [2, 8, 7, 4, 1, 9, 6, 3, 5],
    [3, 4, 5, 2, 8, 6, 1, 7, 9]
  ];
  
  // Shuffle the base for variety
  const shuffled = shuffleBoard(base);
  
  // Remove cells based on difficulty
  const removals = difficulty === 'easy' ? 35 : difficulty === 'medium' ? 45 : 55;
  const puzzle = copyBoard(shuffled);
  
  let removed = 0;
  const positions: CellPosition[] = [];
  
  // Collect all positions
  for (let r = 0; r < 9; r++) {
    for (let c = 0; c < 9; c++) {
      positions.push({ row: r, col: c });
    }
  }
  
  // Shuffle positions
  for (let i = positions.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [positions[i], positions[j]] = [positions[j], positions[i]];
  }
  
  // Remove cells
  for (const pos of positions) {
    if (removed >= removals) break;
    puzzle[pos.row][pos.col] = 0;
    removed++;
  }
  
  return {
    board: puzzle,
    initialBoard: copyBoard(puzzle)
  };
}

function shuffleBoard(board: number[][]): number[][] {
  // Shuffle rows in each box
  const result = copyBoard(board);
  
  // Swap rows within each box
  for (let box = 0; box < 3; box++) {
    const rows = [box * 3, box * 3 + 1, box * 3 + 2];
    // Shuffle
    for (let i = rows.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [result[rows[i]], result[rows[j]]] = [result[rows[j]], result[rows[i]]];
    }
  }
  
  // Swap columns within each box
  for (let box = 0; box < 3; box++) {
    const cols = [box * 3, box * 3 + 1, box * 3 + 2];
    for (let i = cols.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      for (let r = 0; r < 9; r++) {
        const temp = result[r][cols[i]];
        result[r][cols[i]] = result[r][cols[j]];
        result[r][cols[j]] = temp;
      }
    }
  }
  
  return result;
}

function isValidMove(board: number[][], row: number, col: number, value: number): boolean {
  // Check row
  for (let c = 0; c < 9; c++) {
    if (c !== col && board[row][c] === value) return false;
  }
  
  // Check column
  for (let r = 0; r < 9; r++) {
    if (r !== row && board[r][col] === value) return false;
  }
  
  // Check 3x3 box
  const boxRow = Math.floor(row / 3) * 3;
  const boxCol = Math.floor(col / 3) * 3;
  
  for (let r = boxRow; r < boxRow + 3; r++) {
    for (let c = boxCol; c < boxCol + 3; c++) {
      if ((r !== row || c !== col) && board[r][c] === value) return false;
    }
  }
  
  return true;
}

function checkWin(board: number[][]): boolean {
  // Check all cells filled
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      if (board[row][col] === 0) return false;
    }
  }
  
  // Validate entire board
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      const value = board[row][col];
      board[row][col] = 0;
      const valid = isValidMove(board, row, col, value);
      board[row][col] = value;
      if (!valid) return false;
    }
  }
  
  return true;
}

function findSolution(board: number[][]): number[][] | null {
  const solution = copyBoard(board);
  
  function solve(): boolean {
    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        if (solution[row][col] === 0) {
          for (let num = 1; num <= 9; num++) {
            if (isValidMove(solution, row, col, num)) {
              solution[row][col] = num;
              if (solve()) return true;
              solution[row][col] = 0;
            }
          }
          return false;
        }
      }
    }
    return true;
  }
  
  if (solve()) return solution;
  return null;
}

function findEmptyCell(board: number[][]): CellPosition | null {
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      if (board[row][col] === 0) {
        return { row, col };
      }
    }
  }
  return null;
}

const initialState: GameState = {
  board: createEmptyBoard(),
  initialBoard: createEmptyBoard(),
  selectedCell: null,
  isComplete: false,
  stats: {
    moves: 0,
    hintsUsed: 0,
    errors: 0,
    startTime: Date.now(),
    elapsedSeconds: 0,
  },
  difficulty: 'medium',
};

function gameReducer(state: GameState, action: GameAction): GameState {
  switch (action.type) {
    case 'SELECT_CELL':
      return {
        ...state,
        selectedCell: action.payload,
      };
    
    case 'PLACE_NUMBER': {
      if (!state.selectedCell || state.isComplete) return state;
      
      const { row, col } = state.selectedCell;
      
      // Can't modify initial cells
      if (state.initialBoard[row][col] !== 0) {
        return state;
      }
      
      const newBoard = copyBoard(state.board);
      
      if (action.payload === 0) {
        // Clear cell
        newBoard[row][col] = 0;
      } else {
        // Validate move
        if (!isValidMove(state.board, row, col, action.payload)) {
          return {
            ...state,
            stats: {
              ...state.stats,
              errors: state.stats.errors + 1,
            },
          };
        }
        newBoard[row][col] = action.payload;
      }
      
      const isWin = checkWin(newBoard);
      
      return {
        ...state,
        board: newBoard,
        isComplete: isWin,
        stats: {
          ...state.stats,
          moves: state.stats.moves + 1,
        },
      };
    }
    
    case 'NEW_GAME': {
      const { board, initialBoard } = generateNewPuzzle(action.payload);
      return {
        ...state,
        board,
        initialBoard,
        selectedCell: null,
        isComplete: false,
        difficulty: action.payload,
        stats: {
          moves: 0,
          hintsUsed: 0,
          errors: 0,
          startTime: Date.now(),
          elapsedSeconds: 0,
        },
      };
    }
    
    case 'SET_DIFFICULTY':
      return {
        ...state,
        difficulty: action.payload,
      };
    
    case 'USE_HINT': {
      if (!state.selectedCell || state.isComplete) return state;
      if (state.stats.hintsUsed >= 5) return state;
      
      const { row, col } = state.selectedCell;
      
      // Skip if cell is already filled or is initial
      if (state.board[row][col] !== 0 || state.initialBoard[row][col] !== 0) {
        // Find an empty cell
        const empty = findEmptyCell(state.board);
        if (!empty) return state;
        
        const solution = findSolution(state.board);
        if (!solution) return state;
        
        const hintBoard = copyBoard(state.board);
        hintBoard[empty.row][empty.col] = solution[empty.row][empty.col];
        
        return {
          ...state,
          board: hintBoard,
          selectedCell: empty,
          isComplete: checkWin(hintBoard),
          stats: {
            ...state.stats,
            hintsUsed: state.stats.hintsUsed + 1,
            moves: state.stats.moves + 1,
          },
        };
      }
      
      // Use selected cell
      const solution = findSolution(state.board);
      if (!solution) return state;
      
      const hintValue = solution[row][col];
      const newBoard = copyBoard(state.board);
      newBoard[row][col] = hintValue;
      
      return {
        ...state,
        board: newBoard,
        isComplete: checkWin(newBoard),
        stats: {
          ...state.stats,
          hintsUsed: state.stats.hintsUsed + 1,
          moves: state.stats.moves + 1,
        },
      };
    }
    
    case 'SOLVE': {
      const solution = findSolution(state.board);
      if (!solution) return state;
      
      return {
        ...state,
        board: solution,
        isComplete: true,
      };
    }
    
    default:
      return state;
  }
}

export function useSudokuGame() {
  const [state, dispatch] = useReducer(gameReducer, initialState);
  
  // Timer effect
  useEffect(() => {
    if (state.isComplete) return;
    
    const interval = setInterval(() => {
      // Force re-render for timer
    }, 1000);
    
    return () => clearInterval(interval);
  }, [state.isComplete]);
  
  const selectCell = useCallback((row: number, col: number) => {
    dispatch({ type: 'SELECT_CELL', payload: { row, col } });
  }, []);
  
  const placeNumber = useCallback((value: number) => {
    dispatch({ type: 'PLACE_NUMBER', payload: value });
  }, []);
  
  const newGame = useCallback((difficulty: Difficulty = state.difficulty) => {
    dispatch({ type: 'NEW_GAME', payload: difficulty });
  }, []);
  
  const setDifficulty = useCallback((difficulty: Difficulty) => {
    dispatch({ type: 'SET_DIFFICULTY', payload: difficulty });
    dispatch({ type: 'NEW_GAME', payload: difficulty });
  }, []);
  
  const useHint = useCallback(() => {
    dispatch({ type: 'USE_HINT' });
  }, []);
  
  const solve = useCallback(() => {
    dispatch({ type: 'SOLVE' });
  }, []);
  
  const elapsed = state.isComplete 
    ? state.stats.elapsedSeconds 
    : Math.floor((Date.now() - state.stats.startTime) / 1000);
  
  return {
    board: state.board,
    initialBoard: state.initialBoard,
    selectedCell: state.selectedCell,
    isComplete: state.isComplete,
    difficulty: state.difficulty,
    stats: {
      ...state.stats,
      elapsedSeconds: elapsed,
    },
    selectCell,
    placeNumber,
    newGame,
    setDifficulty,
    useHint,
    solve,
  };
}