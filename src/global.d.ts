import 'jest-extended';
import { Interface } from 'readline';
import WX from './wx/typing/jweixin'
declare global {
  declare const wx: WX;
  // window上挂载
  declare interface Window {
    wx: WX;
  }
  // node上挂载
  namespace NodeJS {
    interface Global { }
  }
  type ValueOf<T> = T[keyof T];
  type NonArrayObject = object & { length?: never;[x: string]: any };
  type Writeable<T extends { [x: string]: any }> = {
    -readonly [P in keyof T]: T[P];
  };
  type IfEquals<X, Y, A = X, B = never> = (<T>() => T extends X ? 1 : 2) extends <T>() => T extends Y ? 1 : 2 ? A : B;

  type WritableKeys<T> = {
    [P in keyof T]-?: IfEquals<{ [Q in P]: T[P] }, { -readonly [Q in P]: T[P] }, P>;
  }[keyof T];

  // 读取只读的key
  type ReadonlyKeys<T> = {
    [P in keyof T]-?: IfEquals<{ [Q in P]: T[P] }, { -readonly [Q in P]: T[P] }, never, P>;
  }[keyof T];

  // 设置getter
  type Getters<T> = {
    [K in keyof T as `get${Capitalize<string & K>}`]: () => T[K];
  };

  /**两种表达构造函数形式-start */
  interface Constructable<T> {
    [k: string]: any;
    new(): any;
    prototype?: any;
  }
  type Constructor<T> = new (...args: any) => T;
  /**两种表达构造函数形式-end */

  interface Con<T> {
    // constructor: () => any;
    // prototype?: any;
    prototype: T;
    new(): T;
  }
}
