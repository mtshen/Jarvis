/**
 * the valiant knights of programming who toil away, without rest,
 * fixing our most awful code. To you, true saviors, kings of men,
 * I say this: never gonna give you up, never gonna let you down,
 * never gonna run around and desert you. Never gonna make you cry,
 * never gonna say goodbye. Never gonna tell a lie and hurt you.
 */
'use strict';

// 网络
var net = require('net');
var socketHandle = require('./socket/index');
var socketStatus = require('./socket/isStatus');

// TODO: 对高频触发的优化策略
var triggerStrategy = require('./socket/triggerStrategy');

// 硬件模块
var swit = require('./device/swit');
var contactorRelay = require('./device/contactorRelay');

/* 一些常量 */
// 连接端口
var connentPort = 8890;
// 断线重连
var closeConnentTime = 10000;
// 连接地址
var connentPath = '47.92.226.156';

// 设备
var device = {};

$.ready(function (error) {
   if (error) {
      console.log(error);
      return;
   }

   // 绑定设备
   device.contactorRelay = $('#relay-1c');

   // 初始化设备
   contactorRelay.init(device);

   // 连接服务器
   netConnent();
});

$.end(function () {
   contactorRelay.init(device);
});

function netConnent() {
   var client = net.connect(connentPort, connentPath || '127.0.0.1', function() {
      socketStatus.init(client);
   });
   client.on('data', function(data) {
      var messageInfo = JSON.parse(data.toString());
      var msgType = messageInfo.msgType;
      var handle = socketHandle[msgType];

      if (!triggerStrategy(msgType)) {
         try {
            handle && handle.handle(client, messageInfo, device);
         } catch (error) {
            client.write({
               code: 1,
               data: msgType,
               msg: '设备错误!',
               msgType: 'com.common.server.error',
            });
            console.log(error.message);
         }
      }
   });

   // 断线重连
   client.on('close', function() {
      socketStatus.close(client);
      setTimeout(function() {
         netConnent();
      }, closeConnentTime);
   });

   client.on('error', function() {
      client.destroy();
   });
}
