import { isArray, isPromise } from '@/javascript-language/variable-type';
const race = <T extends readonly unknown[]>(values: T): Promise<{ data: unknown; index: number }> => {
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

export default race;
