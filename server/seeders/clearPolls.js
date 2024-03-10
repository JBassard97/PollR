const mongoose = require("mongoose");
const Poll = require("../models/Poll");
const Vote = require("../models/Vote");

// Establish a connection to the MongoDB database
mongoose.connect("mongodb://localhost:27017/pollData", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Function to clear the entire database
const clearDatabase = async () => {
  try {
    // Remove all documents from each collection
    await Poll.deleteMany();
    await Vote.deleteMany();

    console.log("Polls and Votes cleared successfully.");
  } catch (error) {
    console.error("Error clearing database:", error);
  } finally {
    // Close the database connection
    mongoose.disconnect();
  }
};

// Call the function to clear the database
clearDatabase();
