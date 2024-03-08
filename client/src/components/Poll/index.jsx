import "./poll.css";
import { useState } from "react";
import { useMutation } from "@apollo/client";
import { CREATE_VOTE } from "../../utils/mutations";
import Auth from "../../utils/auth";

const Poll = ({ poll }) => {
  const [createVote, { error, data }] = useMutation(CREATE_VOTE);
  const [errorMessage, setErrorMessage] = useState(false);

  let hasUserVoted = false;
  if (Auth.loggedIn()) {
    const currentUserId = Auth.getProfile().authenticatedPerson?._id;
    if (currentUserId) {
      // Iterate through the votes array
      for (const vote of poll.votes) {
        // Check if the user ID of the current vote matches the currentUserId
        if (vote.user && vote.user._id === currentUserId) {
          hasUserVoted = true;
          console.log("You've already voted");
          // If a match is found, break out of the loop
          break;
        }
      }
    }
  }

  const handleChoiceClick = async (choiceId) => {
    if (!poll || !poll._id) {
      console.error("Poll or poll ID is undefined");
      return;
    }

    if (hasUserVoted || !Auth.loggedIn()) {
      handleInvalidVote(choiceId); // Call handleInvalidVote with choiceId
    } else {
      console.log("Choice Id:", choiceId);
      console.log("Poll Id:", poll._id);
      try {
        const { data } = await createVote({
          variables: { pollId: poll._id, choiceId: choiceId },
        });
      } catch (error) {
        console.error("error:", error);
      }
    }
  };

  const handleInvalidVote = (choiceId) => {
    if (!Auth.loggedIn()) {
      console.log("Log In/Sign Up to Vote");
      setErrorMessage(<p className="error">Log In to Vote!</p>);
    } else {
      console.log("You can't vote twice!", choiceId); // Log choiceId
      setErrorMessage(<p className="error">Already Voted!</p>);
    }
  };

  return (
    <div className="poll" id={poll._id}>
      <div>
        <p className="pollHeader">{poll.header}</p>
        <p className="pollDesc">{poll.description}</p>
      </div>
      {!errorMessage ? <></> : errorMessage}
      {poll.choices.map((choice, index) => (
        <p
          className={`pollChoice ${hasUserVoted ? "disabled" : ""}`}
          id={choice._id}
          key={index}
          onClick={() => handleChoiceClick(choice._id)} // Pass choiceId to handleChoiceClick
        >
          {choice.text}
        </p>
      ))}
      <p className="createdBy">Created by: {poll.creator.username}</p>
    </div>
  );
};

export default Poll;
