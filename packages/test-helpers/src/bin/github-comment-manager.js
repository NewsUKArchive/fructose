import { read, remove, create } from "github-comment-manager";

require("babel-polyfill");

const commentHeader =
  "If you use Expo, view our components by scanning this qr code:<br>";

const filterExpoComments = comments =>
  JSON.parse(comments)
    .filter(({ body }) => body.includes(commentHeader))
    .map(({ id }) => id);

const getExpoComments = (account, token, pullRequest, repository) =>
  read
    .comments({
      account,
      token,
      pullRequest,
      repository
    })
    .then(comments => filterExpoComments(comments));

const deleteComment = (commentId, account, token, repository) =>
  remove.comment({
    account,
    token,
    repository,
    commentId
  });

const deleteCommentsFromList = (comments, account, token, repository) =>
  Promise.all(
    comments.map(commentId => {
      console.log(`inside comments map ${commentId}`);
      return deleteComment(commentId, account, token, repository);
    })
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
    comment: `${commentHeader} <br> <img src='${documentPath}'> <br> This has been made possible through [Fructose](https://github.com/newsuk/fructose) `,
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
