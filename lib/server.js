var dgram = require('dgram');
var db = require('./db');
var models = require('./models');
var _ = require('lodash');
var http = require('http');
var levelweb = require('levelweb');

var handle = require('server/handle');

module.exports = function server(opts) {
  http.createServer(levelweb(db, {prefix: '/'})).listen(opts.web_port);

  var socket = dgram.createSocket(opts.type||'udp4');
  socket.bind(opts.port, function() {
    socket.on('message', function (msg, rinfo) {
      handle(server, models, rinfo, msg);
    });
  });

  return socket;
};

