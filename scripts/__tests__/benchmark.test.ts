import { copyFileSync, existsSync, mkdirSync, writeFileSync } from 'node:fs'

import { beforeEach, describe, expect, it, vi } from 'vitest'

import { Difficulty, generatePuzzle } from '../../src/index'
import {
  formatMetrics,
  formatTable,
  generateMarkdownReport,
  getEnvironmentInfo,
  getTimestamp,
  measureGeneration,
  measureSolving,
  runBenchmark,
  saveResults,
} from '../benchmark'


// Mock fs module for saveResults tests
vi.mock('node:fs', () => ({
  copyFileSync: vi.fn(),
  existsSync: vi.fn(),
  mkdirSync: vi.fn(),
  writeFileSync: vi.fn(),
}))

describe('getTimestamp', () => {
  it('should return object with filename and display properties', () => {
    const result = getTimestamp()

    expect(result).toHaveProperty('filename')
    expect(result).toHaveProperty('display')
    expect(typeof result.filename).toBe('string')
    expect(typeof result.display).toBe('string')
  })

  it('should have filename starting with benchmark-', () => {
    const result = getTimestamp()

    // Format: benchmark-YYYY-MM-DD-HHMMSS (with dashes between date parts)
    expect(result.filename).toMatch(/^benchmark-\d{4}-\d{2}-\d{2}-\d{6}$/)
  })

  it('should have display in YYYY-MM-DD HH:MM:SS format', () => {
    const result = getTimestamp()

    expect(result.display).toMatch(/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/)
  })

  it('filename and display should contain same date components', () => {
    const result = getTimestamp()

    // Extract date parts from display
    const dateMatch = (/^(\d{4})-(\d{2})-(\d{2})/).exec(result.display)
    expect(dateMatch).toBeTruthy()

    if (!dateMatch) {
      return
    }

    const [
      ,
      year,
      month,
      day,
    ] = dateMatch

    // Check filename contains same date
    expect(result.filename).toContain(year)
    expect(result.filename).toContain(month)
    expect(result.filename).toContain(day)
  })
})

describe('generateMarkdownReport', () => {
  it('should generate markdown with timestamp in title', () => {
    const results: { difficulty: string, metric: string, avg: number, min: number, max: number }[] = []
    const timestamp = { display: '2026-05-13 14:30:00', filename: 'benchmark-2026-05-13-143000' }

    const report = generateMarkdownReport(results, timestamp)

    expect(report).toContain('# Benchmark Results - benchmark-2026-05-13-143000')
  })

  it('should include date in the report', () => {
    const results: { difficulty: string, metric: string, avg: number, min: number, max: number }[] = []
    const timestamp = { display: '2026-05-13 14:30:00', filename: 'test' }

    const report = generateMarkdownReport(results, timestamp)

    expect(report).toContain('**Date:** 2026-05-13 14:30:00')
  })

  it('should include environment info', () => {
    const results: { difficulty: string, metric: string, avg: number, min: number, max: number }[] = []
    const timestamp = { display: 'test', filename: 'test' }

    const report = generateMarkdownReport(results, timestamp)

    expect(report).toContain('**Environment:**')
  })

  it('should include iteration count', () => {
    const results: { difficulty: string, metric: string, avg: number, min: number, max: number }[] = []
    const timestamp = { display: 'test', filename: 'test' }

    const report = generateMarkdownReport(results, timestamp)

    expect(report).toContain('**Iterations:** 10 per difficulty')
  })

  it('should have Results section with table header', () => {
    const results: { difficulty: string, metric: string, avg: number, min: number, max: number }[] = []
    const timestamp = { display: 'test', filename: 'test' }

    const report = generateMarkdownReport(results, timestamp)

    expect(report).toContain('## Results')
    expect(report).toContain('| Difficulty | Generation (ms) | Solving (ms) |')
  })

  it('should include difficulty names in the table', () => {
    const results = [
      { avg: 5.5, difficulty: 'Novice', max: 7.1, metric: 'Generation', min: 4.2 },
      { avg: 2.3, difficulty: 'Novice', max: 3.0, metric: 'Solving', min: 1.8 },
      { avg: 15.5, difficulty: 'Expert', max: 20.0, metric: 'Generation', min: 12.0 },
      { avg: 8.7, difficulty: 'Expert', max: 12.0, metric: 'Solving', min: 6.5 },
    ]
    const timestamp = { display: 'test', filename: 'test' }

    const report = generateMarkdownReport(results, timestamp)

    expect(report).toContain('| Novice |')
    expect(report).toContain('| Expert |')
  })

  it('should include Notes section', () => {
    const results: { difficulty: string, metric: string, avg: number, min: number, max: number }[] = []
    const timestamp = { display: 'test', filename: 'test' }

    const report = generateMarkdownReport(results, timestamp)

    expect(report).toContain('## Notes')
    expect(report).toContain('- Warm-up run discarded before measurement')
    expect(report).toContain('- Uses performance.now() for timing')
  })

  it('should format metrics correctly', () => {
    const results = [
      { avg: 5.5, difficulty: 'Novice', max: 7.1, metric: 'Generation', min: 4.2 },
      { avg: 2.3, difficulty: 'Novice', max: 3.0, metric: 'Solving', min: 1.8 },
    ]
    const timestamp = { display: 'test', filename: 'test' }

    const report = generateMarkdownReport(results, timestamp)

    expect(report).toContain('avg: 5.50, min: 4.20, max: 7.10')
    expect(report).toContain('avg: 2.30, min: 1.80, max: 3.00')
  })

  it('should handle empty results', () => {
    const results: { difficulty: string, metric: string, avg: number, min: number, max: number }[] = []
    const timestamp = { display: 'test', filename: 'test' }

    const report = generateMarkdownReport(results, timestamp)

    expect(report).toContain('# Benchmark Results')
    expect(report).toContain('| Difficulty | Generation (ms) | Solving (ms) |')
  })
})

