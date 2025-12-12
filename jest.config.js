module.exports = {
  preset: 'react-native',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  moduleNameMapper: {
    '^src/(.*)$': '<rootDir>/src/$1',
    '^test-utils$': '<rootDir>/__tests__/utils/testUtils.tsx',
  },
  testPathIgnorePatterns: [
    '/node_modules/',
    '__tests__/utils/',
  ],
  transformIgnorePatterns: [
    'node_modules/(?!(@react-navigation|@react-native|react-native|react-native-video|react-native-safe-area-context)/)',
  ],
};
