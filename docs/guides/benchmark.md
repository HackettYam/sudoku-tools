# 📊 Performance Benchmark

Track and measure puzzle generation and solving performance across difficulty levels.

## 🚀 Quick Start

Run the benchmark:

```bash
pnpm bench
```

This will:
- Run 10 iterations per difficulty level for both generation and solving
- Display results as an ASCII table in the console
- Save results to `benchmark-results/` directory

## 📁 Output Files

After running `pnpm bench`, the following files are created:

```
benchmark-results/
├── benchmark-YYYY-MM-DD-HHMMSS.md    # Timestamped historical record
└── latest.md                         # Most recent results
```

> **Note:** Timestamped files are gitignored. Only `latest.md` is tracked in version control if you choose to commit it.

## 📊 Understanding Results

### Console Output

```
                      Sudoku Tools Benchmark
                      Iterations: 10 per difficulty

┌─────────────────┬─────────────┬───────────┬───────────┬─────────┐
│ Difficulty      │ Metric      │ Avg (ms)  │ Min (ms)  │ Max (ms)│
├─────────────────┼─────────────┼───────────┼───────────┼─────────┤
│ Novice          │ Generation  │      0.09 │      0.05 │      0.19 │
│ Novice          │ Solving     │      0.63 │      0.45 │      1.35 │
│ Easy            │ Generation  │      0.12 │      0.08 │      0.21 │
│ Easy            │ Solving     │      1.21 │      0.95 │      1.78 │
│ Normal          │ Generation  │      0.15 │      0.10 │      0.25 │
│ Normal          │ Solving     │      3.45 │      2.89 │      4.12 │
│ Hard            │ Generation  │      0.22 │      0.15 │      0.35 │
│ Hard            │ Solving     │      8.72 │      7.21 │     11.34 │
│ Expert          │ Generation  │      0.18 │      0.12 │      0.28 │
│ Expert          │ Solving     │     14.72 │     14.49 │     15.33 │
└─────────────────┴─────────────┴───────────┴───────────┴─────────┘
```

### Metrics Explained

| Metric | Description |
|--------|-------------|
| **Generation** | Time to create a new puzzle at the specified difficulty |
| **Solving** | Time to solve a generated puzzle |
| **avg** | Average time across all iterations |
| **min** | Fastest run (best case) |
| **max** | Slowest run (worst case) |

## 🎯 Interpreting Performance

### Generation Time

- **Novice/Easy:** Fast generation (~0.1ms) due to many hints
- **Normal:** Moderate generation (~0.15ms)
- **Hard/Expert:** Slower generation (~0.2ms) due to fewer hints

### Solving Time

- **Novice/Easy:** Quick solve (<2ms) - more hints = easier solve
- **Normal:** Moderate solve (~3ms)
- **Hard:** Significant solve time (~8ms)
- **Expert:** Longest solve time (~15ms) - fewest hints, most complex

## 🔧 CI Integration

Add performance budgets to your CI pipeline:

```yaml
# .github/workflows/bench.yml
- name: Run Benchmark
  run: pnpm bench

- name: Check Performance
  run: |
    # Parse latest.md and compare against thresholds
    # Fail if Expert solving > 20ms average
```

## 📈 Tracking Changes

Compare benchmark results over time:

1. Run `pnpm bench` before making algorithmic changes
2. Make your changes
3. Run `pnpm bench` again
4. Compare the `latest.md` before and after

Key areas to monitor:
- **Generation time** - Changes to puzzle creation logic
- **Solving time** - Changes to solver algorithm
- **Regression detection** - Unexpected performance drops

## ⚙️ Configuration

Currently, the benchmark uses fixed settings:

| Setting | Value |
|---------|-------|
| Iterations per difficulty | 10 |
| Warm-up runs | 1 (discarded) |
| Timing method | `performance.now()` |

Future versions may support command-line arguments for customization.

## 🔗 See Also

- 🛠️ [Utilities](../api/utilities.md) - Underlying functions
- 💡 [Examples](../guides/examples.md) - Real-world usage patterns

---

*Run `pnpm bench` to get started!* 📊