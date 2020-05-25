document.addEventListener('DOMContentLoaded', function () {
  var checkPageButton = document.getElementById('checkPage');

  checkPageButton.addEventListener('click', function () {
    chrome.tabs.getSelected(null, function (tab) {
      d = document;
      working_hours = document.getElementById('hours').value;
      chrome.storage.sync.set({working_hours: working_hours}, function() {
        console.log('Value is set to ' + working_hours);
      });
      chrome.storage.local.set({working_hours: working_hours}, function() {
        console.log('Value is set to ' + working_hours);
      });
    });
  }, false);
}, false);
