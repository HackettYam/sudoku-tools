/**
 * Shuffles an array using Fisher-Yates algorithm.
 *
 * @param array - The array to shuffle
 * @returns A new shuffled array
 *
 * @example
 * ```typescript
 * import { shuffleArray } from '@hackettyam/sudoku-tools'
 *
 * const numbers = [1, 2, 3, 4, 5]
 * const shuffled = shuffleArray(numbers)
 * ```
 */
export function shuffleArray<T>(array: T[]): T[] {
  const result = [...array]

  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]]
  }

  return result
}
