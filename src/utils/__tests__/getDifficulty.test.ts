import { describe, expect, it } from 'vitest'

import { SUDOKU_BASE_BOARD } from '@/constants'
import { Difficulty } from '@/models'

import { cloneBoard } from '../cloneBoard'
import { emptyCells } from '../emptyCells'
import { getDifficulty } from '../getDifficulty'

function createBoardWithEmptyCells(hints: number): number[][] {
  const board = cloneBoard(SUDOKU_BASE_BOARD)
  emptyCells(board, hints)

  return board
}

describe('getDifficulty', () => {
  it('should return Novice for solved board', () => {
    const result = getDifficulty(SUDOKU_BASE_BOARD)

    expect(result.difficulty).toBe(Difficulty.Novice)
    expect(result.emptyCells).toBe(0)
    expect(result.score).toBe(0)
  })

  it('should return difficulty result with all properties', () => {
    const board = createBoardWithEmptyCells(30)

    const result = getDifficulty(board)

    expect(result).toHaveProperty('difficulty')
    expect(result).toHaveProperty('emptyCells')
    expect(result).toHaveProperty('avgCandidates')
    expect(result).toHaveProperty('minCandidates')
    expect(result).toHaveProperty('score')
  })

  it('should detect more empty cells as harder', () => {
    const easyBoard = createBoardWithEmptyCells(61)
    const hardBoard = createBoardWithEmptyCells(31)

    const easyResult = getDifficulty(easyBoard)
    const hardResult = getDifficulty(hardBoard)

    expect(hardResult.score).toBeGreaterThan(easyResult.score)
  })

  it('should return correct empty cell count', () => {
    const board = createBoardWithEmptyCells(56)

    const result = getDifficulty(board)

    expect(result.emptyCells).toBe(25)
  })

  it('should return valid difficulty enum value', () => {
    const board = createBoardWithEmptyCells(46)

    const result = getDifficulty(board)

    expect(Object.values(Difficulty)).toContain(result.difficulty)
  })

  it('should have avgCandidates between 1 and 9', () => {
    const board = createBoardWithEmptyCells(41)

    const result = getDifficulty(board)

    expect(result.avgCandidates).toBeGreaterThanOrEqual(1)
    expect(result.avgCandidates).toBeLessThanOrEqual(9)
  })

  it('should have minCandidates between 1 and 9', () => {
    const board = createBoardWithEmptyCells(41)

    const result = getDifficulty(board)

    expect(result.minCandidates).toBeGreaterThanOrEqual(1)
    expect(result.minCandidates).toBeLessThanOrEqual(9)
  })
})
