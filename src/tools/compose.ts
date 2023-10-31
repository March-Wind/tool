type Func<T extends any[], R> = (...a: T) => R



function compose(): <R>(a: R) => R;
function compose<F extends Function>(f: F): F;
function compose<A, T extends any[], R>(f1: (a: A) => R, f2: Func<T, A>): Func<T, R>
function compose<A, B, T extends any[], R>(f1: (b: B) => R, f2: (a: A) => B, f3: Func<T, A>): Func<T, R>
function compose<R>(f1: (a: any) => R, ...funcs: Function[]): (...args: any[]) => R;
function compose<R>(...funcs: Function[]): (...args: any[]) => R
/**
 * 链式调用函数,前者函数的返回值作为后者函数的参数
 *
 * @param {...Function[]} funcs
 * @return {*}
 */
function compose(...funcs: Function[]) {
  if (funcs.length === 0) {
    // infer the argument type so it is usable in inference down the line
    return <T>(arg: T) => arg
  }

  if (funcs.length === 1) {
    return funcs[0]
  }

  return funcs.reduce(
    (a, b) =>
      (...args: any) =>
        a(b(...args))
  )
}
export {
  compose
}
