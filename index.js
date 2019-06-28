/**
 * the valiant knights of programming who toil away, without rest,
 * fixing our most awful code. To you, true saviors, kings of men,
 * I say this: never gonna give you up, never gonna let you down,
 * never gonna run around and desert you. Never gonna make you cry,
 * never gonna say goodbye. Never gonna tell a lie and hurt you.
 */
const net = require('net');
const WebSocket = require('ws');
const socketHandle = require('./socket/index');

const tcpServer = net.createServer();
const wss = new WebSocket.Server({ port: 8889 });

/**
 * 这里创建了2个连接 WEB: 8889, RUFF: 8890
 * 分别对应ruff端, 与web端 web端发送的消息会广播道ruff端
 * ruff端发送的消息会广播到web端  此时node更像是一个中间件一样的存在
 */

const webSocketConnectionList = [];
const ruffSocketConnentionList = [];

// web端
wss.on('connection', initWebSocket);

// 硬件端
tcpServer.on('connection', initRuffSocket);
tcpServer.listen(8890);

/**
 * 这个函数是对web端socket的处理
 * @param {*} ws 进入的socket
 */
function initWebSocket(ws) {
  webSocketConnectionList.push(ws);

  // web端接收消息
  ws.on('message', function (message) {
    try {
      const messageInfo = JSON.parse(message);
      const { msgType } = messageInfo;
      const handle = socketHandle[msgType];
      handle && handle.handle.call(ws, messageInfo, sendRuffSocket);
    } catch (error) {
      sendWebSocket({
        code: 1,
        data: msgType,
        msg: '服务器错误!',
        msgType: 'com.common.server.error',
      });
      console.log(error.message);
    }
  });

  // web端连接断开
  ws.on('close', function() {
    for (let index = webSocketConnectionList.length - 1; index >= 0; index --) {
      if (webSocketConnectionList[index] === ws) {
        webSocketConnectionList.splice(index, 1);
        return;
      }
    }
  });
}

/**
 * 👆👆同上👆👆
 * @param {*} socket
 */
function initRuffSocket(socket) {
  ruffSocketConnentionList.push(socket);
  socket.on('data', (data)=>{
    try {
      const messageInfo = JSON.parse(data.toString());
      const { msgType } = messageInfo;
      const handle = socketHandle[msgType];
      handle && handle.handle.call(socket, messageInfo, sendWebSocket);
    } catch (error) {
      sendRuffSocket({
        code: 1,
        data: msgType,
        msg: '服务器错误!',
        msgType: 'com.common.server.error',
      });
      console.log(error.message);
    }
  });

  socket.on('error', (err) => socket.destroy());

  socket.on('end', function() {
    for (let index = ruffSocketConnentionList.length - 1; index >= 0; index --) {
      if (ruffSocketConnentionList[index] === socket) {
        ruffSocketConnentionList.splice(index, 1);
        return;
      }
    }
  });
};

/**
 * 推送消息时 web端使用的是 socket.sned ruff端使用的是 socket.write
 */

// 向ruff端推送消息
function sendRuffSocket(data) {
  ruffSocketConnentionList.forEach((socket) => {
    socket.write(JSON.stringify(data));
  });
}

// 向web端推送消息
function sendWebSocket(data) {
  webSocketConnectionList.forEach((socket) => {
    socket.send(JSON.stringify(data));
  });
}
