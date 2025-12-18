import { describe, expect, it } from 'vitest'

import { Difficulty } from '@/models'

import { countEmptyCells } from '../countEmptyCells'
import { generateWithUniqueSolution } from '../generateWithUniqueSolution'
import { hasUniqueSolution } from '../hasUniqueSolution'
import { isValidPuzzle } from '../isValidPuzzle'

describe('generateWithUniqueSolution', () => {
  it('should generate a valid puzzle', () => {
    const { board } = generateWithUniqueSolution(Difficulty.Easy)

    expect(isValidPuzzle(board)).toBe(true)
  })

  it('should generate a puzzle with unique solution', () => {
    const { board } = generateWithUniqueSolution(Difficulty.Easy)

    expect(hasUniqueSolution(board)).toBe(true)
  })

  it('should generate a valid solved board', () => {
    const { solved } = generateWithUniqueSolution(Difficulty.Normal)

    expect(isValidPuzzle(solved)).toBe(true)
    expect(countEmptyCells(solved)).toBe(0)
  })

  it('should respect difficulty level for empty cells', () => {
    const { board } = generateWithUniqueSolution(Difficulty.Easy)
    const emptyCount = countEmptyCells(board)

    expect(emptyCount).toBeGreaterThan(0)
    expect(emptyCount).toBeLessThanOrEqual(81 - 40)
  })

  it('should generate different puzzles on each call', () => {
    const result1 = generateWithUniqueSolution(Difficulty.Normal)
    const result2 = generateWithUniqueSolution(Difficulty.Normal)

    const board1Str = result1.board.flat().join('')
    const board2Str = result2.board.flat().join('')

    expect(board1Str).not.toBe(board2Str)
  })
})
