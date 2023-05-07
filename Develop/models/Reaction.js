const { Schema, model } = require("mongoose");

const reactionSchema = new Schema({
  reactionName: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Reaction = model("Reaction", reactionSchema);

module.exports = Reaction;
