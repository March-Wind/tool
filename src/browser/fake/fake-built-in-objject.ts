import { isFunction, isObject } from '../../tools/variable-type'
/**
 * 支持克隆类和对象
 *
 * @param {*} variable
 */
const fake = (variable: Constructable<any> | Object) => {
  let obj = null;
  if (isFunction(variable) && variable.constructor && variable.prototype) {
    // 排除箭头函数

    // We shouldn't hookAjax Obj.prototype because we can't
    // guarantee that all attributes are on the prototype。
    // Instead, hooking Obj instance can avoid this problem.
    obj = new variable();
  }

  if (isObject(variable)) {
    obj = variable;
  }
  if (!obj) {
    console.log('入参不合法！');
    return;
  }

  for (const attr in obj) {
    let type = "";
    try {
      type = typeof obj[attr] // May cause exception on some browser
    } catch (e) {
    }
    if (type === "function") {
      this[attr] = hookFunction(attr);
    } else {
      Object.defineProperty(this, attr, {
        get: getterFactory(attr),
        set: setterFactory(attr),
        enumerable: true
      })
    }
  }
}
}
