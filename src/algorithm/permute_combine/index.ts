import { isArray, isNumber } from '@/javascript-language/variable-type';
import factorial from '@/algorithm/factorial';
// l: number | 'all' = 'all'
const permute = <T extends any[]>(arr: T, grab?: number): T[] => {
  if (!isArray(arr) || !arr.length) {
    return arr;
  }
  grab = grab || arr.length;
  const ans: T = [] as unknown as T;
  const len = arr.length;
  const path: T = [] as unknown as T;
  const dfs = (current: number, len: number, used: boolean[], _path: T) => {
    if (current === grab) {
      const a = _path.slice(0);
      ans.push(a);
      return;
    }
    for (let i = 0; i < len; i++) {
      if (used[i]) {
        continue;
      }
      _path.push(arr[i]);
      used[i] = true;
      dfs(current + 1, len, used, _path);
      _path.pop();
      used[i] = false;
    }
  };
  dfs(0, len, [], path);
  return ans;
};

/**
 * 排列个数
 * @date 2022-04-06
 * @param {any} arr:T
 * @param {any} grab?:number 选取个数
 * @returns {any}
 */
const permuteTotal = <T extends any[] | number>(arr: T, grab?: number): number => {
  let all = arr as number;
  if (isArray(arr)) {
    all = arr.length;
  }
  grab = grab || all;
  // const all = Array.isArray(arr) ? arr.length : arr;
  return factorial(all, grab); // 任意排列个数
};

/**
 * 组合算法_支持限定选取个数
 * @date 2022-03-30
 * @param {any} arr:any[] 原始数组
 * @param {any} l:number|'all' 选取个数，all就是全组合
 * @returns {any}
 *
 */
const combine = <T extends any[]>(arr: T, l: number | 'all' = 'all'): T => {
  const pool: T = [] as unknown as T;
  const dfs = (_arr: any[], temp: any[]) => {
    if (l === 'all' && _arr.length === 0) {
      // 所有个数都要的情况下，当没有子集合时结束
      temp.length !== 0 && pool.push(temp); // 过滤掉是0个选取的单项
      return;
    }
    if (isNumber(l) && temp.length >= l) {
      // 指定个数的情况下，完成选取足够的个数，结束
      pool.push(temp);
      return;
    }
    if (isNumber(l) && _arr.length + temp.length < l) {
      // 指定个数的情况下，”剩下的“ + ”已选取的“ 凑不足个数，结束
      return;
    }
    dfs(_arr.slice(1), [...temp, _arr[0]]);
    dfs(_arr.slice(1), [...temp]);
  };
  dfs(arr, []);
  return pool;
};

/**
 * 计算组合的个数
 * @date 2022-04-02
 * @param {any} arr:T
 * @param {any} grab:number 抓取几个来组成一组
 * @returns {any}
 */
const combineTotal = <T extends any[] | number>(arr: T, grab?: number): number => {
  let all = arr as number;
  if (isArray(arr)) {
    all = arr.length;
  }
  grab = grab || all;
  const divisor = factorial(all, grab); // 任意排列个数
  const dividend = factorial(grab); // grab的全排列个数
  const total = divisor / dividend;
  return total;
};
export { combine, combineTotal, permuteTotal, permute };
