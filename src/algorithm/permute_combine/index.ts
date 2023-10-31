import { isArray, isNumber } from '@/javascript-language/variable-type';
import { factorial } from '@/algorithm/factorial';
const permute = <T extends any[]>(arr: T, grab?: number, includeBelow = false): T[] => {
  if (!isArray(arr) || !arr.length) {
    return arr;
  }
  const _grab = grab || arr.length;
  const ans: T = [] as unknown as T;
  const len = arr.length;
  const path: T = [] as unknown as T;
  const dfs = (current: number, len: number, used: boolean[], _path: T) => {
    if (!includeBelow && current === _grab) {
      // 指定单一个数时，到达收集个数再收集，并结束
      const a = _path.slice(0);
      ans.push(a);
      return;
    }

    if (includeBelow) {
      // 当想抓取grab及以下的都进行排列的集合,大于grab直接结束，小于等于时，所有的可能都收集
      if (current > _grab) {
        return;
      }

      const a = _path.slice(0);
      _path.length && ans.push(a);
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
 * @param {any} arr:T 总集合
 * @param {any} grab?:number 选取个数
 * @param {any} includeBelow=false 是否包含这个个数以下的所有集合，比如grab是5，includeBelow为true,会计算grab=5，grab=4....grab=1的所有排列数
 * @returns {any}
 */
const permuteTotal = <T extends any[] | number>(arr: T, grab?: number, includeBelow = false): number => {
  let all = arr as number;
  if (isArray(arr)) {
    all = arr.length;
  }
  grab = grab || all;
  if (includeBelow) {
    let result = 0;
    for (let i = 1; i <= grab; i++) {
      result += factorial(all, i);
    }
    return result;
  }
  return factorial(all, grab); // 任意排列个数
};

/**
 * 组合算法_支持限定选取个数
 * @date 2022-04-06
 * @param {any} arr:T 原始数组
 * @param {any} grab?:number 选取个数，all就是全组合
 * @param {any} includeBelow=false 是否包含这个个数以下的所有集合，比如grab是5，includeBelow为true,会计算grab=5，grab=4....grab=1的所有组合
 * @returns {any}
 */
const combine = <T extends any[]>(arr: T, grab?: number, includeBelow = true): T => {
  const pool: T = [] as unknown as T;
  if (!isArray(arr) || !arr.length) {
    throw new Error('combine：入参不合法');
  }
  const _grab = grab || arr.length;
  if (_grab > arr.length) {
    // 指定个数的情况下，”剩下的“ + ”已选取的“ 凑不足个数，结束
    throw new Error('combine：选取个数多余总集合长度');
  }
  const dfs = (_arr: any[], temp: any[]) => {
    if (includeBelow && (temp.length >= _grab || _arr.length === 0)) {
      // 当grab数及以下都要时,
      // 1.超出时及时停止，并收集。
      // 2.总集合遍历完之后，收集并结束。
      temp.length !== 0 && pool.push(temp); // 过滤掉是0个选取的单项
      return;
    }
    if (!includeBelow && temp.length >= _grab) {
      // 当指定个数的情况下
      // 1.完成选取足够的个数，结束
      pool.push(temp);
      return;
    }
    if (!includeBelow && _arr.length + temp.length < _grab) {
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
 * @date 2022-04-06
 * @param {any} arr:T 总集合
 * @param {any} grab?:number 选取个数
 * @param {any} includeBelow=false 是否包含这个个数以下的所有集合，比如grab是5，includeBelow为true,会计算grab=5，grab=4....grab=1的所有组合数
 * @returns {any}
 */
const combineTotal = <T extends any[] | number>(arr: T, grab?: number, includeBelow = true): number => {
  let all = arr as number;
  if (isArray(arr)) {
    all = arr.length;
  }
  grab = grab || all;
  if (includeBelow) {
    let result = 0;
    for (let i = 1; i <= grab; i++) {
      result += combineTotal(all, i, false); // 任意排列个数
    }
    return result;
  }

  const divisor = factorial(all, grab);
  const dividend = factorial(grab); // grab的全排列个数
  const total = divisor / dividend;
  return total;
};
export { combine, combineTotal, permuteTotal, permute };
