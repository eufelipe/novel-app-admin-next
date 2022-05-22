module.exports = {
  setupFilesAfterEnv: ["<rootDir>/tests/jest.setup.js"],
  transform: {
    "^.+\\.(js|jsx|ts|tsx)$": "<rootDir>/node_modules/babel-jest",
  },
  testEnvironment: "jsdom",
  moduleNameMapper: {
    "^@pages(.*)$": "<rootDir>/pages$1",
  },
};
