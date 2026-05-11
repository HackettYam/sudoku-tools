/**
 * Checks a group of values (row, column, or box) for duplicates.
 *
 * @param values - Array of values to check for duplicates
 * @param label - Description used in the error message if a duplicate is found
 * @returns The label if a duplicate is found, null otherwise
 *
 * @example
 * ```typescript
 * import { checkGroup } from '@hackettyam/sudoku-tools'
 *
 * const values = [1, 2, 3, 4, 5, 6, 7, 8, 9]
 * const result = checkGroup(values, 'row 0')
 * console.log(result) // null (no duplicates)
 * ```
 */
export function checkGroup(values: number[], label: string): string | null {
  const seen = new Set<number>()
  for (const value of values) {
    if (value !== 0) {
      if (seen.has(value)) {
        return label
      }
      seen.add(value)
    }
  }
  return null
}
