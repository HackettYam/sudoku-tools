import { copyFileSync, existsSync, mkdirSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'

import { type BoardType, Difficulty, generatePuzzle, solvePuzzle } from '../src/index'

interface BenchmarkMetrics {
  avg: number
  min: number
  max: number
  total: number
}

interface BenchmarkResult {
  difficulty: string
  metric: string
  avg: number
  min: number
  max: number
}

const ITERATIONS = 10
const RESULTS_DIR = 'benchmark-results'

const difficulties = [
  Difficulty.Novice,
  Difficulty.Easy,
  Difficulty.Normal,
  Difficulty.Hard,
  Difficulty.Expert,
]

/**
 * Gets environment information for the benchmark report.
 */
function getEnvironmentInfo(): string {
  const nodeVersion = process.version
  const { platform } = process
  const { arch } = process

  return `Node ${nodeVersion}, ${platform} (${arch})`
}

/**
 * Gets the current timestamp formatted for filename and display.
 */
function getTimestamp(): { filename: string, display: string } {
  const now = new Date()
  const year = now.getFullYear()
  const month = String(now.getMonth() + 1).padStart(2, '0')
  const day = String(now.getDate()).padStart(2, '0')
  const hours = String(now.getHours()).padStart(2, '0')
  const minutes = String(now.getMinutes()).padStart(2, '0')
  const seconds = String(now.getSeconds()).padStart(2, '0')

  return {
    display: `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`,
    filename: `benchmark-${year}-${month}-${day}-${hours}${minutes}${seconds}`,
  }
}

/**
 * Formats a metrics object for display in the table.
 */
function formatMetrics(metrics: { avg: number, min: number, max: number }): string {
  return `avg: ${metrics.avg.toFixed(2)}, min: ${metrics.min.toFixed(2)}, max: ${metrics.max.toFixed(2)}`
}

/**
 * Measures generation time for a given difficulty.
 */
function measureGeneration(difficulty: Difficulty): BenchmarkMetrics {
  // Warm-up run
  generatePuzzle(difficulty)

  const times: number[] = []

  for (let i = 0; i < ITERATIONS; i++) {
    const start = performance.now()
    generatePuzzle(difficulty)
    const end = performance.now()
    times.push(end - start)
  }

  const min = Math.min(...times)
  const max = Math.max(...times)
  const total = times.reduce((sum, t) => sum + t, 0)
  const avg = total / times.length

  return { avg, max, min, total }
}

/**
 * Measures solving time for a given puzzle board.
 */
function measureSolving(board: BoardType): BenchmarkMetrics {
  // Warm-up run
  solvePuzzle(board)

  const times: number[] = []

  for (let i = 0; i < ITERATIONS; i++) {
    const start = performance.now()
    solvePuzzle(board)
    const end = performance.now()
    times.push(end - start)
  }

  const min = Math.min(...times)
  const max = Math.max(...times)
  const total = times.reduce((sum, t) => sum + t, 0)
  const avg = total / times.length

  return { avg, max, min, total }
}

/**
 * Formats the benchmark results as an ASCII table.
 */
function formatTable(results: BenchmarkResult[]): string {
  const header = '┌─────────────────┬─────────────┬───────────┬───────────┬─────────┐\n'
    + '│ Difficulty      │ Metric      │ Avg (ms)  │ Min (ms)  │ Max (ms)│\n'
    + '├─────────────────┼─────────────┼───────────┼───────────┼─────────┤'

  const rows = results.map(r => {
    const difficulty = r.difficulty.padEnd(15)
    const metric = r.metric.padEnd(11)
    const avg = r.avg.toFixed(2).padStart(9)
    const min = r.min.toFixed(2).padStart(9)
    const max = r.max.toFixed(2).padStart(9)

    return `│ ${difficulty} │ ${metric} │ ${avg} │ ${min} │ ${max} │`
  })

  const footer = '└─────────────────┴─────────────┴───────────┴───────────┴─────────┘'

  return [header, ...rows, footer].join('\n')
}

/**
 * Generates the markdown content for the benchmark results file.
 */
function generateMarkdownReport(
  results: BenchmarkResult[],
  timestamp: { filename: string, display: string },
): string {
  const envInfo = getEnvironmentInfo()

  // Group results by difficulty
  const groupedResults = new Map<string, { generation: BenchmarkResult, solving: BenchmarkResult }>()

  for (const result of results) {
    if (result.metric === 'Generation') {
      groupedResults.set(result.difficulty, { generation: result, solving: null as unknown as BenchmarkResult })
    } else if (result.metric === 'Solving' && groupedResults.has(result.difficulty)) {
      const existing = groupedResults.get(result.difficulty)
      if (existing) {
        existing.solving = result
      }
    }
  }

  const tableRows = Array.from(groupedResults.entries()).map(([difficulty, data]) => {
    return `| ${difficulty} | ${formatMetrics(data.generation)} | ${formatMetrics(data.solving)} |`
  })
    .join('\n')

  return `# Benchmark Results - ${timestamp.filename}

**Date:** ${timestamp.display}
**Environment:** ${envInfo}
**Iterations:** ${ITERATIONS} per difficulty

## Results

| Difficulty | Generation (ms) | Solving (ms) |
|------------|-----------------|--------------|
${tableRows}

## Notes
- Warm-up run discarded before measurement
- Uses performance.now() for timing
`
}

/**
 * Saves the benchmark results to files.
 */
function saveResults(
  results: BenchmarkResult[],
  timestamp: { filename: string, display: string },
): void {
  // Ensure the results directory exists
  if (!existsSync(RESULTS_DIR)) {
    mkdirSync(RESULTS_DIR, { recursive: true })
  }

  // Generate markdown report
  const markdownReport = generateMarkdownReport(results, timestamp)

  // Save timestamped result
  const timestampedFilename = `${timestamp.filename}.md`
  const timestampedPath = join(RESULTS_DIR, timestampedFilename)
  writeFileSync(timestampedPath, markdownReport, 'utf-8')
  console.log(`  Results saved to: ${timestampedPath}`)

  // Always copy to latest.md
  const latestPath = join(RESULTS_DIR, 'latest.md')
  copyFileSync(timestampedPath, latestPath)
  console.log(`  Latest results copied to: ${latestPath}`)
}

/**
 * Runs the benchmark for all difficulty levels.
 */
function runBenchmark(): void {
  const results: BenchmarkResult[] = []

  const timestamp = getTimestamp()
  console.log(`Benchmark started at: ${timestamp.display}`)
  console.log('')

  for (const difficulty of difficulties) {
    const difficultyName = difficulty.charAt(0).toUpperCase() + difficulty.slice(1)

    // Measure generation
    const genMetrics = measureGeneration(difficulty)
    results.push({
      avg: genMetrics.avg,
      difficulty: difficultyName,
      max: genMetrics.max,
      metric: 'Generation',
      min: genMetrics.min,
    })

    // Measure solving (generate puzzle first)
    const { board } = generatePuzzle(difficulty)
    const solveMetrics = measureSolving(board)
    results.push({
      avg: solveMetrics.avg,
      difficulty: difficultyName,
      max: solveMetrics.max,
      metric: 'Solving',
      min: solveMetrics.min,
    })
  }

  // Output results to console
  console.log('                      Sudoku Tools Benchmark                      ')
  console.log(`                      Iterations: ${ITERATIONS} per difficulty                `)
  console.log('')
  console.log(formatTable(results))
  console.log('')

  // Save results to files
  console.log('Saving results...')
  saveResults(results, timestamp)
  console.log('')
  console.log('Benchmark complete!')
}

// Only run if executed directly (not imported)
if (require.main === module) {
  runBenchmark()
}

// Export public API
export {
  formatMetrics,
  formatTable,
  generateMarkdownReport,
  getEnvironmentInfo,
  getTimestamp,
  measureGeneration,
  measureSolving,
  runBenchmark,
  saveResults,
}
