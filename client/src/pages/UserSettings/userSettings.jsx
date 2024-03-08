import React, { useState, useEffect } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { UPDATE_USER } from "../../utils/mutations";
import Auth from "../../utils/auth";
import { GET_CURRENT_USER } from "../../utils/queries";
import DeleteAccountButton from "./deleteButton";

export default function UserSettings() {
  const [formState, setFormState] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [formError, setFormError] = useState({
    username: "",
    email: "",
  });

  const currentUserId = Auth.getProfile().authenticatedPerson._id;

  // Fetch current user data
  const { loading, data } = useQuery(GET_CURRENT_USER);

  useEffect(() => {
    if (data && data.me) {
      const { username, email } = data.me;
      setFormState({
        ...formState,
        username,
        email,
      });
    }
  }, [data]); // Update form state when user data changes

  const [updateUser, { error }] = useMutation(UPDATE_USER);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleSubmit = async (name, value) => {
    try {
      const { username, email, password } = formState;

      // Validate username
      if (!username.trim()) {
        setFormError({ ...formError, username: "Username cannot be empty" });
        return;
      } else {
        setFormError({ ...formError, username: "" });
      }

      // Validate email using regex
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!email.match(emailRegex)) {
        setFormError({ ...formError, email: "Invalid email format" });
        return;
      } else {
        setFormError({ ...formError, email: "" });
      }

      // Proceed with updating user
      const { data } = await updateUser({
        variables: {
          _id: currentUserId,
          input: { [name]: value },
        },
      });

      console.log("User updated:", data.updateUser);
    } catch (err) {
      console.error("Error updating user:", err);
    }
  };

  if (loading) return <div>Loading...</div>; // Show loading message while fetching user data

  return (
    <div className="container">
      <h1>User Settings for {formState.username}</h1>
      <form>
        <div className="form-group">
          <h5 htmlFor="username">Update Username:</h5>
          <input
            type="text"
            id="username"
            name="username"
            value={formState.username}
            onChange={handleChange}
            className="form-control"
            placeholder="Enter your new username"
          />
          {formError.username && (
            <p className="text-danger">{formError.username}</p>
          )}
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => handleSubmit("username", formState.username)}
          >
            Update Username
          </button>
        </div>
        <div className="form-group">
          <h5 htmlFor="email">Update Email:</h5>
          <input
            type="email"
            id="email"
            name="email"
            value={formState.email}
            onChange={handleChange}
            className="form-control"
            placeholder="Enter your new email"
            pattern="[^\s@]+@[^\s@]+\.[^\s@]+"
          />
          {formError.email && <p className="text-danger">{formError.email}</p>}
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => handleSubmit("email", formState.email)}
          >
            Update Email
          </button>
        </div>
        <div className="form-group">
          <h5 htmlFor="password">Update Password:</h5>
          <input
            type="password"
            id="password"
            name="password"
            value={formState.password}
            onChange={handleChange}
            className="form-control"
            placeholder="Enter your new password"
          />
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => handleSubmit("password", formState.password)}
          >
            Update Password
          </button>
        </div>
        {error && <p>Error updating user: {error.message}</p>}
          </form>
          <DeleteAccountButton userId={Auth.getProfile().authenticatedPerson._id } />
    </div>
  );
}