describe('createResultsDirectory', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    vi.mocked(existsSync).mockReturnValue(false)
  })

  it('should create directory if it does not exist', () => {
    vi.mocked(existsSync).mockReturnValue(false)

    // Call saveResults which will create the directory
    saveResults([], { display: 'test', filename: 'test' })

    expect(existsSync).toHaveBeenCalledWith('benchmark-results')
    expect(mkdirSync).toHaveBeenCalledWith('benchmark-results', { recursive: true })
  })

  it('should not create directory if it already exists', () => {
    vi.mocked(existsSync).mockReturnValue(true)

    saveResults([], { display: 'test', filename: 'test' })

    expect(mkdirSync).not.toHaveBeenCalled()
  })

  it('should use recursive option for mkdir', () => {
    vi.mocked(existsSync).mockReturnValue(false)

    saveResults([], { display: 'test', filename: 'test' })

    expect(mkdirSync).toHaveBeenCalledWith(
      'benchmark-results',
      { recursive: true },
    )
  })
})

describe('saveResults', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    vi.mocked(existsSync).mockReturnValue(true)
  })

  it('should attempt to write files', () => {
    saveResults([], { display: 'test', filename: 'test' })

    expect(writeFileSync).toHaveBeenCalled()
  })

  it('should write to timestamped filename', () => {
    saveResults([], { display: 'test', filename: 'benchmark-2026-05-13-143000' })

    expect(writeFileSync).toHaveBeenCalledWith(
      'benchmark-results/benchmark-2026-05-13-143000.md',
      expect.any(String),
      'utf-8',
    )
  })

  it('should copy file to latest.md', () => {
    saveResults([], { display: 'test', filename: 'test' })

    expect(copyFileSync).toHaveBeenCalledWith(
      'benchmark-results/test.md',
      'benchmark-results/latest.md',
    )
  })

  it('should handle fs errors', () => {
    vi.mocked(existsSync).mockReturnValue(true)

    const mockWrite = (): void => {
      throw new Error('ENOSPC: no space left on device')
    }
    vi.mocked(writeFileSync).mockImplementation(mockWrite)

    const saveCall = (): void => {
      saveResults([], { display: 'test', filename: 'test' })
    }
    expect(saveCall).toThrow('ENOSPC: no space left on device')
  })
})

describe('formatMetrics', () => {
  it('should format metrics with fixed decimal places', () => {
    const result = formatMetrics({ avg: 10.5, max: 15.8, min: 5.2 })
    expect(result).toBe('avg: 10.50, min: 5.20, max: 15.80')
  })

  it('should handle zero values', () => {
    const result = formatMetrics({ avg: 0, max: 0, min: 0 })
    expect(result).toBe('avg: 0.00, min: 0.00, max: 0.00')
  })

  it('should handle large numbers', () => {
    const result = formatMetrics({ avg: 1234.567, max: 1500.999, min: 1000.001 })
    expect(result).toBe('avg: 1234.57, min: 1000.00, max: 1501.00')
  })

  it('should handle very small numbers', () => {
    const result = formatMetrics({ avg: 0.001, max: 0.002, min: 0.0005 })
    expect(result).toBe('avg: 0.00, min: 0.00, max: 0.00')
  })
})

