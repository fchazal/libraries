/*
** LIBRARY : Event Management
**
** addEvent(eventTrigger, eventName, eventHandler, scopeElement)
** fireEvent(eventTrigger, eventName, eventData)
** removeEvent(eventTrigger, eventName, eventHandler)
**
***********************************************/

function addEvent(eventTrigger, eventName, eventHandler, scopeElement) {
	var scopedEventHandler = null;
	
	if (scopeElement === undefined)
		scopedEventHandler = eventHandler;
  else
    scopedEventHandler = function(e) {
      eventHandler.apply(scopeElement, [e]);
    }

  eventTrigger.addEventListener(eventName, scopedEventHandler, false);
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

function removeEvent(eventTrigger, eventName, eventHandler) {
  eventTrigger.removeEventListener(eventName, eventHandler, false);
} 
