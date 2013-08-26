/*
** LIBRARY : Requirements Management
***********************************************/

function requireScripts(list) {
  var dom = false;
  var scripts = [];
  
  for (var id in list)
    scripts.push({ url: list[id], loaded: false });

  function onScriptReady(evt) {
    scripts[evt.target.getAttribute('data-ID')].loaded = true;
    checkReadyState();
  }
 
  function onDomReady(evt) {
    dom = true;
    checkReadyState();
  }
  
  function checkReadyState() {
    var ready = dom;

    for (var id in scripts)
      ready = ready && scripts[id].loaded;
    
    if (ready) fireEvent(window, 'pageReady');
  }
  
  for (var id in scripts) {
    var domElement = document.createElement('script');
    
    domElement.type = 'text/javascript';
    domElement.setAttribute('data-ID', id);
    domElement.src = scripts[id].url + '?' + (new Date().getTime());
        
    addEvent(domElement, 'load', onScriptReady);
    addEvent(domElement, 'readystatechange', onScriptReady);

    document.getElementsByTagName('head')[0].appendChild(domElement);
  }
  
  addEvent(window, "DOMContentLoaded", onDomReady);
}
