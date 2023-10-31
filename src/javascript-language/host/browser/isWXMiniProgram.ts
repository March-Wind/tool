import { browserName } from './browserName';
const isWXMiniProgram = (): Promise<boolean> => {
  return new Promise((resolve, reject) => {
    if (browserName('WX')) {
      const timer = setInterval(() => {
        if (window.wx && window.wx.miniProgram && window.wx.miniProgram.getEnv) {
          clearInterval(timer);
          window.wx.miniProgram.getEnv((res: any) => {
            const { miniprogram } = res;
            resolve(miniprogram);
          });
        }
      }, 50);
      setTimeout(() => {
        clearInterval(timer);
        reject(new Error('判断微信小程序超时'));
      }, 5000);
    } else {
      resolve(false);
    }
  });
};
export { isWXMiniProgram };
