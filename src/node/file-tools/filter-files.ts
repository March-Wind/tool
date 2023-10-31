import { isRegExp } from '@/javascript-language/variable-type';
import fs, { readdirSync } from 'fs';
import Path from 'path';
import isDir from './isDir';
// 实现传入一个文件路经，以及要过滤的扩展名后缀，返回一个过滤后的文件路径数组
const filterFiles = (path: string, ext: string): string[] => {
  if (!isDir(path)) {
    throw new Error('filterFiles: path is not a directory');
  }
  const files = readdirSync(path);
  // files.forEach(() => {

  // })
  return files.filter((file) => {
    return Path.extname(file) === ext;
  });
}
interface Props {
  path: string;
  rule?: string | RegExp;
}
class FilterFiles {
  directory: string;
  rule?: string | RegExp;
  filteredPath: string[];
  constructor(props: Props) {
    const { path, rule } = props;
    if (!isDir(path)) {
      throw new Error('filterFiles: path is not a directory');
    }
    Object.defineProperty(this, "directory", {
      enumerable: false,
      configurable: true,
      writable: true,
      value: path
    });
    Object.defineProperty(this, "rule", {
      enumerable: false,
      configurable: true,
      writable: true,
      value: rule
    });
  }
  filter(_dir?: string) {
    const dir = _dir || this.directory;
    const files = readdirSync(dir, { withFileTypes: true });
    const rule = this.rule ? isRegExp(this.rule) ? this.rule : new RegExp(this.rule + '$') : '';
    files.forEach((file) => {
      if (file.isDirectory()) {
        return this.filter(_dir);
      }
      if (rule && file.name.match(rule)) {
        return this.filteredPath.push(file.name);
      }
      if (!rule) {
        return this.filteredPath.push(file.name);
      }
    })
  }
  /**
   * 传入回调，来获取文件的结果吧
   *
   * @memberof FilterFiles
   */
  load(cb: (docuemnt: {}) => void) { // 这里一次性加载所有文件，一定会占用超大内存，甚至会内存溢出，所以支持逐次加载文件
    this.filteredPath.forEach((document) => {
      cb(document)
    })
  }
}

export default filterFiles;
