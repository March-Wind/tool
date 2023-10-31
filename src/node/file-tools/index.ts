import fs, { lstatSync } from 'fs';
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

/**
 * 是文件夹吗
 * @param path
 * @returns
 */
const isDir = (path: string) => {
  return lstatSync(path).isDirectory()
}

/**
 * 删除拓展名
 *
 * @param {string} path
 * @return {*}  {string}
 */
const removeFileExtension = (path: string): string => {
  return path.replace(/(\.[^.]*)$/, '');
}

/**
 * 获取拓展名
 *
 * @param {string} path
 * @return {*}  {string}
 */
const getFileExtension = (path: string): string => {
  const result = path.match(/(\.[^.]*)$/g);
  return result ? result[0] : '';
}

export {
  checkExistence,
  isDir,
  removeFileExtension,
  getFileExtension
}
