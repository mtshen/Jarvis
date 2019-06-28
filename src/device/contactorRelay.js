// 继电器闭合间隔
var tirggerPowerTime = 500;
var powerSw = false;
module.exports.init = function(device) {
  device.contactorRelay.turnOff();
}

/**
 * 模拟继电器短时间闭合
 */
module.exports.triggerPowerSw = function(device, callback) {
  console.log(powerSw);
  if (!powerSw) {
    powerSw = true;
    device.contactorRelay.turnOn(function() {
      setTimeout(function() {
        device.contactorRelay.turnOff(function() {
          powerSw = false;
          callback && callback();
        });
      }, tirggerPowerTime || 500);
    });
  }
}
