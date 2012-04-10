$(function () {
  var ws = new WebSocket('ws://' + window.location.host + '/out');
  ws.onmessage = function (event) {
    var orientation = JSON.parse(event.data);
    $('#alpha').text(orientation.alpha.toFixed(2));
    $('#beta').text(orientation.beta.toFixed(2));
    $('#gamma').text(orientation.gamma.toFixed(2));
    var xform =
      'rotateZ(' + (-orientation.alpha) + 'deg) ' +
      'rotateY(' + (orientation.gamma) + 'deg) ' +
      'rotateX(' + (-orientation.beta) + 'deg) ';
    $('#iphone').css('-webkit-transform', xform);
  };
  ws.onclose = function (event) {
    console.log(event);
  };
  ws.onerror = function (event) {
    console.log(event);
  };
});
