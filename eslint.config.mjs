import eslint from '@eslint/js'
import tseslint from 'typescript-eslint'
import prettierRecommended from 'eslint-plugin-prettier/recommended'
import eslintPluginAstro from 'eslint-plugin-astro'
import globals from 'globals'
import gitignore from 'eslint-config-flat-gitignore'
import testingLibrary from 'eslint-plugin-testing-library'
import { fixupPluginRules } from '@eslint/compat'

export default tseslint.config(
  {
    languageOptions: {
      globals: { ...globals.browser }
    }
  },
  gitignore(),
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  prettierRecommended,
  ...eslintPluginAstro.configs.recommended,
  ...eslintPluginAstro.configs['jsx-a11y-recommended'],
  {
    rules: {
      '@typescript-eslint/no-explicit-any': 'warn'
      // "astro/no-set-html-directive": "error"
    }
  },
  // See https://github.com/testing-library/eslint-plugin-testing-library/issues/853
  // current solution from https://github.com/testing-library/eslint-plugin-testing-library/issues/899#issuecomment-2121272355
  {
    files: ['**/?(*.)+(spec|test).[jt]sx'],
    plugins: {
      'testing-library': fixupPluginRules({
        rules: testingLibrary.rules
      })
    },
    rules: testingLibrary.configs.react.rules
  }
)
