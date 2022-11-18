import { isNumber } from '@/javascript-language/variable-type';

/**
 * 数组交换位置
 *
 * @param {any[]} arr
 * @param {number} i
 * @param {number} j
 * @param {boolean} [updateSelf=false]
 * @return {*}
 */
const swap = (arr: any[], i: number, j: number, updateSelf = false) => {
  const _arr = updateSelf ? arr : [...arr];
  const temp = _arr[i];
  _arr[i] = _arr[j];
  _arr[j] = temp;
  return _arr;
};

/**
 * 单元堆最大调整，返回boolean标识是否调整, 更改原素组
 * 传入父节点，自动推测出来子节点，然后进行调整
 *
 * @param {number[]} target 数组
 * @param {number} parentIndex 父节点的索引
 * @param {number} [end] 交换的范围
 * @return {*}  {boolean}
 */
const unitMaxHeapify = (target: number[], parentIndex: number, end: number = target.length - 1): false | number => {
  if (parentIndex < 0) {
    return false;
  }
  const leftChild = parentIndex * 2 + 1;
  const rightChild = parentIndex * 2 + 2;
  let maxIndex: number | undefined;
  if (leftChild <= end) {
    // 检测左节点是否是堆调整范围内
    maxIndex = leftChild;
  }
  if (rightChild <= end && target[leftChild] < target[rightChild]) {
    //检测右节点是否在范围内，并和左节点比较
    maxIndex = rightChild;
  }
  // 如果左右子节点都不在调整范围内，那么结束该调整
  if (maxIndex === undefined) {
    return false;
  }
  if (target[parentIndex] < target[maxIndex]) {
    swap(target, parentIndex, maxIndex, true);
    return maxIndex;
  }
  return false;
};

/**
 * 向下筛选 ，最大堆，得到index=0是最大值
 * 更改原数组
 *
 * @param {number[]} source
 * @param {number} parentIndex
 * @param {number} end
 */
const siftDwon = (source: number[], parentIndex: number, end: number = source.length - 1) => {
  // 从最后一个非子叶节点，也就是最后一个父节点，开始进行最大堆调整,
  // 如果有调整就继续向上进行单元堆最大调整
  let flag = true;
  let _parentIndex = parentIndex;
  while (flag) {
    const result = unitMaxHeapify(source, _parentIndex, end);
    if (isNumber(result)) {
      _parentIndex = result;
      flag = true;
    } else {
      flag = false;
    }
  }
};

const heapSort = (source: number[]) => {
  const arr = [...source];
  const len = arr.length;
  // 最大堆构建，每个遍历到的节点作为父节点，向下筛选，进行最小单元堆调整, 将最大值放在父节点上，这样得到每个单元堆都是最大堆，被交换的子节点索引为父节点继续向下调整，以确保小的值在子节点中也是最大值
  // 遍历完成后得到第index=0是最大值
  const lastParentIndex = Math.floor(len / 2 - 1);
  for (let i = lastParentIndex; i >= 0; i--) {
    siftDwon(arr, i);
  }
  // 排序，进行n次最向下筛选, 由于i>0的位置都排序完成的话，i自然是最小值，不用和自己交换，所以不用遍历
  // 每一次都从最顶层开始向下筛选。
  // 遍历的过程，把最大的值都会排在后面，是想要得到的升序，
  for (let i = len - 1; i > 0; i--) {
    // 将最大值(index=0)和当前索引交换,然后从下一个值为终点范围开始向上帅选，也就保留下去了最大值
    swap(arr, 0, i, true);
    // 然后向上筛选
    const end = i - 1; // 调整范围的终点
    siftDwon(arr, 0, end);
  }
  return arr;
};

export default heapSort;
