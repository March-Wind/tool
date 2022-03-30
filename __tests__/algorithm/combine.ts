import combine from '@/algorithm/combine';
describe('组合算法', () => {
  test('所有组合', () => {
    const arr = ['YY', 'MM', 'DD'];
    const result = combine(arr);
    expect(result.length).toBe(7);
  });
  test('选取2个数的所有组合', () => {
    const arr = ['YY', 'MM', 'DD'];
    const result = combine(arr, 2);
    expect(result.length).toBe(3);
  });
});
