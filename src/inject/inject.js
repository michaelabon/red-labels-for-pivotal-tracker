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

      function getPreviewLabelsInNode(containingNode) {
        var previews = containingNode.getElementsByClassName('preview');

        return Array.prototype.filter.call(previews, function(preview) {
          return preview.getElementsByClassName !== 'undefined';
        }).map(function(preview) {
          return Array.prototype.slice.call(preview.getElementsByClassName('label'));
        });
      }

      function nodeIsElement(node) {
        return (typeof node.getElementsByClassName !== 'undefined');
      }

      function colorLabelsInNode(addedNode) {
        if (!nodeIsElement(addedNode)) {
          return;
        }

        var labels = getPreviewLabelsInNode(addedNode);

        colorLabelNodes(Array.prototype.concat.apply([], labels));
      }

      function handleMutationEvents(mutation) {
        Array.prototype.forEach.call(mutation.addedNodes, colorLabelsInNode);
        colorLabelsInNode(mutation.target);
      }

      var observer = new MutationObserver(function(mutations) {
        mutations.forEach(handleMutationEvents);
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
