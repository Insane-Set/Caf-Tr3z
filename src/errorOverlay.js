window.addEventListener('error', function(e) {
  var d = document.createElement('div');
  d.style.position = 'fixed';
  d.style.top = '0'; d.style.left = '0'; d.style.right = '0';
  d.style.background = 'red'; d.style.color = 'white'; d.style.padding = '10px';
  d.style.zIndex = '999999';
  d.style.fontSize = '12px';
  d.style.whiteSpace = 'pre-wrap';
  d.innerText = 'Error: ' + e.message + ' at ' + e.filename + ':' + e.lineno;
  document.body.appendChild(d);
});
