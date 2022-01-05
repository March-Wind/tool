import { loadJs } from '../browser/loadjs'
import axios from 'axios';
import { ConfigOptions, UpdateAppMessageShareDataOptions } from './typing/jweixin'
interface SignatureParam {
  appId: string;
}
interface SignatureResult {
  appId: string;
  timestamp: number;
  nonceStr: string;
  signature: string;
}

class Wx {
  config: ConfigOptions;
  private checkLoadSDK() {
    if (!window.wx || !window.wx.config) {
      this.loadWXSDK();
    }
  }
  private checkSignatureConfig(config: ConfigOptions = this.config) {
    if (!config.timestamp || !config.signature || !config.nonceStr) {
      throw new Error('Wx:config签名相关字段缺失！signature、nonceStr、timestamp')
    }
  }
  loadWXSDK() {
    return loadJs('https://res.wx.qq.com/open/js/jweixin-1.6.0.js');
  }
  wxConfig(config: ConfigOptions): Promise<void> {
    this.checkLoadSDK();
    this.checkSignatureConfig();
    return new Promise((resolve, reject) => {
      this.config = {
        ...this.config,
        ...config,
        jsApiList: ['checkJsApi', ...(config.jsApiList || [])]
      }
      window.wx.config(this.config);
      window.wx.ready(() => {
        resolve();
      });
      window.wx.error(() => {
        reject();
      })
    })
  }
  /**
   * 设置分享，使用前需要在jsApiList中注册api才能使用
   */
  setShareConfig(options: UpdateAppMessageShareDataOptions) {
    this.checkLoadSDK()
    this.checkSignatureConfig();
    if (!this.config.jsApiList || !this.config.jsApiList.includes('updateAppMessageShareData') || !this.config.jsApiList.includes('updateTimelineShareData')) {
      throw new Error('Wx：config时没有配置分享api')
    }
    window.wx.updateAppMessageShareData(options);
    window.wx.updateTimelineShareData(options);
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
}

export default new Wx();