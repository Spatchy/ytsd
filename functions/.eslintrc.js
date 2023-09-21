module.exports = {
  env: {
    es6: true,
    node: true
  },
  parserOptions: {
    "ecmaVersion": 2018
  },
  extends: [
    "eslint:recommended",
    "google"
  ],
  rules: {
    "no-restricted-globals": ["error", "name", "length"],
    "prefer-arrow-callback": "error",
    "quotes": ["error", "double", { "allowTemplateLiterals": true }],
    "eslint-require-jsdoc": 0,
    "semi": ["error", "never"],
    "object-curly-spacing": ["error", "always"],
    "comma-dangle": ["error", "never"],
    "max-len": ["error", 120]
  },
  overrides: [
    {
      files: ["**/*.spec.*"],
      env: {
        mocha: true
      },
      rules: {}
    }
  ],
  globals: {}
}
