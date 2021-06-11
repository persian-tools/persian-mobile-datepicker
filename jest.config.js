module.exports = {
  coverageDirectory: 'coverage',
  testEnvironment: 'jsdom',
  "transform": {
    "^.+\\.tsx?$": "ts-jest"
  },
  "testRegex": "(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$",
  "moduleFileExtensions": [
    "ts",
    "tsx",
    "js",
    "jsx",
    "json",
    "node"
  ],
  setupFiles: ['<rootDir>/jest.init.js'],
  collectCoverageFrom: ['src/**/*.tsx', "src/**/*.ts"],
};
