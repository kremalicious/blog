const esModules = [
  'unified',
  'vfile',
  'vfile-.+',
  'unist-.+',
  'bail',
  'is-plain-obj',
  'trough',
  'mdast-util-.+',
  'micromark',
  'micromark-.+',
  'parse-entities',
  'character-entities',
  'property-information',
  'comma-separated-tokens',
  'hast-.+',
  'remark-.+',
  'rehype-.+',
  'space-separated-tokens',
  'decode-named-character-reference',
  'ccount',
  'escape-string-regexp',
  'markdown-table',
  'web-namespaces',
  '@rainbow-me/rainbowkit'
].join('|')

module.exports = {
  rootDir: '../',
  transform: {
    '^.+\\.[jt]sx?$': ['babel-jest', { configFile: './.jest/babel.config.js' }]
  },
  moduleNameMapper: {
    '.+\\.(css|styl|less|sass|scss)$': 'identity-obj-proxy',
    '.+\\.(jpg|jpeg|png|gif|eot|otf|webp|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/.jest/__mocks__/file.js',
    '\\.svg': '<rootDir>/.jest/__mocks__/svgr.js',
    '^@reach/router(.*)': '<rootDir>/node_modules/@gatsbyjs/reach-router$1'
  },
  testPathIgnorePatterns: ['node_modules', '.cache', 'public', 'coverage'],
  transformIgnorePatterns: [
    `node_modules/(?!(gatsby|gatsby-link|gatsby-script|${esModules})/)`
  ],
  globals: {
    __PATH_PREFIX__: ''
  },
  setupFiles: ['<rootDir>/.jest/loadershim.js'],
  setupFilesAfterEnv: ['<rootDir>/.jest/setup-test-env.ts'],
  collectCoverageFrom: ['src/**/*.{ts,tsx}', '!src/@types/**/*'],
  testEnvironment: 'jsdom'
}
