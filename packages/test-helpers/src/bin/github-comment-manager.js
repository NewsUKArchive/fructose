import { read, remove, create } from "github-comment-manager";

require("babel-polyfill");

const filterExpoComments = (comments, account) =>
  // console.log("filterExpoComments");
  JSON.parse(comments)
    .filter(({ user }) => user.login === account)
    .filter(({ body }) =>
      body.includes(
        "If you use Expo, view our components by scanning this qr code:"
      )
    )
    .map(({ id }) => id)

const getExpoComments = (account, token, pullRequest, repository) =>
  read
    .comments({
      account,
      token,
      pullRequest,
      repository
    })
    .then(console.log(`filter, ${this.comments}`))
    .then(comments => filterExpoComments(comments, account))
    .then(console.log(`filteringngng: ${this.commentId}`))
    // .catch(err => { console.log("getExpoComments error: ", err) })

const deleteComment = (commentId, account, token, repository) =>
  remove.comment({
    account,
    token,
    repository,
    commentId
  });

const deleteCommentsFromList = (comments, account, token, repository) =>{
  try { console.log('in delete start')
    Promise.all(
      comments.map(commentId =>
        deleteComment(commentId, account, token, repository)
      )
    ).then(() => comments.length);
  
  }catch(err){console.log(err);}}

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
  console.log("inside deleteAllExpoComments")
  try {const comments = await getExpoComments(
    account,
    token,
    pullRequest,
    repository
  )}
  catch(err){console.log(err)}
  console.log("finished getting expo comments")
  return deleteCommentsFromList(comments, account, token, repository);
};

export default {
  deleteAllExpoComments,
  createNewExpoComment
};
