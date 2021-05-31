module.exports = {
  extends: 'airbnb-base',
  parser: '@babel/eslint-parser',
  env: {
    browser: true,
  },
  rules: {
    'import/no-extraneous-dependencies': [2, { devDependencies: true }],
    'no-unused-expressions': ['error', { allowTernary: true }],
    'func-names': ['error', 'as-needed'],
    'no-console': 'off',
    // 'import/no-extraneous-dependencies': [
    //   'error', { devDependencies: ['gulpfile.babel.js', 'gulp/**/*'] }
    // ]
  },
};
