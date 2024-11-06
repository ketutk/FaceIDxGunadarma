exports.response = (res, statusCode, data, message) => {
  return res.status(statusCode).json({
    status: statusCode >= 400 ? false : true,
    message: statusCode >= 400 ? message : message ? message : "OK",
    data,
  });
};

exports.throwError = (statusCode, error) => {
  throw {
    statusCode,
    error,
  };
};
