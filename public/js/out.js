$(function() {
  var ws = new WebSocket('ws://' + window.location.host + '/out');
  ws.onmessage = function(event) {
    var orientation = JSON.parse(event.data);
    $('#alpha').text(orientation.alpha.toFixed(2));
    $('#beta').text(orientation.beta.toFixed(2));
    $('#gamma').text(orientation.gamma.toFixed(2));
    var xform =
      'rotateZ(' + (-orientation.alpha) + 'deg) ' +
      'rotateX(' + (-orientation.beta) + 'deg) ' +
      'rotateY(' + (orientation.gamma) + 'deg) ';
    $('#iphone').css({
      'transform': xform,
      '-moz-transform': xform,
      '-webkit-transform': xform,
      '-o-transform': xform,
      '-ms-transform': xform
    });
  };
});
