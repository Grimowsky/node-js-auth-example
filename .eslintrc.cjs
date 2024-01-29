module.exports = {
  env: {
    node: true,
    es2021: true,
    jest: true,
  },
  extends: [
    'standard-with-typescript',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:import/typescript'
  ],
  overrides: [
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ["tsconfig.json"]
  },
  plugins: ['@typescript-eslint', 'prettier', 'import'],
  rules: {
    'prettier/prettier': 'error',
    'import/extensions': 'off',
    "@typescript-eslint/strict-boolean-expressions": "off",
    '@typescript-eslint/prefer-nullish-coalescing': "off",
    "@typescript-eslint/no-misused-promises": "off"
  },
  settings: {
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts']
    }
  }
}
