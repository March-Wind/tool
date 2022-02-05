type KernelName = 'Webkit' | 'Trident' | 'Presto' | 'Gecko'; // 现在chrome的UA的渲染引擎写着KHTML，like Gecko,KHTML内核的分支之一是Webkit,Blink是Webkit的分支，Chromium项目之前是webkit现在是blink,或者使用applewebkit来标识；opera浏览器之前内核是presto，从9.50版本变成Gecko。现在都是追捧Gecko
enum KernelNameMap { // 之前是webkit内核，现在叫AppleWebKit
  Webkit = 'AppleWebKit',
  AppleWebKit = 'AppleWebKit',
  Trident = 'Trident',
  Presto = 'Presto',
  Gecko = 'Gecko',
}
const UA = navigator.userAgent;

type BrowserKernelResult = KernelName | boolean | undefined;
/**
 * 浏览器内核:渲染引擎
 * @param {KernelName} [kernelName]
 * @param {string} [userAgent]
 * @return {*}  {BrowserKernelResult}
 */
const browserKernel = (kernelName?: KernelName, userAgent?: string): BrowserKernelResult => {
  const usedUA = userAgent ? userAgent : UA;
  if (kernelName) {
    return new RegExp(KernelNameMap[kernelName]).test(usedUA);
  } else {
    const regExps: KernelName[] = ['Webkit', 'Trident', 'Presto', 'Gecko'];
    return regExps.find((kernel) => new RegExp(KernelNameMap[kernel]).test(usedUA));
  }
};
export { browserKernel };
