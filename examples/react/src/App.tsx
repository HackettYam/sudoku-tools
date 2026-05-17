/**
 * Sudoku React Game - Main App Component
 * 
 * A fully playable Sudoku game using React + TypeScript
 * Uses @hackettyam/sudoku-tools for game logic
 */

import React from 'react';
import { SudokuBoard } from './components/SudokuBoard';
import { useSudokuGame } from './hooks/useSudokuGame';
import type { Difficulty } from './types';
import './index.css';

function formatTime(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}

export function App() {
  const {
    board,
    initialBoard,
    selectedCell,
    isComplete,
    difficulty,
    stats,
    selectCell,
    placeNumber,
    newGame,
    setDifficulty,
    useHint,
    solve,
  } = useSudokuGame();
  
  const handleNumberInput = (num: number) => {
    if (!selectedCell || isComplete) return;
    
    const { row, col } = selectedCell;
    
    // Can't modify fixed cells
    if (initialBoard[row][col] !== 0) return;
    
    placeNumber(num);
  };
  
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!selectedCell || isComplete) return;
    
    const { row, col } = selectedCell;
    
    // Can't modify fixed cells
    if (initialBoard[row][col] !== 0) return;
    
    if (e.key >= '1' && e.key <= '9') {
      placeNumber(parseInt(e.key));
    } else if (e.key === '0' || e.key === 'Backspace') {
      placeNumber(0);
    }
  };
  
  return (
    <div className="app" onKeyDown={handleKeyDown} tabIndex={0}>
      <header className="header">
        <h1>🎮 Sudoku</h1>
        <p className="subtitle">Play Sudoku with React</p>
      </header>
      
      <div className="controls">
        <select
          value={difficulty}
          onChange={(e) => setDifficulty(e.target.value as Difficulty)}
          disabled={isComplete}
          className="difficulty-select"
        >
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>
        
        <button
          onClick={() => newGame(difficulty)}
          className="btn btn-primary"
        >
          New Game
        </button>
        
        <button
          onClick={useHint}
          disabled={isComplete || stats.hintsUsed >= 5}
          className="btn btn-secondary"
        >
          Hint ({5 - stats.hintsUsed})
        </button>
        
        <button
          onClick={solve}
          disabled={isComplete}
          className="btn btn-warning"
        >
          Solve
        </button>
      </div>
      
      <div className="stats">
        <div className="stat">
          <span className="stat-label">Moves</span>
          <span className="stat-value">{stats.moves}</span>
        </div>
        <div className="stat">
          <span className="stat-label">Errors</span>
          <span className="stat-value">{stats.errors}</span>
        </div>
        <div className="stat">
          <span className="stat-label">Time</span>
          <span className="stat-value">{formatTime(stats.elapsedSeconds)}</span>
        </div>
      </div>
      
      {isComplete && (
        <div className="win-banner">
          🎉 Congratulations! You solved the puzzle! 🎉
        </div>
      )}
      
      <SudokuBoard
        board={board}
        initialBoard={initialBoard}
        selectedCell={selectedCell}
        onCellSelect={selectCell}
        disabled={isComplete}
      />
      
      <div className="numpad">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
          <button
            key={num}
            onClick={() => handleNumberInput(num)}
            disabled={isComplete || !selectedCell}
            className="num-btn"
          >
            {num}
          </button>
        ))}
        <button
          onClick={() => handleNumberInput(0)}
          disabled={isComplete || !selectedCell}
          className="num-btn clear"
        >
          ⌫
        </button>
      </div>
      
      <div className="instructions">
        <h3>How to Play</h3>
        <ul>
          <li>Click a cell to select it</li>
          <li>Press a number (1-9) to place it</li>
          <li>Press 0 or Backspace to clear</li>
          <li>Use arrow keys to navigate</li>
          <li>Fill the grid so each row, column, and 3×3 box has 1-9</li>
        </ul>
      </div>
    </div>
  );
}

export default App;