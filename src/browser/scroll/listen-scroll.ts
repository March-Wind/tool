import throttle from '../../tools/optimization-function/throttle';
import EventEmitter from '@/tools/eventEmitter';
// 到达底部判断
const reachTheBottom = (shim = 100) => {
  let lastScrollTop = 0;
  return () => {
    const contentHeight = document.body.scrollHeight || document.documentElement.scrollHeight;
    const pageHeight = document.body.clientHeight || document.documentElement.clientHeight;
    const scrollDistance = document.body.scrollTop || document.documentElement.scrollTop;
    const dwon = lastScrollTop < scrollDistance;
    if (contentHeight <= pageHeight + scrollDistance + shim && dwon) {
      lastScrollTop = scrollDistance;
      return true;
    } else {
      lastScrollTop = scrollDistance;
      return false;
    }
  };
};

/**
 * 监听到达元素或者window底部,返回移除函数
 *
 * @param {(Element | Window)} [dom=window]
 * @param {Function} cb
 * @param {number} [shim=100] 距离shim就算到达
 * @return {*}
 */
const listenReachTheBottom = (dom: Element | Window = window, cb: Function, shim = 100) => {
  const ireachTheBottom = reachTheBottom(shim);
  const handle = throttle((event: Event) => {
    if (ireachTheBottom()) {
      if (cb) {
        cb(event);
      }
    }
  }, 50);
  dom.addEventListener('scroll', handle);
  return function removeAddEventListen() {
    dom.removeEventListener('scroll', handle);
  };
};
type ScrollStatus = 'scrolling' | 'scrollStart' | 'scrollEnd';
interface Event {
  // 模板字符串
  scrolling: (state: ScrollStatus) => void;
  scrollStart: (state: ScrollStatus) => void;
  scrollEnd: (state: ScrollStatus) => void;
}
class ScrollState {
  public state: ScrollStatus | undefined;
  protected target: HTMLElement | Window | Document;
  protected secondOfLastSTop = 0;
  protected lastSTop = 0;
  protected checkScrollEndTask: number | NodeJS.Timeout | null | undefined;
  protected Event: EventEmitter<Event>;
  protected observerFn: ((state: ScrollStatus) => void) | undefined;
  public constructor(target: HTMLElement | Window | Document) {
    this.target = target;
    this.addObserver();
    this.Event = new EventEmitter<Event>();
  }
  public onChangeState(fn: (state: ScrollStatus) => void) {
    this.observerFn = fn;
    this.Event.on('scrollEnd', fn);
    this.Event.on('scrolling', fn);
    this.Event.on('scrollStart', fn);
  }
  public offObserver() {
    if (this.observerFn) {
      this.Event.off('scrollEnd', this.observerFn);
      this.Event.off('scrolling', this.observerFn);
      this.Event.off('scrollStart', this.observerFn);
    }
  }
  protected addObserver() {
    let target: HTMLElement | Document;

    if (this.target === window || this.target === document.documentElement || this.target === document.body) {
      // 全局的滚动
      target = document;
    } else {
      target = this.target as unknown as HTMLElement | Document;
    }
    target.addEventListener('scroll', (e) => {
      const currentSTop =
        document === e.target
          ? document.body.scrollTop || document.documentElement.scrollTop
          : (e.target as HTMLElement).scrollTop;
      if (this.secondOfLastSTop === this.lastSTop && currentSTop !== this.lastSTop) {
        this.recordLastSTop(currentSTop);
        this.Event.emit('scrollStart', 'scrollStart');
        this.state = 'scrollStart';
        return;
      }
      if (this.lastSTop !== currentSTop && this.state !== 'scrolling') {
        this.recordLastSTop(currentSTop);
        this.Event.emit('scrolling', 'scrolling');
        this.state = 'scrolling';
        return;
      }
      this.recordLastSTop(currentSTop);
      this.polling(document === e.target ? document.documentElement : (e.target as HTMLElement));
    });
  }
  protected recordLastSTop(currentSTop: number) {
    this.secondOfLastSTop = this.lastSTop;
    this.lastSTop = currentSTop;
  }
  protected polling(target: HTMLElement) {
    if (this.checkScrollEndTask) {
      clearTimeout(this.checkScrollEndTask as number);
      this.checkScrollEndTask = null;
    }
    this.checkScrollEndTask = setTimeout(() => {
      const currentSTop = target.scrollTop;
      console.log(currentSTop, this.lastSTop);
      if (this.lastSTop === currentSTop) {
        this.secondOfLastSTop = currentSTop;
        this.lastSTop = currentSTop;
        this.Event.emit('scrollEnd', 'scrollEnd');
        this.state = 'scrollEnd';
      }
    }, 50);
  }
}

export { listenReachTheBottom, ScrollState };
