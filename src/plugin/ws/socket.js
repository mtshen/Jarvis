/**
 * WebSocket通信基础
 * 只能由一个
 * 功能与服务器保持连接（当断开连接后主动连接服务器）
 * {
 *   wsurl
 *   msgTypeProfix
 *   req_msgTypeProfix
 *   res_msgTypeProfix
 * }
 */
import Vue from 'vue'

export const wsEventBus = new Vue()

function isString (s) {
  return typeof s === 'string'
}

export class WSMonitor {
  constructor (options) {
    this.options = isString(options) ? { wsurl: options } : options
    this.wsurl = this.options.wsurl || ''
    this.res_msgTypeProfix = this.options.res_msgTypeProfix || this.options.msgTypeProfix || ''
    // 请求队列, 在执行send时
    this.sendList = []
    this.socket = this.makeWebSocket()
    // 如果超时将转到闲置的方法中
    this.time = 0
    setInterval(() => {
      this.time += 1
      if (this.time >= 30) {
        this.time = 0
        wsEventBus.$emit('wstimeout')
      }
    }, 1000)
  }

  restart () {
    this.socket = this.makeWebSocket()
  }

  // 发送数据
  send (msgType, dataRequest = {}) {
    console.info('WS 发送:', msgType, dataRequest)

    const request = Object.assign({
      appid: '',
      requestId: '',
      warehouse: '',
      version: '1.0'
    }, dataRequest)

    const sendCallback = function sendCallback () {
      const data = isString(msgType) ? {
        msgType: `${this.req_msgTypeProfix}.${msgType}`,
        request
      } : msgType

      this.socket.send(JSON.stringify(data))
    }.bind(this)

    // 如果socket还没有准备好, 则加入到sendList中, 当准备好时发送
    if (this.socket.readyState === WebSocket.OPEN) {
      sendCallback()
    } else {
      this.sendList.push(sendCallback)
    }

    return true
  }

  destroy () {
    this.socket = null
  }

  // socket初始化, 接收数据处理函数
  makeWebSocket () {
    const socket = new WebSocket(this.wsurl)
    const { sendList } = this
    socket.onmessage = (event) => {
      this.time = 0
      const data = JSON.parse(event.data)
      wsEventBus.$emit('wsmessage', data)
    }

    // 服务重新连接, 执行未完成的操作
    socket.onopen = (event) => {
      if (socket.readyState === WebSocket.OPEN) {
        sendList.forEach(sendCallback => sendCallback())
        sendList.splice(0, sendList.length - 1)
      }
      wsEventBus.$emit('wsopen', event)
    }

    // 服务断开连接
    socket.onclose = (event) => {
      wsEventBus.$emit('wsclose', event)
    }

    return socket
  }
}
