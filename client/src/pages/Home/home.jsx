import "./home.css";
import Auth from "../../utils/auth";
import { GET_ALL_POLLS } from "../../utils/queries";
import { useQuery } from "@apollo/client";

import Poll from "../../components/Poll/index";

export default function Home() {
  const { loading, data } = useQuery(GET_ALL_POLLS);

  if (data) {
    console.log(data.polls);
  }

  return (
    <>
      <main className="homepage" style={{ color: "white" }}>
        <h2 className="p-4 m-2">Welcome to PollR!</h2>
        <div className="pollContainer">
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
          </div>
      </main>
    </>
  );
}
