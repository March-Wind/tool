type ContinueCondition = 'all' | 'success';
type PromiseKeys = keyof Promise<unknown>;
/**
 * promise的generatot的执行器
 *
 * @param {() => Generator<Promise<unknown>, void>} genFn
 */
const generatorExecuter = (genFn: () => Generator<Promise<unknown>, void>, condition: ContinueCondition = 'success') => {
  return new Promise((resolve) => {
    const gen = genFn();
    const result = gen.next();
    const loop = (result: IteratorResult<Promise<unknown>, void>) => {
      debugger

      const { value, done } = result;
      if (done) {
        resolve('');
      }
      if (value) {
        let method: PromiseKeys = 'finally';
        switch (condition) {
          case 'success':
            method = 'then';
            break;
          default:
            method = 'finally';
            break;
        }
        value[method](() => {
          const result = gen.next();
          loop(result);
        })
      }
    }
    loop(result);
  })

}
/**
   * promise 的链式调用
   *
   * @param {Promise<unknown>[]} PromiseArr
   */
const chain = function (PromiseArr: Promise<unknown>[], condition: ContinueCondition = 'success') {
  const iterator = function* () {
    for (const promiseFn of PromiseArr) {
      yield promiseFn
    }
  }
  const gen = iterator();
  const a = gen.next();
  generatorExecuter(iterator, condition);
}


export {
  chain
}

