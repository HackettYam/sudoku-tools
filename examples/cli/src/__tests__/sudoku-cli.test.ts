/**
 * Tests for Sudoku CLI Game
 * 
 * These tests verify the CLI game logic using @hackettyam/sudoku-tools
 * 
 * Run: cd examples/cli && pnpm test
 */

import { describe, it, expect } from 'vitest';
import { generatePuzzle, isSolved, Difficulty, type BoardType } from '@hackettyam/sudoku-tools';

describe('Sudoku CLI Game Logic (using @hackettyam/sudoku-tools)', () => {
  it('should generate a valid 9x9 puzzle board', () => {
    const puzzle = generatePuzzle(Difficulty.Normal);
    
    expect(puzzle.board.length).toBe(9);
    puzzle.board.forEach(row => expect(row.length).toBe(9));
  });

  it('should generate different difficulties', () => {
    const easy = generatePuzzle(Difficulty.Novice);
    const medium = generatePuzzle(Difficulty.Normal);
    const hard = generatePuzzle(Difficulty.Expert);
    
    // Each should produce different puzzles
    expect(easy.board).not.toEqual(medium.board);
    expect(medium.board).not.toEqual(hard.board);
  });

  it('should have solution for generated puzzle', () => {
    const puzzle = generatePuzzle(Difficulty.Normal);
    
    // The library ensures puzzle has a solution
    expect(puzzle.solved).toBeDefined();
    expect(puzzle.solved.length).toBe(9);
  });

  it('should detect solved board as complete', () => {
    const solvedBoard: BoardType = [
      [5, 3, 4, 6, 7, 8, 9, 1, 2],
      [6, 7, 2, 1, 9, 5, 3, 4, 8],
      [1, 9, 8, 3, 4, 2, 5, 6, 7],
      [8, 5, 9, 7, 6, 1, 4, 2, 3],
      [4, 2, 6, 8, 5, 3, 7, 9, 1],
      [7, 1, 3, 9, 2, 4, 8, 5, 6],
      [9, 6, 1, 5, 3, 7, 2, 8, 4],
      [2, 8, 7, 4, 1, 9, 6, 3, 5],
      [3, 4, 5, 2, 8, 6, 1, 7, 9],
    ];
    
    expect(isSolved(solvedBoard, solvedBoard)).toBe(true);
  });

  it('should detect incomplete board as not solved', () => {
    const incompleteBoard: BoardType = [
      [5, 3, 0, 0, 7, 0, 0, 0, 0],
      [6, 0, 0, 1, 9, 5, 0, 0, 0],
      [0, 9, 8, 0, 0, 0, 0, 6, 0],
      [8, 0, 0, 0, 6, 0, 0, 0, 3],
      [4, 0, 0, 8, 0, 3, 0, 0, 1],
      [7, 0, 0, 0, 2, 0, 0, 0, 6],
      [0, 6, 0, 0, 0, 0, 2, 8, 0],
      [0, 0, 0, 4, 1, 9, 0, 0, 5],
      [0, 0, 0, 0, 8, 0, 0, 7, 9],
    ];
    
    const solvedBoard = generatePuzzle(Difficulty.Normal).solved as BoardType;
    expect(isSolved(incompleteBoard, solvedBoard)).toBe(false);
  });

  it('should validate cell coordinates in range 0-8', () => {
    const isValidCoordinate = (row: number, col: number): boolean => {
      return row >= 0 && row <= 8 && col >= 0 && col <= 8;
    };
    
    expect(isValidCoordinate(0, 0)).toBe(true);
    expect(isValidCoordinate(8, 8)).toBe(true);
    expect(isValidCoordinate(-1, 0)).toBe(false);
    expect(isValidCoordinate(0, 9)).toBe(false);
  });

  it('should validate cell values in range 1-9', () => {
    const isValidValue = (value: number): boolean => {
      return value >= 1 && value <= 9;
    };
    
    expect(isValidValue(1)).toBe(true);
    expect(isValidValue(9)).toBe(true);
    expect(isValidValue(0)).toBe(false);
    expect(isValidValue(10)).toBe(false);
  });
});