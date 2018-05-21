/* global describe it expect */
const nock = require("nock");
const githubCommentManager = require("./github-comment-manager");

const accountName = "testAccountName";
const key = "testKey";
const repository = "testRepo";

const noCommentsResponse = [
  {
    id: 1,
    user: {
      login: "not test account name"
    }
  }
];

const mixedCommentsResponse = [
  {
    id: 1,
    body: "If you use Expo, view our components by scanning this qr code:",
    user: {
      login: "not test account name"
    }
  },
  {
    id: 2,
    body: "If you use Expo, view our components by scanning this qr code:",
    user: {
      login: "testAccountName"
    }
  },
  {
    id: 3,
    body: "If you use Expo, view our components by scanning this qr code:",
    user: {
      login: "a different non test account name"
    }
  }
];

const multipleUserCommentsResponse = [
  {
    id: 1,
    body: "If you use Expo, view our components by scanning this qr code:",
    user: {
      login: "testAccountName"
    }
  },
  {
    id: 2,
    body: "If you use Expo, view our components by scanning this qr code:",
    user: {
      login: "testAccountName"
    }
  }
];

const sameUserCommentsResponse = [
  {
    id: 1,
    body: "Please find visual snapshots of your changed components here:",
    user: {
      login: "testAccountName"
    }
  },
  {
    id: 2,
    body: "If you use Expo, view our components by scanning this qr code:",
    user: {
      login: "testAccountName"
    }
  }
];

describe("publish stories to github pull request", () => {
  it("should not pick up other comments", async () => {
    nock("https://api.github.com")
      .get("/repos/testRepo/issues/1/comments")
      .reply(200, noCommentsResponse);

    const commentsToDelete = await githubCommentManager.existingComments(
      accountName,
      key,
      1,
      repository
    );

    expect(commentsToDelete).toEqual([]);
  });

  it("should only pick comments from the specified account where there are many", async () => {
    nock("https://api.github.com")
      .get("/repos/testRepo/issues/1/comments")
      .reply(200, mixedCommentsResponse);

    const commentsToDelete = await githubCommentManager.existingComments(
      accountName,
      key,
      1,
      repository
    );

    expect(commentsToDelete).toEqual([2]);
  });

  it("should pick up all comments from specified user", async () => {
    nock("https://api.github.com")
      .get("/repos/testRepo/issues/1/comments")
      .reply(200, multipleUserCommentsResponse);

    const commentsToDelete = await githubCommentManager.existingComments(
      accountName,
      key,
      1,
      repository
    );

    expect(commentsToDelete).toEqual([1, 2]);
  });

  it("should only delete comments about Expo", async () => {
    nock("https://api.github.com")
      .get("/repos/testRepo/issues/1/comments")
      .reply(200, sameUserCommentsResponse);

    const commentsToDelete = await githubCommentManager.existingComments(
      accountName,
      key,
      1,
      repository
    );

    expect(commentsToDelete).toEqual([2]);
  });
});
