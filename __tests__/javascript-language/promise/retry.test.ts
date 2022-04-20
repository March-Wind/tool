import { retry } from '../../../src/javascript-language/promise/retry';
let num = 5;

describe('promise.retry：现在有一个5次请求才返回成功的函数，进行测试', () => {
  const fetchData = (): Promise<any> => {
    return new Promise((resolve, reject) => {
      if (num <= 1) {
        resolve('data');
      } else {
        num--;
        reject();
      }
    });
  };

  beforeEach(() => {
    num = 5;
  });

  test('4次尝试，返回undefined', async () => {
    const fecthMock = jest.fn(fetchData);
    let result: any = 'result';
    try {
      result = await retry(fecthMock, 4);
    } catch (error) {
      result = error;
    }
    expect(fecthMock.mock.calls.length).toBe(4);
    expect(result).toBe(undefined);
  });
  test('5次尝试，得到正确结果', () => {
    const fecthMock = jest.fn(fetchData);
    return retry(fecthMock, 5).then((data) => {
      expect(fecthMock.mock.calls.length).toBe(5);
      expect(data).toBe('data');
    });
  });
  test('6次尝试，在第五次得到正确结果', () => {
    const fecthMock = jest.fn(fetchData);
    return retry(fecthMock, 6).then((data) => {
      expect(fecthMock.mock.calls.length).toBe(5);
      expect(data).toBe('data');
    });
  });
});
