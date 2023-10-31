// import  from './routeEvents'

// class Lifecycle {


// }


// export default Lifecycle


// const handleStateChange = function (callback) {
//   return function (...args) {
//     callback.apply(window.history, args);
//     return true;
//   };
// };
// const handleHashCallback = function (hashChangeEvent) { };
// const handlePopStateCallback = function (event) { };
// var exit = function () {
//   window.removeEventListener("hashchange", handleHashCallback);
//   window.removeEventListener("beforeunload", exit);
// };
// const routerObserver = function (options) {
//   if (options === void 0) {
//     options = { type: "browser" };
//   }
//   if (options.type === "hash") {
//     window.addEventListener("hashchange", handleHashCallback);
//   } else {
//     const _a = window.history,
//       pushState = _a.pushState,
//       replaceState = _a.replaceState;
//     window.history.pushState = handleStateChange(pushState);
//     window.history.replaceState = handleStateChange(replaceState);
//     window.addEventListener("popstate", handlePopStateCallback);
//   }
//   window.addEventListener("beforeunload", exit);
//   return {
//     onChange: function (callback) {
//       routerEventEmitter.on("routerChange", callback);
//     },
//     destory: function () {
//       routerEventEmitter.removeAllListeners();
//       window.removeEventListener("hashchange", handleHashCallback);
//       window.removeEventListener("beforeunload", exit);
//     },
//   };
// };

// // type Parameters<T extends (...args: any) => any> = T extends (...args: infer P) => any ? P : never;




// /**
//  * 
//  * 
//  * 
//  * 0. W3C： https://wicg.github.io/page-lifecycle/
//  * 1. chrome: https://developers.google.com/web/updates/2018/07/page-lifecycle-api
//  * 2. google: https://docs.google.com/document/d/1UuS6ff4Fd4igZgL50LDS8MeROVrOfkN13RbiP2nTT9I/edit#
//  * 3. developers.google: https://developers.google.com/web/updates/2018/07/page-lifecycle-api
//  * 
//  */