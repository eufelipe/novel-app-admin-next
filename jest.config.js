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
    "^@services(.*)$": "<rootDir>/src/services$1",
    "^@instances(.*)$": "<rootDir>/src/instances$1",
    "^@helpers(.*)$": "<rootDir>/src/helpers$1",
    "^@mappers(.*)$": "<rootDir>/src/mappers$1",
    "^@styles(.*)$": "<rootDir>/src/styles$1",
  },
};
