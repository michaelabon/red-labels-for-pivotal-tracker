var isLabelEligible = function isLabelEligible(labelText) {
  return !!labelText.match(/\b(?:blocked|needs)\b/);
};

var isTestLabelEligible = function isTestLabelEligible(labelText) {
  return !!labelText.match(/\b(?:failed|pending)\b/);
}
