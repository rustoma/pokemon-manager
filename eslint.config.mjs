import eslintConfigPrettier from 'eslint-config-prettier/flat';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import eslintPluginUnicorn from 'eslint-plugin-unicorn';
import { defineConfig, globalIgnores } from 'eslint/config';
import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTs from 'eslint-config-next/typescript';
import globals from 'globals';

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  eslintConfigPrettier,
  reactRefresh.configs.recommended,
  globalIgnores([
    'node_modules',
    '.github',
    'tsconfig.tsbuildinfo',
    '**/dist/*',
    'tsconfig.json',
    'eslint.config.mjs',
    '.next/**',
    'out/**',
    'build/**',
    'next-env.d.ts',
  ]),
  eslintPluginUnicorn.configs.all,
  {
    files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: {
        ...globals.jest,
        ...globals.browser,
        NodeJS: true,
        AddEventListenerOptions: 'readonly',
        EventListener: 'readonly',
      },
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'import/no-extraneous-dependencies': 'off',
      '@typescript-eslint/keyword-spacing': 'off',
      'import/prefer-default-export': 'off',
      'import/extensions': 'off',
      'no-console': ['warn', { allow: ['warn', 'error'] }],
      '@typescript-eslint/no-explicit-any': ['warn'],
      '@typescript-eslint/no-var-requires': ['warn'],
      '@typescript-eslint/consistent-type-imports': 'warn',
      'no-undef': 'error',
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^_',
        },
      ],
      'unicorn/prevent-abbreviations': 'off',
      'unicorn/no-null': 'off',
      'unicorn/no-empty-file': 'off',
      'import/order': [
        'warn',
        {
          alphabetize: {
            caseInsensitive: true,
            order: 'asc',
          },
          groups: ['builtin', 'external', 'index', 'sibling', 'parent', 'internal', 'type'],
          pathGroups: [
            {
              pattern: 'react',
              group: 'external',
              position: 'before',
            },
          ],
          pathGroupsExcludedImportTypes: ['types'],
          'newlines-between': 'always',
        },
      ],
      'import/no-named-as-default-member': 'off',
      'unicorn/filename-case': [
        'error',
        {
          cases: {
            camelCase: true,
            pascalCase: true,
            kebabCase: true,
          },
        },
      ],
      'unicorn/consistent-function-scoping': 'off',
      'unicorn/no-nested-ternary': 'off',
    },
  },

  // {
]);

export default eslintConfig;
