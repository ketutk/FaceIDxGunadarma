const { ZodError } = require("zod");

exports.simplifyZodError = (error) => {
  if (!(error instanceof ZodError)) {
    return { message: "An unknown error occurred" };
  }

  // Map each error path to a simpler error message
  const simplifiedErrors = error.errors.reduce((acc, err) => {
    const path = err.path.join(".");
    acc[path] = err.message;
    return acc;
  }, {});

  return simplifiedErrors;
};
