const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);

// 静态服务
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

// socket 聊天室服务
io.on('connection', (socket) => {
  console.log('a user has connected.');

  // 服务端监听前端 emit 的 chat message 事件
  socket.on('chat message', (msg) => {
    console.log('chat message: ', msg);
    // 广播给所有监听该事件的客户端
    io.emit('chat message', msg);
  });

  socket.on('disconnect', () => {
    console.log('a user has disconnected');
  });
});

http.listen(3000, () => {
  console.log('app listens at 3000');
});