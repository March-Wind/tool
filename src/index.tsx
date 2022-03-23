import './initialize';
import { copypasteboard } from './tools/business-function/copypasteboard';
import React from 'react';
import ReactDOM from 'react-dom';
import RouterEvent from './browser/routeEvents';
import { proxy, unProxy } from 'ajax-hook';
import createArrow from './browser/css-caculate-value/arrow';
// import Monitoring from './security-monitoring';
import fakeClassFunction from './browser/fake/fake-class-function';
// fakeClassFunction(XMLHttpRequest)
import expose from '@/browser/DOM/event/DOM-expose';

/**
 * 加法
 * @param num1
 * @param num2
 * @returns
 */
const sum = (num1: number, num2: number) => {
  return num1 + num2;
};
// test
// if (true) {
//   console.log(111);
// } else {
//   console.log(2222);
// }
export { sum };
console.log(11112);
const App = () => {
  const onclick = () => copypasteboard('nihao');
  const arr = [...'q23421421421412412423423'];
  return (
    <>
      {arr.map((item, index) => {
        return (
          <div
            style={index === 10 ? { color: 'red', height: 100 } : { height: 100 }}
            key={item}
            ref={(node) => {
              if (node && index === 10) {
                expose(node, () => {
                  console.log(index);
                });
              }
            }}
            onClick={onclick}
          >
            copy
          </div>
        );
      })}
    </>
  );
};
ReactDOM.render(<App />, document.getElementById('app'));

// listender List API
//
const route = new RouterEvent();
route.on('pushState', (data, title, url) => {
  console.log('pushState event', data, title, url);
});
route.on('backButton', () => {
  console.log('Click the browser Back buttonbrowser back button');
});

// new Monitoring();

proxy({
  //请求发起前进入
  onRequest: (config, handler) => {
    console.log(config.url);
    handler.next(config);
  },
  //请求发生错误时进入，比如超时；注意，不包括http状态码错误，如404仍然会认为请求成功
  onError: (err, handler) => {
    console.log(err.type);
    handler.next(err);
  },
  //请求成功后进入
  onResponse: (response, handler) => {
    console.log(response.response);
    handler.next(response);
  },
});
// function test(url:string) {
//   const events = ['load', 'loadend', 'timeout', 'error', 'readystatechange', 'abort']
//   debugger
//   const xhr = new XMLHttpRequest();
//   events.forEach(function (e) {

//     // eslint-disable-next-line @typescript-eslint/ban-ts-comment
//     // @ts-ignore
//     xhr['on' + e] = function (event:any) {
//       console.log('on' + e, xhr.readyState, event)
//     }
//     xhr.addEventListener(e, function (event) {
//       console.log(e, xhr.readyState, event)
//     })
//   });
//   xhr.addEventListener('load', function (event:any) {
//     console.log('response', xhr.response, event)
//   })
//   //setTimeout(()=>xhr.abort(),100)
//   xhr.open('get', url);
//   xhr.send();

// }
// test('http:www.baidu.com')
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
console.log(createArrow(0.2, 0.16));
