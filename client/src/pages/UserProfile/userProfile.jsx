import { useQuery } from "@apollo/client";
import { useEffect } from "react";

import { GET_CURRENT_USER } from "../../utils/queries";

// import Auth from "../../utils/auth";

export default function UserProfile() {
  const { loading, data } = useQuery(GET_CURRENT_USER);

  useEffect(() => {
    console.log("User data:", data?.me);
  }, [data]);

  return <h1>User Profile</h1>;
}
