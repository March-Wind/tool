type Timeout = ReturnType<typeof setTimeout>; // 兼容browser和node环境

/**
 * 节流，第一次会执行,每个delay会触发一次，而不是寄存0时的函数等到delay后才执行
 *
 * @param {Function} fn
 * @param {number} delay
 * @return {*}
 */
const throttle = (fn: Function, delay: number) => {
  let execute = true;
  let timer: Timeout | null = null;
  return (...args: any[]) => {
    if (execute) {
      fn(...args)
      execute = false;
    } else {
      if (timer) {
        return;
      }
      timer = setTimeout(() => {
        execute = true;
        clearTimeout(timer!);
        timer = null;
      }, delay)
    }
  }
}

export default throttle;
