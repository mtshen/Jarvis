module.exports = {
  handle(data, sendSocket) {
    this.write(JSON.stringify({
      code: 0,
      msgType: 'com.server.isStatus',
      msg: 'ok'
    }));
  }
}
