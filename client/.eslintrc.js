module.exports = {
    plugins: ['prettier'],
    env: {
        browser: true,
        es2020: true,
    },
    parserOptions: {
        ecmaVersion: 2020,
        sourceType: 'module',
        ecmaFeatures: {
            jsx: true,
        },
    },
    settings: {
        react: {
            version: 'detect',
        },
    },
    extends: ['react-app', 'prettier'],
    rules: {
        'prettier/prettier': ['error'],
        'max-len': [
            'error',
            {
                code: 130,
                ignoreUrls: true,
            },
        ],
        'max-params': ['error', 3],
        'no-var': 'error',
        'no-unreachable': 'error',
        'no-useless-return': 'error',
        'no-unused-vars': 'error',
    },
}
