chrome.extension.sendMessage({}, function(response) {
  var readyStateCheckInterval = setInterval(function() {
    if (document.readyState === "complete") {
      clearInterval(readyStateCheckInterval);

      var observer = new MutationObserver(function (mutations) {
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

      var handleMutationEvents = function handleMutationEvents(mutation) {
        Array.prototype.forEach.call(mutation.addedNodes, colorLabelsInNode);
        colorLabelsInNode(mutation.target);
      }

      var colorLabelsInNode = function colorLabelsInNode(addedNode) {
        if (!nodeIsElement(addedNode)) {
          return;
        }

        var labels = getPreviewLabelsInNode(addedNode);

        colorLabelNodes(Array.prototype.concat.apply([], labels));
      }

      var colorLabelNodes = function colorLabelNodes(labels) {
        Array.prototype.forEach.call(labels, function(label) {
          if (isLabelEligible(label.textContent)) {
            label.classList.add('blocked');
          } else {
            label.classList.remove('blocked');
          }
        });
      }

      var getPreviewLabelsInNode = function getPreviewLabelsInNode(containingNode) {
        var previews = containingNode.getElementsByClassName('preview');

        return Array.prototype.filter.call(previews, function(preview) {
          return preview.getElementsByClassName !== 'undefined';
        }).map(function(preview) {
          return Array.prototype.slice.call(preview.getElementsByClassName('label'));
        });
      }

      var nodeIsElement = function nodeIsElement(node) {
        return (typeof node.getElementsByClassName !== 'undefined');
      }
    }
  }, 10);
});
