### 工具函数

### 其他常用

#### 终端代理：

> export http_proxy=http://127.0.0.1:1087
> export https_proxy=$http_proxy

#### chrome 非安全模式

> open -n /Applications/Google\ Chrome.app/ --args --disable-web-security --user-data-dir=/Users/xmly/MyChromeDevUserData/;

#### 快捷键

1. 切换 mac 左右屏： control + fn + 左右键
2. 跳转文件顶部、底部、行首、行尾：command + fn + 上下左右
3. 切换文件 tab 的当前页：ctrl + 12345
4. 侧边栏显/隐：Ctrl+B
5. Ctrl + ~
6. option + command + 左右
7. 折叠和展开代码：option + command + {和}
8. 谷歌截屏：打开需要截长图的网页，右键--检查--Shift + Command + P，输入“screen”，选择各种截屏的需要

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


### mac 调试react-native
1. 电脑内调试安卓：
  > MAC下网易MuMu模拟器调试ReactNative: https://blog.csdn.net/u011215669/article/details/104504279

  > mac下安装adb环境的三种方式: https://juejin.cn/post/7011002186641932324

### 国内镜像源
> https://tuna.moe/
### taro RN
1. 设置字体一定要给Text组件设置字体，嵌套Text的属性并不继承,容易造成字体很大的问题。
