/**
 * promise失败重试，
 *
 * @param {() => Promise<any>} promiseFn 返回promise的函数
 * @param {number} [times=5] 次数
 * @return {*}  {Promise<any>}
 */
const retry = (promiseFn: () => Promise<any>, times = 5): Promise<any> => {
  const loopBody = (countDown: number): Promise<any> => {
    return promiseFn()
      .then((res) => {
        return res;
      })
      .catch((error) => {
        if (countDown <= 1) {
          return Promise.reject(error);
        } else {
          return loopBody(countDown - 1);
        }
      });
  };
  return loopBody(times);
};
export { retry };
