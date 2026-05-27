import js from '@eslint/js'
import globals from 'globals'
import { defineConfig } from 'eslint/config'
import stylisticJs from '@stylistic/eslint-plugin'

export default defineConfig([
  {
    files: ['**/*.{js,mjs,cjs}'],

    plugins: {
      js,
      '@stylistic': stylisticJs,
    },

    extends: ['js/recommended'],

    languageOptions: {
      globals: globals.node,
    },

    rules: {
      '@stylistic/indent': ['error', 2],
      '@stylistic/linebreak-style': ['error', 'unix'],
      '@stylistic/quotes': ['error', 'single'],
      '@stylistic/semi': ['error', 'never'],
      eqeqeq: 'error',
      'no-trailing-spaces': 'error',
      'object-curly-spacing': ['error', 'always'],
      'arrow-spacing': ['error', { before: true, after: true }],
      'no-console': 'off',
    },
  },

  {
    files: ['**/*.js'],
    languageOptions: {
      sourceType: 'commonjs',
    },
  },
  {
    ignores: ['dist/**'],
  },
])
