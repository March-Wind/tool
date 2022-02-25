import throttle from '@/tools/optimization-function/throttle';

describe('throttle-节流', () => {
  test('第一次调用，默认立即执行', () => {
    const mockFn = jest.fn((num) => {
      console.log(num);
    });
    const fn = throttle(mockFn, 50);
    fn(1);
    const calls = mockFn.mock.calls;
    expect(calls.length).toBe(1);
  });
  test('第一次调用，delay时间后执行', () => {
    const mockFn = jest.fn((num) => {
      console.log(num);
    });
    const fn = throttle(mockFn, 50, { leading: false });
    fn(1);
    const calls = mockFn.mock.calls;
    expect(calls.length).toBe(0);
  });

  test('连续两次调用,第一次立即执行，第二次delay时间后执行', (done) => {
    const mockFn = jest.fn((num) => {
      console.log(num);
    });
    const fn = throttle(mockFn, 50);
    fn(1);
    fn(2);
    setTimeout(() => {
      const calls = mockFn.mock.calls;
      expect(calls.length).toBe(2); // 一共调用2次
      expect(calls[0][0]).toBe(1); // 第一个被调用
      expect(calls[1][0]).toBe(2); // 第二次调用
      done();
    }, 100);
  });
  test('开始同步调用两次，80ms(超出deplay)后再连续调用两次，四次都执行', (done) => {
    const mockFn = jest.fn((num) => {
      console.log(num);
    });
    const fn = throttle(mockFn, 50);
    fn(1);
    fn(2);

    setTimeout(() => {
      fn(3);
      fn(4);
    }, 80);
    setTimeout(() => {
      const calls = mockFn.mock.calls; // calls[0]代表所有入参
      expect(calls.length).toBe(4); // 一共调用1次
      done();
    }, 200);
  });
  test('不足一次间隔的调用，执行最后一次', (done) => {
    const mockFn = jest.fn((num) => {
      console.log(num);
    });
    const fn = throttle(mockFn, 50);
    fn(1);
    fn(2);

    setTimeout(() => {
      fn(3);
      fn(4);
    }, 10);
    setTimeout(() => {
      const calls = mockFn.mock.calls; // calls[0]代表所有入参
      expect(calls.length).toBe(2); // 一共调用1次
      expect(calls[0][0]).toBe(1); // 第一个被调用
      expect(calls[1][0]).toBe(4); // 第一个被调用
      done();
    }, 200);
  });
});
