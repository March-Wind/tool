import throttle from '@/tools/optimization-function/throttle'


describe("throttle-节流", () => {
  test('同步两次调用只执行一次,前者执行', (done) => {
    const mockFn = jest.fn((num) => { console.log(num) });
    const fn = throttle(mockFn, 50);
    fn(1)
    fn(2)

    setTimeout(() => {
      const calls = mockFn.mock.calls;
      expect(calls.length).toBe(1); // 一共调用1次
      expect(calls[0][0]).toBe(1); // 第一个被调用
      done()
    }, 100)
  })
  test('间隔执行', (done) => {
    const mockFn = jest.fn((num) => { console.log(num) });
    const fn = throttle(mockFn, 50);
    fn(1)
    fn(2)

    setTimeout(() => {
      fn(3)
      fn(4)
    }, 80)
    setTimeout(() => {
      const calls = mockFn.mock.calls; // calls[0]代表所有入参
      expect(calls.length).toBe(2); // 一共调用1次
      debugger
      expect(calls[0][0]).toBe(1); // 第一个被调用
      expect(calls[1][0]).toBe(3); // 第一个被调用
      done()
    }, 200)
  })
})
