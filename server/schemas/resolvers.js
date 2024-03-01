const { User, Poll, Vote } = require("../models");

const { signToken, AuthenticationError } = require("../utils/auth");

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id })
          .populate("pollsMade")
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
      return Poll.find().populate("creator").populate("votes");
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
      return poll;
    },
    updateUser: async (parent, { _id, input }) => {
      const updatedUser = await User.findByIdAndUpdate(_id, input, {
        new: true,
      });
      return updatedUser;
    },
    loginUser: async (parent, { email, password }) => {
      const user = await User.findOne({ email });
      if (!user || !(await user.isCorrectPassword(password))) {
        throw AuthenticationError;
      }
      const token = signToken(user);
      return { token, user };
    },
    deleteUser: async (parent, { _id }) => {
      const deletedUser = await User.findByIdAndDelete(_id);
      return deletedUser;
    },
    deletePoll: async (parent, { _id }) => {
      const deletedPoll = await Poll.findByIdAndDelete(_id);
      return deletedPoll;
    },
    createVote: async (parent, { pollId, choiceId }, context) => {
      if (!context.user) {
        throw AuthenticationError;
      }
      const vote = await Vote.create({
        user: context.user._id,
        poll: pollId,
        choice: choiceId,
      });
      return vote;
    },
  },
};

module.exports = resolvers;
