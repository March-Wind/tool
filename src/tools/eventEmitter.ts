/**
 * 
 * 基础版本发布订阅
 * @class BaseEventEmitter
 * @template T
 */
class BaseEventEmitter<T = string> {
  protected registry: Map<any, Function[]> = new Map()
  on(type: T, listener: Function) {
    if (!this.registry.has(type)) {
      this.registry.set(type, []);
    }
    this.registry.get(type)?.push(listener);
  }
  off(type: T, listener: Function): void {
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
  emit<V>(type: T, params?: V) {
    if (!this.registry.has(type)) {
      return;
    }
    const stack = this.registry.get(type)!;
    for (let i = 0, l = stack.length; i < l; i++) {
      stack[i](params)
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
class EventEmitter<T = string> extends BaseEventEmitter<T> {
  once(type: T, listener: Function) {
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