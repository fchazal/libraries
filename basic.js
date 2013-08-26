

/* LIBRARY : Class Management
***********************************************/

Element.prototype.hasClass = function(cls) {
	return null !== this.className.match(new RegExp('(\\s|^)'+cls+'(\\s|$)'));
}

Element.prototype.addClass = function(cls) {
	if (!this.hasClass(cls)) this.className += " "+cls;
}

Element.prototype.removeClass = function(cls) {
  if (this.hasClass(cls)) {
    var reg = new RegExp('(\\s|^)'+cls+'(\\s|$)');
		this.className = this.className.replace(reg,' ');
	}
}

Element.prototype.toggleClass = function(cls) {
  if (!this.hasClass(cls))
		this.addClass(cls);
	else
		this.removeClass(cls);
}


/* LIBRARY : Requirements Management
***********************************************/

function requireScripts(scripts, callback) {
  for (var id in scripts) {
    var script = document.createElement('script');
    
    script.type = 'text/javascript';
    script.src = scripts[id] + '?' + (new Date().getTime());
    
    if (callback) {
      script.onreadystatechange = callback;
      script.onload = script.onreadystatechange;
    }
    
    document.getElementsByTagName('head')[0].appendChild(script);
  }
}


/* LIBRARY : Event Management
***********************************************/

function addEvent(eventTrigger, eventName, eventHandler, scopeElement) {
	var scopedEventHandler = null;
	
	if (scopeElement !== undefined)
		scopedEventHandler = function(e) { eventHandler.apply(scopeElement, [e]); }
	else
		scopedEventHandler = eventHandler;

  if(document.addEventListener)
    eventTrigger.addEventListener(eventName, scopedEventHandler, false);
  else if(document.attachEvent)
    eventTrigger.attachEvent("on"+eventName, scopedEventHandler);
}

function fireEvent(eventTrigger, eventName, eventData) {
	var evt = null;
	
	if (typeof Event !== 'undefined') {	
		evt = new Event(eventName);
	} else {
		evt = document.createEvent("Event");
		evt.initEvent(eventName, true, true);
	}
  evt.data = eventData;
  eventTrigger.dispatchEvent(evt);
}