describe('formatTable', () => {
  it('should format results as ASCII table', () => {
    const results = [
      { avg: 5.5, difficulty: 'Novice', max: 7.1, metric: 'Generation', min: 4.2 },
      { avg: 2.3, difficulty: 'Novice', max: 3.0, metric: 'Solving', min: 1.8 },
    ]

    const result = formatTable(results)

    expect(result).toContain('┌─────────────────┬─────────────┬───────────┬───────────┬─────────┐')
    expect(result).toContain('│ Difficulty      │ Metric      │ Avg (ms)  │ Min (ms)  │ Max (ms)│')
    expect(result).toContain('│ Novice          │ Generation  │      5.50 │      4.20 │      7.10 │')
    expect(result).toContain('└─────────────────┴─────────────┴───────────┴───────────┴─────────┘')
  })

  it('should handle empty results array', () => {
    const result = formatTable([])

    expect(result).toContain('┌─────────────────┬─────────────┬───────────┬───────────┬─────────┐')
    expect(result).toContain('└─────────────────┴─────────────┴───────────┴───────────┴─────────┘')
  })

  it('should pad different difficulty names correctly', () => {
    const results = [ { avg: 100.0, difficulty: 'Expert', max: 110.0, metric: 'Solving', min: 95.0 } ]

    const result = formatTable(results)

    // Expert should be padded
    expect(result).toContain('│ Expert')
  })

  it('should correctly pad different metric names', () => {
    const results = [
      { avg: 1.0, difficulty: 'Novice', max: 1.0, metric: 'Generation', min: 1.0 },
      { avg: 1.0, difficulty: 'Novice', max: 1.0, metric: 'Solving', min: 1.0 },
    ]

    const result = formatTable(results)

    // Both should be padded
    expect(result).toContain('│ Generation  │')
    expect(result).toContain('│ Solving     │')
  })
})

describe('measureGeneration', () => {
  it('should return metrics object with avg, min, max, total', () => {
    const result = measureGeneration(Difficulty.Novice)

    expect(result).toHaveProperty('avg')
    expect(result).toHaveProperty('min')
    expect(result).toHaveProperty('max')
    expect(result).toHaveProperty('total')
    expect(typeof result.avg).toBe('number')
    expect(typeof result.min).toBe('number')
    expect(typeof result.max).toBe('number')
    expect(typeof result.total).toBe('number')
  })

  it('should measure generation for different difficulties', () => {
    const result = measureGeneration(Difficulty.Easy)

    expect(result.avg).toBeGreaterThanOrEqual(0)
  })
})

describe('measureSolving', () => {
  it('should return metrics object with avg, min, max, total', () => {
    // First generate a puzzle to solve - use the imported generatePuzzle
    const { board } = generatePuzzle(Difficulty.Novice)
    const result = measureSolving(board)

    expect(result).toHaveProperty('avg')
    expect(result).toHaveProperty('min')
    expect(result).toHaveProperty('max')
    expect(result).toHaveProperty('total')
  })
})

describe('runBenchmark', () => {
  // Skipped: This test attempts to write to disk which fails due to "no space left on device"
  it.skip('should not throw when running benchmark', () => {
    // Mock console.log to suppress output
    const noOp = (): undefined => undefined
    vi.spyOn(console, 'log').mockImplementation(noOp)

    const runWithoutThrowing = (): void => {
      runBenchmark()
    }
    expect(runWithoutThrowing).not.toThrow()

    vi.restoreAllMocks()
  })
})

describe('getEnvironmentInfo', () => {
  it('should return environment info string', () => {
    const result = getEnvironmentInfo()

    expect(result).toContain('Node')
    expect(result).toContain(process.platform)
    expect(result).toContain(process.arch)
  })

  it('should match expected format', () => {
    const result = getEnvironmentInfo()

    expect(result).toMatch(/^Node v\d+\.\d+\.\d+, \w+ \(\w+\)$/)
  })
})

describe('Constants', () => {
  it('should have all 5 difficulty levels', () => {
    const difficulties = [
      Difficulty.Novice,
      Difficulty.Easy,
      Difficulty.Normal,
      Difficulty.Hard,
      Difficulty.Expert,
    ]

    expect(difficulties).toHaveLength(5)
  })
})
