import React from "react";

const Poll = ({ poll }) => {
  return (
    <div className="poll">
      <h2>{poll.header}</h2>
      <p>{poll.description}</p>
      <h3>Choices:</h3>
      {poll.choices.map((choice, index) => (
        <p key={index}>{choice.text}</p>
      ))}
      <p>Created by: {poll.creator.username}</p>
    </div>
  );
};

export default Poll;
