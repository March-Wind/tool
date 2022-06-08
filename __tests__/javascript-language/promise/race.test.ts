import race from '@/javascript-language/promise/race';
import awaitWrap from '@/javascript-language/promise/await-wrap';
describe('promise race', () => {
  test('返回最快的promise结果1:正确结果', async () => {
    const p1 = new Promise((resolve, reject) => {
      setTimeout(() => resolve(1), 300);
    });
    const p2 = new Promise((resolve, reject) => {
      setTimeout(() => resolve(2), 200);
    });
    const p3 = new Promise((resolve, reject) => {
      setTimeout(() => resolve(3), 100);
    });
    const res = await awaitWrap(race([p1, p2, p3]));
    const { state } = res;
    expect(state).toBe('fulfilled');
    const result = res[state as 'fulfilled'];
    expect(result.index).toBe(2);
    expect(result.data).toBe(3);
  });
  test('返回最快的promise结果2:错误结果', async () => {
    const p1 = new Promise((resolve, reject) => {
      setTimeout(() => resolve(1), 300);
    });
    const p2 = new Promise((resolve, reject) => {
      setTimeout(() => resolve(2), 200);
    });
    const p3 = new Promise((resolve, reject) => {
      setTimeout(() => reject(3), 100);
    });
    const res = await awaitWrap(race([p1, p2, p3]));
    const { state } = res;
    expect(state).toBe('rejected');
    const result = res[state as 'rejected'];
    expect(result.index).toBe(2);
    expect(result.data).toBe(3);
  });
});
