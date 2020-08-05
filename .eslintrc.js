module.exports = {
    rules: {
        'prefer-destructuring': 'warn',
        'class-methods-use-this': 'off',
        'no-unused-expressions': 'off',
        'global-require': 'off',
        'func-names': 'off',
        'no-param-reassign': 'off',
        'import/prefer-default-export': 'off',
        'no-magic-numbers': 'off',
        'no-useless-escape': 'off',
        'no-underscore-dangle': 'off',
        'prettier/prettier': ['error'],
    },
    globals: {
        $: 'readonly',
        $$: 'readonly',
        driver: 'readonly',
    },
    plugins: ['prettier'],
    extends: ['airbnb-base', 'prettier'],
};
