import { SUDOKU_SIZE } from '../constants'
import type { BoardType } from '../models'

/**
 * Deserializes a string of 81 characters into a Sudoku board.
 * Each character should be a digit (0-9).
 *
 * @param str - A string of 81 characters representing the board
 * @returns The deserialized Sudoku board
 * @throws Error if the string is not exactly 81 characters or contains invalid characters
 *
 * @example
 * ```typescript
 * import { deserializeBoard, isValidPuzzle } from '@hackettyam/sudoku-tools'
 *
 * const serialized = "123456789456789123789123456234567891567891234891234567345678912678912345912345678"
 * const board = deserializeBoard(serialized)
 *
 * console.log(isValidPuzzle(board)) // true
 * ```
 */
export function deserializeBoard(str: string): BoardType {
  const expectedLength = SUDOKU_SIZE * SUDOKU_SIZE

  if (str.length !== expectedLength) {
    throw new Error(`Invalid string length: expected ${expectedLength}, got ${str.length}`)
  }

  const board: BoardType = []

  for (let row = 0; row < SUDOKU_SIZE; row++) {
    const rowArray: number[] = []

    for (let col = 0; col < SUDOKU_SIZE; col++) {
      const index = (row * SUDOKU_SIZE) + col
      const char = str[index]
      const value = Number.parseInt(char, 10)

      if (Number.isNaN(value) || value < 0 || value > 9) {
        throw new Error(`Invalid character at position ${index}: "${char}"`)
      }

      rowArray.push(value)
    }

    board.push(rowArray)
  }

  return board
}
