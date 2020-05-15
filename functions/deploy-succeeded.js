exports.handler = function (event, context, callback) {
  console.log(process.env.SECRETHUB_ENV, event, process.env);

  // your server-side functionality
  callback(null, { statusCode: 200, body: "success" });
};
