import { combine, permute, permuteTotal, combineTotal } from '@/algorithm/permute_combine/index';

describe('排列算法', () => {
  test('默认参数：数组个数的所有排列', () => {
    const arr = [1, 2, 3, 4, 5];
    const result = permute(arr);
    const total = permuteTotal(arr);
    expect(result.length).toBe(total);
    const arr2 = [1, 2, 3, 4, 5, 6, 7];
    const result2 = permute(arr2);
    const total2 = permuteTotal(arr2);
    expect(result2.length).toBe(total2);
  });

  test('各级个数的所有排列', () => {
    const arr = [1, 2, 3, 4, 5];
    const result = permute(arr, arr.length, true);
    const total = permuteTotal(arr, arr.length, true);
    expect(result.length).toBe(total);
  });
  test('指定选取3个数的所有排列', () => {
    const arr = [1, 2, 3, 4, 5, 6, 7];
    const result = permute(arr, 3);
    const total = permuteTotal(arr, 3);
    expect(result.length).toBe(total);
  });
});

describe('组合算法', () => {
  test('默认参数：各级个数的所有组合', () => {
    const arr = ['YY', 'MM', 'DD'];
    debugger;
    const result = combine(arr);
    const total = combineTotal(arr);
    expect(result.length).toBe(total);
  });
  test('指定选取2个数的所有组合', () => {
    const arr = ['YY', 'MM', 'DD'];
    const grab = 2;
    const result = combine(arr, grab, false);
    const total = combineTotal(arr, grab, false);
    expect(result.length).toBe(total);
  });
  test('指定选取2个数以及以下个数的所有组合', () => {
    const arr = ['YY', 'MM', 'DD'];
    const grab = 2;
    const includeBelow = true;
    const result = combine(arr, grab, includeBelow);
    const total = combineTotal(arr, grab, includeBelow);
    expect(result.length).toBe(total);
  });
});
