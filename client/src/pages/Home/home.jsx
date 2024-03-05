import Auth from "../../utils/auth";
import { GET_ALL_POLLS } from "../../utils/queries";
import { useQuery } from "@apollo/client";
import { useEffect, useState } from "react";

import Poll from "../../components/Poll/index";

export default function Home() {
  const { loading, data } = useQuery(GET_ALL_POLLS);

  if (data) {
    console.log(data.polls);
  }

  return (
    <>
      <main className="container" style={{ color: "white" }}>
        <h1>Welcome to PollR!</h1>
        {/* Check if data is loading */}
        {loading ? (
          <p>Loading...</p>
        ) : (
          <>
            {/* Check if data exists */}
            {data &&
              data.polls &&
              data.polls.map((poll, index) => (
                // Pass each poll object as a prop to the Poll component
                <Poll key={index} poll={poll} />
              ))}
          </>
        )}
      </main>
    </>
  );
}
