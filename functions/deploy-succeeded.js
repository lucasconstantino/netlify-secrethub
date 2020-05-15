exports.handler = function (event, context, callback) {
  console.log(event);

  // your server-side functionality
  callback(null, { statusCode: 200, body: "success" });
};
