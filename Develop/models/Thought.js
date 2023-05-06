const { Schema, Types, model} = require('mongoose');

const reactionSchema = new Schema({
  username: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  reactionId: {
    type: Schema.Types.ObjectId,
    default: () => new Types.ObjectId(),
  },
  reactionBody: { type: String, required: true, maxlength: 280}
}, {
  toJSON: {
    getters: true,
  },
  id: false,
});

const thoughtSchema = new Schema(
  {
    text: {
      type: String,
      required: true,
      maxlength: 280,
      minlength: 1,
    },
    username: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    reactions: [reactionSchema],
  },
  {
    toJSON: {
      getters: true,
    },
    id: false,
  }
);

thoughtSchema.virtual('reactionCount')
.get(function() {
  return this.reactions.length;
});

const Thought = model('Thought', thoughtSchema);

module.exports = Thought;
