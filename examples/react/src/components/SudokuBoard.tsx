/**
 * SudokuBoard Component
 * 
 * 9x9 Sudoku grid container
 * Renders all cells and handles keyboard navigation
 */

import { useEffect } from 'react';
import { SudokuCell } from './SudokuCell';
import type { CellPosition } from '../types';

interface SudokuBoardProps {
  board: number[][];
  initialBoard: number[][];
  selectedCell: CellPosition | null;
  onCellSelect: (row: number, col: number) => void;
  disabled: boolean;
}

export function SudokuBoard({
  board,
  initialBoard,
  selectedCell,
  onCellSelect,
  disabled,
}: SudokuBoardProps) {
  // Keyboard navigation
  useEffect(() => {
    if (disabled || !selectedCell) return;
    
    const handleKeyDown = (e: KeyboardEvent) => {
      const { row, col } = selectedCell;
      
      switch (e.key) {
        case 'ArrowUp':
          e.preventDefault();
          if (row > 0) onCellSelect(row - 1, col);
          break;
        case 'ArrowDown':
          e.preventDefault();
          if (row < 8) onCellSelect(row + 1, col);
          break;
        case 'ArrowLeft':
          e.preventDefault();
          if (col > 0) onCellSelect(row, col - 1);
          break;
        case 'ArrowRight':
          e.preventDefault();
          if (col < 8) onCellSelect(row, col + 1);
          break;
        case '1':
        case '2':
        case '3':
        case '4':
        case '5':
        case '6':
        case '7':
        case '8':
        case '9':
          // Handled by parent
          break;
        case '0':
        case 'Backspace':
        case 'Delete':
          // Handled by parent
          break;
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [disabled, selectedCell, onCellSelect]);
  
  const renderCells = () => {
    const cells = [];
    
    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        const isSelected = selectedCell?.row === row && selectedCell?.col === col;
        const isFixed = initialBoard[row][col] !== 0;
        
        cells.push(
          <SudokuCell
            key={`${row}-${col}`}
            row={row}
            col={col}
            value={board[row][col]}
            isFixed={isFixed}
            isSelected={isSelected}
            onSelect={onCellSelect}
          />
        );
      }
    }
    
    return cells;
  };
  
  return (
    <div className="sudoku-board" role="grid" aria-label="Sudoku board">
      {renderCells()}
    </div>
  );
}