import "./poll.css";
import { useState, useEffect } from "react";
import { useMutation } from "@apollo/client";
import { CREATE_VOTE } from "../../utils/mutations";
import Auth from "../../utils/auth";

const Poll = ({ poll }) => {
  const [createVote, { error, data }] = useMutation(CREATE_VOTE);
  const [errorMessage, setErrorMessage] = useState(null);
  const [hasUserVoted, setHasUserVoted] = useState(false);
  const [updatedVoteCount, setUpdatedVoteCount] = useState(poll.voteCount);
  const [updatedChoices, setUpdatedChoices] = useState(poll.choices);

  const hasVotedIcon = (
    <svg
      width="50px"
      height="50px"
      viewBox="-20.4 -20.4 64.80 64.80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
      <g
        id="SVGRepo_tracerCarrier"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></g>
      <g id="SVGRepo_iconCarrier">
        {" "}
        <path
          d="M8.81802 12.3107L10.9393 14.432L15.182 10.1893M21.75 12C21.75 17.3848 17.3848 21.75 12 21.75C6.61522 21.75 2.25 17.3848 2.25 12C2.25 6.61522 6.61522 2.25 12 2.25C17.3848 2.25 21.75 6.61522 21.75 12Z"
          stroke="#73c125"
          strokeWidth="2.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        ></path>{" "}
      </g>
    </svg>
  );

  useEffect(() => {
    // Update hasUserVoted state based on localStorage
    const storedHasUserVoted = localStorage.getItem(`hasUserVoted_${poll._id}`);
    if (storedHasUserVoted !== null) {
      setHasUserVoted(storedHasUserVoted === "true");
    } else {
      // Update hasUserVoted state only once after component mount
      if (Auth.loggedIn()) {
        const currentUserId = Auth.getProfile().authenticatedPerson?._id;
        if (currentUserId) {
          for (const vote of poll.votes) {
            if (vote.user && vote.user._id === currentUserId) {
              setHasUserVoted(true);
              localStorage.setItem(`hasUserVoted_${poll._id}`, "true");
              break;
            }
          }
        }
      }
    }
  }, [poll]);

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
      localStorage.setItem(`hasUserVoted_${poll._id}`, "true"); // Store hasUserVoted in localStorage
      setUpdatedVoteCount(updatedVoteCount + 1); // Update the vote count

      // Update the choices array with new vote counts
      const updatedChoicesList = updatedChoices.map((choice) => {
        if (choice._id === choiceId) {
          return { ...choice, voteCount: choice.voteCount + 1 };
        }
        return choice;
      });
      setUpdatedChoices(updatedChoicesList);
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

  // Listen for the popstate event
  const handlePopState = () => {
    // Check if the current URL is "/"
    if (window.location.href === "/") {
      // Reset the state to the original poll data
      setHasUserVoted(false);
      setUpdatedVoteCount(poll.voteCount);
      setUpdatedChoices(poll.choices);
    }
  };

  useEffect(() => {
    window.addEventListener("popstate", handlePopState);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, [poll, hasUserVoted]); // Add poll and hasUserVoted to dependency array

  return (
    <div className="poll" id={poll._id}>
      <div>
        <p className="pollHeader flex-row">
          {poll.header}
          <span className="hasVotedIcon">
            {hasUserVoted ? hasVotedIcon : ""}
          </span>
        </p>
        <p className="pollDesc">{poll.description}</p>
      </div>
      {errorMessage && <p className="error">{errorMessage}</p>}
      {updatedChoices.map((choice, index) => {
        const votePercentage = (choice.voteCount / updatedVoteCount) * 100 || 0;
        let style = {};
        if (hasUserVoted) {
          // ! if we want each result to be a different color,
          // ! uncomment this and reference colors[index] in style instead of gray
          // const colors = [
          //   "#ee5e5c",
          //   "#00b6f2",
          //   "#4aee7e",
          //   "yellow",
          //   "purple",
          //   "orange",
          //   "turquoise",
          //   "pink",
          // ];

          style = {
            backgroundImage: `linear-gradient(to right, gray ${votePercentage}%, transparent ${votePercentage}%)`,
          };
        }
        return (
          <p
            key={index}
            className={`pollChoice ${hasUserVoted ? "disabled" : ""}`}
            onClick={() => handleChoiceClick(choice._id)}
            style={style}
          >
            <span className="choiceText">{choice.text}</span>
            <span
              className="choiceStats"
              style={hasUserVoted ? {} : { color: "transparent" }}
            >
              {Math.ceil(votePercentage)}%({choice.voteCount})
            </span>
          </p>
        );
      })}
      <p className="createdBy">
        Created by: {poll.creator.username}
        <p>
          <span className="totalVotes">{updatedVoteCount} Votes</span>
        </p>
      </p>
    </div>
  );
};

export default Poll;
