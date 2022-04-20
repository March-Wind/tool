import { chain } from '@/javascript-language/promise/chain';

describe('promise.chain链式调用', () => {
  test('3个promise函数，每个成功之后往下调用，最终得到所有结果', (done) => {
    const prom1 = () => Promise.resolve(1);
    const prom2 = () => Promise.resolve(2);
    const prom3 = () => Promise.resolve(3);
    const mock1 = jest.fn(prom1);
    const mock2 = jest.fn(prom2);
    const mock3 = jest.fn(prom3);
    chain([mock1, mock2, mock3]).then((response) => {
      expect(response).toEqual([1, 2, 3]);
      done();
    });
  });

  test('3个promise函数，第二个报错', (done) => {
    const prom1 = () => Promise.resolve(1);
    const prom2 = () => Promise.reject(2);
    const prom3 = () => Promise.resolve(3);
    const mock1 = jest.fn(prom1);
    const mock2 = jest.fn(prom2);
    const mock3 = jest.fn(prom3);
    // const mock4 = jest.fn(prom4)
    chain([mock1, mock2, mock3]).catch((err: any) => {
      expect(err).toEqual([1, 2]);
      done();
    });
  });
  test('3个promise函数，把第二个设置条件通过，', (done) => {
    const prom1 = () => Promise.resolve(1);
    const prom2 = () => Promise.resolve(2);
    const prom3 = () => Promise.resolve(3);
    const mock1 = jest.fn(prom1);
    const mock2 = jest.fn(prom2);
    const mock3 = jest.fn(prom3);
    const obj2 = {
      fecth: mock2,
      nextCondition: (reaponse: unknown) => reaponse === 2,
    };
    chain([mock1, obj2, mock3]).then((err: any) => {
      expect(err).toEqual([1, 2, 3]);
      done();
    });
  });
  test('3个promise函数，把第二个设置条件不通过，', (done) => {
    const prom1 = () => Promise.resolve(1);
    const prom2 = () => Promise.reject(2);
    const prom3 = () => Promise.resolve(3);
    const mock1 = jest.fn(prom1);
    const mock2 = jest.fn(prom2);
    const mock3 = jest.fn(prom3);
    const obj2 = {
      fecth: mock2,
      nextCondition: (reaponse: unknown) => reaponse === 2.1,
    };
    chain([mock1, obj2, mock3]).catch((err: any) => {
      expect(err).toEqual([1, 2]);
      done();
    });
  });
});
