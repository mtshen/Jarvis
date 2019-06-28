module.exports = {
  handle(data, sendSocket) {
    this.send(JSON.stringify({
      code: 0,
      msgType: 'com.server.isStatus',
      msg: 'ok'
    }));
  }
}
