/*
 * @Author: Mach-Wind
 * @Date: 2022-03-01 11:26:25
 * @Last Modified by: Mach-Wind
 * @Last Modified time: 2022-04-21 16:06:35
 */

import { isFunction } from '@/javascript-language/variable-type';



type PrototypeC<T> = {
  [K in WritableKeys<T>]?: T[K];
};
const a: PrototypeC<XMLHttpRequest> = {
  open: () => {
    console.log(1111);
  }
}
// const fakeClassFunction = <T extends Constructable<T>, C extends Object>(constructor: T, hooks: PrototypeC<C>): T => {
/**
 *
 * 伪装内置构造函数，对原生对象增加hooks或者拓展对象
 * @template C
 * @template P
 * @param {C} constructor
 * @param {PrototypeC<P>} hooks
 * @return {*}  {C}
 */
const fakeClassFunction = <C extends Constructable<C>>(constructor: C, hooks: PrototypeC<new () => C>): C => {
  if (!isFunction(constructor) || !constructor.prototype) {
    // 非函数和箭头函数
    throw new Error('fakeClassFunction： 入参不合法！');
  }
  const cName = constructor.name;


  const _class = new Function(`
    return class _${cName} {
      constructor() {
        this.nativeObj = new ${cName}();
      }
    }
  `)();
  // _${cName}.prototype = this.nativeObj;

  // const newObj = new _class();
  // to do 使用eval的返回来制造动态名字，
  // eg: const a = eval(`(function(){return 1})()`)// a = 1
  // eg: const a1 = eval(`(function(){return function A(){return 1}})()`)  得到ƒ A(){return 1}
  class Fake {
    nativeObj: any = null;
    constructor() {
      this.nativeObj = new constructor();
      for (const attr in hooks) {
        // if (hooks.hasOwnProperty(attr)) {
        Object.defineProperty(this, attr, {
          get: function () { console.log(attr); return (...args: any[]) => { console.log(this); debugger; this.nativeObj[attr](...args) } },
          // set: setterFactory(attr),
          enumerable: true
        })
        // }
      }
    }
  }
  Object.setPrototypeOf(Fake.prototype, new constructor())
  Object.setPrototypeOf(Fake.prototype, new constructor())
  // // 挂载静态方法和属性
  // Object.entries(constructor).forEach((item: [keyof C, any]) => {
  //   const [name, value] = item;
  //   (_class as C)[name] = value;
  // });
  return Fake as C;
};
export default fakeClassFunction;
