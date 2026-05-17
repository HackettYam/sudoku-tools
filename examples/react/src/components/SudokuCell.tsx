/**
 * SudokuCell Component
 * 
 * Individual cell in the Sudoku grid
 * Handles selection, display, and user interaction
 */

interface SudokuCellProps {
  row: number;
  col: number;
  value: number;
  isFixed: boolean;
  isSelected: boolean;
  onSelect: (row: number, col: number) => void;
}

export function SudokuCell({
  row,
  col,
  value,
  isFixed,
  isSelected,
  onSelect,
}: SudokuCellProps) {
  const handleClick = () => {
    onSelect(row, col);
  };
  
  // Determine cell classes
  const classes = [
    'sudoku-cell',
    isFixed ? 'fixed' : 'user',
    isSelected ? 'selected' : '',
  ].filter(Boolean).join(' ');
  
  return (
    <div
      className={classes}
      onClick={handleClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          handleClick();
        }
      }}
      aria-label={`Row ${row + 1}, Column ${col + 1}, ${value || 'empty'}${isFixed ? ', fixed' : ''}`}
    >
      {value !== 0 ? value : ''}
    </div>
  );
}