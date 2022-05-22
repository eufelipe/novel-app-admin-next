module.exports = {
  setupFilesAfterEnv: ["<rootDir>/tests/jest.setup.js"],
  transform: {
    "^.+\\.(js|jsx|ts|tsx)$": "<rootDir>/node_modules/babel-jest",
  },
  testEnvironment: "jsdom",
  moduleNameMapper: {
    "^@pages(.*)$": "<rootDir>/src/pages$1",
    "^@models(.*)$": "<rootDir>/src/models$1",
    "^@components(.*)$": "<rootDir>/src/components$1",
    "^@styles(.*)$": "<rootDir>/src/styles$1",
  },
};
