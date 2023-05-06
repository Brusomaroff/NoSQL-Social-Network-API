const { Thought, User } = require("../models");

module.exports = {
  getThought(req, res) {
    Thought.find()
      .then((thought) => res.json(thought))
      .catch((err) => {
        console.error({ message: err });
        return res.status(500).json(err);
      });
  },
  getSingleThought(req, res) {
    Thought.findOne({ _id: req.params.thoughtId })
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: "No thought with ID" })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },
  updateThought(req, res) {
    Thought.findOneAndUpdate({ _id: req.params.thoughtId })
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: "No thought with ID" })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },
  deleteThought(req, res) {
    Thought.findOneAndDelete({ _id: req.params.thoughtId })
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: "No thought with ID" })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },
  // create new
  createThought(req, res) {
    Thought.create(req.body)
      .then((thought) => {
        return User.findOneAndUpdate(
          { _id: req.body.userId },
          { $push: { thought: thought._id } },
          { new: true }
        );
      })
      .then((data) => {
        res.json(data);
      });
  },
  createReaction(req, res) {
    return User.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $addToSet: { reaction: req.body } },
      { new: true, runValidators: true }
    ).then((data) => {
      res.json(data);
    });
  },
  deleteReaction(req, res) {
    return User.findOneAndDelete(
      { _id: req.params.thoughtId },
      { $pull: { reaction: req.params.reactionId } },
      { new: true, runValidators: true }
    ).then((data) => {
      res.json(data);
    });
  },
};