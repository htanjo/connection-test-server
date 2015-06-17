(function (window) {
  'use strict';

  var $ = window.jQuery;
  var Dyframe = window.Dyframe;

  var dyframe = new Dyframe($('#body')[0]);

  var render = function (statusCode, body) {
    $('#status-code').text(statusCode);
    dyframe.render({
      html: body
    });
  };

  $('#form').submit(function (event) {
    var url = $('#url').val();
    event.preventDefault();
    if (url) {
      render('', '');
      $.ajax({
        url: '/api/' + url
      }).done(function (data) {
        var statusCode = data.statusCode || '';
        var body = data.body || '';
        render(statusCode, body);
      });
    }
  });

}(window));
