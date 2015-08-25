chrome.extension.sendMessage({}, function(response) {
  var readyStateCheckInterval = setInterval(function() {
    if (document.readyState === "complete") {
      clearInterval(readyStateCheckInterval);

      function colorLabelNodes(labels) {
        Array.prototype.forEach.call(labels, function(label) {
          if (isLabelEligible(label.textContent)) {
            label.classList.add('blocked');
          } else {
            label.classList.remove('blocked');
          }
        });
      }

      function colorLabelsInNode(addedNode) {
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
      }

      var observer = new MutationObserver(function (mutations) {
        mutations.forEach(function (mutation) {
          Array.prototype.forEach.call(mutation.addedNodes, colorLabelsInNode);
          colorLabelsInNode(mutation.target);
        });
      });

      // configuration of the observer:
      var config = {
        attributes: true,
        characterData: true,
        childList: true,
        subtree: true
      };

      observer.observe(document, config);
    }
  }, 10);
});
