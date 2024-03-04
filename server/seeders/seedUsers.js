const mongoose = require("mongoose");
const User = require("../models/User"); // Adjust the path to match your User model

const users = require("./userSeeds.json"); // Adjust the path to match your JSON file

// Connect to MongoDB database
mongoose.connect("mongodb://localhost:27017/pollData", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Seed users to the database
async function seedUsers() {
  try {
    // Loop through the users array and create users in the database
    for (let user of users) {
      await User.create(user);
      console.log(`User '${user.username}' added to the database.`);
    }
    console.log("All users added successfully.");
  } catch (error) {
    console.error("Error seeding users:", error);
  } finally {
    // Disconnect from the database after seeding
    mongoose.disconnect();
  }
}

// Invoke the seedUsers function to start seeding
seedUsers();
