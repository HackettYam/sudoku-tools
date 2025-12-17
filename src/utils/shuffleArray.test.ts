import { describe, expect, it } from 'vitest'

import { shuffleArray } from './shuffleArray'

describe('shuffleArray', () => {
  it('should return an array of the same length', () => {
    const original = [
      1,
      2,
      3,
      4,
      5,
    ]
    const shuffled = shuffleArray(original)

    expect(shuffled).toHaveLength(original.length)
  })

  it('should contain all original elements', () => {
    const original = [
      1,
      2,
      3,
      4,
      5,
    ]
    const shuffled = shuffleArray(original)

    expect([...shuffled].sort((a, b) => a - b)).toEqual([...original].sort((a, b) => a - b))
  })

  it('should not modify the original array', () => {
    const original = [
      1,
      2,
      3,
      4,
      5,
    ]
    const originalCopy = [...original]

    shuffleArray(original)

    expect(original).toEqual(originalCopy)
  })

  it('should return a new array instance', () => {
    const original = [
      1,
      2,
      3,
      4,
      5,
    ]
    const shuffled = shuffleArray(original)

    expect(shuffled).not.toBe(original)
  })

  it('should handle empty array', () => {
    const original: number[] = []
    const shuffled = shuffleArray(original)

    expect(shuffled).toEqual([])
  })

  it('should handle single element array', () => {
    const original = [42]
    const shuffled = shuffleArray(original)

    expect(shuffled).toEqual([42])
  })

  it('should work with different types', () => {
    const original = ['a', 'b', 'c']
    const shuffled = shuffleArray(original)

    expect(shuffled).toHaveLength(3)
    expect([...shuffled].sort((a, b) => a.localeCompare(b))).toEqual(['a', 'b', 'c'])
  })
})
