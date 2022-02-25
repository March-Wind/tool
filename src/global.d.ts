import 'jest-extended';
declare global {
  // window上挂载
  declare interface Window {}
  // node上挂载
  namespace NodeJS {
    interface Global {}
  }
  type Writeable<T extends { [x: string]: any }> = {
    -readonly [P in keyof T]: T[P];
  };
  interface Constructable<T> {
    new (...args: any): T;
  }
}
