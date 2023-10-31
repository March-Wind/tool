


import './initialize';
export * from '@/algorithm';
export * from '@/browser';
export * from './business-function';


// import WX from '@/wx/index'
// (async function () {

// })()
console.log(122341234);
// import { copypasteboard } from '@/business-function/copypasteboard'
import './test.react'
// import './index.less'
// import { copypasteboard } from './business-function/copypasteboard';
// copypasteboard('121312')
// console.log();
// import RouterEvent from './browser/routeEvents';
// import createArrow from './browser/css-caculate-value/arrow';
// // import Monitoring from './security-monitoring';
// import './test'

// 伪装原生对象
// import fakeClassFunction from './javascript-language/extended-native-function/fake/fake-class-function';
// // debugger
// const a = fakeClassFunction<XMLHttpRequest>(XMLHttpRequest, { open: () => { console.log('我是open') } })
// // a.open2('', '')
// //T14 = number
// type T14 = string | number extends string ? string : number;
// //T15 =string | number
// type T15<T> = T extends string ? string : number;
// let T16: T15<string | number>;


// const a = new A();
// console.log(a);
// console.log(a.open("GET", 'http://www.baidu.com'));
// a.send(null);
// debugger

// import expose from '@/browser/DOM/event/DOM-expose';
// import { base64decode, base64encode } from '@/encode-decode/base64'
// import { UnicodeEncode, UnicodeDecode } from '@/encode-decode/Unicode'
// /**
//  * 加法
//  * @param num1
//  * @param num2
//  * @returns
//  */
// const sum = (num1: number, num2: number) => {
//   return num1 + num2;
// };
// test
// if (true) {
//   console.log(111);
// } else {
//   console.log(2222);
// }
// export { sum };
// console.log(11112);
// const App = () => {
//   const onclick = () => copypasteboard('nihao');
//   const arr = [...'q23421421421412412423423'];
//   const str = UnicodeEncode('𐐷');
//   console.log(str)
//   const str2 = UnicodeDecode(str);
//   console.log(str2);
//   return (
//     <>
//       {arr.map((item, index) => {
//         return (
//           <div
//             style={index === 10 ? { color: 'red', height: 100 } : { height: 100 }}
//             key={item}
//             ref={(node) => {
//               if (node && index === 10) {
//                 expose(node, () => {
//                   console.log(index);
//                 });
//               }
//             }}
//             onClick={onclick}
//           >
//             copy {str2}
//           </div>
//         );
//       })}
//     </>
//   );
// };
// ReactDOM.render(<App />, document.getElementById('app'));

// // listender List API
// //
// const route = new RouterEvent();
// route.on('pushState', (data, title, url) => {
//   console.log('pushState event', data, title, url);
// });
// route.on('backButton', () => {
//   console.log('Click the browser Back buttonbrowser back button');
// });

// // new Monitoring();
// debugger



// const getNUmber = () => {
//   return new Promise((resolve) => {
//     setTimeout(() => {
//       resolve(9);
//     }, 100);
//   });
// };
// // const number = await getNUmber();
// const fn = async () => {
//   const number = await getNUmber();
//   return number;
// };
// console.log(fn());
// console.log(createArrow(0.2, 0.16));

// div.innerHTML = str2;
// document.body.append(div)



// const limit = 5;
// const ongoingStack: Promise<unknown>[] = [];
// const preparsedStock: any[] = [];
// const polling = () => {
//   Promise.race(ongoingStack).then((res) => {
//     debugger
//   }).catch((err) => {
//     debugger

//   }).finally(() => {
//     const toOngoing = preparsedStock.shift();
//     if (toOngoing) {
//       ongoingStack.push(toOngoing());
//       polling();
//     }
//   })
// }
// // 嵌套的，形式如下
// const wrapConcur = (fn: any) => {
//   return (params: any, ms = 1000) => {
//     return new Promise((resolve, reject) => {
//       if (ongoingStack.length < limit) {
//         ongoingStack.push(fn(params, ms).then(
//           (res: any) => { resolve(res) },
//           (err: any) => { reject(err) }))
//         polling();
//       } else {
//         const wrapFn = () => {
//           return fn(params, ms).then(
//             (res: any) => { resolve(res) },
//             (err: any) => { reject(err) })
//         }
//         preparsedStock.push(wrapFn)
//       }
//     })
//   }
// }


// const fakeFetch = (params: any, ms = 1000) => {
//   // console.log(params)
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       resolve(params)
//     }, ms)
//   })
// }
// const fakeFetch2 = (params: any, ms = 1000) => {
//   // console.log(params)
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       reject(params)
//     }, ms)
//   })
// }
// // const fetchAPI = wrapConcur(fetch);
// const fetchAPI = wrapConcur(fakeFetch);
// const fetchAPI2 = wrapConcur(fakeFetch2);
// const fetchApi1 = () => {
//   console.log(1);
//   return fetchAPI("https://www.baidu.com/1", 1000);
// }

// const fetchApi2 = () => {
//   console.log(2);
//   return fetchAPI2("https://www.baidu.com/2", 1200);
// }
// const fetchApi3 = () => {
//   console.log(3);
//   return fetchAPI("https://www.baidu.com/3", 1300);
// }
// const fetchApi4 = () => {
//   console.log(4);
//   return fetchAPI("https://www.baidu.com/4", 1400);
// }
// const fetchApi5 = () => {
//   console.log(5);
//   return fetchAPI("https://www.baidu.com/5", 1500);
// }
// const fetchApi6 = () => {
//   console.log(6);
//   return fetchAPI("https://www.baidu.com/6", 1600);
// }
// fetchApi1().then((res) => {
//   console.log(res)
// }).catch((err) => {
//   console.log(err)
// })
// fetchApi2().then((res) => {
//   console.log(res)
// }).catch((err) => {
//   console.log(err)
// })
// fetchApi3().then((res) => {
//   console.log(res)
// }).catch((err) => {
//   console.log(err)
// })
// fetchApi4().then((res) => {
//   console.log(res)
// }).catch((err) => {
//   console.log(err)
// })
// fetchApi5().then((res) => {
//   console.log(res)
// }).catch((err) => {
//   console.log(err)
// })
// fetchApi6().then((res) => {
//   console.log(res)
// }).catch((err) => {
//   console.log(err)
// })
console.log(1111);
