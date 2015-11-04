
$(window).keypress(function(e){
  if(e.shiftKey){
    chrome.runtime.sendMessage({getKeyCode: String.fromCharCode(e.which),getKeyMap: false}, function(response) {
      if(response.url)
        window.open(response.url);
    });
  }
});
