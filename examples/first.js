var winston = require('winston');
var LogstashUDP = require('winston-logstash-udp').LogstashUDP;

function createLogger(port) {
  return new (winston.Logger)({
    transports: [
      new (winston.transports.LogstashUDP)({
      port: port,
      appName: 'MyApp',
      host: 'localhost',
      level: 'debug'
    })
    ]
  });
}

var logger = createLogger(9999);
setTimeout(function () {
  logger.debug({foo: 'bar'});
}, 100);

setTimeout(function () {
  logger.debug('This is a message');
  setTimeout(function() {
    process.exit(0);
  }, 500);
}, 1000);

