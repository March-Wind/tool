import { UnicodeDecode, UnicodeEncode } from '@/encode-decode/Unicode';

describe('Unicode编解码', () => {
  test('BMP字符编码', () => {
    const encode = UnicodeEncode('中国+=%?//&你好', true);
    expect(encode).toBe('u4e2du56fdu002bu003du0025u003fu002fu002fu0026u4f60u597d');
  });
  test('BMP字符解码', () => {
    const decode = UnicodeDecode('u4e2du56fdu002bu003du0025u003fu002fu002fu0026u4f60u597d', false);
    expect(decode).toBe('中国+=%?//&你好');
  });
  test('非BMP字符编码', () => {
    const encode = UnicodeEncode('𐐷');
    expect(encode).toBe('\\ud801\\udc37');
  });
  test('非BMP字符解码', () => {
    const decode = UnicodeDecode('\\ud801\\udc37');
    expect(decode).toBe('𐐷');
  });
  test('实际应用在url的参数上，编解码url的search部分的target(https://github.com?1=中国+=%?//&你好𐐷),完整：https://www.baidu.com?target=https://github.com?1=中国+=%?//&你好𐐷', () => {
    const target = 'https://github.com?1=中国+=%?//&你好𐐷';
    const url = 'https://www.baidu.com?target=';
    const send = () => {
      const _target = UnicodeEncode(target, true);
      return url + _target;
    };
    const recive = (url: string) => {
      const urlObj = new URL(url);
      const _target = urlObj.searchParams.get('target') || '';
      const decode = UnicodeDecode(_target, false);
      expect(decode).toBe(target);
    };
    recive(send());
  });
});
