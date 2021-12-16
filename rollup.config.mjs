import rollupTypescript from '@rollup/plugin-typescript';
import postcss from 'rollup-plugin-postcss';
import image from '@rollup/plugin-image';
import commonjs from '@rollup/plugin-commonjs';
import nodeResolve from 'rollup-plugin-node-resolve';
// import globals from 'rollup-plugin-node-globals'; // 加global前缀
// import builtins from 'rollup-plugin-node-builtins';
import nodeExternals from 'rollup-plugin-node-externals';
import serve from 'rollup-plugin-serve';
import replace from '@rollup/plugin-replace';
const sdk_Config = {
  input: 'src/index.ts',
  external: ['react'],
  output: {
    file: 'lib/index.js',
    format: 'cjs',
    globals: {
      react: 'React'
    },
    banner: '#!/usr/bin/env node'
  },
  plugins: [
    nodeExternals(),
    rollupTypescript(),
    image(),
    postcss(),
    nodeResolve({ preferBuiltins: false }), // or `true`
    commonjs(),

    // globals(),
    // builtins(),
  ],
};


const dev_web_Config = {
  input: 'src/index.tsx',
  // external: ['react'],
  output: {
    file: 'lib/index.js',
    name: "tool",
    format: 'iife',
    globals: {
      react: 'React'
    },
    sourcemap: true,
  },
  plugins: [
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
    nodeResolve({ preferBuiltins: false }), // or `true`
    commonjs(),
    replace({
      'process.env.NODE_ENV': JSON.stringify('production'),
    }),
    serve({ // 开启本地服务
      open: true,
      openPage: '/public/index.html', // 打开的页面
      port: 3000,
      contentBase: ''
    })
    // globals(),
    // builtins(),
  ],

}
let config = null;
switch (process.env.BUILD_TYPE) {
  case 'dev:web':
    config = dev_web_Config;
    break;
  case 'sdk':
    config = sdk_Config;
    break;
}

export default config