type IEElement = Element & {
  currentStyle: Record<string, any>;
};

/**
 * 获取样式值包括内联和外联
 * @date 2022-03-03
 * @param {any} dom:Element
 * @param {any} key:string
 * @returns {any}
 */
const getCSSValue = (dom: Element, key: keyof CSSStyleDeclaration) => {
  if (window.getComputedStyle) {
    const style = window.getComputedStyle(dom, null);
    return style[key as keyof CSSStyleDeclaration];
  } else {
    return (dom as IEElement).currentStyle[key];
  }
};

export default getCSSValue;
