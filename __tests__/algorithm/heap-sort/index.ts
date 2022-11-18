import heapSort from '@/algorithm/heap-sort';

describe('堆排序', () => {
  test('正常测试', () => {
    const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    const result = heapSort(arr);
    expect(result).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9]);
  });
});
