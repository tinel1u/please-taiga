module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    tsconfigRootDir : __dirname, 
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint/eslint-plugin'],
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
    "eslint:recommended",
  ],
  root: true,
  env: {
    node: true,
    jest: true,
    commonjs: true,
    es6: true,
  },
  ignorePatterns: ['.eslintrc.js'],
};
