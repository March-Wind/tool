/**
 * 以,为间隔的集合,输入框场景的格式化
 *
 * @param {string} [value='']
 * @return {*}
 */
const formatInputValue = (value = '') => {
  // 将空白字符转化为,
  let newValue = value.replace(/\s/g, ',');
  // 中文，转为英文,
  newValue = newValue.replace(/，/g, ',');
  // 多个连续的,合并成一个,
  newValue = newValue.replace(/,+/gm, ',');
  // 去掉开头,
  newValue = newValue.replace(/^,/, '');
  // 去掉结尾,
  newValue = newValue.replace(/,$/, '');

  return newValue;
}
export default formatInputValue;
