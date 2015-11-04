function renderUI(d){
  var letters = "abcdefghijklmnopqrstuvwxyz!@#$%^&*()_+{}|<>?:\"".split('');
  var parsedData = JSON.parse(d.data);
  var select = $('.select');
  console.log(parsedData);
  parsedData.map(function(obj,i){
    var index = letters.indexOf(obj.key.toLowerCase())
    if(index !== -1){
      letters.splice(index, 1);
    }
  });
  letters.map(function(v,i){
    select.append('<option value="'+v+'">'+v.toUpperCase()+'</option>');
  })
}
chrome.runtime.sendMessage({getKeyMaps: true},function(response){
  renderUI(response.data);
});
