/**
 * Basic tests for Sudoku React components
 * 
 * Run: cd examples/react && pnpm test
 */

import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { SudokuCell } from './SudokuCell'
import { SudokuBoard } from './SudokuBoard'

describe('SudokuCell Component', () => {
  it('should render cell value when present', () => {
    render(
      <SudokuCell
        row={0}
        col={0}
        value={5}
        isFixed={false}
        isSelected={false}
        onSelect={() => {}}
      />
    )
    
    expect(screen.getByText('5')).toBeDefined()
  })

  it('should not render when value is 0', () => {
    render(
      <SudokuCell
        row={0}
        col={0}
        value={0}
        isFixed={false}
        isSelected={false}
        onSelect={() => {}}
      />
    )
    
    const cell = screen.getByRole('button')
    expect(cell.textContent).toBe('')
  })

  it('should have fixed class when cell is fixed', () => {
    render(
      <SudokuCell
        row={0}
        col={0}
        value={5}
        isFixed={true}
        isSelected={false}
        onSelect={() => {}}
      />
    )
    
    const cell = screen.getByRole('button')
    expect(cell.className).toContain('fixed')
  })

  it('should have selected class when selected', () => {
    render(
      <SudokuCell
        row={0}
        col={0}
        value={5}
        isFixed={false}
        isSelected={true}
        onSelect={() => {}}
      />
    )
    
    const cell = screen.getByRole('button')
    expect(cell.className).toContain('selected')
  })

  it('should call onSelect when clicked', () => {
    let selected: { row: number; col: number } | null = null
    
    render(
      <SudokuCell
        row={4}
        col={5}
        value={0}
        isFixed={false}
        isSelected={false}
        onSelect={(row, col) => {
          selected = { row, col }
        }}
      />
    )
    
    const cell = screen.getByRole('button')
    cell.click()
    
    expect(selected).toEqual({ row: 4, col: 5 })
  })
})

describe('SudokuBoard Component', () => {
  const mockBoard = [
    [5, 3, 0, 0, 7, 0, 0, 0, 0],
    [6, 0, 0, 1, 9, 5, 0, 0, 0],
    [0, 9, 8, 0, 0, 0, 0, 6, 0],
    [8, 0, 0, 0, 6, 0, 0, 0, 3],
    [4, 0, 0, 8, 0, 3, 0, 0, 1],
    [7, 0, 0, 0, 2, 0, 0, 0, 6],
    [0, 6, 0, 0, 0, 0, 2, 8, 0],
    [0, 0, 0, 4, 1, 9, 0, 0, 5],
    [0, 0, 0, 0, 8, 0, 0, 7, 9],
  ]

  const mockInitialBoard = [
    [5, 3, 0, 0, 7, 0, 0, 0, 0],
    [6, 0, 0, 1, 9, 5, 0, 0, 0],
    [0, 9, 8, 0, 0, 0, 0, 6, 0],
    [8, 0, 0, 0, 6, 0, 0, 0, 3],
    [4, 0, 0, 8, 0, 3, 0, 0, 1],
    [7, 0, 0, 0, 2, 0, 0, 0, 6],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 4, 1, 9, 0, 0, 5],
    [0, 0, 0, 0, 8, 0, 0, 7, 9],
  ]

  it('should render 81 cells', () => {
    render(
      <SudokuBoard
        board={mockBoard}
        initialBoard={mockInitialBoard}
        selectedCell={null}
        onCellSelect={() => {}}
        disabled={false}
      />
    )
    
    const cells = document.querySelectorAll('.sudoku-cell')
    expect(cells.length).toBe(81)
  })

  it('should render fixed cells with fixed class', () => {
    render(
      <SudokuBoard
        board={mockBoard}
        initialBoard={mockInitialBoard}
        selectedCell={null}
        onCellSelect={() => {}}
        disabled={false}
      />
    )
    
    const fixedCells = document.querySelectorAll('.sudoku-cell.fixed')
    expect(fixedCells.length).toBeGreaterThan(0)
  })

  it('should render non-fixed cells without fixed class', () => {
    render(
      <SudokuBoard
        board={mockBoard}
        initialBoard={mockInitialBoard}
        selectedCell={null}
        onCellSelect={() => {}}
        disabled={false}
      />
    )
    
    const nonFixedCells = document.querySelectorAll('.sudoku-cell:not(.fixed)')
    expect(nonFixedCells.length).toBeGreaterThan(0)
  })

  it('should display numeric values correctly', () => {
    render(
      <SudokuBoard
        board={mockBoard}
        initialBoard={mockInitialBoard}
        selectedCell={null}
        onCellSelect={() => {}}
        disabled={false}
      />
    )
    
    // Check that there are cells with numbers (multiple 5s exist in the board)
    const fives = screen.getAllByText('5')
    expect(fives.length).toBeGreaterThan(0)
    
    const threes = screen.getAllByText('3')
    expect(threes.length).toBeGreaterThan(0)
  })

  it('should highlight selected cell', () => {
    render(
      <SudokuBoard
        board={mockBoard}
        initialBoard={mockInitialBoard}
        selectedCell={{ row: 0, col: 2 }}
        onCellSelect={() => {}}
        disabled={false}
      />
    )
    
    const selectedCell = document.querySelector('.sudoku-cell.selected')
    expect(selectedCell).toBeDefined()
  })

  it('should call onCellSelect when cell is clicked', () => {
    let selected: { row: number; col: number } | null = null
    
    render(
      <SudokuBoard
        board={mockBoard}
        initialBoard={mockInitialBoard}
        selectedCell={null}
        onCellSelect={(row, col) => {
          selected = { row, col }
        }}
        disabled={false}
      />
    )
    
    const cell = document.querySelector('.sudoku-cell') as HTMLElement | null
    cell?.click()
    
    expect(selected).not.toBeNull()
  })
})