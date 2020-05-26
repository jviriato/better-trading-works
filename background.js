import moment from 'moment'
var working_hours = 8;
var headers = document.getElementsByTagName('th');
var table = document.getElementsByTagName('td');
var ht_morning_index = 0;
var clock = `<i class="fa fa-clock-o fa-fw fa-lg" style="color: gray; opacity: 0.4" title="Original"></i>`
var first_morning_hour_index = 1;
var last_morning_hour_index = 2;
var first_afternoon_hour_index = 5;
var last_afternoon_hour_index = 6;

var first_morning_hour = moment(table[first_morning_hour_index].innerHTML, 'HH:mm A');
var last_morning_hour = moment(table[last_morning_hour_index].innerHTML, 'HH:mm A');

var first_afternoon_hour = moment(table[first_afternoon_hour_index].innerHTML, 'HH:mm A');
var last_afternoon_hour = moment(table[last_afternoon_hour_index].innerHTML, 'HH:mm A');


for (let i = 0; i < headers.length; i++) {
  if (headers[i].innerHTML == "HT") {
    ht_morning_index = i - 1; // Necessário pois o primeiro th não faz parte da tabela
  }
}
var ht_morning = moment(table[ht_morning_index].innerHTML, 'HH:mm A');

chrome.storage.sync.get(['working_hours'], function (result) {
  working_hours = result.working_hours;


  // quando há apenas a primeira batida
  // TODO: inserir linhas seguintes
  if (first_morning_hour.isValid() && !last_morning_hour.isValid()) {
    var halftime = working_hours / 2;
    var suggested_hour = first_morning_hour.add(halftime, 'hours').format('HH:mm[ h]');
    var suggested_hour_moment = first_morning_hour.add(halftime, 'hours')
    var worked_hours = moment(halftime, 'H').format('HH:mm[ h]')
    table[last_morning_hour_index].innerHTML = clock + `<span style="color: gray; opacity: 0.4;">${suggested_hour}</span>`
    table[last_morning_hour_index].setAttribute('title', 'Hora Sugerida');
    var td = `<td class="text-left" style="white-space: nowrap" title="Hora Sugerida">${clock}<span style="color: gray; opacity: 0.4;">${worked_hours}</span></td>`
    table[last_morning_hour_index].insertAdjacentHTML('afterend', td);
    // chrome.alarms.create('aviso_ponto', {
    //   when: suggested_hour_moment.unix() * 1000
    // })
  } else if (first_afternoon_hour.isValid() && !last_afternoon_hour.isValid()) {
    var worked_hours = moment(working_hours, 'H').format('HH:mm[ h]')
    var duration = moment.duration({ hours: ht_morning.hours(), minutes: ht_morning.minutes() })
    var remaining_hours = moment(working_hours, 'H').subtract(duration);
    var minutes = remaining_hours.hours() * 60 + remaining_hours.minutes();
    var suggested_hour = first_afternoon_hour.add(minutes, 'minutes').format('HH:mm[ h]');
    table[last_afternoon_hour_index].innerHTML = clock + `<span style="color: gray; opacity: 0.4;">${suggested_hour}</span>`
    table[last_afternoon_hour_index].setAttribute('title', 'Hora Sugerida');
    var td = `<td class="text-center" style="white-space: nowrap" title="Hora Sugerida"><span style="color: gray; opacity: 0.4;">${worked_hours}</span></td>`
    table[last_afternoon_hour_index].insertAdjacentHTML('afterend', td);
  }
});

// chrome.alarms.onAlarm.addListener(function (alarms) {
//   alert('beep')
//   alert(alarms)
// })
// var last_morning_hour_index = ht_morning_index - 2;
// var last_morning_hour_index = ht_morning_index - 1;
// var first_afternoon_hour_index = ht_morning_index + 2;
// var last_afternoon_hour_index = ht_morning_index + 3;
// var ht_afternoon_index = ht_morning_index + 4;
// var ht_morning = moment(table[ht_morning_index].innerHTML, 'HH:mm A')

// var first_afternoon_hour = moment(table[first_afternoon_hour_index].innerHTML, 'HH:mm A');
// var last_afternoon_hour = moment(table[last_afternoon_hour_index].innerHTML, 'HH:mm A');


// if (first_afternoon_hour.isValid() && !last_afternoon_hour.isValid()) {
//   // calcula restante. adiciona sugestão na batida de saída de tarde 
//   var duration = moment.duration({ hours: ht_morning.hours(), minutes: ht_morning.minutes() })
//   var remaining_hours = moment(working_hours, 'H').subtract(duration).format('HH:mm[ h]');
//   alert(remaining_hours.hours())
// } else if (first_morning_hour.isValid() && !last_morning_hour.isValid()) {
//   // adiciona sugestão de batida na volta do horário de almoço
//   var suggested_hour = last_morning_hour.add('1', 'hour').format('HH:mm[ h]');
//   table[first_afternoon_hour_index].setAttribute('title', 'Hora Sugerida')
//   table[first_afternoon_hour_index].innerHTML = clock + `<span style="color: tomato; opacity: 0.4;">${suggested_hour}</span>`
// } else {
//   suggested_1st_hour = moment()
//   suggested_2nd_hour = moment().add(working_hours / 2, 'hours')
//   suggested_3rd_hour = 0 // diferenca hroas trabalhads  
//   suggested_4nd_hour = suggested_3nd_hour.add(1, 'hours')
//   suggested_5nd_hour = // restante de horas trabalhadas
//   suggested_6nd_hour = moment().add(working_hours + 1, 'hours')  // ht2
//   // adiciona todas batidas baseado no horário atual
// }