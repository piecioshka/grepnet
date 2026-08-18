const js = require('@eslint/js');
const globals = require('globals');
const importPlugin = require('eslint-plugin-import');
const prettier = require('eslint-config-prettier');

module.exports = [
  {
    ignores: ['dist/'],
  },

  js.configs.recommended,

  {
    plugins: {
      import: importPlugin,
    },

    rules: {
      'new-cap': 'off',
      'no-alert': 'off',
      'no-console': 'off',
      'no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_', caughtErrors: 'none' },
      ],

      'import/first': 'error',
      'import/no-duplicates': 'error',
      'import/no-extraneous-dependencies': 'error',
    },
  },

  {
    files: ['client/**/*.js'],
    languageOptions: {
      ecmaVersion: 2023,
      sourceType: 'module',
      globals: {
        ...globals.browser,
      },
    },
  },

  {
    files: ['server/**/*.js', 'webpack/**/*.js', '*.js'],
    languageOptions: {
      ecmaVersion: 2023,
      sourceType: 'commonjs',
      globals: {
        ...globals.node,
      },
    },
  },

  prettier,
];
