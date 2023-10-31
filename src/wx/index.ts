import { loadJs } from '../browser/request/loadjs'
import axios from 'axios';
import { ConfigOptions, UpdateAppMessageShareDataOptions, OpenTag } from './typing/jweixin'
import awaitWrap from '@/javascript-language/promise/await-wrap'
import { browserName } from '@/javascript-language/host/browser/browserName'
import { isBoolean } from '@/javascript-language/variable-type';
interface SignatureParam {
  appId: string;
}
interface SignatureResult {
  appId: string;
  timestamp: number;
  nonceStr: string;
  signature: string;
}

class WX {
  protected config: ConfigOptions;
  protected isWXBrowser = browserName('WX');
  constructor(config: ConfigOptions) {
    this.config = config;
  }
  async initConfig(): Promise<string | true> {
    const success = await this.checkThings();
    if (!isBoolean(success)) {
      return success
    }
    const config = this.config;
    const p = await (new Promise((resolve, reject) => {
      this.config = {
        ...config,
        jsApiList: ['checkJsApi', ...(config.jsApiList || [])]
      }
      debugger
      wx.config(this.config);
      wx.ready(() => {
        debugger
        resolve(true);
      });
      wx.error((err: any) => {
        debugger
        reject(err);
      })
    }) as Promise<true>)
    debugger
    return p
  }
  /**
   * 设置分享，使用前需要在jsApiList中注册api才能使用
   */
  setShareConfig(options: UpdateAppMessageShareDataOptions) {
    const success = this.checkThings();
    if (!isBoolean(success)) {
      return Promise.reject(success)
    }
    const hasApi = this.checkShareJsApiList();
    if (!isBoolean(hasApi)) {
      return Promise.reject(hasApi);
    }
    // 分享到朋友
    wx.updateAppMessageShareData(options);
    // 分享到朋友圈
    wx.updateTimelineShareData(options);
  }
  async addOpenApp(node: HTMLElement, extinfo: string, cb: { succes: Function, fail: Function } = {} as any) {
    const openApp = this.checkOpenTag('app')
    if (!isBoolean(openApp)) {
      return Promise.reject(openApp);
    }
    const random = parseInt(Math.random() * 1000 + '');
    const domId = 'wx' + random;
    const { appId } = this.config;
    const template = `
      <div style="width:100%;height:100%;position:absolute;top:0;left:0">
        <wx-open-launch-app class="${domId}" extinfo="${extinfo}" style="width: 100%;position: absolute;height: 100%;left: 0; z-index:999;" id='launch-btn' appid='${appId}'>
          <template>
            <style>#btn { opacity:0; height: 100vh;}</style>
            <div id='btn' ></div>
          </template>
        </wx-open-launch-app>
      </div>`;
    const fragment = document
      .createRange()
      .createContextualFragment(template);
    node.appendChild(fragment);
    const wxLaunchBtn = node.getElementsByClassName(domId)[0];
    const { succes, fail } = cb
    debugger;
    if (wxLaunchBtn) {
      wxLaunchBtn.addEventListener('launch', function () {
        debugger
        succes && succes();
        node.click && node.click();
      });
      wxLaunchBtn.addEventListener('error', function (e: any) {
        debugger
        fail && fail(e.detail);
        node.click && node.click();
      });
    }
  }
  getSignature(url: string, data: SignatureParam) { // 根据业务定制请求，以下只是一个例子
    return axios.post<SignatureResult>(url, data, { withCredentials: true },
    ).then(({ data, status }) => {
      const { appId, timestamp, nonceStr, signature } = data ?? {};
      if (status === 200) {
        this.config = {
          ...this.config,
          appId,
          timestamp,
          nonceStr,
          signature,
        }
        return {
          appId,
          timestamp,
          nonceStr,
          signature,
        };
      } else {
        throw new Error('getSignature失败！')
      }
    });
  }
  private async checkThings() {
    const env = this.checkWX();
    if (!isBoolean(env)) {
      return env
    }
    const loaded = await this.checkLoadSDK();
    if (!isBoolean(loaded)) {
      return loaded;
    }
    return true;
  }
  private checkOpenTag(type: 'app' | 'weapp' | 'subscribe' | 'audio') {
    switch (type) {
      case 'app':
        if (!this.config.openTagList?.includes(('wx-open-launch-' + type) as OpenTag)) {
          return '没有注册跳转App开放标签！'
        }
        return true;
      case 'weapp':
        if (!this.config.openTagList?.includes(('wx-open-launch-' + type) as OpenTag)) {
          return '没有注册跳转小程序开放标签！'
        }
        return true;
      case 'subscribe':
        if (!this.config.openTagList?.includes(('wx-open-' + type) as OpenTag)) {
          return '没有注册订阅开放标签！'
        }
        return true;
      case 'audio':
        if (!this.config.openTagList?.includes(('wx-open-' + type) as OpenTag)) {
          return '没有注册音频开放标签！'
        }
        return true;
      default:
        return '找不到对应开放标签'
    }
  }
  private async checkLoadSDK() {
    const env = this.checkWX()
    if (!isBoolean(env)) {
      return env;
    }
    if (!window.wx || !window.wx.config) {
      return await this.loadWXSDK();
    }
    const signature = this.checkSignatureConfig();
    if (!isBoolean(signature)) {
      return signature;
    }
    return true;
  }
  checkWX() {
    if (!this.isWXBrowser) {
      return '当前不是微信浏览器环境！'
    }
    return true;
  }
  private checkShareJsApiList() {
    if (!this.config.jsApiList || !this.config.jsApiList.includes('updateAppMessageShareData') || !this.config.jsApiList.includes('updateTimelineShareData')) {
      return 'Wx：config时没有配置分享api'
    }
    return true;
  }
  private checkSignatureConfig(config: ConfigOptions = this.config) {
    if (config.appId || !config.timestamp || !config.signature || !config.nonceStr) {
      return 'Wx:config签名相关字段缺失！appId、signature、nonceStr、timestamp';
    }
    return true;
  }
  private async loadWXSDK() {
    const [, , state] = await awaitWrap(loadJs('https://res.wx.qq.com/open/js/jweixin-1.6.0.js'));
    if (state === 'fulfilled') {
      return true;
    } else {
      return '加载wx-js-sdk失败！'
    }
  }
}

export default WX;
