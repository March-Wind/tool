#!/usr/bin/env -S ts-node --files
// import { proxy, hook } from 'ajax-hook';
// proxy({
//   //请求发起前进入
//   onRequest: (config, handler) => {
//     debugger
//     console.log(config.url);
//     handler.next(config);
//   },
//   //请求发生错误时进入，比如超时；注意，不包括http状态码错误，如404仍然会认为请求成功
//   onError: (err, handler) => {
//     console.log(err.type);
//     handler.next(err);
//   },
//   //请求成功后进入
//   onResponse: (response, handler) => {
//     console.log(response.response);
//     handler.next(response);
//   },
// });
// hook({
//   onreadystatechange: function (xhr) {
//     console.log("onreadystatechange called: %O", xhr);
//   },
//   onload: function (xhr) {
//     console.log("onload called: %O", xhr);
//     // xhr.getProxy().responseText='xhr.responseText'
//     this.responseText = "hookAjax" + xhr.responseText;
//   },
//   open: function (arg, xhr) {
//     console.log("open called: method:%s,url:%s,async:%s", arg[0], arg[1], arg[2], xhr);
//     //add tag
//     arg[1] += "?hook_tag=1";
//   },
//   send: function (arg, xhr) {
//     console.log("send called: %O", arg[0]);
//     xhr.setRequestHeader("_custom_header_", "ajaxhook");
//   },
//   setRequestHeader: function (args) {
//     console.log("setRequestHeader called!", args);
//   }
// })
// function test(url: string) {
//   const events = ['load', 'loadend', 'timeout', 'error', 'readystatechange', 'abort']
//   debugger
//   const xhr = new XMLHttpRequest();
//   // events.forEach(function (e) {

//   //   // eslint-disable-next-line @typescript-eslint/ban-ts-comment
//   //   // @ts-ignore
//   //   xhr['on' + e] = function (event: any) {
//   //     console.log('on' + e, xhr.readyState, event)
//   //   }
//   //   xhr.addEventListener(e, function (event) {
//   //     console.log(e, xhr.readyState, event)
//   //   })
//   // });
//   // xhr.addEventListener('load', function (event: any) {
//   //   console.log('response', xhr.response, event)
//   // })
//   //setTimeout(()=>xhr.abort(),100)
//   xhr.open('get', url);
//   xhr.send();

// }
// test('http:www.baidu.com')

// import Concurrency from "@/javascript-language/promise/concurrency.js"
import Concurrency from './javascript-language/promise/concurrency';
(async function () {
  const p1 = (params: any, ms = 1000) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(params);
      }, ms);
    });
  };
  const result: any[] = [];
  const concur = new Concurrency();
  // const fp1 = jest.fn(p1)
  const fakeP1 = concur.monitoringFn(p1);

  const fetchApi1 = () => {
    return fakeP1('https://www.baidu.com/1', 1);
  };
  const fetchApi2 = () => {
    return fakeP1('https://www.baidu.com/2', 1000);
  };
  const fetchApi3 = () => {
    return fakeP1('https://www.baidu.com/3', 900);
  };
  const fetchApi4 = () => {
    return fakeP1('https://www.baidu.com/4', 1200);
  };
  const fetchApi5 = () => {
    return fakeP1('https://www.baidu.com/5', 1500);
  };
  const fetchApi6 = () => {
    return fakeP1('https://www.baidu.com/6', 1);
  };
  const fa1 = fetchApi1();
  const fa2 = fetchApi2();
  const fa3 = fetchApi3();
  const fa4 = fetchApi4();
  const fa5 = fetchApi5();
  const fa6 = fetchApi6();
  fa1
    .then((res) => {
      result.push(res);
    })
    .catch((err) => {
      result.push(err);
    });
  fa2
    .then((res) => {
      result.push(res);
    })
    .catch((err) => {
      result.push(err);
    });
  fa3
    .then((res) => {
      result.push(res);
    })
    .catch((err) => {
      result.push(err);
    });
  fa4
    .then((res) => {
      result.push(res);
    })
    .catch((err) => {
      result.push(err);
    });
  fa5
    .then((res) => {
      result.push(res);
    })
    .catch((err) => {
      result.push(err);
    });
  fa6
    .then((res) => {
      result.push(res);
    })
    .catch((err) => {
      result.push(err);
    });

  await Promise.all([fa1, fa2, fa3, fa4, fa5, fa6]);
  console.log(result);
})();
