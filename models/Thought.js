const { Schema, model } = require("mongoose");

const reactionSchema = require("./Reaction");
// Schema to create Post model
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

// Create a virtual property `tagCount` that gets the amount of comments per user
thoughtSchema
  .virtual("reactionCount")
  // Getter
  .get(function () {
    return this.reaction.length;
  });

// Initialize our Post model
const Thought = model("thought", thoughtSchema);

module.exports = Thought;
