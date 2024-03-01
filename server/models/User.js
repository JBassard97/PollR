const mongoose = require("mongoose");

const { Schema } = mongoose;
const bcrypt = require("bcrypt");

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/.+@.+\..+/, "Must use a valid email address"],
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
        },
    // ! Array of Polls they've created
    pollsMade: [
      {
        type: Schema.Types.ObjectId,
        ref: "Poll",
      },
        ],
    // ! Array of Votes they've created
    votesMade: [
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

// Set up pre-save middleware to create password
userSchema.pre("save", async function (next) {
  if (this.isNew || this.isModified("password")) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }

  next();
});

// Compare the incoming password with the hashed password
userSchema.methods.isCorrectPassword = async function (password) {
  await bcrypt.compare(password, this.password);
};

// ! Virtual to return total number of polls created
userSchema.virtual("pollCount").get(function () {
  return this.pollsMade.length || 0;
});

// ! Virtual to return total number of votes created
userSchema.virtual("voteCount").get(function () {
  return this.votesMade.length || 0;
});

const User = mongoose.model("User", userSchema);

module.exports = User;
