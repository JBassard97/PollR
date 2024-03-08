import { useQuery } from "@apollo/client";
import { useEffect } from "react";

import { GET_CURRENT_USER } from "../../utils/queries";

import Auth from "../../utils/auth";
import Poll from "../../components/Poll/index";

import "./userProfile.css"

export default function UserProfile() {
  const { loading, data } = useQuery(GET_CURRENT_USER);
  
  useEffect(() => {
    console.log("User data:", data?.me);
  }, [data]);
  

  const polls = data?.me.pollsMade || null;
  loading ? console.log("loading") : console.log(polls);
  if (Auth.loggedIn()) {
    return (
      <>
        <h2 className="p-4 m-2">My Polls</h2>
        <div className="pollContainer">
        {loading ? (
            <p className="p-4 m-2">Loading...</p>
          ) : (
            polls.map((poll, index) => (
              <Poll key={index} poll={poll} />
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
