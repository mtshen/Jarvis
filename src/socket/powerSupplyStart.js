var contactorRelay = require('../device/contactorRelay');
var powerSupplyStartRespond = require('./socketMagType').powerSupplyStartRespond;

module.exports = {
  handle: function(client, data, device) {
    contactorRelay.triggerPowerSw(device, function() {
      client.write(JSON.stringify({ code: 0, msgType: powerSupplyStartRespond, msg: 'ok' }));
    });
  }
}
