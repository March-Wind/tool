const handleStateChange = function (callback) {
  return function (...args) {
    callback.apply(window.history, args);
    return true;
  };
};
const handleHashCallback = function (hashChangeEvent) {};
const handlePopStateCallback = function (event) {};
var exit = function () {
  window.removeEventListener("hashchange", handleHashCallback);
  window.removeEventListener("beforeunload", exit);
};
const routerObserver = function (options) {
  if (options === void 0) {
    options = { type: "browser" };
  }
  if (options.type === "hash") {
    window.addEventListener("hashchange", handleHashCallback);
  } else {
    const _a = window.history,
      pushState = _a.pushState,
      replaceState = _a.replaceState;
    window.history.pushState = handleStateChange(pushState);
    window.history.replaceState = handleStateChange(replaceState);
    window.addEventListener("popstate", handlePopStateCallback);
  }
  window.addEventListener("beforeunload", exit);
  return {
    onChange: function (callback) {
      routerEventEmitter.on("routerChange", callback);
    },
    destory: function () {
      routerEventEmitter.removeAllListeners();
      window.removeEventListener("hashchange", handleHashCallback);
      window.removeEventListener("beforeunload", exit);
    },
  };
};
