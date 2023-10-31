import fs from 'fs';
/**
 * 检查文件或者文件夹是否存在
 *
 * @param {string} path
 * @return {*}  {boolean}
 */
const checkExistence = (path: string): boolean => {
  try {
    fs.accessSync(path);
    return true;
  } catch (error) {
    return false;
  }
}

export {
  checkExistence
}
