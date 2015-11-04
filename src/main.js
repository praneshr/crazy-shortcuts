function renderUI(data){
  console.log(data);
}
chrome.runtime.sendMessage({getKeyMaps: true},function(response){
  renderUI(response.data);
});
