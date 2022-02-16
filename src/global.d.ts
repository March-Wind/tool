import 'jest-extended';
declare global {
  declare interface Window {
  }
  type Writeable<T extends { [x: string]: any }> = {
    -readonly [P in keyof T]: T[P];
  }
  interface Constructable<T> {
    new(...args: any): T;
  }
}
