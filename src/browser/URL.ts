type ParseResult = Writeable<Partial<Omit<URL, 'toString' | 'toJSON' | "searchParams">>>
type Key = keyof ParseResult;
type ObjectType = {
  [key in Key | string]: string;
}
class Url {
  parseURL(url: string): ParseResult {
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

export default Url;



/**
 * 参考：
 * https://url.spec.whatwg.org/
 *

 *
 *
 *
 * 思路：
 **/
