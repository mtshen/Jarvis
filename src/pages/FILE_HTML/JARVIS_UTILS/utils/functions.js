/**
 * 目前功能分为
 * [custom] 自定义
 * [preset] 预设
 */
import Vue from 'vue';
import * as websocketMsgType from '@/constants/websocketMsgType'

const funRegExp = /^\[(?<type>custom|preset)\]\[(?<key>\w+)\]\((?<value>.{0,})\)$/;
const presetMap = new Map([
  ['powerSupplyStart', () => {
    Vue.prototype.socket.send({
      msgType: websocketMsgType.powerSupplyStart,
    });
    console.log('启动电源!');
  }],
  ['run', (text) => {
    console.log('执行', text);
  }]
]);

export default function(funText) {
  const funInfo = funRegExp.exec(funText);
  if (funInfo) {
    const { type, key, value } = funInfo.groups;
    switch(type) {
      // 预设功能
      case 'preset':
        const presetItem = presetMap.get(key);
        if (presetItem) {
          presetItem(value);
        }
        break;
      // 自定义功能 TODO:
      case 'custom': break;
      // 其他
      default: break;
    }
  }
};
