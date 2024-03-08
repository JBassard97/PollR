const { User, Poll, Vote } = require("../models");

const { signToken, AuthenticationError } = require("../utils/auth");

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id })
          .populate({ path: "pollsMade", populate: { path: "creator" } })
          .populate("votesMade");
      }
      throw AuthenticationError;
    },
    users: async () => {
      return User.find().populate("pollsMade").populate("votesMade");
    },
    user: async (parent, { username }) => {
      const user = await User.findOne({ username })
        .populate("pollsMade")
        .populate("votesMade");
      if (!user) {
        throw new Error("User not found with that username!");
      }
      return user;
    },
    poll: async (parent, { _id }) => {
      const poll = await Poll.findById(_id)
        .populate("creator")
        .populate("votes");
      if (!poll) {
        throw new Error("Poll not found!");
      }
      return poll;
    },
    polls: async () => {
  try {
    return await Poll.find()
      .populate("creator", "username") // Populate only the username of the creator
      .populate({
        path: "choices",
        populate: { path: "votes", populate: { path: "user" } }, // Populate votes field in choices with user information
      })
      .populate({ path: "votes", populate: { path: "user" } }); // Populate votes field in polls with user information
  } catch (error) {
    console.error("Error retrieving polls:", error);
    throw new Error("An error occurred while retrieving polls.");
  }
},
  },
  User: {
    pollCount: (parent) => parent.pollsMade.length || 0,
    voteCount: (parent) => parent.votesMade.length || 0,
  },
  Poll: {
    voteCount: async (parent) => {
      // Resolve the vote count for the poll
      return parent.votes.length || 0;
    },
  },

  Mutation: {
    createUser: async (parent, { input }) => {
      const user = await User.create(input);
      const token = signToken(user);
      return { token, user };
    },
    createPoll: async (parent, { input }, context) => {
      if (!context.user) {
        throw AuthenticationError;
      }
      const poll = await Poll.create({ ...input, creator: context.user._id });
      console.log(context.user._id);

      await User.findByIdAndUpdate(context.user._id, {
        $addToSet: { pollsMade: poll._id },
      });
      return poll;
    },
    updateUser: async (parent, { _id, input }) => {
      const updatedUser = await User.findByIdAndUpdate(_id, input, {
        new: true,
      });
      return updatedUser;
    },
    // ! GOOD
    login: async (parent, { email, password }) => {
      console.log(email, password);
      const user = await User.findOne({ email });
      console.log(user);

      if (!user) {
        throw AuthenticationError;
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw AuthenticationError;
      }

      const token = signToken(user);

      return { token, user };
    },
    deleteUser: async (parent, { _id }) => {
      try {
        // Find the user to be deleted
        const userToDelete = await User.findById(_id);
        if (!userToDelete) {
          throw new Error("User not found!");
        }

        // Delete all polls created by the user
        await Poll.deleteMany({ creator: _id });

        // Delete the user
        const deletedUser = await User.findByIdAndDelete(_id);

        return deletedUser;
      } catch (error) {
        console.error("Error deleting user:", error);
        throw new Error("An error occurred while deleting the user.");
      }
    },

    deletePoll: async (parent, { _id }) => {
      const deletedPoll = await Poll.findByIdAndDelete(_id);
      return deletedPoll;
    },
    createVote: async (parent, { pollId, choiceId }, context) => {
      // Check if user is authenticated
      if (!context.user) {
        throw new AuthenticationError("You must be logged in to vote.");
      }

      try {
        // Create the vote
        const vote = await Vote.create({
          user: context.user._id,
          poll: pollId,
          choice: choiceId,
        });

        // Update the poll's votes field
        await Poll.findByIdAndUpdate(pollId, {
          $addToSet: { votes: vote._id },
        });

        // Update the choice's votes field
        await Poll.findOneAndUpdate(
          { _id: pollId, "choices._id": choiceId },
          { $addToSet: { "choices.$.votes": vote._id } }
        );

        // Update the user's votesMade field
        await User.findByIdAndUpdate(context.user._id, {
          $addToSet: { votesMade: vote._id },
        });

        return vote;
      } catch (error) {
        console.error("Error creating vote:", error);
        throw new Error("An error occurred while creating the vote.");
      }
    },
  },
};

module.exports = resolvers;
