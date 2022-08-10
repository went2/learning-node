# Node 面试题笔记

### 0. node 模块

- 核心模块：不用 require 可以用
    - buffer：处理二进制数据流
    - module
    - process

- 内置模块：不用安装，需要 require 使用
  - os
  - fs
  - path
  - http
  - event

### 1.写前端为什么要学 node.js？

现在写前端不仅仅写 HTML、CSS 和 JavaScript 就够了，现在写前端是将它作为一个工程来写，这个工程建立在 node 之上。工程中使用的前端框架如 react、vue 的源代码不能直接在浏览器上跑，需要 webpack 之类的工具将工程代码转译为原生代码，而 webpack 这类的工具就是用 node 来实现的。

学习 node 是为了了解前端工程化，了解 npm 包管理工具、webpack 打包工具的工作原理。

### 2.为什么要升级 node 版本？怎么升级？

什么情况要把 node 版本从 8 升级到 11？
    - 使用新的 ES 语法
    - webpack 会依赖 node 的新 api 来优化效率，使用新版本 node 会比旧版本打包速度快

如何升级node版本？使用 `nvm`

nvm 可以在电脑上安装不同的node版本，并且方便在不同版本间切换

`nvm ls`: 列出所有node版本
`nvm use v10.13.0`: 切换到指定版本
`nvm install v10.13.0`: 安装npm 指定版本

### 3.模块化的差异，AMD，COMMONJS，ESMODULE 之间的差别

AMD: 
    - 依赖前置。比如a、b模块要在c中使用，直接将a、b 作为参数传入c模块，它们和c的耦合就很少，如果要引入d模块，直接改参数就行，不用动c模块；
    - 动态引入，模块引入是运行时的机制

CommonJS：
    - require()语法，比如a、b模块要在c中使用，要在c中 require(a),require(b)，如果要引入d模块，就要在c中改，模块之间就有耦合；
    - 动态引入，模块引入是运行时的机制；

ESModule:
    - 静态引入，要引入什么，在一开始就要决定。webpack 打包时要求模块引入必须静态引入；

### 4.说出图片预览上传到服务器的过程(FileReader.readAsDataURL)

高版本浏览器，通过(FileReader.readAsDataURL)：

```HTML
<input type="file" onchange=function(){}>
<img src="{onchange 事件中的通过 FileReader.readAsDataURL 得到的base64 }">
```

低版本浏览器，没有 FileReader，如何预览图片？

```HTML
<input type="file" onchange=function(){}>
<img src="url">
```

在 onchange 时，让 input 通过表单提交给后端，后端存储完后返回一个图片url，前端将 url 赋给img标签

上传进度：后端要有一个接口告知上传进度，前端轮询该接口；H5 有 Api

### 5. token 存在 cookie 里，过期怎么处理？

重新登陆

### 6. node 框架中的 mvc

基本概念：
    - model：获取、保存数据
    - view：视图展示
    - controller：控制，将数据和视图结合起来

### 7. mongoDB 与 MySQL

非常灵活的数据，需要随时增加字段时用 MongoDB；结构化的数据，用 MySQL

### 8. Less(js), sass(ruby), stylus, css, 命名空间与 css module

less 底层是 js 帮你做编译，sass 用 ruby 做编译

命名空间：
    - 一种做法是在每个 css 类名加上不同的前缀`.home-header`、`.home-content`
    - 另一种是写 vue 时`<style scoped></style>`，其原理是 webpack 使用了 css-loader，设置`module: true`

### 9. 工程化上的按需加载

或在具体项目中叫**异步组件**，原理是 webpack 支持 `import('a.js').then()` 这样的写法异步加载 js 文件(组件)

### 10. git 冲突解决

解决产线上的问题，git 分支如何管理

### 11. 设计模式

- 发布订阅模式：解耦组建之间的关系
- 组合/继承：组合比继承更好维护
- 单例：一个模块就是一个单例，对于模块来说，导出的是一个引用

### 12.node 中的 npm 与版本管理(package.lock, yarn.lock)

`package.lock` 锁文件，执行 npm install 时会使用 lock 文件安装相应版本的包，因此来保持本地与线上环境的包版本一致。

### 13. webpack

    - 一定要会
    - 读官方文档：Guide、Concepts、Api、Configuration
    - 打包原理、loader怎么写、plug-in怎么写

### 14. 后端环境的搭建

- 安装 node
- pm2 启动node

### 15. typescript

