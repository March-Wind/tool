import { isNumber } from '@/javascript-language/variable-type';
/**
 * 组合算法_限定选取个数
 * @date 2022-03-30
 * @param {any} arr:any[] 原始数组
 * @param {any} l:number 选取个数
 * @returns {any}
 */
const combine = <T extends any[]>(arr: T, l: number | 'all' = 'all') => {
  const pool: any[] = [];
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

export default combine;
