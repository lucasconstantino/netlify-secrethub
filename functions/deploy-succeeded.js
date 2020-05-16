const https = require("https");

exports.handler = function (event, context, callback) {
  const body = JSON.parse(event.body);
  const { user, repo } = body.payload.commit_url.match(
    /github\.com\/(?<user>[^/]+)\/(?<repo>[^/]+)/u
  ).groups;

  const url = `https://api.github.com/repos/${user}/${repo}/dispatches`;
  const payload = {
    event_type: "deploy_succeeded",
    client_payload: body.payload,
  };

  const data = JSON.stringify(payload);

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Content-Length": Buffer.byteLength(data),
      Authorization: `token ${process.env.GITHUB_OAUTH_TOKEN}`,
    },
  };

  const req = https.request(url, options, (res) => {
    res.on("error", (error) => callback(Error(error)));
    res.on("end", () => callback(null, { statusCode: res.statusCode }));
  });

  req.on("error", (error) => callback(Error(error)));
  req.write(data);
  req.end();
};
