#!/usr/bin/env node

import githubCommentManager from "./github-comment-manager";

const program = require("commander");
const log = require("../../../common/logger");

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
  .action(async options => {
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
    await githubCommentManager.deleteAllExpoComments(
      accountName,
      key,
      issueNumber,
      repository
    );
    await githubCommentManager.createNewExpoComment(
      accountName,
      key,
      path,
      issueNumber,
      repository
    );
  });
program.parse(process.argv);
