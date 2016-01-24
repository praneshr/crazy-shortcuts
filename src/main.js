//globals
var globalData = {};

//Events
$('body').on('click', '#add-button', function(event) {
  var url = $('#url-input').val();
  $('#url-input').val(null);
  var key = $('.select').val();
  if (url) {
    if (!url.match(/^[a-zA-Z]+:\/\//)) {
      url = 'http://' + url;
    }
    var temp = {
      key : key,
      url : url,
    };
    globalData.push(temp);
    addNewData(globalData);
  } else {
    alert('URL field cannot be empty');
  }
})
.on('click', '.close', function(event) {
  var key = $(event.currentTarget.parentElement).data('key');
  var index;
  globalData.map(function(obj, i) {
    if (obj.key === key) {
      index = i;
      return false;
    };
  });
  globalData.splice(index, 1);
  addNewData(globalData);
})
.on('change', '.select', function(event) {
  $('#url-input').focus();
});

//Functions
function renderUI(d){
  var letters = "abcdefghijklmnopqrstuvwxyz!@#$%^&*()_+{}|<>?:".split('');
  globalData = JSON.parse(d.data).reverse();
  var select = $('.select');
  var rowTow = $('.row-2');
  rowTow.empty();
  globalData.length === 0
    ? rowTow.addClass('null').append('<p>NO SHIFT+ shortcuts found...</p>')
    : rowTow.removeClass('null');
  globalData.map(function(obj, i) {
    var template = '<div class="key-detail" data-key="' + obj.key + '">\
      <div class="key">' + obj.key.toUpperCase() + '</div>\
      <div class="url">' + obj.url + '</div>\
      <div class="close">&times;</div>\
    </div>';
    rowTow.append(template);
    //removing existing keys from the select menu.
    var index = letters.indexOf(obj.key.toLowerCase());
    if (index !== -1) {
      letters.splice(index, 1);
    }
  });
  //Adding options to the select menu
  select.empty();
  letters.map(function(v, i) {
    select.append('<option value="' + v + '">' + v.toUpperCase() + '</option>');
  });

}

function addNewData(data) {
  chrome.runtime.sendMessage({ addKeyMaps: true, newData: data }, function(response){
    renderUI(response.data);
  });
}

chrome.runtime.sendMessage({ getKeyMaps: true }, function(response){
  renderUI(response.data);
});
