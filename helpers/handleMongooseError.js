const handleMongooseError = (error, data, next) => {
  const { code, name } = error;
  console.log(code);
  console.log(name);
  error.status = code === 11000 && name === "MongoServerError" ? 409 : 400;
  next();
};

module.exports = handleMongooseError;
