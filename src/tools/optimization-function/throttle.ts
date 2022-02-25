type Timeout = ReturnType<typeof setTimeout>; // 兼容browser和node环境
interface Options {
  leading?: boolean; // 边缘，也就是第一次调用是否执行
}
/**
 * 节流
 * 每隔delay执行一次
 * @param {Function} fn
 * @param {number} delay
 * @return {*}
 */
const throttle = (fn: Function, delay: number, option: Options = {}) => {
  const { leading = true } = option;
  let sync = leading;
  let timer: Timeout | null = null;
  let lastArgs: any[] = []; // 记录下来没执行的最后一次调用的参数，用在最后一个定时器来执行
  return (...args: any[]) => {
    if (sync) {
      fn(...args);
      sync = false;
    } else {
      lastArgs = args;
      if (timer) {
        return;
      }
      timer = setTimeout(() => {
        fn(...lastArgs);
        sync = true;
        clearTimeout(timer!);
        timer = null;
      }, delay);
    }
  };
};

export default throttle;
