'use strict';

var express = require('express');
var request = require('request');
var Q = require('q');
var config = require('config');

var app = express();
var urls = config.targets;

var addRequest = function (url) {
  var deferred = Q.defer();
  request(url, function (err, res, body) {
    var result = {};
    result.url = url;
    if (err) {
      result.error = err.message || 'Unknown error'
    }
    if (res) {
      result.statusCode = res.statusCode;
      result.body = body;
    }
    deferred.resolve(result);
  });
  return deferred.promise;
};

app.get('/', function (req, res) {
  var requests = [];
  urls.forEach(function (url) {
    requests.push(addRequest(url));
  });
  Q.all(requests)
  .then(function (results) {
    var data = {
      results: []
    };
    results.forEach(function (result) {
      data.results.push(result);
    });
    res.send(data);
  })
  .done();
});

var server = app.listen(process.env.PORT || config.app.port, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log('App listening at http://%s:%s', host, port);
});
