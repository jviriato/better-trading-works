var moment = require('./moment.min.js')
chrome.storage.sync.get(['working_hours'], function (result) {
  alert('Value currently is ' + result.working_hours);
});

var headers = document.getElementsByTagName('th');
var table = document.getElementsByTagName('td');
var ht_index = 0;

for (let i = 0; i < headers.length; i++) {
  if(headers[i].innerHTML == "HT") {
    ht_index = i - 1; // Necessário pois o primeiro th não faz parte da tabela
  }
}
var ht_morning_raw = table[ht_index].innerHTML
var x = moment(ht_morning_raw, 'HH:mm A')
alert(x)