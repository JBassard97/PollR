const mongoose = require("mongoose");
const { Schema } = mongoose;

const choiceSchema = new Schema(
  {
    text: {
      type: String,
      required: true,
    },
    votes: [
      {
        type: Schema.Types.ObjectId,
        ref: "Vote",
      },
    ],
  },
  {
    toJSON: {
      virtuals: true,
    },
  }
);

// ! Virtual to count total number of votes for each choice
choiceSchema.virtual("voteCount").get(function () {
  return this.votes.length;
});

const pollSchema = new Schema(
  {
    // ! REQUIRED Header text
    header: {
      type: String,
      required: true,
    },
    // ! OPTIONAL Description text
    description: {
      type: String,
    },
    // ! Directly Embedding Array of choices (subdocument)
    choices: {
      type: [choiceSchema],
      validate: {
        validator: function (choices) {
          // ! MAXIMUM length of Choices between 2 and 8
          return choices.length >= 2 && choices.length <= 8;
        },
        message: (props) => `Poll choices must have between 2 and 8 options.`,
      },
      required: true,
    },
    // ! REQUIRED One Creator
    creator: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    // ! Array of votes made on poll
    votes: [
      {
        type: Schema.Types.ObjectId,
        ref: "Vote",
      },
    ],
  },
  {
    toJSON: {
      virtuals: true,
    },
  }
);

// ! Virtual to count total number of votes on the poll
pollSchema.virtual("voteCount").get(function () {
  return this.votes.length || 0;
});

const Poll = mongoose.model("Poll", pollSchema);

module.exports = Poll;
