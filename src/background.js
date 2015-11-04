var defaultKeyMaps = [
  {key:'g',url:'http://google.com'},
  {key:'f',url:'http://facebook.com'},
  {key:'t',url:'http://twitter.com'},
];

if(localStorage.getItem('initiated') !== 'yes'){
  localStorage.initiated = 'yes';
  defaultKeyMaps.map(function(obj,i){
    localStorage[obj.key] = JSON.stringify(obj.url);
  });
}

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if(request.getKeyMaps){
      sendResponse({data: localStorage});
    } else {
      var key = (request.getKeyCode).toLowerCase();
      var keyMap = localStorage.getItem(key);
      if(keyMap !== null)
        sendResponse({url:JSON.parse(keyMap)});
    }
  });
