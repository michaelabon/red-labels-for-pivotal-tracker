chrome.extension.sendMessage({}, function(response) {
  var readyStateCheckInterval = setInterval(function() {
    if (document.readyState === "complete") {
      clearInterval(readyStateCheckInterval);

      function colorLabelNodes(labels) {
        Array.prototype.filter.call(labels, function(label) {
          return isLabelEligible(label.textContent);
        }).forEach(function(label) {
          label.classList.add('blocked');

          // Handle spacing after comma
          label.textContent = label.textContent.trim();
          if (label.textContent.charAt(label.textContent.length - 1) === ',') {
            label.style.paddingRight = '5px';
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
        });
      });

      // configuration of the observer:
      var config = { childList: true, subtree: true };

      observer.observe(document, config);

      colorLabelsInNode(document)
    }
  }, 10);
});
