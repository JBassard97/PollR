const mongoose = require("mongoose");
const { Schema } = mongoose;

const voteSchema = new Schema({
  // ! One User per vote
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  // ! One poll per vote
  poll: {
    type: Schema.Types.ObjectId,
    ref: "Poll",
    required: true,
  },
  // ! Choice you voted for accounted for
  choice: {
    type: String,
    required: true,
  },
});

const Vote = mongoose.model("Vote", voteSchema);

module.exports = Vote;
