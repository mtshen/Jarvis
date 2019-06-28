const comJarvisPcIsStatus = require('./comJarvisPcIsStatus');
const comJarvisRuffIsStatus = require('./comJarvisRuffIsStatus');
const powerSupplyStartRespond = require('./powerSupplyStartRespond');
const powerSupplyStartRequest = require('./powerSupplyStartRequest');

const webSocketMap = {};

// 心跳包 PC
webSocketMap['com.jarvis.pc.isStatus'] = comJarvisPcIsStatus;
// 心跳包 RUFF
webSocketMap['com.jarvis.ruff.isStatus'] = comJarvisRuffIsStatus;

// WEB 端请求开机
webSocketMap['com.jarvis.web.powerSupplyStart'] = powerSupplyStartRequest;
// RUFF 端回应开机
webSocketMap['com.jarvis.ruff.powerSupplyStart'] = powerSupplyStartRespond;

module.exports = webSocketMap;
