# MongoDB 安装与启动

## 安装：跟随官方文档的步骤

如何在 Mac 上安装、启动 MongoDB，以及在 Node.js 上连接 MongoDB。

macOS 安装 MongoDB 官方指导：
https://www.mongodb.com/docs/manual/tutorial/install-mongodb-on-os-x/

依次执行以下命令：

```
> xcode-select --install

> brew tap mongodb/brew

> brew update

> brew install mongodb-community@6.0
```

## 启动与终止

### 【推荐】作为 macOs 服务启动/终止 MongoDB

```
brew services start mongodb-community@6.0

brew services stop mongodb-community@6.0
```

### 作为后台进程启动/终止

```
// 启动
mongod --config /usr/local/etc/mongod.conf --fork

// 终止
// 用 mongosh 连接到 mongod 进城，用 shutdown 命令终止
```

## 安装时的错误

1. 无法安装 mongosh

在执行最后 `brew install mongodb-community@6.0` 时会报错，大意是没有安装 `mongosh`，就无法继续安装 mongodb，这是无法执行 `brew update`，官方 repo 在国内连接不上。这时确保已安装 `xcode-select`， 同时[替换 Homebrew 仓库地址](https://juejin.cn/post/6931190862295203848)，并执行 `brew update`，成功后可继续执行 `brew install mongodb-community@6.0`。

2. 安装 mongodb-community@6.0 时出错：Your Xcode(12.5.1) is too outdates

`mongodb-community@6.0` 需要更新版本的 Xcode，从应用商店更新 Xcode


