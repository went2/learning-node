# 持久化

app 数据持久化的工作终归要在服务端做。

- 掌握 node.js 中实现持久化的多种方法
- 掌握 mysql 下载、安装和配置
- 掌握 node.js 中原生 mysql 驱动模块的应用
- 掌握 node.js 中的 ORM 模块 Sequelize 的应用
- 掌握 Sequelize 的应用案例

## Node.js 实现持久化的多种方法

- 文件系统 fs
- 数据库
  - 关系型数据库-mysql
  - 文档型数据库-mongoDB
  - 键值对数据库-redis

### 1. 用 fs 存取 json 数据

适用简单数据的存取

### 2. 原生 mysql 驱动 node-mysql 应用

### 3. Node.js ORM模块-Sequelize 

数据库中间件，介于业务与数据库之间，基于Promise的ORM（Object Relation Mapping），它把数据库映射成对象，使我们可以通过操作对象的方式操作数据库，代替直接写sql语句，支持多种数据库、事务、关联等。

安装：`npm i sequelize mysql2 -S`

#### Sequelize 实体关系模型实战——一个基本的商城应用

### 4. MongoDB——数据库实现的敏捷方式

为什么敏捷？因为不用提前设计表结构，直接存取json

- Mac 上安装 MongoDB 并启动服务，见[mongoDB安装与启动](./mongo/mongoDB安装与启动.md)
- mongodb express 控制界面（需搭配 docker 使用）

#### 4.1 native

- MongoDB 增删改查

- 使用 EventEmitter 进行异步过程之间的通信（如异步的数据库创建与应用创建之间的通信）
  

#### 4.2 Mongoose

#### 4.3 零编码方式

只需定义模型，就可以自定生成数据库增删改查接口