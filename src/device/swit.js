/**
 * 这里是大按键模块控制
 */

// 初始化事件
module.exports.init = function (device) {
  // 开
  device.swit.on('push', function () {
    device.contactorRelay.turnOn();
  });

  // 关
  device.swit.on('release', function () {
    device.contactorRelay.turnOff();
  });
}
