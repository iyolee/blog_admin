module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es6: true
  },
  extends: 'eslint:recommended',
  parserOptions: {
    ecmaFeatures: {
      // 启用对实验性的 object rest/spread properties 的支持
      experimentalObjectRestSpread: true,
      // "objectLiteralShorthandProperties": true,
      // 启用 JSX
      jsx: true
    },
    sourceType: 'module'
  },
  "parser": "babel-eslint",
  plugins: ['react'],
  rules: {
    indent: ['error', 2, {"SwitchCase": 1}],
    // 'linebreak-style': ['error', 'windows'],
    quotes: ['error', 'single'],
    semi: ['error', 'never'],
    "react/jsx-uses-react": "error",
    "react/jsx-uses-vars": "error",
  }
}
