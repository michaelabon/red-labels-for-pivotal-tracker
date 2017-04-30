var isLabelRed = function isLabelRed(labelText) {
  return !!labelText.match(/\b(?:blocked|needs)\b/);
};
