module.exports = {
  handle(data, sendSocket) {
    sendSocket({ code: 0, msgType: 'com.jarvis.server.powerSupplyStart', msg: 'ok' });
  }
}
