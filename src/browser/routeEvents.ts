import EventEmitter from '../tools/eventEmitter'

type EventType = 'pushState' | 'replaceState' | 'go' | 'back' | 'forward' | 'forwardButton' | 'backButton' | 'hashChange' | 'popstate';
type CBType = {
  [k in EventType]: any;
}
interface CB extends CBType {
  pushState: History["pushState"];
  replaceState: History["replaceState"]
  go: History["go"]
  back: History["back"]
  forward: History["forward"]
  forwardButton: () => void;
  backButton: () => void;
  hashChange: (event: HashChangeEvent) => void;
  popstate: (event: PopStateEvent) => void;
}

/**
 * 路由事件
 *
 * @class RouterEvent
 * @extends {EventEmitter<EventType>}
 */
class RouterEvent extends EventEmitter<CB> {
  self: EventEmitter<EventType>;
  routeStack: string[] = [window.location.href]; // 路由栈
  prevIndex = 0; // 前一个路由位置
  currentIndex = 0; // 当前路由位置
  laggingPopStateEvent: Function | null = null; // 挂起的PopStateEvent，等待触发。
  hashBackOrForward_pauseAddRoute2Stack = false; // hash时回退和前进都触发hashchangeEvent，但是没有新路由产生，所以
  //popstateEvent只用来监听前进和后退按钮，
  //此外还触发PopstateEvent的还有location.hash、页面加载时、history.back()、history.forward()
  pausePopstateEvent = false;
  constructor() {
    super()
    this.onChange();
  }

