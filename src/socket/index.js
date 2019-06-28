var socketMsgType = require('./socketMagType');
var powerSupplyStart = require('./powerSupplyStart');
var webSocketMap = {};

// 启动继电器
webSocketMap[socketMsgType.powerSupplyStart] = powerSupplyStart;

module.exports = webSocketMap;
