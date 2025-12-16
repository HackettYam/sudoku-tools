// commitlint.config.js
module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    // Message format rules
    'body-max-line-length': [2, 'always', 100],
    'footer-max-line-length': [2, 'always', 100],
    'header-max-length': [2, 'always', 100],

    // Type rules
    'type-enum': [
      2,
      'always',
      [
        'feat', // New feature
        'fix', // Bug fix
        'docs', // Documentation
        'style', // Formatting, missing semi colons, etc.
        'refactor', // Code change that neither fixes a bug nor adds a feature
        'perf', // Performance improvements
        'test', // Adding or modifying tests
        'chore', // Changes to the build process or auxiliary tools
        'security', // Security improvements
        'ci', // CI/CD pipeline changes
        'release', // Release commits
        'revert', // Reverts a previous commit
      ],
    ],
    'type-case': [2, 'always', 'lower-case'],
    'type-empty': [2, 'never'],

    // Subject rules
    'subject-case': [2, 'always', ['sentence-case']],
    'subject-empty': [2, 'never'],
    'subject-full-stop': [2, 'never', '.'],

    // Scope rules for sudoku-tools library
    'scope-enum': [
      2,
      'always',
      [
        'board', // Board manipulation
        'generator', // Puzzle generation
        'solver', // Puzzle solving
        'validator', // Validation utilities
        'utils', // General utilities
        'types', // Type definitions
        'deps', // Dependencies
        'config', // Configuration related
        'ci', // CI/CD related
        'test', // Test related
        'release', // Release related
      ],
    ],
    'scope-case': [2, 'always', 'lower-case'],
    // 'scope-empty': [2, 'never'],
  },
  // Use default parser configuration
  defaultIgnores: true,
}
