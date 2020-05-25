chrome.storage.sync.get(['working_hours'], function (result) {
  alert('Value currently is ' + result.working_hours);
});