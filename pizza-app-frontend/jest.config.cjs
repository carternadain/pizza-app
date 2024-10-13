// jest.config.cjs
module.exports = {
  setupFilesAfterEnv: ['<rootDir>/src/jest.setup.js'], // Update path to src/jest.setup.js
  testEnvironment: "jsdom",
  transform: {
    "^.+\\.jsx?$": "babel-jest"
  },
  transformIgnorePatterns: ["/node_modules/"],
  moduleFileExtensions: ["js", "jsx"]
};
