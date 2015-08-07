var isLabelEligible = function isLabelEligible(labelText) {
  return !!labelText.match(/\b(?:blocked|needs)\b/);
};
