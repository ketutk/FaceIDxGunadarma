exports.isNumericWord = (str) => {
  return /^\d+$/.test(str);
};

exports.isAlphaOnly = (str) => {
  // Regular expression to match only alphabetic characters (a-z, A-Z)
  const alphaRegex = /^[a-zA-Z\s]*$/;
  return alphaRegex.test(str);
};
