#!/usr/bin/env node

const program = require("commander");
const log = require("../packages/common/logger");
const gitHubCommentManager = require("./github-comment-manager");

program
  .command("publish-QR-code")
  .alias("pqr")
  .option("-p, --path [path]", "the path to your qr code image")
  .option(
    "-a, --accountName [accountName]",
    "github account name, used to publish to the pull request as a comment"
  )
  .option(
    "-k --key [key]",
    "github account key, used to publish to the pull request as a comment"
  )
  .option(
    "-i --issueNumber [issueNumber]",
    "github issue number for the pull request you wish to post to"
  )
  .option(
    "-r --repository [repository]",
    "gitbug organisation and repo e.g. newsuk/times-components"
  )
  .action(options => {
    const { path, accountName, key, issueNumber, repository } = options;

    if (!path)
      log.error("publish-QR-code", "no path for generated qrcode, use -p");
    if (!accountName)
      log.error("publish-QR-code", "no github account name, use -a");
    if (!key) log.error("publish-QR-code", "no github account key, use -k");
    if (!issueNumber)
      log.error("publish-QR-code", "no github issue number, use -i");
    if (!repository)
      log.error(
        "publish-QR-code",
        "no git organisation and repository specified"
      );
    if (!path || !accountName || !key || !issueNumber || !repository)
      process.exit(1);
    gitHubCommentManager
      .publishQRCode(accountName, key, path, issueNumber, repository)
      .catch(error => {
        throw error;
      });
  });
program.parse(process.argv);