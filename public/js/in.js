$(function() {
  var ws = new WebSocket('ws://' + window.location.host + '/in');
  ws.onclose = ws.onerror = function(event) {
    ws = null;
  };
  ws.onopen = function() {
    window.addEventListener('deviceorientation', function(event) {
      if (ws) {
        $('#alpha').text(event.alpha.toFixed(2));
        $('#beta').text(event.beta.toFixed(2));
        $('#gamma').text(event.gamma.toFixed(2));
        ws.send(JSON.stringify({
          alpha: event.alpha,
          beta: event.beta,
          gamma: event.gamma
        }));
      }
    }, true);
  };
});
