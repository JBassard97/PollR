import "./poll.css";
import React from "react";

const Poll = ({ poll }) => {
  return (
    <div className="poll">
      <div>
      <p className="pollHeader">{poll.header}</p>
        <p className="pollDesc">{poll.description}</p>
        </div>
      {poll.choices.map((choice, index) => (
        <p className="pollChoice" key={index}>
          {choice.text}
        </p>
      ))}
      <p className="createdBy">Created by: {poll.creator.username}</p>
    </div>
  );
};

export default Poll;