  private setRoute(type: 'add' | 'replace' = 'add') {
    if (this.currentIndex !== this.routeStack.length) {
      // 回退之后走了其他路由，那么就把之前超前的会话记录都删除，history也是这样的。
      this.routeStack = this.routeStack.slice(0, this.currentIndex + 1);
      this.prevIndex = this.currentIndex;
    }
    switch (type) {
      case 'add': {
        this.routeStack.push(window.location.href);
        this.prevIndex += 1;
        this.currentIndex += 1;
        break;
      }
      case 'replace': {
        this.routeStack[this.currentIndex] = window.location.href;
        break;
      }
    }
  }
  private moveCurrentIndex(delta?: number) {
    if (delta) {
      this.prevIndex = this.currentIndex;
      this.currentIndex += delta;
    }
  }
  pushStateEvent(args: Parameters<History["pushState"]>) {
    this.setRoute();
    console.log('pushStateEvent');
    this.emit('pushState', ...args)
  }
  replaceStateEvent(args: Parameters<History["replaceState"]>) {
    console.log('replaceStateEvent');
    this.setRoute('replace');
    this.emit('replaceState', ...args)
  }
  hashChangeEvent(event: HashChangeEvent) {
    debugger
    console.log('hashChangeEvent');
    this.emit('hashChange', event);
    if (this.hashBackOrForward_pauseAddRoute2Stack) {// 前进和回退带来的hash就阻止增加路由
      this.hashBackOrForward_pauseAddRoute2Stack = false;
      return;
    }
    this.setRoute();
  }
  popstateEvent(event: PopStateEvent) {
    debugger
    // console.log('popstateEvent', event);
    this.emit('popstate', event)
    const stackLen = this.routeStack.length;
    if (!stackLen) {
      // 说明是页面加载时触发的事件
      return;
    }
    if (this.pausePopstateEvent) {
      // history.back()、history.forward()阻止的
      //前进和后退的js api调用，不在popstateEvent中判断
      this.pausePopstateEvent = false;
      return;
    }

    /**
     * 判断浏览器的前进和后退按钮，
     *
     * location.hash在popstateEvent后面触发，所以不影响判断浏览器的前进和后退按钮，
     * 同时location.hash不会产生this.currentIndex 和 this.prevIndex的相对位置的差距，
     * 综上两点在这里可以判断是点击了浏览器的前进和后退按钮，
     * */
    const current = window.location.href;
    /**
     * hash路由和history路由的返回都是先触发popstateEvent，在popstateEvent中无法判断是哪种路由，也无法判断是前进后退，
     * 所以来不及放入routeStack,和移动当前路由指针。
     * 所以先判断location.href如果和当前指针路由相等，说明hash路由重复跳了前指针路由，history路由重复跳了前指针路由是新建立会话记录。
     * */
    if (current !== this.routeStack[this.currentIndex]) {
      // 不相等是说明路由有改动
      if (current === this.routeStack[this.currentIndex + 1]) { // 前进了
        this.hashBackOrForward_pauseAddRoute2Stack = true;
        this.browserForwardButtonEvent();
      }
      if (current === this.routeStack[this.currentIndex - 1]) { // 后退了
        this.hashBackOrForward_pauseAddRoute2Stack = true;
        this.browserBackButtonEvent();
      }
    }

    if (current === this.routeStack[this.currentIndex]) {// to do hash reload事件,
      this.hashBackOrForward_pauseAddRoute2Stack = true;
      // 相等是说明是hash路由重复跳了当前指针路由，
    }
  }
  goEvent(args: Parameters<History['go']>) {
    this.emit('go', ...args)
  }
  backEvent(delta = -1) { // js回退事件
    console.log('js_api回退');
    this.emit('back');
    this.hashBackOrForward_pauseAddRoute2Stack = true;
    this.moveCurrentIndex(delta);
  }
  forwardEvent(delta = 1) { // js前进事件
    console.log('js_api前进');
    this.emit('forward');
    this.hashBackOrForward_pauseAddRoute2Stack = true;
    this.moveCurrentIndex(delta)
  }
  browserForwardButtonEvent() {// 浏览器的前进按钮
    console.log('浏览器的前进按钮');
    this.emit('forwardButton');
    this.moveCurrentIndex(1)
  }
  browserBackButtonEvent() {// 浏览器的前进按钮
    console.log('浏览器的后退按钮');
    this.emit('backButton');
    this.moveCurrentIndex(-1)
  }
  private forward(forward: History['forward']): History['forward'] {
    return () => {
      this.pausePopstateEvent = true;
      forward.apply(window.history);
      this.forwardEvent();
    }
  }
  private back(back: History['back']): History['back'] {
    return () => {
      this.pausePopstateEvent = true;
      back.apply(window.history);
      this.backEvent();
    }
  }
  private go(go: History['go']): History['go'] {
    return (...args) => {
      go.apply(window.history, args);
      const [delta = 0] = args;
      const historyLen = this.routeStack.length;
      // 等于0的情况是reload。
      if (delta > 0) {
        if (historyLen - this.currentIndex < delta) { // 从当前位置前进的长度要小于可以到达的最大长度，否则就丢弃掉操作。
          this.forwardEvent(delta);
        }
      } else if (delta < 0) {
        if (this.currentIndex + delta >= 0) { // 从当前位置回退的长度要小于可以到达的长度，否则就丢弃掉操作。
          this.backEvent(delta);
        }
      }
      this.goEvent(args);
    }
  }
  private pushState(pushState: History["pushState"]): History["pushState"] {
    return (...args) => {
      pushState.apply(window.history, args);
      this.pushStateEvent(args)
    }
  }
  private replaceState(replaceState: History["replaceState"]): History["replaceState"] {
    return (...args) => {
      replaceState.apply(window.history, args);
      this.replaceStateEvent(args);
    }
  }
  onChange() {
    window.addEventListener("hashchange", this.hashChangeEvent.bind(this)); // 无论在什么位置，如果location.hash如果和当前一样，不触发监听函数
    window.addEventListener("popstate", this.popstateEvent.bind(this)); // 1、history.back()或者history.forward()；2、触发，页面加载chrome和safari触发；3.location.href = "当前URL"也触发

    // pushState和replaceState无法监听到，所以重写一下
    const { pushState, replaceState, go, forward, back } = window.history;
    window.history.pushState = this.pushState(pushState).bind(this);
    window.history.replaceState = this.replaceState(replaceState).bind(this);
    window.history.go = this.go(go).bind(this);
    window.history.forward = this.forward(forward).bind(this);
    window.history.back = this.back(back).bind(this);
  }
}


export {
  RouterEvent
}

export default RouterEvent;

// 参考W3C：https://html.spec.whatwg.org/multipage/history.html#the-history-interface


// window.location.hash = 'a=1' 触发popstate和hashchange
