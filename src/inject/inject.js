chrome.extension.sendMessage({}, function(response) {
	var readyStateCheckInterval = setInterval(function() {
		if (document.readyState === "complete") {
			clearInterval(readyStateCheckInterval);

			var labels = document.getElementsByClassName('label');
			Array.prototype.filter.call(labels, function(label) {
				return label.textContent.indexOf('blocked') === 0;
			}).forEach(function(label) {
				label.style.color = 'rgb(199, 37, 67)';
			});
		}
	}, 4000);
});
