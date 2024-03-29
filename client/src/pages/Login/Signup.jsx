import { useState } from "react";
import { Link } from "react-router-dom";

import { useMutation } from "@apollo/client";
import { CREATE_USER } from "../../utils/mutations";

import Auth from "../../utils/auth";

const Signup = () => {
  const [formState, setFormState] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [createUser, { error, data }] = useMutation(CREATE_USER);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log(formState);

    try {
      const { data } = await createUser({
        variables: { input: formState },
      });

      Auth.login(data.createUser.token);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <main className="container mb-4">
      <div className="d-flex justify-content-center col-12 col-lg-10 mt-5">
        <div className="card">
          <h4 className="card-header bg-dark text-light p-2">Sign Up</h4>
          <div className="card-body">
            {data ? (
              <p>
                Success! You may now head{" "}
                <Link to="/">back to the homepage.</Link>
              </p>
            ) : (
              <form onSubmit={handleFormSubmit}>
                <input
                  className="form-input w-100"
                  placeholder="Your username"
                  name="username"
                  type="text"
                  style={{
                    marginBottom: 15,
                  }}
                  value={formState.name}
                  onChange={handleChange}
                />
                <br/>
                <input
                  className="form-input w-100"
                  placeholder="Your email"
                  name="email"
                  type="email"
                  style={{
                    marginBottom: 15,
                  }}
                  value={formState.email}
                  onChange={handleChange}
                />
                <br/>
                <input
                  className="form-input w-100"
                  placeholder="******"
                  name="password"
                  type="password"
                  value={formState.password}
                  onChange={handleChange}
                />
                <br/>
                <button
                  className="btn btn-block btn-lg btn-primary"
                  style={{ 
                    cursor: "pointer",
                    marginTop: 25 
                  }}
                  type="submit"
                >
                  Submit
                </button>
              </form>
            )}

            {error && (
              <div className="my-3 p-3 bg-danger text-white">
                {error.message}
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

export default Signup;
