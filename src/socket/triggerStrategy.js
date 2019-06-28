var triggerStrategy = {};

// 检查是否正在执行
module.exports = function(msgType) {
  return !!triggerStrategy[msgType];
}

module.exports.on = function(msgType) {
  triggerStrategy[msgType] = true;
  return true;
}

module.exports.off = function(msgType) {
  triggerStrategy[msgType] = false;
  return true;
}
