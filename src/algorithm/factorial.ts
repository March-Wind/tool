/**
 * 阶乘计算
 * n!=1×2×3×...×(n-1)×n。阶乘亦可以递归方式定义：0!=1，n!=(n-1)!×n。
 * @date 2022-04-02
 * @param {any} n:number
 * @param {any} min=1
 * @returns {any}
 * @example 从n个数中，抓取k个数的排列，有多少个： factorial(n, n - k);
 */
const factorial = (n: number, grab = n): number => {
  let result = 1;

  for (let i = 0; i < grab; i++) {
    result *= n - i;
  }
  return result;
};
export { factorial };
