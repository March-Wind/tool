import EventEmitter from '@/tools/eventEmitter';
// import scrollToBottom from '@/browser/DOM/event/smoothscroll';
type A = Omit<MutationRecord, 'type' | 'target'>;
type CB = {
  [K in MutationRecord['type']]: (params: MutationRecord) => void;
};
interface ECB extends CB {
  error: (err: any) => {};
}

class ObserverDOM extends EventEmitter<ECB> {
  private observer: MutationObserver;
  private targetDOM: HTMLElement;
  public constructor(DOM: HTMLElement, observerOpts: MutationObserverInit) {
    super();
    const observer = new MutationObserver(this.handleMutations.bind(this));
    observer.observe(DOM, observerOpts);
    this.observer = observer;
    this.targetDOM = DOM;
  }
  private handleMutations(mutations: MutationRecord[], observer?: MutationObserver) {
    mutations.forEach((mutation) => {
      switch (mutation.type) {
        case 'attributes': // 属性值被修改
          this.emit('attributes', mutation);
          break;
        case 'childList': // 子元素被修改
          this.emit('childList', mutation);
          break;
        case 'characterData': // 文本修改
          this.emit('characterData', mutation);
          break;
        default:
          this.emit('error', mutation);
          break;
      }
    });
  }
  public disconnect() {
    /* handle any still-pending mutations */
    const mutations = this.observer.takeRecords();
    if (mutations) {
      this.handleMutations(mutations);
    }
    /* 清除监听 */
    this.observer.disconnect();
  }
  public keepScrollBottom() {
    this.on('childList', (mutation) => {
      // scrollToBottom(this.targetDOM); // todo
    });
  }
}

export { ObserverDOM };
