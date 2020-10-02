module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  setupFilesAfterEnv: ['./app/__test__/config/importJestDOM.ts'],
}
