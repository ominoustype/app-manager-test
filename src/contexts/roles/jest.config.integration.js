const globalJest = require('./jest.config.json');

const TEST_TIMEOUT = 20 * 1000;

delete globalJest.testPathIgnorePatterns;

module.exports = {
    ...globalJest,
    testMatch: ['<rootDir>/**/infrastructure/**/*.test.ts'],
    testTimeout: TEST_TIMEOUT
};
