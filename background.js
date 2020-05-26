import moment from 'moment'
chrome.storage.sync.get(['working_hours'], function (result) {
  // alert('Value currently is ' + result.working_hours);
});

var headers = document.getElementsByTagName('th');
var table = document.getElementsByTagName('td');
var ht_index_morning = 0;

for (let i = 0; i < headers.length; i++) {
  if(headers[i].innerHTML == "HT") {
    ht_index_morning = i - 1; // Necessário pois o primeiro th não faz parte da tabela
  }
}

var ht_index_afternoon = ht_index_morning + 4;
var clock = `<i class="fa fa-clock-o fa-fw fa-lg" style="color: tomato; opacity: 0.4" title="Original"></i>`
var ht_morning_raw = table[ht_index_morning].innerHTML
var ht_index_afternoon_raw = table[ht_index_afternoon].innerHTML

var ht_morning = moment(ht_morning_raw, 'HH:mm A')
var ht_afternoon = moment(ht_index_afternoon_raw, 'HH:mm A')
var ht_afternoon_formated = ht_afternoon.format('HH:mm [ h]')
var first_afternoon_hour = ht_index_morning + 2;


var last_index_morning_hour = ht_index_morning - 1;
var last_morning_raw = table[last_index_morning_hour].innerHTML
var last_morning_hour = moment(last_morning_raw, 'HH:mm A');

if (!last_morning_hour.isValid()) {
  var suggested_hour = last_morning_hour.add('1', 'hour').format('HH:mm [ h]');
  table[first_afternoon_hour].setAttribute('title', 'Hora Sugerida')
  table[first_afternoon_hour].innerHTML = clock + `<span style="color: tomato; opacity: 0.4;">${suggested_hour}</span>`
}
