/*
 * @Author: Mach-Wind
 * @Date: 2022-03-01 11:26:25
 * @Last Modified by: Mach-Wind
 * @Last Modified time: 2022-06-14 18:51:21
 */

import { isFunction } from '@/javascript-language/variable-type';
import { send } from 'process';


type PrototypeC<T> = {
  [K in WritableKeys<T>]?: T[K];
};
const a: PrototypeC<XMLHttpRequest> = {
  open: () => {
    console.log(1111);
  },
  send: () => { console.log(222) },
  // onreadystatechange: () => {

  // }
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

// const fakeClassFunction = <C>(constructor: Constructable<C>, hooks: PrototypeC<C>): C => { // 能够约束传入hooks,但是必须传入类型
const fakeClassFunction = <C>(constructor: Constructor<C>, hooks: PrototypeC<C>): C => { // 能够约束传入hooks
  if (!isFunction(constructor) || !constructor.prototype) {
    // 非函数和箭头函数
    throw new Error('fakeClassFunction： 入参不合法！');
  }
  console.log(hooks)
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
    private nativeObj: any = null;
    public constructor() {
      this.nativeObj = new constructor();
      const _this = this;

      const getterFactory = function (attr: string) {
        return function () {
          // const v = Object.prototype.hasOwnProperty.call(_this, transformKey) ? _this[transformKey as keyof Fake] : ;
          // return v;
          return (...args: any[]) => _this.nativeObj[attr](...args)
          // const attrGetterHook = (proxy[attr] || {})["getter"];
          // return attrGetterHook && attrGetterHook(v, this) || v;
        };
      }
      for (const attr in this.nativeObj) {
        // if (hooks.hasOwnProperty(attr)) {
        Object.defineProperty(this, attr, {
          get: getterFactory(attr),
          // set: setterFactory(attr),
          enumerable: true
        })
        // }
      }
    }
  }
  // 挂载静态方法和属性
  Object.entries(constructor).forEach((item) => {
    const [name, value] = item;
    (_class as C)[name as keyof C] = value;
  });
  return Fake as unknown as C;
};
export default fakeClassFunction;
