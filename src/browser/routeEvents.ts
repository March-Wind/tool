import EventEmitter from '../tools/eventEmitter'

type EventType = 'pushState' | 'replaceState' | 'hashChange' | 'popstate' | 'backOff' | 'forward';

/**
 * 路由事件
 *
 * @class RouterEvent
 * @extends {(EventEmitter<'pushState' | 'replaceState' | 'hashChange'>)}
 */
class RouterEvent extends EventEmitter<EventType> {
  routeStack: string[] = []; // 路由栈
  currentIndex = 0; // 当前路由位置
  pausePopstateEvent = false; // popstateEvent只用来监听前进和后退按钮，
  constructor() {
    super()
    this.onChange();
  }
  backOffEvent() { // 回退事件
    this.emit('backOff')
  }
  forwardEvent() { // 前进事件
    this.emit('forward')
  }
  private setRoute(type: 'add' | 'replace' = 'add') {
    if (this.currentIndex !== this.routeStack.length) {
      // 回退之后走了其他路由，那么就把之前超前的会话记录都删除，history也是这样的。
      this.routeStack.slice(0, this.currentIndex);
    }
    switch (type) {
      case 'add': {
        this.routeStack.push(window.location.href);
        this.currentIndex += 1;
        break;
      }
      case 'replace': {
        const lastIndex = this.routeStack.length - 1;
        this.routeStack[lastIndex] = window.location.href;
        break;
      }
    }
  }
  private moveCurrentIndex(delta?: number) {
    if (delta) {
      this.currentIndex += delta;
    }
  }
  pushStateEvent(args: Parameters<History["pushState"]>) {
    this.setRoute();
    this.emit('pushState', args)
  }
  replaceStateEvent(args: Parameters<History["replaceState"]>) {
    this.setRoute('replace');
    this.emit('replaceState', args)
  }
  hashChangeEvent(event: HashChangeEvent) {
    this.setRoute();
    this.emit('hashChange', event)
  }
  popstateEvent(event: PopStateEvent) {
    if (!this.routeStack.length) {
      // 说明是页面加载时触发的事件
      return;
    }
    if (this.pausePopstateEvent) {
      //前进和后退的js api调用，不在popstateEvent中触发
      this.pausePopstateEvent = false;
      return;
    }
    if (this.routeStack) {

    }
    this.emit('popstate', event)
  }
  private forward(forward: History['forward']): History['forward'] {
    return () => {
      this.pausePopstateEvent = true;
      forward.apply(window.history);
      this.forwardEvent();
      this.moveCurrentIndex(1)
    }
  }
  private back(back: History['back']): History['back'] {
    return () => {
      this.pausePopstateEvent = true;
      back.apply(window.history);
      this.backOffEvent();
      this.moveCurrentIndex(-1)
    }
  }
  private go(go: History['go']): History['go'] {
    return (...args) => {
      this.pausePopstateEvent = true;
      go.apply(window.history, args);
      const [delta = 0] = args;
      // 等于0的情况是reload。
      if (delta > 0) {
        this.forwardEvent();
      } else if (delta < 0) {
        this.backOffEvent();
      }
      this.moveCurrentIndex(delta)
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
    }
  }
  onChange() {
    window.addEventListener("hashchange", this.hashChangeEvent);
    window.addEventListener("popstate", this.popstateEvent); // 1、history.back()或者history.forward()；2、触发，页面加载chrome和safari触发

    // pushState和replaceState无法监听到，所以重写一下
    const { pushState, replaceState, go, forward, back } = window.history;
    window.history.pushState = this.pushState(pushState);
    window.history.replaceState = this.replaceState(replaceState);
    window.history.go = this.go(go);
    window.history.forward = this.forward(forward);
    window.history.back = this.back(back);

  }
}


export {
  RouterEvent
}

export default RouterEvent;

// 参考W3C：https://html.spec.whatwg.org/multipage/history.html#the-history-interface