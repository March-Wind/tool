import rlps from '@rollup/plugin-typescript';
import postcss from 'rollup-plugin-postcss';
import image from '@rollup/plugin-image';
import commonjs from '@rollup/plugin-commonjs';
import nodeExternals from 'rollup-plugin-node-externals';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import pkg from '../package.json';
// import tsconifg from './tsconfig.sdk.json';
const { BUILD_TYPE } = process.env;
const jobs = {
  umd: {
    file: 'lib/index.umd.js',
    format: 'umd',
  },
  esm: {
    file: pkg.module,
    format: 'esm',
  },
  cjs: {
    file: pkg.main,
    format: 'cjs',
  },
};

const partOfOutput = jobs[BUILD_TYPE];
export default {
  input: 'src/index.tsx',
  external: ['react'],
  output: {
    // file: 'lib/index.js',
    // format: 'umd',
    ...partOfOutput,
    globals: {
      react: 'React',
    },
    banner: '#!/usr/bin/env node',
  },
  plugins: [
    // resolve(),
    nodeResolve({
      extensions: ['.js', '.ts', '.tsx'],
      modulesOnly: true,
    }),
    commonjs(),
    nodeExternals(),
    rlps({
      tsconfig: './config/tsconfig.build.json',
    }),
    image(),
    postcss(),
    // nodeResolve({ preferBuiltins: false }), // or `true`

    // globals(),
    // builtins(),
  ],
};
