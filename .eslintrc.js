module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es6: true
  },
  extends: [
    "eslint:recommended",
    "plugin:react/recommended"
  ],
  parserOptions: {
    ecmaFeatures: {
      experimentalObjectRestSpread: true,
      jsx: true
    },
    sourceType: 'module'
  },
  "parser": "babel-eslint",
  plugins: ['react'],
  rules: {
    indent: ['error', 2, {"SwitchCase": 1}],
    'linebreak-style': ['error', 'windows'],
    quotes: ['error', 'single'],
    semi: ['error', 'never'],
    "react/jsx-uses-react": "error",
    "react/jsx-uses-vars": "error",
    "react/jsx-space-before-closing": 1,
    "react/jsx-closing-bracket-location": 1,
    "react/no-string-refs": 1,
    "react/self-closing-comp": 1,

  }
}
