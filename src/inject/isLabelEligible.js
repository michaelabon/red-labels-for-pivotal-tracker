var isLabelRed = function isLabelRed(labelText) {
  return !!labelText.match(/\b(?:blocked|needs)\b/);
};

var isLabelBlue = function isLabelBlue(labelText) {
  return !!labelText.match(/\b(?:planner\b/);
};
