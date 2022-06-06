const UA = navigator.userAgent;
/**
 * 判断是linux系统
 * @param {string} [userAgent]
 * @return {*}
 */
const isLinux = (userAgent?: string) => {
  const usedUA = userAgent ? userAgent : UA;
  return /Linux/i.test(usedUA);
};
/**
 * 判断是windows系统
 * @param {string} [userAgent]
 * @return {*}
 */
const isWindows = (userAgent?: string) => {
  // Windows系统
  const usedUA = userAgent ? userAgent : UA;
  return /Windows/i.test(usedUA);
};
/**
 * 判断是安卓系统,也是安卓手机的判断
 * @param {string} [userAgent]
 * @return {*}
 */
const isAndroid = (userAgent?: string) => {
  // 安卓系统
  const usedUA = userAgent ? userAgent : UA;
  return /Android|Adr/i.test(usedUA);
};
/**
 * 判断是苹果系统
 * @param {string} [userAgent]
 * @return {*}
 */
const isAppleOS = (userAgent?: string) => {
  // 整个苹果的系统，包含IOS和Mac
  const usedUA = userAgent ? userAgent : UA;
  return /Mac\s+OS/i.test(usedUA);
};
/**
 * 判断是mac设备
 * @param {string} [userAgent]
 * @return {*}
 */
const isMac = (userAgent?: string) => {
  const usedUA = userAgent ? userAgent : UA;
  if (isAppleOS(usedUA) && !('ontouchend' in document)) {
    // 不能够触摸
    return true;
  }
};
/**
 * 判断是苹果手机
 * @param {string} [userAgent]
 * @return {*}
 */
const isIOS = (userAgent?: string) => {
  // iphone手机
  const usedUA = userAgent ? userAgent : UA;
  return /iPhone.*Mac\s+OS/i.test(usedUA);
};
/**
 * 判断是ipad(苹果)
 * @param {string} [userAgent]
 * @return {*}
 */
const isApplePad = (userAgent?: string) => {
  // 苹果ipad设备
  const usedUA = userAgent ? userAgent : UA;
  const _isAppleOS = isAppleOS(usedUA);
  if (!_isAppleOS) {
    return false;
  }
  if (/iPad.*Mac\s+OS/i.test(usedUA)) {
    return true;
  }
  if (!isIOS(usedUA) && 'ontouchend' in document) {
    return true;
  }
};
/**
 * 判断是pad设备
 * @param {string} [userAgent]
 * @return {*}
 */
const isPad = (userAgent?: string) => {
  // 所有pad设备
  const usedUA = userAgent ? userAgent : UA;
  if (/iPad/i.test(usedUA)) {
    return true;
  }
  if (isApplePad(usedUA)) {
    return true;
  }
};
/**
 * 判断是PC设备
 * @param {string} [userAgent]
 * @return {*}
 */
const isPC = (userAgent?: string) => {
  const usedUA = userAgent ? userAgent : UA;
  if (isWindows(usedUA) || isMac(usedUA) || isLinux(usedUA)) {
    return true;
  }
};

/**
 * 判断是手机设备
 * @param {string} [userAgent]
 * @return {*}
 */
const isMoblie = (userAgent?: string) => {
  // 不包括pad
  const usedUA = userAgent ? userAgent : UA;
  if (isAndroid(usedUA) || isIOS(usedUA)) {
    return true;
  }
};
export { isMoblie, isPC, isPad, isApplePad, isIOS, isMac, isAppleOS, isAndroid, isWindows, isLinux };
