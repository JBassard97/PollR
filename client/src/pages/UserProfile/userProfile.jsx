import { useQuery } from "@apollo/client";
import { useEffect } from "react";

import { GET_CURRENT_USER } from "../../utils/queries";

<<<<<<< HEAD
// import Auth from "../../utils/auth";

export default function UserProfile() {
  const { loading, data } = useQuery(GET_CURRENT_USER);

  useEffect(() => {
    const user = data?.me || data?.user || {};
    console.log(user);
  }, []);

  return <h1>User Profile</h1>;
}
=======
    return (

        <div className="container" style={{ color: "white", height: 500}}>
            <h1>User Profile</h1>
        </div>
    );
}
>>>>>>> 0c50f5d8e3b1b4621dc601f3af32a0dd5c4d5089
