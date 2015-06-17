'use strict';

var express = require('express');
var request = require('request');
var router = express.Router();

router.get('/:url(*)', function (req, res) {
  var url = req.params.url;
  if (!url) {
    res.json({
      message: 'No url parameter'
    });
    return;
  }
  request(url, function (err, response, body) {
    var result = {};
    result.url = url;
    if (err) {
      result.error = err.message || 'Unknown error'
    }
    if (response) {
      result.statusCode = response.statusCode;
      result.body = body;
    }
    res.json(result);
  });
});

module.exports = router;
