/**
 * 创建多平台通用顶层对象globalThis
 * 浏览器: window 或frames；
 * node: global
 * web worker: self
 *
 *
 */
(function () {
  if (typeof globalThis === 'object') return;
  Object.defineProperty(Object.prototype, '__magic__', {
    get: function () {
      return this;
    },
    configurable: true // This makes it possible to `delete` the getter later.
  });
  __magic__.globalThis = __magic__; // lolwat
  delete Object.prototype.__magic__;
}());



window.a = 1;
