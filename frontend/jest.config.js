module.exports = {
  preset: 'ts-jest',
  testPathIgnorePatterns: ['/node_modules/', '/.next/'],
  setupFilesAfterEnv: ['<rootDir>/src/__tests__/setupTests.ts'],
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': '<rootDir>/node_modules/babel-jest'
  },
  testEnvironment: 'jsdom',
  // moduleNameMapper: {
  //   '\\.(scss|css|sass)$': 'identity-obj-proxy'
  // }
  testMatch: ['<rootDir>/src/__tests__/*spec.ts?(x)']
};
