/**
 * css 画三角形给长宽和底部是哪个方向，给出样式
 * @param {*} width
 * @param {*} height
 * @param {string} [bottomType='bottom'] 底部位置
 * 参考：https://cxyzjd.com/article/weixin_39760068/112410543
 */
const createArrow = (width: number, height: number, bottomType: 'bottom' | 'top' | 'left' | 'right' = 'bottom', color = '#000') => {
  // 以底部是下为例，高度值放在下，左右值是宽度的一半
  const top = 0;
  const left = width / 2;
  const right = width / 2;
  const bottom = height;
  const style = {
    width: 0,
    height: 0,
    borderWidth: `${top}rem ${right}rem ${bottom}rem ${left}rem`,
    borderStyle: 'solid',
    borderColor: `transparent transparent ${color} transparent`
  }
  if (bottomType === 'left') {
    style.borderWidth = `${right}rem ${top}rem ${left}rem ${bottom}rem`;
    style.borderColor = `transparent transparent transparent ${color} `;
  }
  if (bottomType === 'right') {
    style.borderWidth = `${right}rem ${bottom}rem ${left}rem ${top}rem`;
    style.borderColor = `transparent  ${color} transparent transparent `;
  }
  if (bottomType === 'top') {
    style.borderWidth = `${bottom}rem ${right}rem ${bottom}rem ${left}rem`;
    style.borderColor = `${color} transparent transparent transparent `;
  }
  return style;
}
export { createArrow };
