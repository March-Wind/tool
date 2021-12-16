/**
 * 
 * @param promiseFn 
 * @returns 
 */
const promise_retry = (promiseFn: () => Promise<any>, times = 5): Promise<any> => {
  const loopBody = (): Promise<any> => {
    return promiseFn().then((res) => {
      return res;
    }).catch((error) => {
      if (times <= 0) {
        return error;
      } else {
        times--;
        return loopBody()
      }
    })
  }
  return loopBody();
}
export {
  promise_retry
}