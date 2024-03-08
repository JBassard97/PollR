import { useQuery, useMutation } from "@apollo/client";
import { useEffect } from "react";

import { GET_CURRENT_USER } from "../../utils/queries";
import { DELETE_POLL } from "../../utils/mutations";

import Auth from "../../utils/auth";
import Poll from "../../components/Poll/index";

import "./userProfile.css"

export default function UserProfile() {
  const { loading, data } = useQuery(GET_CURRENT_USER);
  const [deletePoll, { error, deleteData }] = useMutation(DELETE_POLL);

  /*
  useEffect(() => {
    console.log("User data:", data?.me);
  }, [data]);
  */
  

  const username = Auth.getProfile().authenticatedPerson.username;

  const polls = data?.me.pollsMade || null;
  loading ? console.log("loading") : console.log(polls);

  const handleDeletePoll = async (pollId) => {
    console.log(pollId);
    try {
      const { data } = await deletePoll({
        variables: { _id: pollId }
      });
      window.location.reload();
    } catch (error) {
      console.error("error", error);
      window.location.reload();
    }
  }


  if (Auth.loggedIn()) {
    return (
      <>
        <h2 className="p-4 m-2">My Polls</h2>
        <div className="pollContainer">
        {loading ? (
            <p className="p-4 m-2">Loading...</p>
          ) : (
            polls.map((poll, index) => (
              <div key={index}>
                <Poll key={index} poll={poll} />
                <button onClick={() => handleDeletePoll(poll._id)}>Delete poll</button>
              </div>     
            )
          ))
        }
        </div>
      </>
    )
  }

  return (
    <>
      <h2 className="p-4 m-2">My Polls</h2>
      <p className="p-4 m-2">Login to see your polls</p>
    </>
  )

}
