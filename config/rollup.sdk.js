import rlps from '@rollup/plugin-typescript';
import postcss from 'rollup-plugin-postcss';
import image from '@rollup/plugin-image';
import commonjs from '@rollup/plugin-commonjs';
import nodeExternals from 'rollup-plugin-node-externals';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import tsconfig from './tsconfig.sdk.json';
console.log(tsconfig);
export default {
  input: 'src/index.tsx',
  external: ['react'],
  output: {
    file: 'lib/index.js',
    format: 'umd',
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
    rlps(tsconfig),
    image(),
    postcss(),
    // nodeResolve({ preferBuiltins: false }), // or `true`

    // globals(),
    // builtins(),
  ],
};
