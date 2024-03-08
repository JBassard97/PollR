import React from "react";
import { useMutation } from "@apollo/client";
import { DELETE_USER } from "../../utils/mutations";
import Auth from "../../utils/auth";

const DeleteAccountButton = ({ userId } ) => {
  const [deleteUser] = useMutation(DELETE_USER);

  const handleDelete = async () => {
    try {
      await deleteUser({
        variables: {
          _id: userId,
        },
      });
      Auth.logout(); // Logout the user
      window.location.href = "/"; // Redirect to home page
    } catch (err) {
      console.error("Error deleting user:", err);
    }
  };

  return (
    <button onClick={handleDelete} className="btn btn-danger">
      Delete Account
    </button>
  );
};

export default DeleteAccountButton;
