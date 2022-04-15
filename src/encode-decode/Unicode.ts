import { isString } from '@/javascript-language/variable-type';
import _charCodeAt from '@/javascript-language/extended-native-function/charCodeAt';

/**
 * 获取一个辅助平面字符对应的数字,例如"𐐷" ===> 对应0x10437位置，在辅助平面，
 * 注意：只判断第一个字符，一个字符有两个字节
 * @date 2022-04-13
 * @param {any} str:string
 * @returns {any}
 * @example
 */
const getSupplementaryPlanesNumber = (str: string) => {
  if (!isString(str)) {
    throw new Error('getSupplementaryPlanesNumber:入参不合法');
  }
  return '0x' + _charCodeAt(str).toString(16);
};

/**
 *
 * 非BMP，即辅助平面的字符，转成代理对，只支持传入单个字符
 * @param {string} str
 * @return {*}  {{ lead: number; trail: number }}
 */
const notBMPString2Surrogates = (str: string): { lead: number; trail: number } => {
  if (!isString(str)) {
    throw new Error('notBMPString2Surrogates: 入参不合法');
  }
  const lead = str.charCodeAt(0);
  const trail = str.charCodeAt(1);
  // High surrogate (could change last hex to 0xDB7F to treat high
  // private surrogates as single characters)
  if (0xd800 > lead || lead > 0xdbff) {
    // 不在前导代理范围,返回
    throw new Error('notBMPString2Surrogates: 入参不是辅助平面的字符');
  }
  if (isNaN(trail) || 0xdc00 > trail || trail > 0xdfff) {
    throw new Error('notBMPString2Surrogates: 该字符没有后导代理');
  }
  return {
    lead,
    trail,
  };
};
/**
 * UniCode编码
 * @param str
 */
const UnicodeEncode = (str: string, removePre = false): string => {
  if (!isString(str)) {
    console.log('UnicodeEncode:入参不合法');
    return '';
  }
  const prefix = removePre ? 'u' : '\\u';
  return str.replace(/./g, (char) => {
    let result = '';
    if (char.length === 2) {
      // 两个字节，是代理对，属于辅助平面
      const { lead, trail } = notBMPString2Surrogates(char);
      result = prefix + lead.toString(16).padStart(4, '0') + prefix + trail.toString(16).padStart(4, '0');
    } else if (char.length === 1) {
      // 两个字节
      result = prefix + char.charCodeAt(0).toString(16).padStart(4, '0');
    }
    return result;
  });
};
/**
 * UniCode解码
 * 可以用来url的search部分传参编码
 * @param str
 *
 */
const UnicodeDecode = (str: string, hasPre = true): string => {
  if (!isString(str)) {
    console.log('UnicodeEncode:入参不合法');
    return '';
  }
  const reg = hasPre ? /\\u[0-9a-f]{4}/g : /u[0-9a-f]{4}/g;
  return str.replace(reg, (char) => {
    return eval('"' + (hasPre ? '' : '\\') + char + '"');
  });
};

/**
 * 编码url的query部分可以使用这个方法，由于分发场景会 自己联登 和 维信联登 不知道跳转联登页面中会被encodeURIConpoent多少次，导致最终我们拿到的结果不是我们想要的，需要经过相应次数的decodeURIComponent,很不方便，
 * @param str
 */
const UnicodeEncodeURLQuery = (str: string) => {
  return UnicodeEncode(str, true);
};
/**
 * 解码UnicodeEncodeURLQuery的结果
 * @param str
 */
const UnicodeDecodeURLQuery = (str: string) => {
  return UnicodeDecode(str, false);
};

export { getSupplementaryPlanesNumber, UnicodeEncode, UnicodeDecode, UnicodeEncodeURLQuery, UnicodeDecodeURLQuery };
