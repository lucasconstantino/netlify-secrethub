const https = require("https");

exports.handler = function (event, context) {
  const body = JSON.parse(event.body);
  const { user, repo } = body.payload.commit_url.match(
    /github\.com\/(?<user>[^/]+)\/(?<repo>[^/]+)/u
  ).groups;

  const payload = {
    event_type: "deploy_succeeded",
    client_payload: body.payload,
  };

  const data = JSON.stringify(payload);

  const options = {
    port: 443,
    hostname: "api.github.com",
    path: `repos/${user}/${repo}/dispatches`,
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Content-Length": Buffer.byteLength(data),
      Authorization: `token ${process.env.GITHUB_API_TOKEN}`,
    },
  };

  console.log({ options });

  const onError = (error) => {
    console.error(error);
    context.done(null, "failed");
  };

  const req = https.request(options, (res) => {
    res.on("error", onError);
    res.on("end", () => context.succeed());
  });

  req.on("error", onError);
  req.write(data);
  req.end();
};
