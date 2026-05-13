import { beforeEach, describe, expect, it } from 'vitest'

import { createSudoku } from '../../src/features/createSudoku'
import { Difficulty } from '../../src/models'
import { clearCell } from '../../src/utils/clearCell'
import { setCellValue } from '../../src/utils/setCellValue'

describe('Clone Independence', () => {
  let puzzle = createSudoku(Difficulty.Easy)

  beforeEach(() => {
    puzzle = createSudoku(Difficulty.Easy)
  })

  it('should not affect original board when setting cell', () => {
    const [ [val00] ] = puzzle.current
    const newBoard = setCellValue(puzzle.current, { col: 0, row: 0, value: 9 })

    expect(newBoard[0][0]).toBe(9)
    expect(puzzle.current[0][0]).toBe(val00)
  })

  it('should not affect original board when clearing cell', () => {
    const modified = setCellValue(puzzle.current, { col: 4, row: 4, value: 5 })
    const cleared = clearCell(modified, 4, 4)

    expect(cleared[4][4]).toBe(0)
    expect(modified[4][4]).toBe(5)
  })

  it('should maintain independence across multiple operations', () => {
    const [ [val00], [, val11], [, , val22] ] = puzzle.current

    const board1 = setCellValue(puzzle.current, { col: 0, row: 0, value: 1 })
    const board2 = setCellValue(board1, { col: 1, row: 1, value: 2 })
    const board3 = setCellValue(board2, { col: 2, row: 2, value: 3 })

    expect(board1[0][0]).toBe(1)
    expect(board2[1][1]).toBe(2)
    expect(board3[2][2]).toBe(3)

    expect(puzzle.current[0][0]).toBe(val00)
    expect(puzzle.current[1][1]).toBe(val11)
    expect(puzzle.current[2][2]).toBe(val22)
  })

  it('should handle concurrent modifications correctly', () => {
    const [ [val00] ] = puzzle.current

    const branch1 = setCellValue(puzzle.current, { col: 0, row: 0, value: 1 })
    const branch2 = setCellValue(puzzle.current, { col: 0, row: 0, value: 9 })

    expect(branch1[0][0]).toBe(1)
    expect(branch2[0][0]).toBe(9)
    expect(puzzle.current[0][0]).toBe(val00)
  })

  it('should not affect solution board when modifying current', () => {
    const [ [solVal00] ] = puzzle.solution
    setCellValue(puzzle.current, { col: 0, row: 0, value: 1 })

    expect(puzzle.solution[0][0]).toBe(solVal00)
  })

  it('should maintain board structure independence', () => {
    const [ [val00] ] = puzzle.current

    const modified = setCellValue(puzzle.current, { col: 0, row: 0, value: 1 })
    const modified2 = setCellValue(puzzle.current, { col: 8, row: 8, value: 9 })

    expect(modified[0][0]).toBe(1)
    expect(modified2[8][8]).toBe(9)
    expect(puzzle.current[0][0]).toBe(val00)
  })
})
