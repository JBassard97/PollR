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
  let userIds = [];
  try {
    // Get ObjectIDs of 5 random users
    userIds = await getRandomUserIds();

    // Iterate over each poll
    for (const pollInfo of polls) {
      // Create a new poll instance
      const poll = new Poll(pollInfo);

      if (userIds.length > 0) {
        // Select a random user ID from the array of user IDs
        const randomUserId =
          userIds[Math.floor(Math.random() * userIds.length)];

        // Set the creator of the poll
        poll.creator = randomUserId;

        // Save the poll to the database
        await poll.save();

        // Update the user's pollsMade array
        await User.findByIdAndUpdate(randomUserId, {
          $addToSet: { pollsMade: poll._id },
        });
      } else {
        console.error("No random user ID available.");
        continue;
      }
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
