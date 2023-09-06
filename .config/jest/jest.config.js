// const esModules = [
//   'unified',
//   'vfile',
//   'vfile-.+',
//   'unist-.+',
//   'bail',
//   'is-plain-obj',
//   'trough',
//   'mdast-util-.+',
//   'micromark',
//   'micromark-.+',
//   'parse-entities',
//   'character-entities',
//   'property-information',
//   'comma-separated-tokens',
//   'hast-.+',
//   'remark-.+',
//   'rehype-.+',
//   'space-separated-tokens',
//   'trim-lines',
//   'decode-named-character-reference',
//   'ccount',
//   'escape-string-regexp',
//   'markdown-table',
//   'web-namespaces',
//   '@rainbow-me/rainbowkit',
//   'wagmi',
//   '@wagmi/chains',
//   '@wagmi/core',
//   '@wagmi/connectors',
//   'viem',
//   'devlop'
// ].join('|')

/** @type {import('ts-jest').JestConfigWithTsJest} */
export default {
  rootDir: '../../',
  preset: 'ts-jest/presets/default-esm',
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    '^(\\.{1,2}/.*)\\.js$': '$1'
  },
  transform: {
    // '^.+\\.[tj]sx?$' to process js/ts with `ts-jest`
    // '^.+\\.m?[tj]sx?$' to process js/ts/mjs/mts with `ts-jest`
    '^.+\\.tsx?$': ['ts-jest', { useESM: true }]
  },
  moduleNameMapper: {
    '.+\\.(css|styl|less|sass|scss)$': 'identity-obj-proxy',
    '@config/(.*)$': '<rootDir>/.config/$1'
  },
  testPathIgnorePatterns: ['node_modules', '.cache', 'public', 'coverage'],
  setupFilesAfterEnv: ['<rootDir>/.config/jest/setup-test-env.ts'],
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}',
    '!src/@types/**/*',
    '!src/**/*.d.ts'
  ]
  // transform: {
  //   '^.+\\.[jt]sx?$': [
  //     'babel-jest',
  //     { configFile: '<rootDir>/.config/jest/babel.config.js' }
  //   ]
  // },
  // moduleNameMapper: {
  //   '.+\\.(css|styl|less|sass|scss)$': 'identity-obj-proxy',
  //   '.+\\.(jpg|jpeg|png|gif|eot|otf|webp|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
  //     '<rootDir>/.config/jest/__mocks__/file.js'
  // },
  // testPathIgnorePatterns: ['node_modules', '.cache', 'public', 'coverage'],
  // // transformIgnorePatterns: [
  // //   `node_modules/(?!(gatsby|gatsby-link|gatsby-script|${esModules})/)`
  // // ],
  // globals: {
  //   __PATH_PREFIX__: ''
  // },
  // setupFiles: [],
  // setupFilesAfterEnv: ['<rootDir>/.config/jest/setup-test-env.ts'],
  // collectCoverageFrom: ['src/**/*.{ts,tsx}', '!src/@types/**/*'],
  // testEnvironment: 'jsdom'
}
