interface Options {
  limit: number;
}
/**
 * pomise并发器
 * 在Concurrency程序中加上debug顺序就变了，是因为debug的时间内异步任务也还在执行，这个时候可能已经执行好了，后面的异步任务还没执行，自然后面的任务就排在后面执行好了进入等待被调用状态
 * @class Concurrency
 */
class Concurrency {
  protected options: Options;
  protected ongoingStack: Promise<unknown>[] = [];
  protected reparsedStock: Function[] = [];
  protected all: any[] = [];
  constructor(options?: Options) {
    const defaultOptions = {
      limit: 5,
    };
    this.options = {
      ...defaultOptions,
      ...options,
    };
  }
  monitoringFn<T extends (...args: any[]) => Promise<unknown>>(fn: T): T {
    const _this = this;
    return function (...args: Parameters<T>): ReturnType<T> {
      return new Promise((resolve, reject) => {
        const { limit } = _this.options;
        if (_this.ongoingStack.length < limit) {
          const p = fn(...args);
          p.then(
            (res) => {
              resolve(res);
            },
            (error) => {
              reject(error);
            },
          ).finally(() => {
            _this.polling(p);
          });
          _this.ongoingStack.push(p);
          _this.all.push(p);
        } else {
          const wrapFn = () => {
            const p = fn(...args);
            p.then(
              (res) => {
                resolve(res);
              },
              (error) => {
                reject(error);
              },
            ).finally(() => {
              _this.polling(p);
            });
            _this.all.push(p);
            return p;
          };
          _this.reparsedStock.push(wrapFn);
        }
      }) as unknown as ReturnType<T>; // 貌似typescript 不识别
    } as unknown as T; // 貌似typescript 不识别
  }
  polling(p: Promise<unknown>) {
    const index = this.ongoingStack.findIndex((item) => p === item);
    this.ongoingStack.splice(index, 1);
    const { limit } = this.options;
    if (this.ongoingStack.length < limit && this.reparsedStock.length) {
      const wrapFn = this.reparsedStock.shift();
      this.ongoingStack.push(wrapFn!());
    }
  }
}

// const limit = 5;
// const ongoingStack: Promise<unknown>[] = [];
// const preparsedStock: any[] = [];
// const polling = () => {
//   Promise.race(ongoingStack).finally(() => {
//     const toOngoing = preparsedStock.shift();
//     if (toOngoing) {
//       ongoingStack.push(toOngoing());
//       polling();
//     }
//   })
// }
// // 嵌套的，形式如下
// const wrapConcur = (fn: any) => {
//   return (params: any, ms = 1000) => {
//     return new Promise((resolve, reject) => {
//       if (ongoingStack.length < limit) {
//         ongoingStack.push(fn(params, ms).then(
//           (res: any) => { resolve(res) },
//           (err: any) => { reject(err) }))
//         polling();
//       } else {
//         const wrapFn = () => {
//           return fn(params, ms).then(
//             (res: any) => { resolve(res) },
//             (err: any) => { reject(err) })
//         }
//         preparsedStock.push(wrapFn)
//       }
//     })
//   }
// }

// const fakeFetch = (params: any, ms = 1000) => {
//   // console.log(params)
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       resolve(params)
//     }, ms)
//   })
// }
// const fakeFetch2 = (params: any, ms = 1000) => {
//   // console.log(params)
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       reject(params)
//     }, ms)
//   })
// }
// // const fetchAPI = wrapConcur(fetch);
// const fetchAPI = wrapConcur(fakeFetch);
// const fetchAPI2 = wrapConcur(fakeFetch2);
// const fetchApi1 = () => {
//   console.log(1);
//   return fetchAPI("https://www.baidu.com/1", 1000);
// }

// const fetchApi2 = () => {
//   console.log(2);
//   return fetchAPI2("https://www.baidu.com/2", 1200);
// }
// const fetchApi3 = () => {
//   console.log(3);
//   return fetchAPI("https://www.baidu.com/3", 1300);
// }
// const fetchApi4 = () => {
//   console.log(4);
//   return fetchAPI("https://www.baidu.com/4", 1400);
// }
// const fetchApi5 = () => {
//   console.log(5);
//   return fetchAPI("https://www.baidu.com/5", 1500);
// }
// const fetchApi6 = () => {
//   console.log(6);
//   return fetchAPI("https://www.baidu.com/6", 1600);
// }
// fetchApi1().then((res) => {
//   console.log(res)
// }).catch((err) => {
//   console.log(err)
// })
// fetchApi2().then((res) => {
//   console.log(res)
// }).catch((err) => {
//   console.log(err)
// })
// fetchApi3().then((res) => {
//   console.log(res)
// }).catch((err) => {
//   console.log(err)
// })
// fetchApi4().then((res) => {
//   console.log(res)
// }).catch((err) => {
//   console.log(err)
// })
// fetchApi5().then((res) => {
//   console.log(res)
// }).catch((err) => {
//   console.log(err)
// })
// fetchApi6().then((res) => {
//   console.log(res)
// }).catch((err) => {
//   console.log(err)
// })

export default Concurrency;
