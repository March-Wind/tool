/**
 * 判断是否是数组
 * @param v
 * @return {boolean}
 * @constructor
 */
export const isArray = function (v: any): v is Array<any> {
  return Object.prototype.toString.call(v) === '[object Array]';
};
/**
 * 判断是否是布尔值
 * @param v
 * @return {boolean}
 * @constructor
 */
export const isBoolean = function (v: any): v is boolean {
  return typeof v === 'boolean';
};
/**
 * 判断是否是日期
 * @param v
 * @return {boolean}
 * @constructor
 */
export const isDate = function (v: any): v is Date {
  return Object.prototype.toString.call(v) === '[object Date]';
};
/**
 * 判断是否是方法
 * @param v
 * @return {boolean}
 * @constructor
 */
export const isFunction = function (v: any): v is Function {
  return Object.prototype.toString.call(v) === '[object Function]';
};
/**
 * 判断是否是数字,自行判断NaN
 * @param v
 * @return {boolean|*}
 * @constructor
 */
export const isNumber = function (v: any): v is number {
  return typeof v === 'number';
};
/**
 * 判断是否是对象
 * @param v
 * @return {boolean}
 * @constructor
 */
interface anyObj extends Object {
  [x: string]: any;
}
export const isObject = function (v: any): v is anyObj {
  return Object.prototype.toString.call(v) === '[object Object]';
};
/**
 * 判断是否是字符串
 * @param v
 * @return {boolean}
 * @constructor
 */
export const isString = function (v: any): v is string {
  return typeof v === 'string';
};

export const isEqual = () => {
  return false;
}; // to do
