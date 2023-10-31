type Keys<V> = keyof V;
/**
 *
 * 基础版本发布订阅
 * @class BaseEventEmitter
 * @template T
 */
class BaseEventEmitter<CB extends Record<Keys<CB>, CB[Keys<CB>]>>{
  protected registry: Map<any, Function[]> = new Map()
  public on<K extends Keys<CB>>(type: K, listener: CB[K]) {
    if (!this.registry.has(type)) {
      this.registry.set(type, []);
    }
    this.registry.get(type)?.push(listener);
  }
  public off<K extends Keys<CB>>(type: K, listener: CB[K]): void {
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
  public emit(type: Keys<CB>, ...args: Parameters<CB[Keys<CB>]>) {
    if (!this.registry.has(type)) {
      return;
    }
    const stack = this.registry.get(type)!;
    for (let i = 0, l = stack.length; i < l; i++) {
      if (Array.isArray(args)) { // todo
        stack[i](...args as any[])
      } else {
        stack[i](args)
      }
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
  public once<K extends Keys<CB>>(type: K, listener: CB[K]) {
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
