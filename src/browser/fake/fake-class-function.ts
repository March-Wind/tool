import { isFunction } from '@/javascript-language/variable-type';

type Keys = keyof Window;
interface DDD {
  new (): XMLHttpRequest;
  prototype: XMLHttpRequest;
  readonly DONE: number;
  readonly HEADERS_RECEIVED: number;
  readonly LOADING: number;
  readonly OPENED: number;
  readonly UNSENT: number;
}

/**
 * 伪装window上的class，方便对内置对象增加hooks，或者拓展对象。
 * @param {Constructable<any>} variable
 */
const fakeClassFunction = (variable: Constructable<any>) => {
  if (!isFunction(variable) || !variable.prototype) {
    // 非函数和箭头函数
    throw new Error('fakeClassFunction： 入参不合法！');
  }
  // to do 使用eval的返回来制造动态名字，
  // eg: const a = eval(`(function(){return 1})()`)// a = 1
  // eg: const a1 = eval(`(function(){return function A(){return 1}})()`)  得到ƒ A(){return 1}
  class Constructor {
    constructor(parameters) {
      const backup = variable;
      this.instance = new backup();
    }
  }
  // 挂载原型链
  Object.setPrototypeOf(Constructor, Object.getPrototypeOf(variable));
  // 挂载静态方法和属性
  Object.entries(variable).forEach((item: [string, any]) => {
    const [name, value] = item;
    Constructor[name] = value;
  });

  //1. 静态属性和方法挂载
  Object.entries(variable).forEach((key) => {
    console.log(key);
  });

  return constructor as T;
};

window.XMLHttpRequest = fakeClassFunction<DDD>(XMLHttpRequest);
