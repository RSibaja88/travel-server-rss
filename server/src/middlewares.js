// "not found" middleware at the end
const notFound = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error);
};

//error handling middleware - -must have 4 params
//stack log will not print to console if not in development. this is for security reasons. stack log will show file structure, tech stack, ect
const errorHandler = (error, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode);
  res.json({
    message: error.message,
    stack: process.env.NODE_ENV === "production" ? "🎂" : error.stack,
  });
};

module.exports = {
  notFound,
  errorHandler,
};
