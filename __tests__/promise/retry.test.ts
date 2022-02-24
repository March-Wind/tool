import { promise_retry } from '../../src/javascript-language/promise/retry'
describe("promise.retry", () => {
  let num = 5;
  const fetchData = (): Promise<any> => {
    return new Promise((resolve, reject) => {
      debugger
      if (num <= 0) {
        resolve('data');
      } else {
        num--;
        reject();
      }
    })
  }
  // const myMockFn = jest
  //   .fn(() => 'default')
  //   .mockImplementationOnce(() => 'first call')
  //   .mockImplementationOnce(() => 'second call');

  beforeEach(() => {
    num = 5
  });

  // afterEach(() => {
  //   num = 5
  // });



  test("小于5次重试次数", () => {
    return promise_retry(fetchData, 4).then((data) => {
      expect(data).toBe(undefined)
    });
  })
  test("等于5次重试次数", () => {
    return promise_retry(fetchData, 5).then((data) => {
      expect(data).toBe('data')
    });
  })
  test("超过5次重试次数", () => {

    return promise_retry(fetchData, 6).then((data) => {
      expect(data).toBe('data')
    });
  })
})
