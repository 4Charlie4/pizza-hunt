const { Comment, Pizza } = require("../models");

const commentController = {
  addComment({ params, body }, res) {
    console.log(body);
    Comment.create(body)
      .then(({ _id }) => {
        return Pizza.findOneAndUpdate(
          { _id: params.pizzaId },
          { $push: { comments: _id } },
          { new: true, runValidators: true }
        );
      })
      .then((pizzaData) => {
        if (!pizzaData) {
          res.status(404).json({ message: "No pizza with that id!" });
          return;
        }
        res.json(pizzaData);
      })
      .catch((err) => res.json(err));
  },

  addReply({ params, body }, res) {
    Comment.findOneAndUpdate(
      { _id: params.commentId },
      { $push: { replies: body } },
      { new: true, runValidators: true }
    )
      .then((commData) => {
        if (!commData) {
          res.status(404).json({ message: "No comment with that id!" });
          return;
        }
        res.json(commData);
      })
      .catch((err) => res.json(err));
  },

  removeComment({ params }, res) {
    Comment.findOneAndDelete({ _id: params.commentId })
      .then((deletedComment) => {
        if (!deletedComment) {
          return res.status(404).json({ message: "No pizza with that id!" });
        }
        return Pizza.findOneAndUpdate(
          { _id: params.pizzaId },
          { $pull: { comments: params.commentId } },
          { new: true }
        );
      })
      .then((pizzaData) => {
        if (!pizzaData) {
          res.status(404).json({ message: "No pizza with that id!" });
          return;
        }
        res.json(pizzaData);
      })
      .catch((err) => res.json(err));
  },

  removeReply({ params }, res) {
    Comment.findOneAndUpdate(
      { _id: params.commentId },
      { $pull: { replies: { replyId: params.replyId } } },
      { new: true }
    )
      .then((replyData) => res.json(replyData))
      .catch((err) => res.json(err));
  },
};

module.exports = commentController;
