import { browserKernel } from './browser/browserKernel';
import { browserName } from './browser/browserName';
export * from './browser/system-devices';
import { isWXMiniProgram } from './browser/isWXMiniProgram';
import { isNode } from './node';
export { browserKernel, browserName, isWXMiniProgram, isNode };

/** mac下各浏览器UA,记录在20201112 */
// edge："Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/86.0.4240.193 Safari/537.36 Edg/86.0.622.68"
// chrome："Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.77 Safari/537.36"
// safari："Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_4) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.1 Safari/605.1.15"
// firefox："Mozilla/5.0 (Macintosh; Intel Mac OS X 10.14; rv:82.0) Gecko/20100101 Firefox/82.0"

/** 手机wenview */
// iphone WKwebview："Mozilla/5.0 (iPhone; CPU iPhone OS 11_0 like Mac OS X) AppleWebKit/604.1.38 (KHTML, like Gecko) Version/11.0 Mobile/15A372 Safari/604.1"
// android webview: "Mozilla/5.0 (Linux; Android 9; STF-AL00 Build/HUAWEISTF-AL00; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/79.0.3945.116 Mobile Safari/537.36"
// 微信浏览器："Mozilla/5.0 (Linux; Android 9; STF-AL00 Build/HUAWEISTF-AL00; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/78.0.3904.62 XWEB/2469 MMWEBSDK/200701 Mobile Safari/537.36 MMWEBID/825 MicroMessenger/7.0.17.1720(0x27001135) Process/toolsmp WeChat/arm64 NetType/WIFI Language/zh_CN ABI/arm64"

/** window下和浏览器UA */
// chrome："Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.77 Safari/537.36"
// IE："Mozilla/5.0 (Windows NT 10.0; WOW64 Trident/7.0; .NET......) like Gecko) "
// firefox："Mozilla/5.0 (Windows NT 10.0; WOW64; x64; rv:82.0) Gecko/20100101 Firefox/82.0"
