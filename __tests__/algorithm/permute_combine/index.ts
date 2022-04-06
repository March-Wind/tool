import { combine, permute, permuteTotal, combineTotal } from '@/algorithm/permute_combine/index';

describe('排列算法', () => {
  test('校验全排列个数', () => {
    const arr = [1, 2, 3, 4, 5];
    const result = permute(arr);
    const total = permuteTotal(arr);
    expect(result.length).toBe(total);
    const arr2 = [1, 2, 3, 4, 5, 6, 7];
    const result2 = permute(arr2);
    const total2 = permuteTotal(arr2);
    expect(result2.length).toBe(total2);
  });
  test('校验抓取任意个数排列的个数', () => {
    const arr = [1, 2, 3, 4, 5, 6, 7];
    const result = permute(arr, 3);
    const total = permuteTotal(arr, 3);
    expect(result.length).toBe(total);
  });
});

describe('组合算法', () => {
  test('全组合', () => {
    const arr = ['YY', 'MM', 'DD'];
    const result = combine(arr);
    const total = combineTotal(arr);
    expect(result.length).toBe(7);
  });
  test('选取2个数的所有组合', () => {
    const arr = ['YY', 'MM', 'DD'];
    const result = combine(arr, 2);
    expect(result.length).toBe(3);
  });
});
