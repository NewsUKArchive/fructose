const request = require("request");

const existingComments = (
  accountName,
  accountKey,
  issueNumber,
  repositoryName
) =>
  new Promise((resolve, reject) => {
    const auth = `Basic ${Buffer.from(`${accountName}:${accountKey}`).toString(
      "base64"
    )}`;
    const options = {
      url: `https://api.github.com/repos/${repositoryName}/issues/${issueNumber}/comments`,
      headers: {
        Authorization: auth,
        "User-Agent": accountName
      }
    };

    request.get(options, (error, response, data) => {
      if (error) reject(error);
      const ids = JSON.parse(data)
        .filter(({ user }) => user.login === accountName)
        .filter(({ body }) => body.includes("If you use Expo"))
        .map(({ id }) => id);

      resolve(ids);
    });
  });

const deleteComment = (commentId, accountName, accountKey, repositoryName) =>
  new Promise((resolve, reject) => {
    const auth = `Basic ${Buffer.from(`${accountName}:${accountKey}`).toString(
      "base64"
    )}`;
    const deleteOptions = {
      url: `https://api.github.com/repos/${repositoryName}/issues/comments/${commentId}`,
      headers: {
        Authorization: auth,
        "User-Agent": accountName
      }
    };

    request.delete(deleteOptions, error => {
      if (error) reject(error);
      resolve("deleted");
    });
  });

const deleteCommentsFromList = (
  commentsToDelete,
  accountName,
  accountKey,
  repositoryName
) => {
  Promise.all(
    commentsToDelete.map(commentId =>
      deleteComment(commentId, accountName, accountKey, repositoryName)
    )
  );
};

const postComment = (
  accountName,
  accountKey,
  documentPath,
  issueNumber,
  repositoryName
) =>
  new Promise((resolve, reject) => {
    const auth = `Basic ${Buffer.from(`${accountName}:${accountKey}`).toString(
      "base64"
    )}`;
    const postCommentOptions = {
      url: `https://api.github.com/repos/${repositoryName}/issues/${issueNumber}/comments`,
      headers: {
        Authorization: auth,
        "User-Agent": accountName
      },
      body: `{ "body": "If you use Expo, view our components by scanning this qr code: <br> <img src='${documentPath}'> <br> This has been made possible through [Fructose](https://github.com/newsuk/fructose) "}`
    };

    request.post(postCommentOptions, error => {
      if (error) reject(error);
      resolve("commented");
    });
  });

const publishQRCode = async (
  accountName,
  accountKey,
  documentPath,
  issueNumber,
  repositoryName
) => {
  try {
    const commentsToDelete = await existingComments(
      accountName,
      accountKey,
      issueNumber,
      repositoryName
    );
    await deleteCommentsFromList(
      commentsToDelete,
      accountName,
      accountKey,
      repositoryName
    );
    await postComment(
      accountName,
      accountKey,
      documentPath,
      issueNumber,
      repositoryName
    );
  } catch (err) {
    throw err;
  }
};

module.exports = {
  publishQRCode,
  existingComments
};
