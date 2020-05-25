document.addEventListener('DOMContentLoaded', function () {
  var checkPageButton = document.getElementById('checkPage');

  checkPageButton.addEventListener('click', function () {
    chrome.tabs.getSelected(null, function (tab) {
      d = document;
      working_hours = document.getElementById('hours').value;
      chrome.storage.sync.set({ "working_hours": working_hours });
      
      // chrome.storage.sync.get(["working_hours"], function (item) {
      //   x = item.working_hours
      //   console.log('itme é', item)
      // });
    });
  }, false);
}, false);
