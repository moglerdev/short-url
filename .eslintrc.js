module.exports = {
  root: true,
    "env": {
        "browser": true,
        "es2021": true,
        "node": true
    },
    "extends": [
    'eslint:recommended',
        "standard-with-typescript",
        "plugin:react/recommended",
        'plugin:@typescript-eslint/recommended',
        'plugin:react-hooks/recommended',
    ],
    ignorePatterns: ['dist', '.eslintrc.cjs'],
    "overrides": [
        {
            "env": {
                "node": true
            },
            "files": [
                ".eslintrc.{js,cjs}"
            ],
            "parserOptions": {
                "sourceType": "script"
            }
        }
    ],
  parser: '@typescript-eslint/parser',
    "parserOptions": {
        "ecmaVersion": "latest",
        "sourceType": "module"
    },
    "plugins": [
        "react",
        'react-refresh'
    ],
    "rules": {
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    }
}
