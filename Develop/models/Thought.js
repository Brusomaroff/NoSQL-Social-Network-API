const { Schema, model } = require("mongoose");

const reactionSchema = require("./Reaction");
// Create Post model
const thoughtSchema = new Schema(
  {
    username: {
      type: String,
    },
    thoughtText: {
      type: String,
      minLength: 15,
      maxLength: 500,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    reaction: [reactionSchema],
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

// gets comments per user
thoughtSchema
  .virtual("reactionCount")
  .get(function () {
    return this.reaction.length;
  });

const Thought = model("thought", thoughtSchema);

module.exports = Thought;