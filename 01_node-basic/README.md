# Node.js 基础

## node 内建模块

```js
const os = require("os");
const memPercent = (os.freemem() / os.totalmem()) * 100;
console.log(`内存占用率${memPercent.toFixed(2)}`);
```

### fs 模块

```js
const data = fs.readFileSync("./test.js");
data.toString();
```

node 对于二进制级别的操作封装在 Buff 模块中。读取文件拿到的是 Buff 类型的对象（文件的二进制形式）

**文件的流 Stream**

高级语言使用**流**这个概念操作文件。http 模块中的回调参数 response 对象就是一个 stream 对象。

```js
const fs = require("fs");
// 创建了一个文件读取流（管道），并没有把整个文件读进内存，只是创建一个和文件关联的读取管道
const rs = fs.createReadStream("./01.jpg");
// 创建了一个文件写出管道，并没有创建 02.jpg 这个文件，此时它是虚无缥缈的
const ws = fs.createWriteStream("./02.jpg");
// 将读取流和写出流接到一起，此时01.jpg的内容会通过 rs ws 流向 02.jpg，即复制了01.jpg命名为02.jpg
rs.pipe(ws);
```

### Buff 模块

默认使用 UTF-8 编码方案

```js
const buf1 = Buffer.from("创建一个Buff");
```

### http 模块

对 http 模块的使用，展示如何 handle 不同路由

示例代码见 `./http/http.js`

### 第三方模块

#### download-git-repo 模块

```
npm i download-git-repo -s
```

```js
const download = require("download-git-repo");
const ora = require("ora");
const process = ora(`正在下载...`);
process.start();

// 从 github 上下载仓库
download("github:su37dfwxcsdf/vue-template", "../test", (err) => {
  if (err) {
    process.fail();
  } else {
    process.succeed();
  }
});

// 用 node util 的 promisify 将使用回调的函数包装成基于 promise 的函数
const repo = "github:su37dfwxcsdf/vue-template";
const desc = "../test";
clone(repo, desc);
async function clone(repo, desc) {
  const { promisify } = require("util");
  const download = promisify(require("download-git-repo"));
  const ora = require("ora");
  const process = ora(`正在下载...`);
  process.start();

  try {
    await download(repo, desc);
    process.succeed();
  } catch (e) {
    process.fail();
  }
}
```
