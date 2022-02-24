type BrowserName = 'Chrome' | 'Safari' | 'Firefox' | 'Opera' | 'Edge' | 'IE' | 'WX'; // 现在浏览器内核变迁比较多，使用内核判断浏览器可能会不准确
enum BrowserNameMap {
  Chrome = 'Chrome',
  Safari = 'Safari',
  Firefox = 'Firefox',
  Opera = 'Opera',
  Edge = 'Edge|Edg',
  IE = 'MSIE',
  WX = 'MicroMessenger|WeChat',
  WXWork = 'wxwork', // 企业微信
}

const UA = navigator.userAgent;

type BrowserNameResult = BrowserName | boolean | undefined;
/**
 *
 * 浏览器名称
 * @param {BrowserName} [browserNameS]
 * @param {string} [userAgent]
 * @return {*}  {BrowserNameResult}
 */
const browserName = (browserNameS?: BrowserName, userAgent?: string): BrowserNameResult => {
  // 注意判断优先顺序不能调整
  const usedUA = userAgent ? userAgent : UA;
  const judgmentOrder: BrowserName[] = ['Edge', 'WX', 'Chrome', 'Safari', 'Firefox', 'Opera', 'IE']; // 注意判断优先顺序不能调整
  const _browserName = judgmentOrder.find((name) => new RegExp(BrowserNameMap[name]).test(usedUA));
  if (browserNameS) {
    return browserNameS === _browserName;
  } else {
    return _browserName;
  }
};

export { browserName };
