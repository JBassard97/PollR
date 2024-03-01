// mutations.js

import { gql } from "@apollo/client";

export const CREATE_USER = gql`
  mutation CreateUser($input: CreateUserInput!) {
    createUser(input: $input) {
      token
      user {
        _id
        username
        email
      }
    }
  }
`;

export const CREATE_POLL = gql`
  mutation CreatePoll($input: CreatePollInput!) {
    createPoll(input: $input) {
      _id
      header
      description
      choices {
        _id
        text
      }
      creator {
        _id
        username
      }
      votes {
        _id
        user {
          _id
          username
        }
        choice {
          _id
          text
        }
      }
      voteCount
    }
  }
`;

export const UPDATE_USER = gql`
  mutation UpdateUser($_id: ID!, $input: UpdateUserInput!) {
    updateUser(_id: $_id, input: $input) {
      _id
      username
      email
      pollCount
      voteCount
    }
  }
`;

export const LOGIN_USER = gql`
  mutation LoginUser($email: String!, $password: String!) {
    loginUser(email: $email, password: $password) {
      token
      user {
        _id
        username
        email
      }
    }
  }
`;

export const DELETE_USER = gql`
  mutation DeleteUser($_id: ID!) {
    deleteUser(_id: $_id) {
      _id
      username
      email
      pollCount
      voteCount
    }
  }
`;

export const DELETE_POLL = gql`
  mutation DeletePoll($_id: ID!) {
    deletePoll(_id: $_id) {
      _id
      header
      description
      choices {
        _id
        text
      }
      creator {
        _id
        username
      }
      votes {
        _id
        user {
          _id
          username
        }
        choice {
          _id
          text
        }
      }
      voteCount
    }
  }
`;

export const CREATE_VOTE = gql`
  mutation CreateVote($pollId: ID!, $choiceId: ID!) {
    createVote(pollId: $pollId, choiceId: $choiceId) {
      _id
      user {
        _id
        username
      }
      poll {
        _id
        header
      }
      choice {
        _id
        text
      }
    }
  }
`;
