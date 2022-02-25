type TemObject = Object & {
  __magic__: any;
};
/**
 * 创建多平台通用顶层对象globalThis
 * 符合javascript草案
 * 浏览器: window 或frames；
 * node: global
 * web worker: self
 *
 *
 */
function unifiedGlobalObject() {
  if (typeof globalThis === 'object') return;
  Object.defineProperty(Object.prototype, '__magic__', {
    get: function () {
      return this;
    },
    configurable: true, // This makes it possible to `delete` the getter later.
  });
  (Object as unknown as TemObject).__magic__.globalThis = (Object as unknown as TemObject).__magic__; // lolwat
  delete (Object.prototype as unknown as TemObject).__magic__;
}

export default unifiedGlobalObject;

// 参考： https://github.com/tc39/proposal-global
// 参考：https://mathiasbynens.be/notes/globalthis#robust-polyfill
