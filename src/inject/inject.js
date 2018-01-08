(function(response) {
  function handleMutationEvents(mutation) {
    Array.prototype.forEach.call(mutation.addedNodes, styleLabelsInNode);
    styleLabelsInNode(mutation.target);
  }

  function styleLabelsInNode(node) {
    if (nodeIsElement(node)) {
      styleLabels(findLabelsInNode(node));
    }
  }

  function nodeIsElement(node) {
    return (typeof node.querySelectorAll !== 'undefined');
  }

  function findLabelsInNode(node) {
    var listViewLabels = Array.from(node.querySelectorAll('a.label'));
    var detailedViews = Array.from(node.querySelectorAll('[data-aid="Label__Name"]'));

    return listViewLabels.concat(detailedViews);
  }

  function styleLabels(labels) {
    Array.prototype.forEach.call(labels, function(label) {
      if (isLabelEligible(label.textContent)) {
        label.classList.add('blocked');
      } else {
        label.classList.remove('blocked');
      }
    });
  }

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

    }
  }, 10);
}());
