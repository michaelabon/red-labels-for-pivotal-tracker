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

      var colorLabelsInNode = function colorLabelsInNode(node) {
        if (nodeIsElement(node)) {
          colorLabelNodes(findLabelsInNode(node));
        }
      }

      var nodeIsElement = function nodeIsElement(node) {
        return (typeof node.getElementsByClassName !== 'undefined');
      }

      var findLabelsInNode = function findLabelsInNode(node) {
        return node.querySelectorAll('a.label');
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
    }
  }, 10);
});
