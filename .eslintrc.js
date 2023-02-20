/*eslint-env node*/
module.exports = {
  env: {
    browser: true,
    es2021: true,
    'jest/globals': true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:@typescript-eslint/recommended',
    'prettier',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['react', '@typescript-eslint', 'jest'],
  rules: {
    'react/prop-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
  },
}
