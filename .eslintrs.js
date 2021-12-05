/**
 * The configuration file for ESLint. Let us try to maintain a fairly strict
 * set of rules. At the end of the day, it is to help us avoid potential problems.
 */
const prodEnv = process.env.NODE_ENV === 'production';

module.exports = {
    root: true,

    env: {
        node: true
    },

    extends: ['plugin:vue/essential', '@vue/airbnb', 'prettier'],

    parserOptions: {
        parser: 'babel-eslint'
    },

    rules: {
        // This rule should not be enforced or we could not use classes as API wrappers.
        'class-methods-use-this': ['off'],

        // Comma dangle is pure evil and causes brain tumors. Should never be allowed!
        'comma-dangle': ['error', 'never'],

        // Need in order to use require from JavaScript for icons/images.
        'global-require': ['off'],

        'import/extensions': ['error', 'never'],
        'no-console': prodEnv ? 'warn' : 'off',

        // This is a fairly irritating rule.
        'import/prefer-default-export': ['off'],
        'import/no-dynamic-require': ['off']
    },

    overrides: [
        {
            files: ['**/__tests__/*.{j,t}s?(x)', '**/tests/unit/**/*.spec.{j,t}s?(x)'],
            env: {
                jest: true
            }
        }
    ]
};
