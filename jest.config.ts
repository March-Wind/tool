/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
// 需要安装ts-node才支持
import type { InitialOptionsTsJest } from 'ts-jest'
// import { pathsToModuleNameMapper } from 'ts-jest'
import { defaults as tsjPreset } from 'ts-jest/presets'
// import tsconfig from './tsconfig.json'; // 这里必须是这个标准的json
// const { compilerOptions } = tsconfig
const config: InitialOptionsTsJest = {
  // [...]
  roots: [
    "<rootDir>/__tests__"
  ],
  preset: 'ts-jest/presets/default-esm', // or other ESM presets
  extensionsToTreatAsEsm: ['.ts'],
  // testEnvironment: "jsdom",
  transform: {
    ...tsjPreset.transform,
    // [...]
  },
  globals: {
    'ts-jest': {
      useESM: true,
      // ts-jest configuration goes here and your IDE will suggest which configs when typing
    },
  },
  moduleNameMapper: {
    '^(\\.{1,2}/.*)\\.js$': '$1',
    // ...pathsToModuleNameMapper(compilerOptions.paths /*, { prefix: '<rootDir>/' } */) // 跟tsconfig的paths一致
  }
}

export default config