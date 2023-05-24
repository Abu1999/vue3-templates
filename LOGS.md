# 个人记录

### 2023-5-24
1. yarn dev 启动报错 
```js
[vite] Internal server error: parsing E:\study\vue3-templates\tsconfig.json failed: SyntaxError: Unexpected token   in JSON at position 238
```
解决：在 tsconfig.josn 中有注释属性，删除即可。

2. 配置tailwind报错
```js
node:internal/process/promises:279
            triggerUncaughtException(err, true /* fromPromise */);
            ^
[Failed to load PostCSS config: Failed to load PostCSS config (searchPath: E:/study/vue3-templates): [Error] Loading PostCSS Plugin failed: Cannot find module 'autoprefixer'
Require stack:
```
解决：重新安装 