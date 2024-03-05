import { gql } from "@apollo/client";

export const GET_CURRENT_USER = gql`
  query Me {
    me {
      _id
      username
      email
      pollCount
      voteCount
      pollCount
      pollsMade {
        _id
        header
        description
        voteCount
        votes {
          choice {
            voteCount
          }
        }
        choices {
          text
          voteCount
          votes {
            choice {
              text
              voteCount
            }
          }
        }
      }
    }
  }
`;

export const GET_ALL_USERS = gql`
  query Users {
    users {
      _id
      email
      username
      voteCount
      pollCount
      pollsMade {
        _id
        header
        description
        voteCount
        votes {
          choice {
            voteCount
          }
        }
        choices {
          text
          voteCount
          votes {
            choice {
              text
              voteCount
            }
          }
        }
      }
    }
  }
`;

export const GET_USER_BY_USERNAME = gql`
  query GetUserByUsername($username: String!) {
    user(username: $username) {
      _id
      username
      email
      pollCount
      voteCount
      pollCount
      pollsMade {
        _id
        header
        description
        voteCount
        votes {
          choice {
            voteCount
          }
        }
        choices {
          text
          voteCount
          votes {
            choice {
              text
              voteCount
            }
          }
        }
      }
    }
  }
`;

export const GET_ALL_POLLS = gql`
  query {
    polls {
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

export const GET_POLL_BY_ID = gql`
  query GetPollById($_id: ID!) {
    poll(_id: $_id) {
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
