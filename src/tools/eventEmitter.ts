type Keys<V> = keyof V;
/**
 * 
 * 基础版本发布订阅
 * @class BaseEventEmitter
 * @template T
 */
class BaseEventEmitter<CB extends Record<Keys<CB>, CB[Keys<CB>]>>{
  protected registry: Map<any, Function[]> = new Map()
  on<K extends Keys<CB>>(type: K, listener: CB[K]) {
    if (!this.registry.has(type)) {
      this.registry.set(type, []);
    }
    this.registry.get(type)?.push(listener);
  }
  off<K extends Keys<CB>>(type: K, listener: CB[K]): void {
    if (!this.registry.has(type)) {
      return;
    }
    const stack = this.registry.get(type)!;
    for (let i = 0, l = stack.length; i < l; i++) {
      if (stack[i] === listener) {
        stack.splice(i, 1);
        return this.off(type, listener);
      }
    }
  }
  emit(type: Keys<CB>, ...args: any[]) {
    if (!this.registry.has(type)) {
      return;
    }
    const stack = this.registry.get(type)!;
    for (let i = 0, l = stack.length; i < l; i++) {
      stack[i](...args)
    }
  }
}
/**
 * 发布订阅
 *
 * @class EventEmitter
 * @extends {BaseEventEmitter<T>}
 * @template T
 */
class EventEmitter<CB extends Record<Keys<CB>, CB[Keys<CB>]>> extends BaseEventEmitter<CB> {
  once<K extends Keys<CB>>(type: K, listener: CB[K]) {
    if (!this.registry.has(type)) {
      this.registry.set(type, []);
    }
    this.registry.get(type)?.push(listener);
  }
}
export {
  BaseEventEmitter
}
export default EventEmitter;