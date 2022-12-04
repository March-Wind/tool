### 运行时

1. @tarojs/rn-transformer/dist/app.js 入口文件
2. @tarojs/runtime-rn/dist/app 增加的运行时代码
   内置功能：
   - 给根元素添加同级元素：react-native-root-siblings；常用来在全局弹窗等。
   - 给全局的数据：Provider
   - 路由：@tarojs/router-rn，内置使用@react-navigation
3. @tarojs/router-rn 路由
   - 内置路由组件：@react-navigation
   - 路由分为：底部 tab 路由、普通路由，两种；
4. @tarojs/components-rn 给 rn 使用的组件
