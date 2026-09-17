import tseslint from 'typescript-eslint';
import remotionPlugin from '@remotion/eslint-plugin';

export default tseslint.config(
  {
    ignores: [
      '**/node_modules/**',
      '**/out/**',
      '**/.remotion/**',
      '**/projects/_archive/**',
      '**/dist/**',
      '**/skills/**',
      '**/data/**',
      '**/agent/**',
      'src/core/registry/projects-registry.generated.ts',
    ],
  },
  ...tseslint.configs.recommended,
  {
    files: [
      'src/**/*.{ts,tsx}',
      'projects/**/*.{ts,tsx}',
      'scripts/**/*.{ts,tsx}',
    ],
    plugins: {
      '@remotion': remotionPlugin,
    },
    rules: {
      ...remotionPlugin.configs.recommended.rules,
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-unused-vars': [
        'warn',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
      ],
    },
  },
);
