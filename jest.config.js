module.exports = {
    moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/$1',
        '^~/(.*)$': '<rootDir>/$1',
        "\\.(css|scss)$": "<rootDir>/node_modules/jest-css-modules"
    },
    testMatch: [
        "**/test/**/*.+(ts|tsx|js)",
    ],
    setupFiles: ["dotenv/config"],
    moduleFileExtensions: [
        'ts',
        'json',
        'js'
    ],
    testEnvironment: "jsdom",
    transform: {
        '^.+\\.ts$': 'ts-jest',
        '^.+\\.js$': 'babel-jest'
    },
    collectCoverage: true,
    collectCoverageFrom: [
        '<rootDir>/utils/**/*.ts'
    ],
    //testURL:"http://192.168.11.99:3000/"
}