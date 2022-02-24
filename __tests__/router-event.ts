import { JSDOM } from 'jsdom'
import { resolve } from 'path/posix';
import RouterEvent from "../src/browser/routeEvents";

describe("router event", () => {
  let dom: JSDOM;
  let router: RouterEvent;
  beforeEach(() => {
    dom = new JSDOM(`<!DOCTYPE html><p>Hello world</p>`, {
      url: "http://www.baidu.com/",
      // referrer: "https://example.com/",
      contentType: "text/html",
      includeNodeLocations: true,
      storageQuota: 10000000,
      // MutationEvents: '2.0',
      // QuerySelector: false
    });
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    global.window = dom.window;
    router = new RouterEvent();
  });

  test('hashchange Event', (done) => {
    const router = new RouterEvent();
    router.on('hashChange', (event) => {
      expect(event).toHaveProperty('type', 'hashchange')
      done()
    })
    window.location.hash = '#b=2';
  })
  test('pushState Event', (done) => {
    const router = new RouterEvent();
    const pData = { first: 1 };
    router.on('pushState', (data, title, url) => {
      expect(data).toMatchObject(pData)
      expect(title).toBe('');
      expect(url).toBe('/1')
      done()
    })
    window.history.pushState(pData, '', '/1');
  })
  test('replaceState Event', (done) => {
    const router = new RouterEvent();
    const pData = { first: 1 };
    router.on('replaceState', (data, title, url) => {
      expect(data).toMatchObject(pData)
      expect(title).toBe('');
      expect(url).toBe('/1')
      done()
    })
    window.history.replaceState(pData, '', '/1');
  })
  test.only('back button Event', (done) => {
    debugger
    const promiseUrl = (hash: string): Promise<void> => new Promise((resolve) => {
      window.location.hash = hash;
      resolve();
    })
    promiseUrl('#a=1').then(() => {
      promiseUrl('#a=2')
    })
    // 回退按钮 ==> 触发回退按钮事件
    router.on('backButton', () => {
      done();
    })

    // window.location = new Proxy(window.location, {
    //   get(target, name) {
    //     console.log(target)
    //     debugger
    //     if (name === 'href') {
    //       return 'http://www.baidu.com/#1';
    //     }
    //   }
    // })
    // Object.defineProperties(window.location, {
    //   href: {
    //     get: function () {
    //       debugger
    //       return 'http://www.baidu.com/#1';
    //     },
    //   }
    // })
    //模拟浏览器回退按钮
    setTimeout(() => {
      dom.reconfigure({ url: "http://www.baidu.com/#1" });
      debugger
      const popstateEvent = new window.PopStateEvent('popstate')
      const hashChangeEvent = new window.HashChangeEvent("hashchange")
      window.dispatchEvent(popstateEvent);
      window.dispatchEvent(hashChangeEvent);
    }, 0)

    // location.hash = '#a=1' ===> 回退事件和前进事件都 不触发
  })
})
