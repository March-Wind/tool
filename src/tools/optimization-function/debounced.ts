type Timeout = ReturnType<typeof setTimeout>; // 兼容browser和node环境

/**
 * 防抖函数
 * 多次调用只执行最后一次
 * @param {Function} fn
 * @param {number} delay
 * @return {*}
 */
const debounced = (fn: Function, delay: number) => {
  let timer: Timeout | null = null;
  let lastArgs: any[] = []; // 记录下来没执行的最后一次调用的参数，用在最后一个定时器来执行
  return (...args: any[]) => {
    lastArgs = args;
    clearTimeout(timer!);
    timer = setTimeout(() => {
      fn(...lastArgs);
      clearTimeout(timer!);
      timer = null;
    }, delay);
  };
};
export default debounced;
