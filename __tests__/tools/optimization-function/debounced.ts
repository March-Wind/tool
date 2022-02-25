import debounced from '@/tools/optimization-function/debounced';
describe('防抖', () => {
  test('第一次调用，50ms后执行', (done) => {
    const mockFn = jest.fn((num) => {
      console.log(num);
    });
    const fn = debounced(mockFn, 50);
    fn(1);
    const calls = mockFn.mock.calls;
    expect(calls.length).toBe(0);
    setTimeout(() => {
      const calls = mockFn.mock.calls;
      expect(calls.length).toBe(1);
      done();
    }, 60);
  });

  test('同步连续两次调用，只执行最后1次', (done) => {
    const mockFn = jest.fn((num) => {
      console.log(num);
    });
    const fn = debounced(mockFn, 50);
    fn(1);
    fn(2);
    const calls = mockFn.mock.calls;
    expect(calls.length).toBe(0);
    setTimeout(() => {
      const calls = mockFn.mock.calls;
      expect(calls.length).toBe(1);
      expect(calls[0][0]).toBe(2);
      done();
    }, 60);
  });
  test('delay时间内的多次调用，执行最后一次', (done) => {
    const mockFn = jest.fn((num) => {
      console.log(num);
    });
    const fn = debounced(mockFn, 50);
    fn(1);
    setTimeout(() => fn(2), 30);
    const calls = mockFn.mock.calls;
    expect(calls.length).toBe(0);
    setTimeout(() => {
      const calls = mockFn.mock.calls;
      expect(calls.length).toBe(1);
      expect(calls[0][0]).toBe(2);
      done();
    }, 100);
  });
});
