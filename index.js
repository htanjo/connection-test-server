'use strict';

var express = require('express');
var config = require('config');

var api = require('./routes/api');
var app = express();

app.use(express.static(__dirname + '/public'));
app.use('/api', api);

var server = app.listen(process.env.PORT || config.app.port, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log('App listening at http://%s:%s', host, port);
});
