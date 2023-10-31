### 工具函数

### 其他常用

#### 终端代理：

> export http_proxy=http://127.0.0.1:1087
> export https_proxy=http://127.0.0.1:1087

> export http_proxy=socks5://127.0.0.1:1086
> export https_proxy=socks5://127.0.0.1:1086

#### chrome 非安全模式

> open -n /Applications/Google\ Chrome.app/ --args --disable-web-security --user-data-dir=/Users/xmly/MyChromeDevUserData/;

#### css 画三角，计算 border-width 值

#### charles 破解版

> http://macwk.com/

#### curl 转语言请求

> https://reqbin.com/req/c-dwjszac0/curl-post-json-example

### webpack 热更新原理

> https://www.163.com/dy/article/GDRFBIJL0511FQO9.html

> https://juejin.cn/post/6844903953092591630

> https://github.com/Jocs/jocs.github.io/issues/15

### rollup 小插件开发

> https://juejin.cn/post/7023284800966361124

### mac 调试 react-native

1. 电脑内调试安卓：
   > MAC 下网易 MuMu 模拟器调试 ReactNative: https://blog.csdn.net/u011215669/article/details/104504279

> mac 下安装 adb 环境的三种方式: https://juejin.cn/post/7011002186641932324

### 国内镜像源

> https://tuna.moe/

### taro RN

1. 设置字体一定要给 Text 组件设置字体，嵌套 Text 的属性并不继承,容易造成字体很大的问题。

### .DS_store 操作

1. 禁止.DS_store 生成：
   > 打开   “终端” ，复制黏贴下面的命令，回车执行，重启 Mac 即可生效。`defaults write com.apple.desktopservices DSDontWriteNetworkStores -bool TRUE`
2. 恢复.DS_store 生成：
   > `defaults delete com.apple.desktopservices DSDontWriteNetworkStores`

export LD_LIBRARY_PATH=/usr/local/opt/opencv/lib:$LD_LIBRARY_PATH

### 安卓微信的 webview debug

1 手机用 usb 连接至电脑

2.手机微信内点击http://debugxweb.qq.com/?inspector=true（只要跳转过微信首页就是开启了调试）

3.微信内打开所需调试网址

4.chrome 浏览器打开 chrome://inspect/#devices 会看到 com.tencent.mm 下是我们打开的网址

5.在点击 chrome 里的 inspect 直接调试
