var model = require('modella');
var validators = require('modella-validators');

var db = require('../db');
var level = require('modella-leveldb')(db);

var LogEvent = model('LogEvent')
  .attr('id')
  .attr('@version', {type: 'string'})
  .attr('timestamp', {type: 'string'})
  .attr('message', {type: 'string'})
  .attr('pid', {type: 'number'})
  .attr('host', {type: 'string'})
  .attr('level', {type: 'string'})
  .attr('application', {type: 'string'})
  .attr('serverName', {type: 'string'})
  .attr('meta', {type: 'string'})
  .attr('colorize', {type: 'boolean'})
  .attr('label', {type: 'string'})
  .attr('type', {type: 'string'})
  .attr('extras', {type: 'object'});

LogEvent.use(validators);
LogEvent.use(level);

LogEvent
  .index('timestamp')
  .index('host')
  .index('level')
  .index('application')
  .index('serverName')
  .index('label');

module.exports.LogEvent = LogEvent;

