import Concurrency from '@/javascript-language/promise/concurrency';

describe('promise并发', () => {
  test('测试执行顺序和返回顺序', async () => {
    const p1 = (params: any, ms = 1000) => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve(params);
        }, ms);
      });
    };
    const result: any[] = [];
    const concur = new Concurrency();
    const fp1 = jest.fn(p1);
    const fakeP1 = concur.monitoringFn(fp1);

    const fetchApi1 = () => {
      return fakeP1(1, 300);
    };
    const fetchApi2 = () => {
      return fakeP1(2, 600);
    };
    const fetchApi3 = () => {
      return fakeP1(3, 900);
    };
    const fetchApi4 = () => {
      return fakeP1(4, 1200);
    };
    const fetchApi5 = () => {
      return fakeP1(5, 1500);
    };
    const fetchApi6 = () => {
      return fakeP1(6, 200);
    };
    const fa1 = fetchApi1();
    const fa2 = fetchApi2();
    const fa3 = fetchApi3();
    const fa4 = fetchApi4();
    const fa5 = fetchApi5();
    const fa6 = fetchApi6();
    fa1
      .then((res) => {
        result.push(res);
      })
      .catch((err) => {
        result.push(err);
      });
    fa2
      .then((res) => {
        result.push(res);
      })
      .catch((err) => {
        result.push(err);
      });
    fa3
      .then((res) => {
        result.push(res);
      })
      .catch((err) => {
        result.push(err);
      });
    fa4
      .then((res) => {
        result.push(res);
      })
      .catch((err) => {
        result.push(err);
      });
    fa5
      .then((res) => {
        result.push(res);
      })
      .catch((err) => {
        result.push(err);
      });
    fa6
      .then((res) => {
        result.push(res);
      })
      .catch((err) => {
        result.push(err);
      });

    await Promise.all([fa1, fa2, fa3, fa4, fa5, fa6]);
    expect(fp1.mock.calls).toEqual([
      [1, 300],
      [2, 600],
      [3, 900],
      [4, 1200],
      [5, 1500],
      [6, 200],
    ]); // 校验执行顺序
    expect(result).toEqual([1, 6, 2, 3, 4, 5]); // 校验换回顺序
  });
});
