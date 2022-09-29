# Egg.js

## 特点

### 提供了三层结构

- 信息资源层，就是action，或叫servlet， 用来处理上下游数据结构，接口层
- 业务逻辑层，应用中会有一层service抽象，实现核心业务逻辑，事务控制也在这层实现。
- 数据访问层，即DAO层，负责数据库访问，完成持久化功能。

### 通过约定目录（约定路由）方式，各层之间互相调用比较简单

## 创建项目

```
npm i egg-init -g
egg-init egg-project --type=simple
```

## 实现一个约定路由

实现约定路由：'./ygg'
使用约定路由：'./index.js'