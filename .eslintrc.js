module.exports = {
  extends: 'piecioshka',

  // http://eslint.org/docs/user-guide/configuring#specifying-environments
  env: {
    browser: true,
    node: true,
    commonjs: true,
    es6: true,
    // amd: true,
    // mocha: true,
    // jasmine: true,
    // jest: true,
    // jquery: true,
  },

  // http://eslint.org/docs/rules/
  rules: {
    indent: ['error', 2, { SwitchCase: 1 }],
    'no-alert': 'off',
    'no-magic-numbers': 'off',
    'require-jsdoc': 'off',
    'default-case': 'off',
    'object-curly-newline': 'off',
    'no-console': 'off',
    'lines-around-comment': 'off',

    'smells/no-switch': 'off',
    'smells/no-complex-switch-case': 'error',
    'smells/no-setinterval': 'off',
    'smells/no-this-assign': 'error',

    'import/first': 'error',
    'import/newline-after-import': 'error',
    'import/no-duplicates': 'error',
    'import/no-extraneous-dependencies': 'error',
  },

  // List of global variables.
  globals: {},

  parserOptions: {
    // Support syntax ES2022
    ecmaVersion: 2022,

    // Support syntax ES2015 Import/Export
    sourceType: 'module',
  },

  plugins: ['smells', 'clean-regex', 'import'],
};
