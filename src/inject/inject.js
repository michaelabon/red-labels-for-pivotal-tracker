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
            return label.textContent.indexOf(labelKeyword) >= 0;
          }).forEach(function(label) {
            label.style.color = colorMapping[labelKeyword];
          });
        });
      }

      var observer = new MutationObserver(function (mutations) {
        mutations.forEach(function (mutation) {
          Array.prototype.forEach.call(mutation.addedNodes, function(addedNode) {
            if (typeof addedNode.getElementsByClassName !== 'undefined') {
              var previews = addedNode.getElementsByClassName('preview');
              if (previews.length === 0) { return; }

              var labels = Array.prototype.filter.call(previews, function(preview) {
                return preview.getElementsByClassName !== 'undefined';
              }).map(function(preview) {
                return Array.prototype.slice.call(preview.getElementsByClassName('label'));
              });

              colorLabelNodes(Array.prototype.concat.apply([], labels));
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
