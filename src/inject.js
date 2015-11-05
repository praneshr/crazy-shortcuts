
$(window).keypress(function(e){
  if(e.shiftKey && !$('input').is(':focus')){
    chrome.runtime.sendMessage({getKeyCode: String.fromCharCode(e.which),getKeyMap: false}, function(response) {
      if(response.url)
        window.open(response.url);
    });
  }
});
