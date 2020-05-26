import moment from 'moment'
var working_hours = 8;
chrome.storage.sync.get(['working_hours'], function (result) {
  working_hours = result.working_hours || 8;
  // alert('Value currently is ' + result.working_hours);
});

var headers = document.getElementsByTagName('th');
var table = document.getElementsByTagName('td');
var ht_morning_index = 0;

for (let i = 0; i < headers.length; i++) {
  if(headers[i].innerHTML == "HT") {
    ht_morning_index = i - 1; // Necessário pois o primeiro th não faz parte da tabela
  }
}

var clock = `<i class="fa fa-clock-o fa-fw fa-lg" style="color: tomato; opacity: 0.4" title="Original"></i>`
var ht_afternoon_index = ht_morning_index + 4;
var first_afternoon_hour_index = ht_morning_index + 2;
var last_afternoon_hour_index = ht_morning_index + 3;
var last_morning_hour_index = ht_morning_index - 1;

var ht_morning = moment(table[ht_morning_index].innerHTML, 'HH:mm A')
var ht_afternoon = moment(table[ht_afternoon_index].innerHTML, 'HH:mm A')
var ht_afternoon_formated = ht_afternoon.format('HH:mm [ h]')

var last_morning_hour = moment(table[last_morning_hour_index].innerHTML, 'HH:mm A');
var first_afternoon_hour = moment(table[first_afternoon_hour_index].innerHTML, 'HH:mm A');
var last_afternoon_hour = moment(table[last_afternoon_hour_index].innerHTML, 'HH:mm A');

if (first_afternoon_hour.isValid() && !last_afternoon_hour.isValid()) {
 // calcula restante. adiciona sugestão na batida de saída de tarde 
 var duration = moment.duration({hours: ht_morning.hours(), minutes: ht_morning.minutes()})
 var remaining_hours = moment(working_hours, 'H').subtract(duration).format('HH:mm[ h]');
 
} else if (!last_morning_hour.isValid()) {
  // adiciona sugestão de batida na volta do horário de almoço
  var suggested_hour = last_morning_hour.add('1', 'hour').format('HH:mm [ h]');
  table[first_afternoon_hour_index].setAttribute('title', 'Hora Sugerida')
  table[first_afternoon_hour_index].innerHTML = clock + `<span style="color: tomato; opacity: 0.4;">${suggested_hour}</span>`
} else {

}

// const worked_hours = moment.duration(hoursDiff)
// alert(working_hours)
// alert(ht_morning.format('HH:mm [ h]'))
alert(remaining_hours)