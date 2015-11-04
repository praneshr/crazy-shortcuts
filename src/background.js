var defaultKeyMaps = [
  {key:'g',url:'http://google.com'},
  {key:'f',url:'http://facebook.com'},
  {key:'t',url:'http://twitter.com'},
];

if(localStorage.getItem('initiated') !== 'yes'){
  localStorage.initiated = 'yes';
  localStorage.data = JSON.stringify(defaultKeyMaps);
}

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if(request.getKeyMaps){
      sendResponse({data: localStorage});
    } else {
      var key = (request.getKeyCode).toLowerCase();
      var keyMap = JSON.parse(localStorage.getItem('data'));
      keyMap.map(function(obj,i){
        if(obj.key === key)
          sendResponse({url: obj.url});
      });
    }
  });
