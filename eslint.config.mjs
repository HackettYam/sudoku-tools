/**
 * ESLint v9 Configuration
 * Modern flat configuration format for the @hackettyam/sudoku-tools library
 * Optimized for pure TypeScript library development
 */
import { FlatCompat } from '@eslint/eslintrc'
import js from '@eslint/js'
import stylistic from '@stylistic/eslint-plugin'

const compat = new FlatCompat()

export default [
  // Ignore patterns - ESLint v9 uses ignores property instead of .eslintignore
  {
    ignores: [
      'dist/**',
      'build/**',
      'node_modules/**',
      'coverage/**',
      '*.config.js',
      '*.config.ts',
      'commitlint.config.js',
      '.lintstagedrc.json',
      'examples/**',
    ],
  },

  // Base JS configuration
  js.configs.recommended,

  // TypeScript configuration - for all files
  ...compat
    .config({
      extends: [
        'plugin:@typescript-eslint/recommended',
        'plugin:@typescript-eslint/recommended-requiring-type-checking',
      ],
      parser: '@typescript-eslint/parser',
      plugins: ['@typescript-eslint'],
      parserOptions: {
        project: './tsconfig.json',
        ecmaVersion: 2020,
        sourceType: 'module',
      },
    })
    .map(config => ({
      ...config,
      files: ['**/*.ts'],
    })),

  // Import plugin for optimizing imports - for all TypeScript files
  ...compat
    .config({
      extends: ['plugin:import/recommended', 'plugin:import/typescript'],
      plugins: ['import'],
      settings: {
        'import/resolver': {
          typescript: {},
        },
      },
    })
    .map(config => ({
      ...config,
      files: ['**/*.ts'],
    })),

  // JavaScript configuration - for config files
  {
    files: ['*.js', '*.cjs'],
    rules: {
      '@typescript-eslint/no-var-requires': 'off',
    },
  },

  // Specific rules for TypeScript
  {
    files: ['**/*.ts'],
    rules: {
      // TypeScript specific rules
      '@typescript-eslint/adjacent-overload-signatures': 'off',
      '@typescript-eslint/array-type': ['error', { default: 'array' }],
      '@typescript-eslint/await-thenable': 'error',
      '@typescript-eslint/ban-ts-comment': [
        'error',
        { 'ts-expect-error': 'allow-with-description' },
      ],
      '@typescript-eslint/ban-tslint-comment': 'error',
      // '@typescript-eslint/class-literal-property-style': 'error',
      'class-methods-use-this': 'off',
      '@typescript-eslint/class-methods-use-this': 'error',
      '@typescript-eslint/consistent-generic-constructors': 'error',
      '@typescript-eslint/consistent-indexed-object-style': 'error',
      // '@typescript-eslint/consistent-return': 'error',
      '@typescript-eslint/consistent-type-assertions': 'error',
      '@typescript-eslint/consistent-type-definitions': 'error',
      '@typescript-eslint/consistent-type-exports': 'error',
      '@typescript-eslint/consistent-type-imports': [
        'error',
        {
          fixStyle: 'inline-type-imports',
          prefer: 'type-imports',
        },
      ],
      'default-param-last': 'off',
      '@typescript-eslint/default-param-last': 'error',
      'dot-notation': 'off',
      '@typescript-eslint/dot-notation': 'error',
      '@typescript-eslint/explicit-function-return-type': 'error',
      '@typescript-eslint/explicit-member-accessibility': [
        'error',
        {
          accessibility: 'explicit',
          overrides: {
            accessors: 'explicit',
            constructors: 'no-public',
            methods: 'explicit',
            parameterProperties: 'explicit',
            properties: 'explicit',
          },
        },
      ],
      '@typescript-eslint/explicit-module-boundary-types': 'error',
      'init-declarations': 'off',
      '@typescript-eslint/init-declarations': 'error',
      'max-params': 'off',
      '@typescript-eslint/max-params': ['error', { max: 3 }],
      '@typescript-eslint/member-ordering': 'error',
      '@typescript-eslint/method-signature-style': 'error',
      '@typescript-eslint/naming-convention': [
        'error',
        {
          selector: 'function',
          format: ['camelCase', 'PascalCase'],
          leadingUnderscore: 'allow',
          trailingUnderscore: 'allow',
        },
      ],
      'no-array-constructor': 'off',
      '@typescript-eslint/no-array-constructor': 'error',
      '@typescript-eslint/no-array-delete': 'error',
      '@typescript-eslint/no-base-to-string': 'error',
      '@typescript-eslint/no-confusing-non-null-assertion': 'error',
      '@typescript-eslint/no-confusing-void-expression': 'error',
      '@typescript-eslint/no-deprecated': 'error',
      '@typescript-eslint/no-duplicate-enum-values': 'error',
      '@typescript-eslint/no-duplicate-type-constituents': 'error',
      '@typescript-eslint/no-dynamic-delete': 'error',
      '@typescript-eslint/no-empty-function': [
        'error',
        {
          allow: ['generatorMethods', 'methods', 'overrideMethods'],
        },
      ],
      '@typescript-eslint/no-empty-interface': ['error', { allowSingleExtends: true }],
      '@typescript-eslint/no-empty-object-type': 'error',
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/no-extra-non-null-assertion': 'error',
      '@typescript-eslint/no-extraneous-class': ['error', { allowStaticOnly: true }],
      '@typescript-eslint/no-floating-promises': 'error',
      '@typescript-eslint/no-for-in-array': 'error',
      '@typescript-eslint/no-implied-eval': 'error',
      // '@typescript-eslint/no-import-type-side-effect': 'error',
      '@typescript-eslint/no-inferrable-types': 'error',
      '@typescript-eslint/no-invalid-void-type': 'error',
      'no-loop-func': 'off',
      '@typescript-eslint/no-loop-func': 'error',
      'no-magic-numbers': 'off',
      // '@typescript-eslint/no-magic-numbers': 'warn',
      '@typescript-eslint/no-meaningless-void-operator': 'error',
      '@typescript-eslint/no-misused-new': 'error',
      '@typescript-eslint/no-misused-promises': 'error',
      '@typescript-eslint/no-misused-spread': 'error',
      // '@typescript-eslint/no-mixed-enums': 'error',
      '@typescript-eslint/no-namespace': 'error',
      '@typescript-eslint/no-non-null-asserted-nullish-coalescing': 'error',
      '@typescript-eslint/no-non-null-asserted-optional-chain': 'error',
      '@typescript-eslint/no-non-null-assertion': 'error',
      // '@typescript-eslint/no-redundant-type-constituents': 'error',
      '@typescript-eslint/no-require-imports': 'error',
      'no-shadow': 'off',
      '@typescript-eslint/no-shadow': 'error',
      '@typescript-eslint/no-this-alias': 'error',
      '@typescript-eslint/no-unnecessary-boolean-literal-compare': 'error',
      '@typescript-eslint/no-unnecessary-condition': 'error',
      '@typescript-eslint/no-unnecessary-parameter-property-assignment': 'error',
      '@typescript-eslint/no-unnecessary-qualifier': 'error',
      '@typescript-eslint/no-unnecessary-template-expression': 'error',
      '@typescript-eslint/no-unnecessary-type-arguments': 'error',
      '@typescript-eslint/no-unnecessary-type-assertion': 'error',
      '@typescript-eslint/no-unnecessary-type-constraint': 'error',
      '@typescript-eslint/no-unnecessary-type-conversion': 'error',
      '@typescript-eslint/no-unnecessary-type-parameters': 'error',
      '@typescript-eslint/no-unsafe-argument': 'error',
      '@typescript-eslint/no-unsafe-assignment': 'error',
      '@typescript-eslint/no-unsafe-call': 'error',
      '@typescript-eslint/no-unsafe-declaration-merging': 'error',
      '@typescript-eslint/no-unsafe-enum-comparison': 'error',
      '@typescript-eslint/no-unsafe-function-type': 'error',
      '@typescript-eslint/no-unsafe-member-access': 'error',
      '@typescript-eslint/no-unsafe-return': 'error',
      // '@typescript-eslint/no-unsafe-type-assertion': 'error',
      '@typescript-eslint/no-unsafe-unary-minus': 'error',
      '@typescript-eslint/no-unused-expressions': 'error',
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
      'no-use-before-define': 'off',
      '@typescript-eslint/no-use-before-define': 'error',
      '@typescript-eslint/no-useless-constructor': 'error',
      '@typescript-eslint/no-useless-empty-export': 'error',
      '@typescript-eslint/no-wrapper-object-types': 'error',
      '@typescript-eslint/non-nullable-type-assertion-style': 'error',
      '@typescript-eslint/only-throw-error': 'error',
      '@typescript-eslint/parameter-properties': 'error',
      '@typescript-eslint/prefer-as-const': 'error',
      'prefer-destructuring': 'error',
      '@typescript-eslint/prefer-destructuring': 'error',
      '@typescript-eslint/prefer-enum-initializers': 'error',
      '@typescript-eslint/prefer-find': 'error',
      '@typescript-eslint/prefer-for-of': 'error',
      '@typescript-eslint/prefer-function-type': 'error',
      '@typescript-eslint/prefer-includes': 'error',
      '@typescript-eslint/prefer-literal-enum-member': 'error',
      '@typescript-eslint/prefer-namespace-keyword': 'error',
      '@typescript-eslint/prefer-nullish-coalescing': 'error',
      '@typescript-eslint/prefer-optional-chain': 'error',
      '@typescript-eslint/prefer-promise-reject-errors': 'error',
      '@typescript-eslint/prefer-readonly': 'error',
      // '@typescript-eslint/prefer-readonly-parameter-types': 'error',
      '@typescript-eslint/prefer-reduce-type-parameter': 'error',
      '@typescript-eslint/prefer-regexp-exec': 'error',
      '@typescript-eslint/prefer-return-this-type': 'error',
      '@typescript-eslint/prefer-string-starts-ends-with': 'error',
      '@typescript-eslint/promise-function-async': 'error',
      '@typescript-eslint/related-getter-setter-pairs': 'error',
      '@typescript-eslint/require-array-sort-compare': 'error',
      '@typescript-eslint/require-await': 'error',
      '@typescript-eslint/restrict-plus-operands': 'error',
      '@typescript-eslint/restrict-template-expressions': 'error',
      '@typescript-eslint/return-await': 'error',
      // '@typescript-eslint/strict-boolean-expressions': 'error',
      '@typescript-eslint/switch-exhaustiveness-check': 'error',
      '@typescript-eslint/triple-slash-reference': 'error',
      // '@typescript-eslint/typedef': 'error',
      '@typescript-eslint/unbound-method': 'error',
      '@typescript-eslint/unified-signatures': 'error',
      '@typescript-eslint/use-unknown-in-catch-callback-variable': 'error',

      // Modern practices for imports and exports
      'import/exports-last': 'error',
      // 'import/group-exports': 'error',
      'import/imports-first': 'error',
      'import/no-cycle': 'error',
      'import/no-duplicates': 'error',
      'import/order': [
        'warn',
        {
          alphabetize: { caseInsensitive: true, order: 'asc' },
          groups: ['builtin', 'external', 'internal', ['parent', 'sibling', 'index'], 'object'],
          'newlines-between': 'always',
        },
      ],
      'no-duplicate-imports': 'error',
      'sort-imports': [
        'warn',
        {
          ignoreCase: true,
          ignoreDeclarationSort: true, // Because we use import/order for this
        },
      ],
    },
  },

  // Common code quality rules for all files
  {
    files: ['**/*.js', '**/*.ts'],
    rules: {
      // Code quality
      curly: ['error', 'multi-line', 'consistent'],
      eqeqeq: 'error',
      'no-extra-bind': 'error',
      'no-extra-boolean-cast': 'error',
      'no-extra-label': 'error',
      'no-nested-ternary': 'error',

      // Complexity limits
      'max-depth': ['error', 4],
      'max-lines': ['error', {
        max: 500,
        skipBlankLines: true,
        skipComments: true
      }],
      'max-lines-per-function': ['error', {
        max: 180,
        skipBlankLines: true,
        skipComments: true
      }],
      'max-nested-callbacks': ['error', { max: 3 }],
      'max-statements': ['error', { max: 20 }],

      // Property and variable ordering
      'quote-props': ['error', 'as-needed'],
      'sort-keys': ['error', 'asc', { allowLineSeparatedGroups: true }],
      'sort-vars': 'error',

      // NOTE: quotes and semi rules are handled by @stylistic plugin above
      // Removed duplicate rules: quotes, semi
    },
  },

  // Stylistic plugin configuration using default config
  {
    files: ['**/*.js', '**/*.ts'],
    plugins: {
      '@stylistic': stylistic,
    },
    rules: {
      // Basic indentation and formatting
      '@stylistic/indent': ['error', 2, {
        SwitchCase: 1,
        VariableDeclarator: 1,
        outerIIFEBody: 1,
        MemberExpression: 1,
        FunctionDeclaration: { parameters: 1, body: 1 },
        FunctionExpression: { parameters: 1, body: 1 },
        CallExpression: { arguments: 1 },
        ArrayExpression: 1,
        ObjectExpression: 1,
        ImportDeclaration: 1,
        flatTernaryExpressions: false,
        ignoreComments: false,
      }],
      '@stylistic/indent-binary-ops': ['error', 2],
      '@stylistic/linebreak-style': ['error', 'unix'],
      '@stylistic/semi': ['error', 'never'],
      '@stylistic/semi-style': ['error', 'last'],
      '@stylistic/quotes': ['error', 'single', {
        allowTemplateLiterals: true,
        avoidEscape: true,
      }],
      '@stylistic/curly-newline': ['error', {
        consistent: true,
        multiline: true,
        minElements: 2,
      }],
      '@stylistic/max-len': ['error', { code: 120 }],

      // Comma rules
      '@stylistic/comma-dangle': ['error', {
        arrays: 'always-multiline',
        objects: 'always-multiline',
        imports: 'always-multiline',
        exports: 'always-multiline',
        functions: 'always-multiline',
        importAttributes: 'always-multiline',
        dynamicImports: 'always-multiline',
        enums: 'always-multiline',
        generics: 'always-multiline',
        tuples: 'always-multiline',
      }],
      '@stylistic/comma-spacing': ['error', { before: false, after: true }],
      '@stylistic/comma-style': ['error', 'last'],

      // Object and array formatting
      '@stylistic/object-curly-spacing': ['error', 'always', {
        // arraysInArrays: true,
        objectsInObjects: false,
      }],
      '@stylistic/object-curly-newline': ['error', {
        ObjectExpression: { multiline: true, consistent: true },
        ObjectPattern: { multiline: true, consistent: true },
        ImportDeclaration: { multiline: true, consistent: true },
        ExportDeclaration: { multiline: true, consistent: true },
      }],
      '@stylistic/object-property-newline': ['error', { allowAllPropertiesOnSameLine: true }],
      '@stylistic/array-bracket-spacing': ['error', 'never', {
        arraysInArrays: true,
        objectsInArrays: true,
        singleValue: false,
      }],
      '@stylistic/array-bracket-newline': ['error', { minItems: 4, multiline: true }],
      '@stylistic/array-element-newline': ['error', {
        consistent: true,
        minItems: 4,
        multiline: true,
      }],

      // Function formatting
      '@stylistic/function-call-spacing': ['error', 'never'],
      '@stylistic/function-call-argument-newline': ['error', 'consistent'],
      '@stylistic/function-paren-newline': ['error', 'multiline'],
      '@stylistic/space-before-function-paren': ['error', {
        anonymous: 'always',
        asyncArrow: 'always',
        named: 'never',
      }],

      // Spacing rules
      '@stylistic/space-before-blocks': ['error', 'always'],
      '@stylistic/space-in-parens': ['error', 'never'],
      '@stylistic/space-infix-ops': 'error',
      '@stylistic/space-unary-ops': ['error', { words: true, nonwords: false }],
      '@stylistic/keyword-spacing': ['error', { before: true, after: true }],
      '@stylistic/computed-property-spacing': ['error', 'never'],
      '@stylistic/no-multi-spaces': 'error',
      '@stylistic/no-whitespace-before-property': 'error',
      '@stylistic/semi-spacing': ['error', { before: false, after: true }],
      '@stylistic/key-spacing': ['error', {
        afterColon: true,
        // align: 'value',
        beforeColon: false,
      }],
      '@stylistic/block-spacing': ['error', 'always'],
      '@stylistic/generator-star-spacing': ['error', { before: false, after: true }],
      '@stylistic/rest-spread-spacing': ['error', 'never'],
      '@stylistic/switch-colon-spacing': ['error', { after: true, before: false }],
      '@stylistic/yield-star-spacing': ['error', { before: false, after: true }],
      '@stylistic/no-trailing-spaces': 'error',
      '@stylistic/no-tabs': 'error',
      '@stylistic/spaced-comment': ['error', 'always', {
        line: { markers: ['/'], exceptions: ['-', '+'] },
        block: { markers: ['*'], exceptions: ['*'], balanced: true },
      }],

      // Line formatting
      '@stylistic/eol-last': ['error', 'always'],
      '@stylistic/no-multiple-empty-lines': ['error', { max: 2, maxEOF: 1, maxBOF: 0 }],
      '@stylistic/line-comment-position': ['error', 'above'],
      '@stylistic/lines-around-comment': ['error', {
        // beforeBlockComment: true,
        // afterBlockComment: true,
        // beforeLineComment: true,
        // afterLineComment: true,
        allowBlockStart: true,
        // allowBlockEnd: true,
        allowClassStart: true,
        // allowClassEnd: true,
        allowObjectStart: true,
        // allowObjectEnd: true,
        allowArrayStart: true,
        // allowArrayEnd: true,
        allowEnumStart: true,
        // allowEnumEnd: true,
        allowInterfaceStart: true,
        // allowInterfaceEnd: true,
        allowModuleStart: true,
        // allowModuleEnd: true,
        allowTypeStart: true,
        // allowTypeEnd: true,
        ignorePattern: 'export',
      }],
      '@stylistic/lines-between-class-members': ['error', 'always'],
      '@stylistic/max-statements-per-line': ['error', {
        ignoredNodes: [
          // 'ArrowFunctionExpression',
          // 'FunctionExpression',
          'FunctionDeclaration',
          'BreakStatement',
          'ContinueStatement',
          'ReturnStatement',
          'ThrowStatement',
        ],
        max: 1,
      }],
      '@stylistic/multiline-comment-style': ['error', 'starred-block'],
      '@stylistic/multiline-ternary': ['error', 'always-multiline'],
      '@stylistic/newline-per-chained-call': ['error', { ignoreChainWithDepth: 2 }],
      '@stylistic/one-var-declaration-per-line': ['error', 'initializations'],
      '@stylistic/padding-line-between-statements': ['error',
        { blankLine: 'always', prev: ['const', 'let'], next: ['return', 'throw', 'break', 'continue'] },
      ],

      // Arrow function formatting
      '@stylistic/arrow-spacing': ['error', { before: true, after: true }],
      '@stylistic/arrow-parens': ['error', 'as-needed'],
      '@stylistic/implicit-arrow-linebreak': ['error', 'beside'],
      '@stylistic/no-confusing-arrow': 'error',

      // Template literal formatting
      '@stylistic/template-curly-spacing': ['error', 'never'],
      '@stylistic/template-tag-spacing': ['error', 'never'],

      // Other formatting
      '@stylistic/brace-style': ['error', '1tbs', { allowSingleLine: true }],
      '@stylistic/dot-location': ['error', 'property'],
      '@stylistic/new-parens': ['error', 'always'],
      '@stylistic/operator-linebreak': ['error', 'before', { overrides: { '=': 'none' } }],
      '@stylistic/padded-blocks': ['error', 'never'],
      '@stylistic/quote-props': ['error', 'consistent-as-needed'],
      '@stylistic/no-extra-parens': ['error', 'all', {
        enforceForArrowConditionals: false,
        ignoreJSX: 'multi-line',
        nestedBinaryExpressions: false,
        returnAssign: false,
      }],
      '@stylistic/no-extra-semi': 'error',
      '@stylistic/no-floating-decimal': 'error',
      '@stylistic/no-mixed-operators': 'error',
      '@stylistic/no-mixed-spaces-and-tabs': 'error',
      '@stylistic/nonblock-statement-body-position': ['error', 'beside', { overrides: { 'while': 'below' } }],
      '@stylistic/wrap-iife': ['error', 'outside'],
      '@stylistic/wrap-regex': 'error',

      // TypeScript specific rules
      '@stylistic/type-annotation-spacing': ['error', {
        before: false,
        after: true,
        overrides: {
          arrow: { before: true, after: true },
        },
      }],
      '@stylistic/member-delimiter-style': ['error', {
        multilineDetection: 'brackets',
        multiline: { delimiter: 'none', requireLast: true },
        singleline: { delimiter: 'semi', requireLast: false },
        overrides: {
          typeLiteral: {
            multiline: { delimiter: 'comma', requireLast: true },
            singleline: { delimiter: 'comma', requireLast: false },
          },
        },
      }],
      '@stylistic/type-generic-spacing': 'error',
      '@stylistic/type-named-tuple-spacing': 'error',
    },
  },
]
