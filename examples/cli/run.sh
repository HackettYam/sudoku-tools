#!/bin/bash

# Sudoku CLI - Quick Start Script
# 
# This script runs the interactive Sudoku game in your terminal.
# 
# Prerequisites: Node.js 18+ and pnpm
# 
# Usage:
#   ./run.sh           - Install (if needed) and start the game
#   ./run.sh install   - Install dependencies only
#   ./run.sh test      - Run tests

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$SCRIPT_DIR"

# Install dependencies if needed
if [ "$1" = "install" ]; then
    echo "Installing dependencies..."
    pnpm install
    exit 0
fi

# Run tests if requested
if [ "$1" = "test" ]; then
    echo "Running tests..."
    pnpm test
    exit 0
fi

# Default: run the game
if [ ! -d "node_modules" ]; then
    echo "Installing dependencies..."
    pnpm install
fi

echo "Starting Sudoku CLI..."
pnpm start