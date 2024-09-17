import { JestConfigWithTsJest, pathsToModuleNameMapper } from 'ts-jest'
import config from './tsconfig.json'

const jestConfig: JestConfigWithTsJest = {
  preset: 'ts-jest/presets/default',
  testEnvironment: 'node',
  rootDir: './',
  transform: {
    '^.+\\.tsx?$': [
      'ts-jest',
      {
        isolatedModules: true,
        useESM: true,
        tsconfig: './tsconfig.esnext.json',
      },
    ],
  },
  moduleDirectories: ['node_modules'],
  // moduleNameMapper: {
  // ...pathsToModuleNameMapper(config.compilerOptions.paths),
  // '^(\\.{1,2}/.+)\\.js$': '$1',
  // },
  testPathIgnorePatterns: ['<rootDir>/dist/'],
  watchPathIgnorePatterns: ['<rootDir>/dist/'],
}

export default jestConfig
