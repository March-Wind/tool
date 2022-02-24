
// import Proxy_XMLHttpRequest from "./proxy_XMLHttpRequest";






// class Monitoring {
//   constructor() {
//     this.listenError();
//   }
//   listenError() {
//     //监控代码报错和资源报错
//     window.addEventListener("error", (event) => {
//       debugger
//     }, true)// 为捕获状态时（第三个参数为true）能捕获到js执行错误，也能捕获带有src的标签元素的加载错误。
//     // promise 错误
//     window.addEventListener("unhandledrejection", event => {
//       console.log(`error: ${event}`);
//     });

//     // XMLHttpRequest Error
//     const XMLHttpRequest_error = new Proxy_XMLHttpRequest();
//     XMLHttpRequest_error.on('api-error', (ev) => {
//       debugger
//     });
//     XMLHttpRequest_error.on('api-timeout', (ev) => {
//       debugger
//     })
//     XMLHttpRequest_error.on('api-abort', (ev) => {
//       debugger
//     })
//   }

// }
// export default Monitoring;
