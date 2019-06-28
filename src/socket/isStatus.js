/**
 * 心跳处理
 */
var serverIsStatus = require('./socketMagType').serverIsStatus;

var isStatusList = [];

// 默认心跳时间间隔是30s
var statusTime = 30000;

// 初始化socket心跳
module.exports.init = function(socket) {
  socket.write(JSON.stringify({ code: 0, msgType: serverIsStatus }));
  var interval = setInterval(function() {
    socket.write(JSON.stringify({ code: 0, msgType: serverIsStatus }));
  }, statusTime);
  isStatusList.push({ socket: socket, interval: interval });
}

// 注销socket心跳
module.exports.close = function(socket) {
  for (var index = isStatusList.length - 1; index >= 0; index --) {
    if (isStatusList[index] === socket) {
      clearInterval(isStatusList[index].interval);
      isStatusList.splice(index, 1);
      return;
    }
  }
}
