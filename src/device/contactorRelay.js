var masterConfig = require('./../socket/getJarvisPcConfig');

// 继电器闭合间隔
var tirggerPowerTime = 500;
module.exports.init = function(device) {
  device.contactorRelay.turnOff();
}

/**
 * 模拟继电器短时间闭合
 */
module.exports.triggerPowerSw = function(device, callback) {
  var isStartingUp = masterConfig.getMasterConfig('isStartingUp');
  var isPowerSw = masterConfig.getMasterConfig('isPowerSw');

  if (!isPowerSw && !isStartingUp) {
    masterConfig.setMasterConfig('isStartingUp', true);

    device.contactorRelay.turnOn(function() {
      setTimeout(function() {
        device.contactorRelay.turnOff(function() {
          callback && callback();
        });
      }, tirggerPowerTime || 500);
    });
  }
}
