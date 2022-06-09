import rollupTypescript from '@rollup/plugin-typescript';
import postcss from 'rollup-plugin-postcss';
import image from '@rollup/plugin-image';
import commonjs from '@rollup/plugin-commonjs';
// import resolve from 'rollup-plugin-node-resolve';
// import globals from 'rollup-plugin-node-globals'; // 加global前缀
// import builtins from 'rollup-plugin-node-builtins';
import nodeExternals from 'rollup-plugin-node-externals';
import serve from 'rollup-plugin-serve';
import livereload from 'rollup-plugin-livereload';
import replace from '@rollup/plugin-replace';
import alias from '@rollup/plugin-alias';
import path from 'path';
import resolve from '@rollup/plugin-node-resolve';
const sdk_Config = {
  input: 'src/index.tsx',
  external: ['react'],
  output: {
    file: 'lib/index.js',
    format: 'cjs',
    globals: {
      react: 'React',
    },
    banner: '#!/usr/bin/env node',
  },
  plugins: [
    // resolve(),
    commonjs(),
    nodeExternals(),
    rollupTypescript({ tsconfig: './tsconfig.json' }),
    image(),
    postcss(),
    // nodeResolve({ preferBuiltins: false }), // or `true`

    // globals(),
    // builtins(),
  ],
};

const dev_web_Config = {
  input: 'src/index.tsx',
  output: {
    file: 'lib/index.js',
    name: 'tool',
    format: 'iife',
    // sourcemap: true,
  },
  plugins: [
    resolve({
      // some package.json files have a "browser" field which specifies
      // alternative files to load for people bundling for the browser. If
      // that's you, either use this option or add "browser" to the
      // "mainfields" option, otherwise pkg.browser will be ignored
      browser: true,
    }),
    commonjs(),
    nodeExternals(),
    rollupTypescript({
      // "module": "esnext",
      // "removeComments": true,
      // "esModuleInterop": true,
      // "experimentalDecorators": true,
      // "target": "es5",
      // "jsx": "react",
      // "moduleResolution": "node"
    }),
    image(),
    postcss(),
    replace({
      'process.env.NODE_ENV': JSON.stringify('production'),
      preventAssignment: true,
    }),
    serve({
      // 开启本地服务
      open: true,
      openPage: '/public/index.html', // 打开的页面
      port: 3000,
      contentBase: '',
      historyApiFallback: true,
    }),
    livereload(),
    alias({
      // 别名
      entries: [
        {
          find: 'src',
          replacement: path.resolve(__dirname, 'src'),
          // OR place `customResolver` here. See explanation below.
        },
      ],
    }),
    // globals(),
    // builtins(),
  ],
};
let config = null;
switch (process.env.BUILD_TYPE) {
  case 'dev:web':
    config = dev_web_Config;
    break;
  case 'sdk':
    config = sdk_Config;
    break;
}

export default config;
