const isSimple = process.env.JEST_IS_SIMPLE === '0';

module.exports = {
  collectCoverage: false,
  coverageReporters: ['html', 'text-summary'],
  collectCoverageFrom: ['src/**/*.ts', '!**/node_modules/**', 'src/**/*.vue'],
  moduleFileExtensions: ['js', 'jsx', 'json', 'vue', 'ts', 'tsx'],
  transform: {
    '^.+\\.vue$': 'vue-jest',
    '.+\\.(css|styl|less|sass|scss|svg|png|jpg|ttf|woff|woff2)$': 'jest-transform-stub',
    '^.+\\.tsx?$': 'ts-jest',
    '^.+\\.js$': 'babel-jest'
  },
  transformIgnorePatterns: ['<rootDir>/node_modules/'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '^@components/(.*)$': '<rootDir>/components/$1',
    '^@views/(.*)$': '<rootDir>/views/$1',
    '^@utils/(.*)$': '<rootDir>/utils/$1',
    '^@packages/(.*)$': '<rootDir>/packages/$1',
    '^.+\\.(css|less|scss)$': 'identity-obj-proxy'
  },
  snapshotSerializers: ['jest-serializer-vue'],
  testMatch: ['**/tests/unit/**/*.spec.(js|jsx|ts|tsx)|**/__tests__/*.(js|jsx|ts|tsx)'],
  testURL: 'http://localhost/',
  watchPlugins: ['jest-watch-typeahead/filename', 'jest-watch-typeahead/testname'],
  globals: {
    'ts-jest': {
      babelConfig: true
    }
  },
  verbose: true,
  bail: true // 允许 console
};
