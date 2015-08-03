chrome.extension.sendMessage({}, function(response) {
  var readyStateCheckInterval = setInterval(function() {
    if (document.readyState === "complete") {
      clearInterval(readyStateCheckInterval);

      var colorMapping = {
        'blocked': 'rgb(199, 37, 67)',
        'needs ': 'rgb(199, 37, 67)'
      };

      function colorLabelNodes(labels) {
        Object.keys(colorMapping).forEach(function(labelKeyword) {
          Array.prototype.filter.call(labels, function(label) {
            return label.textContent.indexOf(labelKeyword) === 0
          }).forEach(function(label) {
            label.style.color = colorMapping[labelKeyword];
          });
        });
      }

      var observer = new MutationObserver(function (mutations) {
        mutations.forEach(function (mutation) {
          Array.prototype.forEach.call(mutation.addedNodes, function(addedNode) {
            if (typeof addedNode.getElementsByClassName !== 'undefined') {
              var labels = addedNode.getElementsByClassName('label');
              colorLabelNodes(labels);
            }
          });
        });
      });

      // configuration of the observer:
      var config = { childList: true, subtree: true };

      observer.observe(document, config);
    }
  }, 10);
});
