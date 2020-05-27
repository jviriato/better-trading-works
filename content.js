import moment from 'moment'
var working_hours = 8;
var headers = document.getElementsByTagName('th');
var table = document.getElementsByTagName('td');
var tbody = document.getElementsByTagName('tbody')[0];
var ht_morning_index = 0;
var clock = `<i class="fa fa-clock-o fa-fw fa-lg" style="color: gray; opacity: 0.4" title="Hora Sugerida"></i>`
var first_morning_hour_index = 1;
var last_morning_hour_index = 2;
var first_afternoon_hour_index = 5;
var last_afternoon_hour_index = 6;

var first_morning_hour = moment(table[first_morning_hour_index]?.innerHTML, 'HH:mm A');
var last_morning_hour = moment(table[last_morning_hour_index]?.innerHTML, 'HH:mm A');

var first_afternoon_hour = moment(table[first_afternoon_hour_index]?.innerHTML, 'HH:mm A');
var last_afternoon_hour = moment(table[last_afternoon_hour_index]?.innerHTML, 'HH:mm A');
var ht_morning_index = 3;
var ht_morning = moment(table[ht_morning_index].innerHTML, 'HH:mm A');

chrome.storage.sync.get(['working_hours'], function (result) {
  working_hours = result.working_hours || 8;
  var halftime = working_hours / 2;

  var insertRow = function (label, first_hour, second_hour, ht) {
    var halftime = working_hours / 2;
    var morning_tr = document.createElement('tr')
    var morning = document.createElement('td')
    var morning_first_hour = document.createElement('td')
    var morning_second_hour = document.createElement('td')
    var morning_ht = document.createElement('td')

    morning.className = 'text-center'
    morning_first_hour.className = 'text-left'
    morning_second_hour.className = 'text-left'
    morning_ht.className = 'text-center'

    morning.appendChild(document.createTextNode(label))
    morning_first_hour.innerHTML = clock + '<span style="color: gray !important; opacity: 0.4 !important;"> ' + first_hour + '</span>';
    morning_second_hour.innerHTML = clock + '<span style="color: gray !important; opacity: 0.4 !important;"> ' + second_hour + '</span>';
    morning_ht.innerHTML = '<span style="color: gray !important; opacity: 0.4 !important;">' + ht + '</span>'

    morning_tr.appendChild(morning)
    morning_tr.appendChild(morning_first_hour)
    morning_tr.appendChild(morning_second_hour)
    morning_tr.appendChild(morning_ht)
    tbody.appendChild(morning_tr)
  }

  // Quando não há batidas, insere tudo
  if (!first_morning_hour.isValid()) {
    var first_hour_afternoon = moment().add(halftime + 1, 'hours')
    insertRow('Manhã', moment().format('[ ]HH:mm'),
      moment().add(halftime, 'hours').format('[ ]HH:mm'),
      moment(halftime, 'H').format('HH:mm[ h]'));
    insertRow('Tarde', first_hour_afternoon.format('HH:mm'),
      first_hour_afternoon.add(halftime, 'hours').format('HH:mm'),
      moment(working_hours, 'H').format('HH:mm[ h]')
    );
  }
  // Quando há apenas a primeira batida
  else if (first_morning_hour.isValid() && !last_morning_hour.isValid()) {
    var suggested_hour = first_morning_hour.add(halftime, 'hours')
    var worked_hours = moment(halftime, 'H').format('HH:mm[ h]')
    table[last_morning_hour_index].innerHTML = clock + `<span style="color: gray !important; opacity: 0.4 !important;"> ${suggested_hour.format('HH:mm')}</span>`
    table[last_morning_hour_index].setAttribute('title', 'Hora Sugerida');
    var td = `<td class="text-left" style="white-space: nowrap" title="Hora Sugerida"><span style="color: gray !important; opacity: 0.4 !important;">${worked_hours}</span></td>`
    table[last_morning_hour_index].insertAdjacentHTML('afterend', td);
    insertRow('Tarde', suggested_hour.add(1, 'hours').format('HH:mm'),
      suggested_hour.add(halftime, 'hours').format('HH:mm'),
      moment(working_hours, 'H').format('HH:mm[ h]')
    );
  }
  // Quando é intervalo de almoço
  else if (last_morning_hour.isValid() && !first_afternoon_hour.isValid()) {
    var x = last_morning_hour.clone().add(1, 'hours');
    var duration = moment.duration({ hours: ht_morning.hours(), minutes: ht_morning.minutes() })
    var remaining_hours = moment(working_hours, 'H').subtract(duration);
    var minutes = remaining_hours.hours() * 60 + remaining_hours.minutes();
    var suggested_hour = x.add(minutes, 'minutes').format('HH:mm');

    insertRow('Tarde', last_morning_hour.add(1, 'hours').format('HH:mm'),
      suggested_hour,
      moment(working_hours, 'H').format('HH:mm[ h]'))

  }
  // Quando falta a última batida
  else if (first_afternoon_hour.isValid() && !last_afternoon_hour.isValid()) {
    var worked_hours = moment(working_hours, 'H').format('HH:mm[ h]')
    var duration = moment.duration({ hours: ht_morning.hours(), minutes: ht_morning.minutes() })
    var remaining_hours = moment(working_hours, 'H').subtract(duration);
    var minutes = remaining_hours.hours() * 60 + remaining_hours.minutes();
    var suggested_hour = first_afternoon_hour.add(minutes, 'minutes').format('HH:mm');
    table[last_afternoon_hour_index].innerHTML = clock + `<span style="color: gray !important; opacity: 0.4 !important;"> ${suggested_hour}</span>`
    table[last_afternoon_hour_index].setAttribute('title', 'Hora Sugerida');
    var td = `<td class="text-center" style="white-space: nowrap" title="Hora Sugerida">${clock}<span style="color: gray !important; opacity: 0.4 !important;">${worked_hours}</span></td>`
    table[last_afternoon_hour_index].insertAdjacentHTML('afterend', td);
  }
});