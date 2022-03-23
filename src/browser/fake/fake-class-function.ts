/*
 * @Author: Mach-Wind
 * @Date: 2022-03-01 11:26:25
 * @Last Modified by: Mach-Wind
 * @Last Modified time: 2022-03-03 10:45:25
 */

import { isFunction } from '@/javascript-language/variable-type';
import { abort } from 'process';
type prototypeC<T> = {
  [K in WritableKeys<T>]?: T[K];
};

/**
 * 伪装内置构造函数，对原生对象增加hooks或者拓展对象
 * @date 2022-03-01
 * @param {any} variable:T
 * @param {any} hooks:prototypeC<C>
 * @returns {any}
 */
const fakeClassFunction = <T extends Constructable<T>, C extends Object>(variable: T, hooks: prototypeC<C>): T => {
  if (!isFunction(variable) || !variable.prototype) {
    // 非函数和箭头函数
    throw new Error('fakeClassFunction： 入参不合法！');
  }
  const backup = new variable();
  // to do 使用eval的返回来制造动态名字，
  // eg: const a = eval(`(function(){return 1})()`)// a = 1
  // eg: const a1 = eval(`(function(){return function A(){return 1}})()`)  得到ƒ A(){return 1}
  class MyConstructor {
    backup: Object;
    constructor() {
      this.backup = backup;
    }
  }
  const obj = new MyConstructor();
  // 挂载原型链
  Object.setPrototypeOf(obj, Object.getPrototypeOf(backup));
  // 挂载静态方法和属性
  Object.entries(variable).forEach((item: [keyof T, any]) => {
    const [name, value] = item;
    (MyConstructor as T)[name] = value;
  });

  return MyConstructor as T;
};
fakeClassFunction<typeof XMLHttpRequest, XMLHttpRequest>(XMLHttpRequest, {
  abort: () => {
    console.log(111);
  },
});
export default fakeClassFunction;
