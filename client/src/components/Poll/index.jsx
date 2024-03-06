import "./poll.css";
import React from "react";
import { useMutation } from "@apollo/client";
import { CREATE_VOTE } from "../../utils/mutations";
import Auth from "../../utils/auth";

const Poll = ({ poll }) => {
  const [createVote, { error, data }] = useMutation(CREATE_VOTE);

  let hasUserVoted = false; // Initialize outside of the conditional block
  if (Auth.loggedIn()) {
    const currentUserId = Auth.getProfile().authenticatedPerson._id || null;
    hasUserVoted = poll.votes.some((vote) => vote.user._id === currentUserId);
    console.log(hasUserVoted, poll.header);
  }
  console.log(poll);

  const handleChoiceClick = async (choiceId) => {
    if (!poll || !poll._id) {
      console.error("Poll or poll ID is undefined");
      return;
    }

    console.log("Choice Id:", choiceId);
    console.log("Poll Id:", poll._id);
    try {
      const { data } = await createVote({
        variables: { pollId: poll._id, choiceId: choiceId },
      });
    } catch (error) {
      console.error("error:", error);
    }
  };

  return (
    <div className="poll" id={poll._id}>
      <div>
        <p className="pollHeader">{poll.header}</p>
        <p className="pollDesc">{poll.description}</p>
      </div>
      {poll.choices.map((choice, index) => (
        <p
          className={`pollChoice ${hasUserVoted ? "disabled" : ""}`} // Apply disabled class conditionally
          id={choice._id}
          key={index}
          onClick={hasUserVoted ? null : () => handleChoiceClick(choice._id)}
        >
          {choice.text}
        </p>
      ))}
      <p className="createdBy">Created by: {poll.creator.username}</p>
    </div>
  );
};

export default Poll;

// import "./poll.css";
// import React from "react";
// import { useMutation } from "@apollo/client";
// import { useState } from "react";
// import { CREATE_VOTE } from "../../utils/mutations";
// import Auth from "../../utils/auth";

// const Poll = ({ poll }) => {
//   const [createVote, { error, data }] = useMutation(CREATE_VOTE);

//   if (Auth.loggedIn()) {
//     const currentUserId = Auth.getProfile().authenticatedPerson._id || null;

//     const hasUserVoted = poll.votes.some(
//       (vote) => vote.user._id === currentUserId
//     );
//   }
//   console.log(poll);

//   const handleChoiceClick = async (choiceId) => {
//     if (!poll || !poll._id) {
//       console.error("Poll or poll ID is undefined");
//       return;
//     }

//     console.log("Choice Id:", choiceId);
//     console.log("Poll Id:", poll._id);
//     try {
//       const { data } = await createVote({
//         variables: { pollId: poll._id, choiceId: choiceId },
//       });
//     } catch (error) {
//       console.error("error:", error);
//     }
//   };

//   return (
//     <div className="poll" id={poll._id}>
//       <div>
//         <p className="pollHeader">{poll.header}</p>
//         <p className="pollDesc">{poll.description}</p>
//       </div>
//       {poll.choices.map((choice, index) => (
//         <p
//           className="pollChoice"
//           id={choice._id}
//           key={index}
//           onClick={hasUserVoted ? null : () => handleChoiceClick(choice._id)}
//         >
//           {choice.text}
//         </p>
//       ))}
//       <p className="createdBy">Created by: {poll.creator.username}</p>
//     </div>
//   );
// };

// export default Poll;
