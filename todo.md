### 工程化

1. ts-node 支持 alias:https://github.com/TypeStrong/ts-node/pull/1585
   > 本身是 ts-node 不支持,tsconfig-path 以及其他的不支持 esm
2. 集成 jest 测试 react
3. 集成 jest 测试 pupter
4. 增加代码提交的规范性
   `"lint-staged": "lint-staged", "preversion":"git add . && git commit -m 'feat: 测试' &&npm run build:prod", "prepublishOnly": "npm run pushCode --TAG_NAME=$TAG_NAME && npm version patch && npm run build:prod", "pushCode": "git add . && git commit -m 'feat: $TAG_NAME' && git push origin master", "postpublish": "git push origin master"`

### code

1. URL 方法完善
2. cache 里面增加 cookie 操作方法
3. 页面生面周期和钩子函数
