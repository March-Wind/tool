type ParseResult = Writeable<Partial<Omit<URL, 'toString' | 'toJSON' | "searchParams">>>
type Key = keyof ParseResult;
type ObjectType = {
  [key in Key | string]: string;
}
class Url {
  public parseURL(url: string): ParseResult {
    if (!url) { return {} }
    const result: ObjectType = {} as ObjectType;
    const target = new URL(url);
    let key: Key | string;
    for (key in target) {
      if (!Object.prototype.hasOwnProperty.call(target, key) && key !== 'toString' && key !== 'toJSON') {
        result[key] = target[(key as Key)];
      }
    }
    return result;
  }

}
const a = new URL('https://www.baidu.com/?a=1')
const val = a['searchParams']

export { Url };



/**
 * 参考：
 * https://url.spec.whatwg.org/
 *

 *
 *
 *
 * 思路：
 **/

/**
 * 注释：
 * 多团队协作时，query部分的参数由于encodeComponentURL和decodeComponentURL对不上次数,返回过来的url可能是没有encode过的字符，会导致加号变成空格
 * 所以可以用unicode来编码value
 * 例：
 * 浏览器地址：https://www.baidu.com/?name=a+b
 * 执行：(new URLSearchParams(window.location.search)).get('name')
 * ==> a b
 */
