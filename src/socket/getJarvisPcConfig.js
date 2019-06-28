// PC本地向硬件推送数据
var masterConfig = {};
var masterConfigDelay = 300000;
var initMasterPowerConfigTimer = null;

function initMasterPowerConfig() {
  // 是否执行了开机, 正在开机
  masterConfig.isPowerSw = false;
  // 是否开机
  masterConfig.isStartingUp = false;
}

function setMasterPowerTimer() {
  if (initMasterPowerConfigTimer) {
    clearTimeout(initMasterPowerConfigTimer);
    initMasterPowerConfigTimer = null;
  }

  // 5分钟没有响应, 视为离线
  initMasterPowerConfigTimer = setTimeout(function() {
    initMasterPowerConfig();
  }, masterConfigDelay);
}

module.exports.setMasterConfig(function(key, value) {
  key === 'isStartingUp' && setMasterPowerTimer();
  masterConfig[key] = value;
});

module.exports.getMasterConfig(function(key, value) {
  return masterConfig[key];
});

module.exports = {
  handle: function(client, data, device) {
    Object.assign(masterConfig, data);
    setMasterPowerTimer();
  }
}

initMasterPowerConfig();
