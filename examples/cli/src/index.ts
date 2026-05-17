/**
 * Interactive Sudoku CLI Game
 * 
 * A fully playable Sudoku game in the terminal using @hackettyam/sudoku-tools
 * 
 * Run: pnpm start
 */

import {
  generatePuzzle,
  isValidPlacement,
  isSolved,
  getHint,
  Difficulty,
  type BoardType,
} from '@hackettyam/sudoku-tools';

interface CellPosition {
  row: number;
  col: number;
}

/**
 * Print the Sudoku board to console
 */
function printBoard(board: number[][], selected: CellPosition | null = null): void {
  console.log('    1   2   3   4   5   6   7   8   9');
  console.log('  ┌───┬───┬───┼───┬───┬───┼───┬───┬───┐');
  
  for (let row = 0; row < 9; row++) {
    let line = `${row + 1} │`;
    
    for (let col = 0; col < 9; col++) {
      const cell = board[row][col];
      const isSelected = selected && selected.row === row && selected.col === col;
      const isFixed = cell !== 0;
      
      let cellStr = cell === 0 ? ' ' : cell.toString();
      
      if (isSelected) {
        cellStr = `\x1b[42m${cellStr}\x1b[0m`;
      } else if (isFixed) {
        cellStr = `\x1b[36m${cellStr}\x1b[0m`;
      }
      
      line += ` ${cellStr} │`;
      
      if (col === 2 || col === 5) {
        line = line.slice(0, -1) + '┼';
      }
    }
    
    console.log(line);
    
    if (row === 2 || row === 5) {
      console.log('  ├───┼───┼───┼───┼───┼───┼───┼───┼───┤');
    } else if (row < 8) {
      console.log('  ├───┼───┼───┼───┼───┼───┼───┼───┼───┤');
    }
  }
  
  console.log('  └───┴───┴───┴───┴───┴───┴───┴───┴───┘');
}

/**
 * Main game function
 */
async function main(): Promise<void> {
  const readline = await import('readline');
  
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  
  console.clear();
  console.log('\n╔════════════════════════════════════════╗');
  console.log('║         SUDOKU CLI - PLAYABLE          ║');
  console.log('║      Using @hackettyam/sudoku-tools   ║');
  console.log('╚════════════════════════════════════════╝\n');
  
  console.log('Select difficulty:');
  console.log('  1 - Easy (Novice)');
  console.log('  2 - Medium (Normal)');
  console.log('  3 - Hard (Expert)\n');
  
  rl.question('Choose (1-3) [default: 2]: ', (answer) => {
    const diff = answer.trim() === '1' 
      ? Difficulty.Novice 
      : answer.trim() === '3' 
        ? Difficulty.Expert 
        : Difficulty.Normal;
    
    console.log(`\nDifficulty: ${diff}\n`);
    
// Generate puzzle using the library
    const puzzle = generatePuzzle(diff);
    const board = puzzle.board.map(row => [...row]) as BoardType;
    const solved = puzzle.solved as BoardType;
    const initialBoard = board.map(row => [...row]);
    
    let selectedCell: CellPosition | null = null;
    let moves = 0;
    let hintsUsed = 0;
    
    function render(): void {
      console.clear();
      console.log('\n╔════════════════════════════════════════╗');
      console.log('║         SUDOKU CLI - PLAYABLE          ║');
      console.log('║      Using @hackettyam/sudoku-tools   ║');
      console.log('╚════════════════════════════════════════╝\n');
      
      const selectedText = selectedCell 
        ? `${selectedCell.row + 1}, ${selectedCell.col + 1}` 
        : 'none';
      console.log(`Moves: ${moves} | Hints: ${hintsUsed} | Selected: ${selectedText}\n`);
      printBoard(board, selectedCell);
      
      console.log('Commands:');
      console.log('  row col value  - Place number (e.g., "1 2 5")');
      console.log('  r c            - Select cell (e.g., "1 2")');
      console.log('  h, hint        - Get a hint');
      console.log('  n              - New game');
      console.log('  q              - Quit\n');
    }
    
    function gameLoop(): void {
      render();
      
      rl.question('Enter move: ', (input) => {
        const parts = input.trim().split(/\s+/);
        
        // Quit
        if (parts[0] === 'q' || parts[0] === 'quit') {
          console.log('Thanks for playing!');
          rl.close();
          return;
        }
        
        // New game
        if (parts[0] === 'n' || parts[0] === 'new') {
          const newPuzzle = generatePuzzle(diff);
          board.splice(0, board.length, ...newPuzzle.board.map(r => [...r]));
          initialBoard.splice(0, initialBoard.length, ...board.map(r => [...r]));
          selectedCell = null;
          moves = 0;
          hintsUsed = 0;
          gameLoop();
          return;
        }
        
        // Hint
        if (parts[0] === 'h' || parts[0] === 'hint') {
          const hint = getHint(board, solved);
          if (hint) {
            console.log(`\n\x1b[33m💡 Hint: Row ${hint.row + 1}, Col ${hint.col + 1} should be ${hint.value}\x1b[0m`);
            hintsUsed++;
          } else {
            console.log('\n\x1b[31mNo hints available!\x1b[0m');
          }
          setTimeout(gameLoop, 2000);
          return;
        }
        
        // Select cell (row col)
        if (parts.length === 2) {
          const row = parseInt(parts[0]) - 1;
          const col = parseInt(parts[1]) - 1;
          
          if (!isNaN(row) && !isNaN(col) && row >= 0 && row <= 8 && col >= 0 && col <= 8) {
            selectedCell = { row, col };
            console.log(`\n\x1b[32mSelected: Row ${row + 1}, Col ${col + 1}\x1b[0m`);
            setTimeout(gameLoop, 1000);
            return;
          }
        }
        
        // Place number (row col value)
        if (parts.length === 3 && selectedCell) {
          const value = parseInt(parts[2]);
          const { row, col } = selectedCell;
          
          if (isNaN(value) || value < 1 || value > 9) {
            console.log('Invalid value. Use 1-9.');
            setTimeout(gameLoop, 1000);
            return;
          }
          
          if (initialBoard[row][col] !== 0) {
            console.log('Cannot modify initial cells!');
            setTimeout(gameLoop, 1000);
            return;
          }
          
          // Use library's isValidPlacement (object parameter format)
          const result = isValidPlacement(board, { row, col, value });
          
          if (result.valid) {
            board[row][col] = value;
            moves++;
            
            if (isSolved(board, solved)) {
              render();
              console.log('\n🎉 CONGRATULATIONS! YOU SOLVED THE PUZZLE! 🎉\n');
              console.log(`Total moves: ${moves}`);
              console.log(`Hints used: ${hintsUsed}`);
              rl.close();
              return;
            }
          } else {
            console.log(`\n\x1b[31m${result.reason || 'Invalid move!'}\x1b[0m`);
            setTimeout(gameLoop, 1500);
            return;
          }
          
          gameLoop();
          return;
        }
        
        console.log('Invalid command. Try "1 2 5" to place 5 at row 1, col 2.');
        setTimeout(gameLoop, 1500);
      });
    }
    
    gameLoop();
  });
}

// Export for testing
export { main };

// Run if executed directly
main().catch(console.error);