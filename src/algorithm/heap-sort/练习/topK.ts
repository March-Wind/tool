/**
 * 数组中第k大的元素，力扣215
 */

const swap = (source: number[], i: number, j: number) => {
  const temp = source[i];
  source[i] = source[j];
  source[j] = temp;
};
const unitMaxHeapigy = (source: number[], parentIndex: number, end: number = source.length - 1) => {
  if (parentIndex < 0) {
    return false;
  }
  const leftChild = parentIndex * 2 + 1;
  const rightChild = parentIndex * 2 + 2;
  let maxValueIndex;
  if (leftChild <= end) {
    maxValueIndex = leftChild;
  }
  if (rightChild <= end && source[rightChild] > source[leftChild]) {
    maxValueIndex = rightChild;
  }
  if (!maxValueIndex) {
    return false;
  }
  if (source[parentIndex] < source[maxValueIndex]) {
    swap(source, parentIndex, maxValueIndex);
    return maxValueIndex;
  }
  return false;
};
const siftDwon = (source: number[], parentIndex: number, end: number = source.length - 1) => {
  let flag = true;
  let pI = parentIndex;
  while (flag) {
    const result = unitMaxHeapigy(source, pI, end);
    const type = Object.prototype.toString.call(result) as string;
    if (type.toLocaleLowerCase() === '[object number]') {
      pI = result as number;
      flag = true;
    }
    if (type.toLocaleLowerCase() === '[object boolean]') {
      flag = false;
    }
  }
};

function findKthLargest(nums: number[], k: number): number {
  // 构建最大堆
  const len = nums.length;
  const lastParentIndex = Math.floor(len / 2 - 1);
  for (let i = lastParentIndex; i >= 0; i--) {
    siftDwon(nums, i);
  }
  // 排序
  let i = len - 1;
  for (; i > len - 1 - k; i--) {
    // 保留最大值在最后一位
    swap(nums, 0, i);
    // 剩下的进行向下筛选，形成最大堆
    siftDwon(nums, 0, i - 1);
  }
  return nums[len - k];
}
export default findKthLargest;
