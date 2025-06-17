module.exports = {
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: {
            jsx: true,
        },
        project: './tsconfig.json',
        tsconfigRootDir: process.cwd(),
    },
    plugins: ['@typescript-eslint', 'react', 'react-hooks', 'jsx-a11y'],
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:react/recommended',
        'plugin:react-hooks/recommended',
        'plugin:jsx-a11y/recommended',
    ],
    settings: {
        react: {
            version: 'detect',
        },
    },
    rules: {
        'react/react-in-jsx-scope': 'off',
        '@typescript-eslint/no-unused-vars': ['warn'],
        '@typescript-eslint/no-explicit-any': 'warn', // Предупреждает использование `any`
        '@typescript-eslint/consistent-type-definitions': ['error', 'interface'], // Использовать только interface (или 'type')
        '@typescript-eslint/prefer-optional-chain': 'error', // Рекомендует использовать optional chaining (?.)
        '@typescript-eslint/prefer-nullish-coalescing': 'warn', // Рекомендует использовать ?? вместо ||
        'object-curly-spacing': ['error', 'always'],
    },
};
