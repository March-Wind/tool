/**
 * 第二个参数数组是不是第一个参数数组的子集
 *
 * @param {string[]} arr1
 * @param {string[]} arr2
 * @return {*}
 */
const isSubset = (arr1: string[], arr2: string[]) => {
  if (!arr2 || arr2.length === 0) {
    return true;
  }
  if (arr1.length < arr2.length) {
    return false;
  }
  const obj: any = {};
  for (let i = 0; i < arr1.length; i++) {
    const key1 = arr1[i];
    const key2 = arr2[i];

    obj[key1] = 1;
    if (i < arr2.length) {
      obj[key2] = 1;
    }

  }
  if (Object.keys(obj).length === arr1.length) {
    return true;
  } else {
    return false;
  }
}

export default isSubset
