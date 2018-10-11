import { read, remove, create } from "github-comment-manager";

require("babel-polyfill");

const filterExpoComments = (comments, account) =>
  JSON.parse(comments)
    .filter(({ user }) => user.login === account)
    .filter(({ body }) =>
      body.includes(
        "If you use Expo, view our components by scanning this qr code:"
      )
    )
    .map(({ id }) => id);

const getExpoComments = (account, token, pullRequest, repository) =>
  read
    .comments({
      account,
      token,
      pullRequest,
      repository
    })
    .then(comments => filterExpoComments(comments, account));

const deleteComment = (commentId, account, token, repository) =>
  remove.comment({
    account,
    token,
    repository,
    commentId
  });

const deleteCommentsFromList = (comments, account, token, repository) =>
  Promise.all(
    comments.map(commentId =>
      deleteComment(commentId, account, token, repository)
    )
  ).then(() => comments.length);

const createNewExpoComment = (
  account,
  token,
  documentPath,
  pullRequest,
  repository
) =>
  create.comment({
    account,
    token,
    repository,
    comment: `If you use Expo, view our components by scanning this qr code: <br> <img src='${documentPath}'> <br> This has been made possible through [Fructose](https://github.com/newsuk/fructose) `,
    pullRequest
  });

const deleteAllExpoComments = async (
  account,
  token,
  pullRequest,
  repository
) => {
  const comments = await getExpoComments(
    account,
    token,
    pullRequest,
    repository
  );
  return deleteCommentsFromList(comments, account, token, repository);
};

export default {
  deleteAllExpoComments,
  createNewExpoComment
};
