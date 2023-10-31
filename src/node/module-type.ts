const moduleType = () => {
  // 判断当前模块是否是ESM模块
  if (typeof __filename === 'undefined' && typeof __dirname === 'undefined' && typeof import.meta !== 'undefined') {
    return 'esm';
  } else {
    return 'commonjs';
  }
};


export { moduleType }
