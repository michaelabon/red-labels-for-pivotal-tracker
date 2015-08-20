chrome.extension.sendMessage({}, function(response) {
  var readyStateCheckInterval = setInterval(function() {
    if (document.readyState === "complete") {
      clearInterval(readyStateCheckInterval);

      function colorLabelNodes(labels) {
        Array.prototype.forEach.call(labels, function(label) {
          if (isLabelEligible(label.textContent)) {
            label.classList.add('blocked');

            // Handle wrapping in conjunction with white-space: nowrap;
            label.insertAdjacentHTML('afterend', '<span> </span>');

            // Handle spacing after comma
            label.textContent = label.textContent.trim();
            if (label.textContent.charAt(label.textContent.length - 1) === ',') {
              label.style.paddingRight = '5px';
            }
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

      var overrideTimer = 3000;
      function override() {
        var labels = document.getElementsByClassName('label');

        var t0 = performance.now();
        colorLabelNodes(labels);
        var t1 = performance.now();
        var duration = t1 - t0;

        if (duration > (overrideTimer * 0.1)) {
          overrideTimer = overrideTimer * 4;
        } else {
          overrideTimer = overrideTimer / 1.5;
        }

        setTimeout(override, overrideTimer);
      }

      var observer = new MutationObserver(function (mutations) {
        mutations.forEach(function (mutation) {
          Array.prototype.forEach.call(mutation.addedNodes, colorLabelsInNode);
        });
      });

      // configuration of the observer:
      var config = { childList: true, subtree: true };

      observer.observe(document, config);

      colorLabelsInNode(document);

      setTimeout(override, overrideTimer);
    }
  }, 10);
});
