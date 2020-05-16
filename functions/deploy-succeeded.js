const { Octokit } = require("@octokit/rest");
const octokit = new Octokit({ auth: process.env.GITHUB_API_TOKEN });

exports.handler = async function (event) {
  const body = JSON.parse(event.body);
  const { owner, repo } = body.payload.commit_url.match(
    /github\.com\/(?<owner>[^/]+)\/(?<repo>[^/]+)/u
  ).groups;

  return octokit.repos.createDispatchEvent({
    owner,
    repo,
    event_type: "deploy_succeeded",
    client_payload: body.payload,
  });
};
