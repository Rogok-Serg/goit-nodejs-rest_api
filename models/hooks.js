export const handleSaveError = (error, data, next) => {
  const { name, code } = error;
  console.log(error.name);
  console.log(error.code);
  error.status = name === "MongoServerError" && code === 11000 ? 409 : 400;
  next();
};

export const runValidateAtUpdate = function (next) {
  this.options.runValidators = true;
  next();
};
// export default handleSaveError;
