const errorResponse = (res, code, message) => {
  res.status(code).json({
    status: 'error',
    error: message,
  });
};

// const successResponse = (res, code, responseData) => {
//   const { message, ...data } = responseData;
//   return res.status(code).json({
//     status: 'success',
//     message,
//     data,
//   });
// };

const successResponse = (res, code, message, data) =>
  res.status(code).json({
    status: 'success',
    message,
    data,
  });
module.exports = {
  errorResponse,
  successResponse,
};
