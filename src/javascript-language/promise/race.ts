import { isArray, isPromise } from '@/javascript-language/variable-type';


/**
 * 返回promise响应位置的静态race
 * @param {PromiseItem[]} promiseFns
 * @param {ContinueCondition} [condition='success']
 * @return {*}  {Promise<unknown>}
 */
const staticRace = <T extends readonly unknown[]>(values: T): Promise<{ data: unknown; index: number }> => {
  if (!isArray(values) || !values.length) {
    throw new Error('race:入参不合法');
  }
  return new Promise((resolve, reject) => {
    values.forEach((p, index) => {
      if (!isPromise(p)) {
        const result = {
          data: p,
          index: index,
        };
        return resolve(result);
      }
      p.then((res: unknown) => {
        const result = {
          data: res,
          index: index,
        };
        resolve(result);
      }).catch((error: unknown) => {
        const result = {
          data: error,
          index: index,
        };
        reject(result);
      });
    });
  });
};

// class dynamicRace {
//   protected competitors: Promise<unknown>[];
//   constructor() {
//     // 做一下保存值
//   }
//   addCompetitor(values: Promise<unknown>) {
//     this.competitors
//   }

// }

// class DynamicRace{
//   competitors: Promise<unknown>[];
//   addCompetitor(p: Promise<unknown> | Promise<unknown>[]) {

//   }
// }

export default staticRace;
