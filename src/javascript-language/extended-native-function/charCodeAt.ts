function _charCodeAt(str: string, idx = 0) {
  // ex. fixedCharCodeAt ('\uD800\uDC00', 0); // 65536
  // ex. fixedCharCodeAt ('\uD800\uDC00', 1); // false
  idx = idx || 0;
  const code = str.charCodeAt(idx);
  let hi, low;

  // High surrogate (could change last hex to 0xDB7F to treat high
  // private surrogates as single characters)
  if (0xd800 <= code && code <= 0xdbff) {
    hi = code;
    low = str.charCodeAt(idx + 1);
    if (isNaN(low)) {
      throw 'High surrogate not followed by low surrogate in fixedCharCodeAt()';
    }
    return (hi - 0xd800) * 0x400 + (low - 0xdc00) + 0x10000;
  }
  if (0xdc00 <= code && code <= 0xdfff) {
    // Low surrogate
    // We return false to allow loops to skip this iteration since should have
    // already handled high surrogate above in the previous iteration
    return false;
    /*hi = str.charCodeAt(idx-1);
      low = code;
      return ((hi - 0xD800) * 0x400) + (low - 0xDC00) + 0x10000;*/
  }
  return code;
}
export default _charCodeAt;
