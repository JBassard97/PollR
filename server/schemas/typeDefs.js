const typeDefs = `
type User {
  _id: ID # Unique identifier for the user
  username: String! # Username of the user
  email: String! # Email of the user
  pollsMade: [Poll!]! # Polls created by the user
  votesMade: [Vote!]! # Votes made by the user
  pollCount: Int
  voteCount: Int
}

type Poll {
  _id: ID # Unique identifier for the poll
  header: String! # Header text of the poll
  description: String # Description of the poll (optional)
  choices: [Choice!]! # Choices available in the poll
  creator: User! # Creator of the poll
  votes: [Vote!]! # Votes cast in the poll
  voteCount: Int! # Total number of votes in the poll
}

type Choice {
  _id: ID # Unique identifier for the choice
  text: String! # Text of the choice
  votes: [Vote]! # Votes cast for this choice
  voteCount: Int! # Total number of votes for this choice
}

type Vote {
  _id: ID # Unique identifier for the vote
  user: User! # User who cast the vote
  poll: Poll! # Poll in which the vote was cast
  choice: Choice! # Choice selected in the vote
}

type Auth {
  token: ID! # JWT token for authentication
  user: User # Authenticated user
}

input CreateUserInput {
  username: String! # Username of the new user
  email: String! # Email of the new user
  password: String! # Password of the new user
}

input UpdateUserInput {
  username: String # New username for the user
  email: String # New email for the user
  password: String # New password for the user
}

input CreatePollInput {
  header: String! # Header text of the new poll
  description: String # Description of the new poll (optional)
  choices: [String!]! # Choices for the new poll
}

type Query {
  me: User # Retrieve current authenticated user
  users: [User] # Retrieve all users
  user(username: String!): User # Retrieve a user by their username
  polls: [Poll] # Retrieve all polls
  poll(_id: ID!): Poll # Retrieve a poll by ID
}

type Mutation {
  createUser(input: CreateUserInput!): Auth # Create a new user
  createPoll(input: CreatePollInput!): Poll # Create a new poll
  updateUser(_id: ID!, input: UpdateUserInput!): User # Update a user by ID
  login(email: String!, password: String!): Auth # Login user and retrieve JWT token
  deleteUser(_id: ID!): User # Delete a user by ID
  deletePoll(_id: ID!): Poll # Delete a poll by ID
  createVote(pollId: ID!, choiceId: ID!): Vote # Create a vote in a poll for a specific choice
}
`;

module.exports = typeDefs;
