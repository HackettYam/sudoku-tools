import { describe, expect, it } from 'vitest'

import { SUDOKU_SIZE } from '../../constants'
import { getAllCellPositions } from '../getAllCellPositions'

describe('getAllCellPositions', () => {
  it('should return 81 positions', () => {
    const positions = getAllCellPositions()

    expect(positions).toHaveLength(SUDOKU_SIZE * SUDOKU_SIZE)
  })

  it('should contain all valid positions', () => {
    const positions = getAllCellPositions()
    const sortedPositions = [...positions].sort((a, b) => {
      if (a[0] !== b[0]) return a[0] - b[0]

      return a[1] - b[1]
    })

    let index = 0

    for (let row = 0; row < SUDOKU_SIZE; row++) {
      for (let col = 0; col < SUDOKU_SIZE; col++) {
        expect(sortedPositions[index]).toEqual([
          row,
          col,
        ])
        index++
      }
    }
  })

  it('should return positions as [row, col] tuples', () => {
    const positions = getAllCellPositions()

    for (const position of positions) {
      expect(position).toHaveLength(2)
      expect(position[0]).toBeGreaterThanOrEqual(0)
      expect(position[0]).toBeLessThan(SUDOKU_SIZE)
      expect(position[1]).toBeGreaterThanOrEqual(0)
      expect(position[1]).toBeLessThan(SUDOKU_SIZE)
    }
  })

  it('should return shuffled positions (randomness)', () => {
    const positions1 = getAllCellPositions()
    const positions2 = getAllCellPositions()

    const areIdentical = positions1.every((pos, i) => pos[0] === positions2[i][0] && pos[1] === positions2[i][1])

    expect(areIdentical).toBe(false)
  })

  it('should not have duplicate positions', () => {
    const positions = getAllCellPositions()
    const unique = new Set(positions.map(p => `${p[0]},${p[1]}`))

    expect(unique.size).toBe(81)
  })
})
