module.exports = (comment) => {
    return {
        commentID:comment.commentID,
        userID:comment.userID,
        createAt:comment.createAt
    }
}