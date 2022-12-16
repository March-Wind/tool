/**
 * 检查是否有重复的元素，并返回
 *
 * @param {string[]} values
 * @return {*}
 */
const checkRepeat = (values: string[]) => {
  const obj: Record<string, any> = {};
  const repeat: string[] = [];
  values.forEach((key) => {
    const flag = Object.prototype.hasOwnProperty.call(obj, key);
    if (!flag) {
      obj[key] = 1;
    } else {
      repeat.push(key);
    }
  });
  return repeat;
};

export default checkRepeat;
