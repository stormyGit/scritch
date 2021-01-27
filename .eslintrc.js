module.exports = {
    "env": {
        "browser": true,
        "node": true,
        "es6": true,
    },
    "extends": ['eslint:recommended', 'plugin:react/recommended'],
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
        "ecmaFeatures": {
            "jsx": true
        },
        "ecmaVersion": 2018,
        "sourceType": "module"
    },
    "plugins": [
        "react",
        "@typescript-eslint"
    ],
    "extends": [
        "eslint:recommended",
        "plugin:@typescript-eslint/eslint-recommended",
        "plugin:@typescript-eslint/recommended"
    ],
    "rules": {
       "react-redux/prefer-separate-component-file": 0,
       "react/prop-types": 0,
       "react/display-name": 0,
       "@typescript-eslint/explicit-module-boundary-types": 0
    }
};