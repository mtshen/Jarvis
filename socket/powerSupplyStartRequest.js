module.exports = {
  handle(data, sendSocket) {
    sendSocket({ msgType: 'com.jarvis.server.powerSupplyStart' });
  }
}
