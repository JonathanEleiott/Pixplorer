const sendResponse = function (res, statusCode, headersSent, responseMessage) {
  res.writeHead(statusCode, headersSent);
  res.end(responseMessage);
};

module.exports = sendResponse;
