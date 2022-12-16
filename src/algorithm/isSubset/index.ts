/**
 * 第二个参数数组是不是第一个数组的子集,数组元素可以是重复的
 *
 * @param {string[]} set1
 * @param {string[]} set2
 * @return {*}
 */
const isSubset = (set1: string[], set2: string[]) => {
  if (!Array.isArray(set1) || !Array.isArray(set2)) {
    throw new Error('isSubset:入参错误');
  }
  const value1 = set1.filter((item) => !!item);
  const value2 = set2.filter((item) => !!item);
  if (!value2 || value2.length === 0) {
    return true;
  }
  // if (value1.length < value2.length) { // 默认是有重复元素，所以注释
  //   return false;
  // }
  const obj: any = {};
  for (let i = 0; i < value1.length; i++) {
    const key1 = value1[i];
    const key2 = value2[i];

    obj[key1] = 1;
    if (i < value2.length) {
      obj[key2] = 1;
    }
  }
  if (Object.keys(obj).length <= value1.length) {
    // 说明有重复的元素
    return true;
  } else {
    return false;
  }
};

export default isSubset;
