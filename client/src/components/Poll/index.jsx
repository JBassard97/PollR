import "./poll.css";
import { useState, useEffect } from "react"; // Import useEffect hook
import { useMutation } from "@apollo/client";
import { CREATE_VOTE } from "../../utils/mutations";
import Auth from "../../utils/auth";

const Poll = ({ poll }) => {
  const [createVote, { error }] = useMutation(CREATE_VOTE);
  const [errorMessage, setErrorMessage] = useState(null);
  const [hasUserVoted, setHasUserVoted] = useState(false);

  useEffect(() => {
    // Update hasUserVoted state only once after component mount
    if (Auth.loggedIn() && !hasUserVoted) {
      const currentUserId = Auth.getProfile().authenticatedPerson?._id;
      if (currentUserId) {
        for (const vote of poll.votes) {
          if (vote.user && vote.user._id === currentUserId) {
            setHasUserVoted(true);
            break;
          }
        }
      }
    }
  }, [poll, hasUserVoted]); // Add poll and hasUserVoted to dependency array

  const handleChoiceClick = async (choiceId) => {
    if (!poll || !poll._id) {
      console.error("Poll or poll ID is undefined");
      return;
    }

    if (hasUserVoted || !Auth.loggedIn()) {
      handleInvalidVote();
      return;
    }

    try {
      await createVote({ variables: { pollId: poll._id, choiceId: choiceId } });
      setHasUserVoted(true);
    } catch (error) {
      console.error("Error creating vote:", error);
      setErrorMessage("An error occurred while creating the vote.");
    }
  };

  const handleInvalidVote = () => {
    if (!Auth.loggedIn()) {
      setErrorMessage("Log In to Vote!");
    } else {
      setErrorMessage("Already Voted!");
    }
  };

  return (
    <div className="poll" id={poll._id}>
      <div>
        <p className="pollHeader">{poll.header}</p>
        <p className="pollDesc">{poll.description}</p>
      </div>
      {errorMessage && <p className="error">{errorMessage}</p>}
      {poll.choices.map((choice, index) => (
        <p
          key={index}
          className={`pollChoice ${hasUserVoted ? "disabled" : ""}`}
          onClick={() => handleChoiceClick(choice._id)}
        >
          {choice.text}
        </p>
      ))}
      <p className="createdBy">Created by: {poll.creator.username}</p>
    </div>
  );
};

export default Poll;
