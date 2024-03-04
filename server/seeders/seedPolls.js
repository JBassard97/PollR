const mongoose = require("mongoose");
const User = require("../models/User");
const Poll = require("../models/Poll");

const polls = require("./pollSeeds.json");

// Establish a connection to the MongoDB database
mongoose.connect("mongodb://localhost:27017/pollData", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Function to get 5 random users' ObjectIDs
const getRandomUserIds = async () => {
  try {
    // Query the database to retrieve 5 random users
    const randomUsers = await User.aggregate([{ $sample: { size: 5 } }]);

    // Extract the ObjectIDs from the random users
    const userIds = randomUsers.map((user) => user._id);

    return userIds;
  } catch (error) {
    console.error("Error fetching random users:", error);
    return [];
  }
};

const seedPolls = async () => {
  try {
    const userIds = await getRandomUserIds();

    for (const pollInfo of polls) {
      // Create a new poll instance
      const poll = new Poll(pollInfo);

      if (userIds) {
        const randomUserId =
          userIds[Math.floor(Math.random() * userIds.length)];
        poll.creator = randomUserId;
      } else {
        console.error("No random user ID available.");
        continue;
      }

      // Save the poll to the database
      await poll.save();
    }

    console.log("Polls seeded successfully.");
  } catch (error) {
    console.error("Error seeding polls:", error);
  } finally {
    // Disconnect from the database
    mongoose.disconnect();
  }
};

// Call the function to seed the database with polls
seedPolls();
